import React from 'react';

import EditFish from './EditFish';
import AddFish from './AddFish';

class Dashboard extends React.Component{

    state = {
        uid: null,
        owner: null
    };

    editFish = (whatToChange, valueToChangeTo, whatFishToChange) => {
        this.props.editFish(whatToChange, valueToChangeTo, whatFishToChange);
    }

    render(){

        const deleteStore = (   !this.props.isOpenStore(this.props.storeId)
                                && this.props.userUid !== null
                                && (this.props.userUid === this.props.storeOwner)
                            )
                            ?
                            <button className="btn btn-danger" onClick={ this.props.deleteStore }>Delete Store</button>
                            :
                            null;

        if ( !this.props.isOpenStore(this.props.storeId) ){
            // 1. Check if they are logged in
            if (!this.props.userUid) {
                return(
                    'aaa'
                )
            }

            // 2. Check if they are not the owner of the store
            if (this.props.userUid !== this.props.storeOwner){
                return (
                    <div>
                        <p>Sorry you're not the owner! :(</p>
                    </div>
                )
            }
        }

        return(
            <div className="dashboard">
                <h3>Dashboard - Edit your inventory</h3>
                <div className="btn-group buttons-holder">
                    { deleteStore }
                    <button className="btn btn-warning resetFishes"
                            onClick={ this.props.resetFishes }
                    >
                        { Object.keys(this.props.fishes).length === 0
                            ?
                            'Load fishes'
                            :
                            'Reset fishes'
                        }
                    </button>
                </div>
                <ul className="list-group">
                    <h5>Add a new fish to your store</h5>
                    <AddFish
                        addFish={ this.addFish }
                        storeId={ this.props.storeId }
                    />
                    <h5>Edit the existing ones</h5>
                    {Object.keys(this.props.fishes).map(fish =>
                        <EditFish
                            key={ fish }
                            fishIndex={ fish }
                            fish={ this.props.fishes[fish] }
                            editFish={ this.editFish }
                            storeId={ this.props.storeId }
                        />
                    )}
                </ul>
            </div>
        );
    };
};

export default Dashboard;