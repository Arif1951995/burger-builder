import React from 'react'
import classes from './NavItems.module.css'
import NavItem from './NavItem/NavItem'

function NavItems(props) {
    return (
        <ul className={classes.NavItems}>
            <NavItem link="/" active>Burger Builder</NavItem>
            <NavItem link="/">Checkout</NavItem>

        </ul>
    )
}

export default NavItems
