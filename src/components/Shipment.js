import React, {Component} from 'react';
import PropTypes from 'prop-types'


class Shipment extends Component {
    static propTypes = {
        total: PropTypes.number,

    }

    render() {
        const {total} = this.props;
        const delivery = total > 0 && total < 25 ? 5 : 1;
        const deliveryNeon = delivery === 1 ?(
            <span className='font-effect-neon total_wrap-cheap'>
                {delivery} $
            </span>
        ) : ( <span> {delivery} $</span>);
        return (
            <div className='total'>
                <div className="total_wrap">
                    <div>
                        <div> Delivery: {total > 0 ? deliveryNeon : null} </div>
                        <div className='total_wrap-free'>
                            {total < 500 ? `Order an extra ${25-total}$ for delivery for 1$` : null}
                        </div>
                    </div>
                    <div className="total_wrap-final">Totall: {total}</div>
                </div>

            </div>
        );
    }
}

export default Shipment;
