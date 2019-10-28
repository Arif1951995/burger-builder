import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: "salad"},
    {label: 'Cheese', type: "cheese"},
    {label: 'Bacon', type: "bacon"},
    {label: 'Meat', type: "meat"}


];


    const BuildControls = (props) => {
    
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
            {controls.map(el => (<BuildControl 
            key={el.label} 
            label={el.label}
            addIngrediend={() => props.addIngrediend(el.type)}
            removeIngrediend={() => props.removeIngrediend(el.type)}
            disabled={props.disabled[el.type]}
            />))}
            <button className={classes.OrderButton}
            onClick={props.ordered}
            disabled={props.disabledOrder}>ORDER NOW</button>
        </div>
    )
}

export default BuildControls