import React from 'react'
import classes from './Button.module.css'

function Button(props) {
    return (
        <button
         className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>
        {props.children}
        </button>
    )
}

export default Button
