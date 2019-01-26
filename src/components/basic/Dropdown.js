import React from 'react';

import Option from './Option';
import Tooltip from './Tooltip';

import downArrowIcon from'../../assets/images/icons/down-arrow.svg';




class Dropdown extends React.Component {

    state = {
        selectedStore: 'Select a store',
        isDropdownVisible: false
    };

    ownedStores = () => {
        const stores = this.props.stores;

        const ownedStores = Object.keys(stores)
                            .filter(store => ( this.props.userUid && (stores[store].owner === this.props.userUid) ))
                            .reduce((obj, store) => {
                                      obj[store] = stores[store];
                                      return obj;
                                    }, {});

        return ownedStores;
    }

    openStores = () => {
        const stores = this.props.stores;

        const openStores = Object.keys(stores)
                            .filter(store => !stores[store].owner)
                            .reduce((obj, store) => {
                                        obj[store] = stores[store];
                                        return obj;
                                    }, {});

        return openStores;
    }

    lockedStores = () => {
        const stores = this.props.stores;

        const lockedStores = Object.keys(stores)
                            .filter(store => (stores[store].owner && stores[store].owner !== this.props.userUid))
                            .reduce((obj, store) => {
                                        obj[store] = stores[store];
                                        return obj;
                                    }, {});

        return lockedStores;
    }

    selectThisStore = e => {
        this.setState({
            selectedStore: e.currentTarget.dataset.id,
            isDropdownVisible: false
        },() => {
            this.props.submitStore(this.state.selectedStore)
        })
    }

    openDropdown = () => {
        this.state.isDropdownVisible ? this.setState({isDropdownVisible: false}) : this.setState({isDropdownVisible: true});
    }


    render(){
        return(
            <div className="dropdown-wrapper">
                <button 
                    type="button"
                    className={ `dropdown-selected-option ${this.state.isDropdownVisible ? 'dropdown-open' : ''}` }
                    onClick={ this.openDropdown }
                >
                    <span className="dropdown-title">
                        { this.state.selectedStore }
                        <img src={ downArrowIcon } alt=""/>
                    </span>
                </button>
                { this.state.isDropdownVisible
                    ?
                    <div className="dropdown-list-holder">
                        <ul className="dropdown">
                            { Object.keys(this.ownedStores()).length !== 0
                                ?
                                <ul className="dropdown-owned-stores">
                                    <div className="dropdown-separator">
                                        Your stores
                                        <Tooltip
                                            tooltipText="Stores you own. Only you can edit the inventory"
                                        />
                                    </div>
                                    { Object.keys(this.ownedStores()).map(store => 
                                        
                                        <Option
                                            store={ store }
                                            sortedStores={ this.ownedStores() }
                                            userUid={ this.props.userUid }
                                            selectThisStore={ this.selectThisStore }
                                        />

                                    ) }
                                </ul>
                                :
                                null
                            }
                            <ul className="dropdown-open-stores">
                                <div className="dropdown-separator">
                                    Open stores
                                    <Tooltip
                                        tooltipText="Free playground. No man's land"
                                    />
                                </div>
                                { Object.keys(this.openStores()).map(store => 
                                    
                                    <Option
                                        store={ store }
                                        sortedStores={ this.openStores() }
                                        userUid={ this.props.userUid }
                                        selectThisStore={ this.selectThisStore }
                                    />

                                ) }
                            </ul>
                            <ul className="dropdown-locked-stores">
                                <div className="dropdown-separator">
                                    Locked Stores
                                    <Tooltip
                                        tooltipText="Stores from other users. Only they can edit the inventory"
                                    />
                                </div>
                                { Object.keys(this.lockedStores()).map(store => 
                                    
                                    <Option
                                        store={ store }
                                        sortedStores={ this.lockedStores() }
                                        userUid={ this.props.userUid }
                                        selectThisStore={ this.selectThisStore }
                                    />

                                ) }
                            </ul>
                        </ul>
                    </div>
                    :
                    null
                }
            </div>
        );
    };
};

export default Dropdown;