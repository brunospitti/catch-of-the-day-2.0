import React from 'react';

import { formatPrice } from '../assets/js/helpers';

class Fish extends React.Component {

    render(){
        const { name, image, desc, price, status } = this.props.fish;
        const unAvailable = status === 'unavailable' ? true : false;
        return(
            <div className="fish-wrapper">
                <div className="fish-info">
                    <div className="name">{ name }</div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-11 col-md-5 fish-left">
                                <img className="image" src={ image } alt={ name } />
                            </div>
                            <div className="col-11 col-md-7 fish-right">
                                <div className="desc">{ desc }</div>
                                <div className="price">{ formatPrice(price) }</div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-red add-fish"
                        disabled={unAvailable}
                        onClick={ () => {this.props.addFish(this.props.fishIndex)} }
                >
                        { unAvailable ? 'Sold out :(' : 'Add fish to wishlist'} 
                </button>
            </div>
        );
    };
};

export default Fish;