import React from 'react'
import classes from './Burger.module.css'
import Ingredient from './Ingredient/Ingredient'


export default function Burger(props) {

    
let ingredients = Object.keys(props.ingredients).map(e => {
    return [...Array(props.ingredients[e])].map((el, i) => {
        return <Ingredient key={e + i} type={e} />
    })
}).reduce((arr, el) => {
    return arr.concat(el)
}, []);
    return (
        <div className={classes.Burger}>
            <Ingredient type='bread-top' />
            {ingredients.length > 0 ? ingredients : <p>Please Start Adding Ingredients</p>}
            
            <Ingredient type='bread-bottom' />

            
        </div> 
    )
}
