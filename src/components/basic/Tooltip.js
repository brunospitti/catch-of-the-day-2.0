import React from 'react';

import tooltipIcon from'../../assets/images/icons/question-mark.svg';

class Tooltip extends React.Component {

    state = {
        isTooltipVisible: false
    }

    render(){

        return(

            <div className="tooltip-holder">
                <div
                    className="tooltip-icon-holder"
                    onMouseEnter={ () => { this.setState({isTooltipVisible: true}) } }
                    onMouseLeave={ () => { this.setState({isTooltipVisible: false}) } }
                >
                    <img
                        className="tooltip-icon"
                        src={ tooltipIcon }
                        alt="tooltip"
                    />
                </div>
                {   this.state.isTooltipVisible
                    ?
                        <div className="tooltip-pop-over-wrapper">
                            {this.props.tooltipText}
                        </div>
                    :
                        null
                }
            </div>

        );
    };
};

export default Tooltip;