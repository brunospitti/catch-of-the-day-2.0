import React from 'react';

import base from '../assets/js/firebase';

import UploadButton from './basic/UploadButton';


class EditFish extends React.Component {
    editFish = e => {
        this.props.editFish(e.currentTarget.name, e.currentTarget.value, this.props.fishIndex);
    }

    updateFishImg = fishToUpdateImg => {
        this.props.editFish('image', `https://firebasestorage.googleapis.com/v0/b/catch-of-the-day-from-scratch.appspot.com/o/images%2F${fishToUpdateImg}?alt=media`, this.props.fishIndex)
    }

    deleteFish = () => {
        base.remove(`stores/${this.props.storeId}/fishes/${this.props.fishIndex}`)
    }

    render(){
        const { name, image, desc, price, status } = this.props.fish;
        return(
            <li className="fish-wrapper dashboard-fish-editor list-group-item">
                <form className="fish-form">
                    <div className="fish-info">
                        <input  className="name"
                                name="name"
                                placeholder="Edit name"
                                value={ name }
                                onChange={this.editFish}>
                        </input>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-11 col-md-5 fish-left">
                                    <UploadButton
                                        updateFishImg={ this.updateFishImg }
                                        inputId="editFishUploadFishImg"
                                    />
                                    <img
                                        className="image"
                                        src={ image }
                                        alt={ name }
                                    />
                                    <select className="status"
                                            name="status"
                                            value={ status }
                                            onChange={this.editFish}
                                    >
                                            <option value="available">available</option>
                                            <option value="unavailable">unavailable</option>
                                    </select>
                                </div>
                                <div className="col-11 col-md-7 fish-right">
                                    <textarea   className="desc"
                                                name="desc"
                                                placeholder="Edit description"
                                                value={ desc }
                                                onChange={this.editFish}>
                                    </textarea>
                                    <input  className="price"
                                            name="price"
                                            type="number"
                                            placeholder="Edit price (in cents)"
                                            value={ price }
                                            onChange={this.editFish}>
                                    </input>
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn btn-red"
                            onClick={ this.deleteFish }
                        >
                            Delete this fish
                        </button>
                    </div>
                </form>
            </li>
        );
    };
};

export default EditFish;