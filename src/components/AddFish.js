import React from 'react';

import base from '../assets/js/firebase';

import UploadButton from './basic/UploadButton';

class AddFish extends React.Component {

    state = {
        newFish: {
            name: '',
            image: 'https://firebasestorage.googleapis.com/v0/b/catch-of-the-day-from-scratch.appspot.com/o/images%2FfishImgPlaceholder.jpg?alt=media&token=aae56322-6b8e-400a-b154-1af7746973f8',
            desc: '',
            price: '',
            status: 'available'
        }
    }

    addFishInput = e => {
        const inputName = e.currentTarget.name;
        const inputValue = e.currentTarget.value;
        const newFish = {...this.state.newFish};
        newFish[inputName] = inputValue;
        this.setState({ newFish });
    }

    addFish = () => {
        const newFish = {...this.state.newFish};
        if(newFish.name && newFish.image && newFish.price){
            base.push(`stores/${this.props.storeId}/fishes/`, {
                data: newFish
            })
            this.setState({
                newFish: {  name: '',
                            image: 'https://firebasestorage.googleapis.com/v0/b/catch-of-the-day-from-scratch.appspot.com/o/images%2FfishImgPlaceholder.jpg?alt=media&token=aae56322-6b8e-400a-b154-1af7746973f8',
                            desc: '',
                            price: '',
                            status: 'available'
                        }
            });
        } else {
            alert('gimme some fish info');
        }
        
    }

    addFishImg = fishToUpdateImg => {
        const newFish = {...this.state.newFish};
        newFish.image = `https://firebasestorage.googleapis.com/v0/b/catch-of-the-day-from-scratch.appspot.com/o/images%2F${fishToUpdateImg}?alt=media`;
        this.setState({ newFish });
    }

    render(){
        const { name, image, desc, price, status } = this.state.newFish;
        return(
            <li className="fish-wrapper dashboard-fish-editor list-group-item">
                <form className="fish-form">
                    <div className="fish-info">
                        <input  className="name"
                                name="name"
                                placeholder="Name new fish"
                                value={ name }
                                onChange={this.addFishInput}>
                        </input>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-11 col-md-5 fish-left">
                                    <UploadButton
                                        updateFishImg={ this.addFishImg }
                                        inputId="addFishUploadFishImg"
                                    />
                                    <img
                                        className="image"
                                        src={ image }
                                        alt={ name }
                                    />
                                    <select className="status"
                                            name="status"
                                            value={ status }
                                            onChange={this.addFishInput}
                                    >
                                            <option value="available">available</option>
                                            <option value="unavailable">unavailable</option>
                                    </select>
                                </div>
                                <div className="col-11 col-md-7 fish-right">
                                    <textarea   className="desc"
                                                name="desc"
                                                placeholder="Description of the new fish"
                                                value={ desc }
                                                onChange={this.addFishInput}>
                                    </textarea>
                                    <input  className="price"
                                            name="price"
                                            type="number"
                                            placeholder="Price (in cents)"
                                            value={ price }
                                            onChange={this.addFishInput}>
                                    </input>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-red add-fish-button"
                            onClick={ this.addFish }
                        >
                            Add fish
                        </button>
                    </div>
                </form>
            </li>
        );
    };
};

export default AddFish;