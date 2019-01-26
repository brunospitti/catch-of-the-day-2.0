import React from 'react';

import firebase from 'firebase';

class UploadButton extends React.Component {
    state = {
        imageName: '',
        imageURL: '',
        isUploadButtonVisible: false
    }
      
    handleImageChange(e) {
        const file = e.target.files[0];
        if(file.name){
            const storageRef = firebase.storage().ref(`images/${file.name}`)
            storageRef.put(file);
            storageRef.getDownloadURL().then(url => {
                this.setState({imageURL: url, imageName: file.name},() => {
                    this.props.updateFishImg(this.state.imageName);
                })
            });
        }
    }

    render(){
        return(
            <div
                className={`upload-button-wrapper ${this.state.isUploadButtonVisible ? 'show-button' : 'hide-button'}`}
                onMouseEnter={ () => { this.setState({isUploadButtonVisible: true}) } }
                onMouseLeave={ () => { this.setState({isUploadButtonVisible: false}) } }
            >
                <input
                    type="file"
                    name="pic"
                    id={this.props.inputId}
                    className="inputfile"
                    accept="image/*"
                    onChange={ e => this.handleImageChange(e) }
                />
                <label htmlFor={this.props.inputId}>
                    <figure>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
                        </svg>
                    </figure>
                    <span></span>
                </label>
            </div>
        );
    };
};

export default UploadButton;