import React from 'react';


class Login extends React.Component {

    state = {
        isOptionsVisible: false,
    };

    render(){

        return(
            <div className="login"
                 onMouseEnter={ () => { this.setState({isOptionsVisible: true}) } }
                 onMouseLeave={ () => { this.setState({isOptionsVisible: false}) } }
            >
                <div className="login-message">
                    Login to create and manage stores
                </div>
                { this.state.isOptionsVisible
                ?
                    <div className="login-options">
                        <button className="facebook"
                                onClick={() => this.props.authenticate("Facebook")}
                        >
                            Log in with Facebook
                        </button>
                        <button className="google"
                                onClick={() => this.props.authenticate("Google")}
                        >
                            Log in with Google
                        </button>
                    </div>
                :
                    null
                }
            </div>
        );
    };
};

export default Login;