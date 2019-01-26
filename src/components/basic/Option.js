import React from 'react';

const Option = props => (
    <li
        key={ props.sortedStores[props.store].name }
        className={ `dropdown-option ${props.sortedStores[props.store].owner !== props.userUid ? '' : 'user-is-owner'} ${!props.sortedStores[props.store].owner ? 'open-store' : ''}`  }
        onClick={ props.selectThisStore }
        data-id={ props.sortedStores[props.store].name }
    >
        { props.sortedStores[props.store].name }
    </li>
);

export default Option;