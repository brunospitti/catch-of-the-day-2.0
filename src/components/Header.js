import React from 'react';

import PageName from './basic/PageName';
import Wishlist from './Wishlist';
import HomeButton from './basic/HomeButton';
import User from './basic/User';

class Header extends React.Component {

    state = {
        isWishlistVisible: 'wishlist-hide',
    };

    showWishlist = () => {
        this.state.isWishlistVisible === 'wishlist-hide' ? this.setState({isWishlistVisible: 'wishlist-show'}) : this.setState({isWishlistVisible: 'wishlist-hide'});
    }

    render(){

        return(
            <React.Fragment>
                <div className="header container-fluid">
                    <div className="row">
                        <div className="col-6 page-name-wrapper">
                            <div className="page-name-out">
                                <div className="page-name-inner">
                                    <PageName
                                        pageName={ this.props.pageName }
                                    />
                                    { this.props.wishlist &&
                                        <HomeButton
                                            history={ this.props.history }
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="container-fluid header-contents-holder">
                                <div className="header-contents-inner">
                                    { this.props.wishlist
                                        ?
                                        <React.Fragment>
                                                <Wishlist 
                                                    wishlist={ this.props.wishlist }
                                                    fishes={ this.props.fishes }
                                                    moreFish={ this.props.moreFish }
                                                    lessFish={ this.props.lessFish }
                                                    showWishlist={ this.showWishlist }
                                                    isWishlistVisible={ this.state.isWishlistVisible }
                                                />
                                            </React.Fragment>
                                        :
                                        null
                                    }
                                    <User
                                        user={ this.props.user }
                                        authenticate={ this.props.authenticate }
                                        isOpenStore={ this.props.isOpenStore }
                                        logout={ this.props.logout }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };
};

export default Header;