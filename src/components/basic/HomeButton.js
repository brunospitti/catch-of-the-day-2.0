import React from 'react';

const HomeButton = props => (
    <button
        className="back-home"
        onClick={ e => props.history.push('/') }
    >
        Back to Store Picker
    </button>
);

export default HomeButton;