import React from 'react'
import HOC from '../../../Hoc/HOC'
import Button from '../../UI/Button/Button';

function OrderSummary(props) {
    const ingredientSummary = Object.keys(props.ingredients)
    .map((el) => {
        return <li key={el}><span style={{textTransform: 'capitalize'}}>{el}</span>: {props.ingredients[el]}</li>
    });

    return (
        <HOC>
            <h3>Your Order</h3>
            <p>A Delicios Burger with following Ingredients  </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <p>Price <strong>${props.price.toFixed(2)}</strong></p>
            <Button 
            btnType='Danger'
            clicked={props.purchaseCancelled}
            >
                CANCLE
            </Button>
            <Button 
              clicked={props.purchaseContinued}
            btnType='Success'>
                CONTINUE
            </Button>
            
        </HOC>
    )
}

export default OrderSummary