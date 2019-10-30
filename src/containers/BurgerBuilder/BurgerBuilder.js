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
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }



    upadteParchaseState = (ingredients) => {

        const sum = Object.values(ingredients).reduce((acc, val) => acc + val);
        this.setState({
            purchasable: sum > 0
        })
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
        this.setState({ purchasing: false });
    }
    continuePurchaseHandler = () => {
        //alert('you continued')
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
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

            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false })

            })



    }
    componentDidMount() {
        axios.get('https://burger-builder-be307.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(err => {
                this.setState({ error: true })

            });
    }

    render() {







        const desabledInfo = {
            ...this.state.ingredients
        }
        for (let key in desabledInfo) {
            desabledInfo[key] = desabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = <Spinner />;

        if (this.state.ingredients) {
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.canclePurchaseHandler}
                purchaseContinued={this.continuePurchaseHandler}
                price={this.state.totalPrice} />;

            burger = <HOC>
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

        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        if (this.state.error) {
            burger = <h3 style={{ textAlign: 'center' }}>Network Error</h3>
        }
        return (

            <HOC>
                <Modal show={this.state.purchasing}
                    backdropCLicked={this.canclePurchaseHandler}>
                    {orderSummary}

                </Modal>
                {burger}


            </HOC>
        )
    }
}


export default withErrorHandler(BurgerBuilder, axios)
// export default BurgerBuilder