import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "./Burger";
import base from "../base";
import SingIn from './Auth/SingIn';
import firebase from 'firebase/app';

class App extends Component {
    static propTypes = {
        match: PropTypes.object
    }
    state = {
        burgers: {},
        order: {},
    };

    componentDidMount() {
        const { params } = this.props.match
        const localStorageRef = localStorage.getItem(params.restaurantId)
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef)})      
        }        

        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
            context: this,
            state: 'burgers'
        })
    }

    componentDidUpdate() {
        const { params } = this.props.match
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
    }

    addBurger = burger => {
        console.log('addBurger', burger)
        //1 make new coppy of object
        const burgers = {...this.state.burgers};
        // add new burger in property
        burgers[`bureger${Date.now()}`] = burger;
        // writw new burger object in state
        this.setState({burgers})
    }

    updateBurger = (key, updatedBurger) => {
        //make coppy obj state
        const burgers = { ...this.state.burgers};
        //updade needed burger
        burgers[key] = updatedBurger;
        // record new obj burgers in state
        this.setState({burgers})
    }

    deleteBurger = (key) => {
        //1. make a copy of state
        const burgers = {...this.state.burgers };
        //2. delete burger 
        burgers[key] = null;
        this.setState({burgers})
    }

    deleteBurgerFromOrder = (key) => {
        const order = {...this.state.order}
        delete order[key]
        this.setState({order})
    }

    loadSampleBurgers = () => {
        this.setState({burgers: sampleBurgers })
    }

    addToOrder = (key) => {
        const order = {...this.state.order}
        order[key] = order[key] + 1 || 1;
        this.setState({order})
    }
    handeLogout = async() => {
        await firebase.auth().signOut();
        window.location.reload();
    }

    render() {
        return (
            <SingIn>
            <div>
                <div className="burger-paradise">
                    <div className="menu">
                        <Header title='Very Hot Burger' />
                        <ul className="burgers">
                            {Object.keys(this.state.burgers).map(key => {
                                return <Burger
                                    key={key}
                                    index={key}
                                    datalist={this.state.burgers[key]}
                                    addToOrder={this.addToOrder}
                                /> })}
                        </ul>
                    </div>
                    <Order 
                    deleteBurgerFromOrder = {this.deleteBurgerFromOrder}
                    burgers={this.state.burgers} order={this.state.order}
                    />
                    <MenuAdmin
                        addBurger={this.addBurger}
                        loadSampleBurgers={this.loadSampleBurgers}
                        burgers={this.state.burgers}
                        updateBurger= {this.updateBurger}
                        deleteBurger={this.deleteBurger}
                        handeLogout={this.handeLogout}
                    />
                </div>
            </div>
            </SingIn>
        );
    }
}

export default App;
