import React, { Component } from 'react'
import HOC from '../../Hoc/HOC'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Mdal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler'

const INGREDIENTS_PRICES = {
    salad: 0.5,
    meat: 1,
    bacon: 0.7,
    cheese: 0.4
}

 class BurgerBuilder extends Component {

    state = {
        ingredients: {
            meat: 0,
            bacon: 0,
            cheese: 0,
            salad: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }



    upadteParchaseState = (ingredients) => {

        const sum = Object.values(ingredients).reduce((acc, val) => acc + val);
        this.setState({
            purchasable: sum > 0
        })
        console.log(sum)
    }

    addIngrediendHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredints = { ...this.state.ingredients }
        updatedIngredints[type] = updatedCount;
        const additionPrice = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + additionPrice;
        this.setState({
            ingredients: updatedIngredints,
            totalPrice: newPrice
        })
        this.upadteParchaseState(updatedIngredints);
    }
    removeIngrediendHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngredints = { ...this.state.ingredients }
            updatedIngredints[type] = updatedCount;
            const deductionPrice = INGREDIENTS_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - deductionPrice;
            this.setState({
                ingredients: updatedIngredints,
                totalPrice: newPrice
            })
            this.upadteParchaseState(updatedIngredints);
        }


    }
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    canclePurchaseHandler = () => {
        this.setState({ purchasing: false});
    }
    continuePurchaseHandler = () => {
        //alert('you continued')
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'test123',
                address: 'street123',
                zip: '1234',
                country: 'pakistan'
            },
            emai: 'test@gmail.com',
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false })
                console.log(response)

            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false })
                console.log(err)

            })

    }

    render() {
        { console.log(this.state.loading) }
        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.canclePurchaseHandler}
            purchaseContinued={this.continuePurchaseHandler}
            price={this.state.totalPrice} />;
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        const desabledInfo = {
            ...this.state.ingredients
        }
        for (let key in desabledInfo) {
            desabledInfo[key] = desabledInfo[key] <= 0
            console.log(desabledInfo[key])
        }

        return (
            <HOC>
                <Modal show={this.state.purchasing}
                    backdropCLicked={this.canclePurchaseHandler}>
                    {orderSummary}

                </Modal>

                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngrediend={this.addIngrediendHandler}
                    removeIngrediend={this.removeIngrediendHandler}
                    disabled={desabledInfo}
                    totalPrice={this.state.totalPrice}
                    disabledOrder={!this.state.purchasable}
                    ordered={this.purchaseHandler}
                />

            </HOC>
        )
    }
}


export default withErrorHandler(BurgerBuilder, axios)
// export default BurgerBuilder