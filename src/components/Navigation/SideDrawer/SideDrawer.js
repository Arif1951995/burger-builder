import React from 'react'
import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import classes from './SideDrawer.module.css'
import HOC from '../../../Hoc/HOC'
import Backdrop from '../../UI/Backdrop/Backdrop'


function SideDrawer(props) {
    let attachedClasses = [classes.SideDrawer, classes.Close].join(' ');
    if(props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open].join(' ');

    }

    return (
        <HOC>
            <Backdrop show={props.show} backdropCLicked={props.closed}/>
            <div className={attachedClasses}>
            <div className={classes.Logo}>
            <Logo />

            </div>
            <nav>
                <NavItems />
            </nav>
        
        </div>
        </HOC>
    )
}

export default SideDrawer
