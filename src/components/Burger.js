import React, {Component} from 'react';
import sampleBurgers from "../sample-burgers";
import Proptypes from 'prop-types'

class Burger extends Component {
    static propTypes = {
        details: Proptypes.shape({
            image: Proptypes.string,
            name: Proptypes.string,
            price: Proptypes.number,
            desc: Proptypes.string,
            status: Proptypes.string,
        }),
        index: Proptypes.string,
        addToOrder: Proptypes.func
    }

    render() {
        const { image, name, price, desc, status } = this.props.datalist;
        const isAvailable = status === 'available'

        return (
           <li className='menu-burger'>
               <div className='image-container'>
                   <img src={image} alt={name}/>
               </div>
               <div className="burger-details">
                   <h3 className='burger-name'>{name}
                   <span className="price">	{price}&#36;</span>
                   </h3>
                   <p>{desc}</p>
                   <button
                       onClick={() => this.props.addToOrder(this.props.index)}
                       className="buttonOrder"
                       disabled={!isAvailable}
                   >{isAvailable ? 'Order' : 'temporarily not available'}</button>
               </div>
           </li>
        );
    }
}

export default Burger;
