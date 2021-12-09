import React, {Component} from 'react';
import PropTypes from 'prop-types'

class AddBurgerFrom extends Component {
    static propType = {
        addBurger: PropTypes.func
    }

    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();


    createBurger= event => {
        event.preventDefault()
        const burger = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value || 0),
            status: this.statusRef.current.value,
            desc: this.statusRef.current.value,
            image: this.imageRef.current.value,
        }
        this.props.addBurger(burger)
        event.currentTarget.reset()

    }

    render() {
        return (
            <form action="" className="burger-edit" onSubmit={this.createBurger}>
                <input ref={this.nameRef} name='name' type='text' placeholder='Name' autoComplete='off' />
                <input ref={this.priceRef} name='price' type='text' placeholder='Price' autoComplete='off' />
                <select ref={this.statusRef} name='status' className='status'>
                    <option value="available">Is Available</option>
                    <option value="unavailable">Delete from menu</option>
                </select>
                <textarea ref={this.descRef} name='desc' type='text' placeholder='Description' />
                <input ref={this.imageRef} name='image' type='text' placeholder='Image' autoComplete='off' />
                <button type='submit'>Add to Menu</button>
            </form>
        );
    }
}

export default AddBurgerFrom;
