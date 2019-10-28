import React, { Component } from 'react'
import HOC from '../../Hoc/HOC'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'


class  Layout extends Component {

    state = {
        showSidedrwer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSidedrwer: false})
    }

    sideDrawerToggledHandler = () => {
        this.setState((prevState) => {
            return {showSidedrwer: !prevState.showSidedrwer}
        })
    }

    

    render() {
        return (
            <HOC>
                <Toolbar clicked={this.sideDrawerToggledHandler} />
                <SideDrawer show={this.state.showSidedrwer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.main}>{this.props.children}</main>
            </HOC>
        )

    }
    
}

export default Layout