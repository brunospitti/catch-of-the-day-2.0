import React from 'react';

import Login from './Login';


class User extends React.Component {

    render(){

        const logout = this.props.isOpenStore && this.props.isOpenStore(this.props.storeId) ? null : <button className="logout" onClick={ this.props.logout }>Log out!</button>;

        return(
            <React.Fragment>
                { Object.keys(this.props.user).length !== 0
                    ?
                    <React.Fragment>
                        <div className="user-wrapper">
                            <div className="user-info-holder">
                                <div className="name">{ this.props.user.name }</div>
                                <div className="picture" style={{ backgroundImage: `url(${ this.props.user.picture })` }}></div>
                            </div>
                            <div className="logout-holder">
                                { logout }
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <div className="user-wrapper">
                        <Login
                            authenticate={ this.props.authenticate }
                        />
                    </div>
                }
            </React.Fragment>
        );
    };
};

export default User;