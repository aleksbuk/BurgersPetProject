import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Shipment from "./Shipment";
import {TransitionGroup, CSSTransition} from 'react-transition-group'

class Order extends Component {
    static propTypes = {
        burgers: PropTypes.object,
        order: PropTypes.object,
        deleteBurgerFromOrder: PropTypes.func,
        addBurger: PropTypes.func,
        loadSampleBurgers: PropTypes.func,
    }


    renderOrder = (key) => {
        const burger = this.props.burgers[key];
        const count = this.props.order[key];
        const isAvailable = burger && burger.status === 'available'
        const transitionOption = {
            classNames: 'order',
                key,
                timeout: {enter:500, exit:500 },
        }

        if (!burger) {
            return null
        }
        if(!isAvailable) {
            return (
            <CSSTransition
               {...transitionOption}
            >
                <li className='unavailable' key={key}>
                    Sorry, but {burger ? burger.name : "burger"} temporarily not available!
                </li>
            </CSSTransition>
            )
        }
        return (
            <CSSTransition 
            {...transitionOption}
              >
                <li key={key}>
                    <span>
                        <TransitionGroup component='span' className='count'>
                            <CSSTransition 
                            classNames='count' 
                            key={count} 
                            timeout={{enter:500, exit:500 }}
                            >
                                <span>
                                    {count}
                                </span>
                            </CSSTransition>
                        </TransitionGroup>
                         <span> ' {burger.name}</span>
                        <span> {count * burger.price}$</span>
                        <button 
                            onClick={() => this.props.deleteBurgerFromOrder(key)}
                            className='cancellItem'> &times;
                        </button>
                    </span>
                </li>
            </CSSTransition>
            )
    }
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const burger = this.props.burgers[key];
            const count = this.props.order[key];
            const isAvailable = burger && burger.status === 'available'
            if(isAvailable) {
                return prevTotal + burger.price * count
            }
            return prevTotal
        }, 0)


        return (
            <div className='order-wrap'>
                <h2>Your Order</h2>
                <TransitionGroup component='ul' className='order'>
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                {total > 0 ? (
                    <Shipment total={total} />
                ) : <div className="nothingSelected">
                    Chose burgers and add to order
                </div>
                }
            </div>
        );
    }
}

export default Order;
