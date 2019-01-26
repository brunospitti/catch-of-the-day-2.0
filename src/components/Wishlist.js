import React from 'react';

import { formatPrice } from '../assets/js/helpers';
import wishlistIcon from'../assets/images/icons/wishlist.svg';

class Wishlist extends React.Component{

    renderWishList = (fish) => {
        return(
            <React.Fragment>
                {
                    this.props.fishes[fish].status === 'available'
                    ?
                    <li
                        key={fish}
                        className="wishlist-fish list-group-item"
                    >
                        <span className="fish-name">{ this.props.fishes[fish].name }</span>
                        <div className="fish-qty-wrapper">
                            <button
                                className="fish-modifier btn"
                                id="fish-less"
                                onClick={ () => {this.props.lessFish(fish)} }
                            >
                                &minus;
                            </button>
                            <span className="fish-qty">{ this.props.wishlist[fish] }</span>
                            <button
                                className="fish-modifier btn"
                                id="fish-more"
                                onClick={ () => {this.props.moreFish(fish)} }
                            >
                                &#43;
                            </button>
                        </div>
                        <span className="fish-price">
                            { formatPrice( (this.props.fishes[fish].price)*(this.props.wishlist[fish]) ) }
                        </span>
                    </li> 
                    :
                    null
                }
            </React.Fragment>
        );
    }
        
    render(){
            
        // function to sum up the total price of the order
        const total = Object.keys(this.props.wishlist).reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const qty = this.props.wishlist[key];
            // if it's available
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable){
                return prevTotal + (qty * fish.price);
            }
            return prevTotal;
            //starting amount is 0
        }, 0);

        return(
            <div className="wishlist-wrapper">
                <button className="btn btn-wishlist" type="button" onClick={() => {this.props.showWishlist()} }>
                    Wishlist
                    <img src={ wishlistIcon } alt=""/>
                </button>
                <div className={`wishlist-fishes-wrapper ${this.props.isWishlistVisible}`}>
                    <ul className="wishlist-fishes list-group list-group-flush">
                        {/* Conditional Operator -> if there's no fish on the wishlist, it will show an message, otherwise, it will show the list */}
                        {
                            Object.keys(this.props.wishlist).length === 0
                            ?
                            <li className="wishlist-fish list-group-item">
                                Nothing on your wishlist. Add some fish!
                            </li>
                            :
                            <React.Fragment>
                                { Object.keys(this.props.wishlist).map(this.renderWishList) }
                                <li className="wishlist-total-price list-group-item">
                                    Total: <span>{ formatPrice(total) }</span>
                                </li>
                            </React.Fragment>
                        } 
                    </ul>
                </div>
            </div>
        );
    };
};

export default Wishlist;