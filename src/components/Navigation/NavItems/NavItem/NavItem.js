import React from 'react'
import classes from './NavItem.module.css'


function NavItem(props) {
    return (
       <li className={classes.NavItem}>
           <a 
           className={props.active && classes.active}
           href={props.link}>{props.children}</a>
        </li>
    )
}



export default NavItem

