import React from 'react';

import Fish from '../components/Fish';

class ListOfFishes extends React.Component{

    render(){
        return(
            <div className="list-of-fishes">
                <h3>Products</h3>
                {Object.keys(this.props.items).map(item =>
                    <Fish
                        key={ item }
                        fishIndex={ item }
                        fish={ this.props.items[item] }
                        addFish={ this.props.addItem }
                    />
                )}
            </div>
        );
    };
};

export default ListOfFishes;