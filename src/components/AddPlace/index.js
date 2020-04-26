import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import firebase from '../Firestore';
import { storage } from '../Firestore';
import FileUploader from 'react-firebase-file-uploader';
import upload from '../../assets/img/upload.gif';
import { GoPlus } from 'react-icons/go';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const notify = () => {
  toast.success('Place added!', {
    position: toast.POSITION_TOP_RIGHT,
  });
};

export default class AddPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      country: '',
      continent: '',
      description: '',
      image: '',
      imageURL: ''
    };
  }

  //Change for texte
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //Send image
  handleUploadSuccess = filename => {
    this.setState(
      {
        image: filename,
      },
      () => {
        console.log('hello', this.state);
        firebase
          .storage()
          .ref('images')
          .child(filename)
          .getDownloadURL()
          .then(url =>
            this.setState({
              imageURL: url,
            }),
          );
      },
    );
  };

  //Send texte

  onSubmit = (event, authUser) => {
    event.preventDefault();
    event.target.reset();

    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });
    const placeRef = db.collection('places').add({
      image: this.state.image,
      name: this.state.name,
      country: this.state.country,
      continent: this.state.continent,
      description: this.state.description,
    },{merge: true}
    );
    this.setState({
      image: '',
      name: '',
      country: '',
      continent: '',
      description: '',
    });
  };

  render() {
    console.log(this.state);
    const {
      name,
      country,
      continent,
      description,
      error,
    } = this.state;

    const isInvalid =
      name === '' ||
      country === '' ||
      continent === '' ||
      description === '' ||
      name === country ||
      country === continent ||
      name === continent ||
      name === description ||
      country === continent;
    return (
      <div className="addPlaceForm">
        <h1>
          <GoPlus />
          Add a place
        </h1>
        <p>
          this is your turn to contribute to this community and add
          your best spot ! <br />
          Please ensure you fill all the fields to make easier to
          others to find your post.
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="block">
            <label>Add a picture</label>

            <FileUploader
              className="DropImg"
              accept="image/*"
              name="image"
              storageRef={firebase.storage().ref('places')}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
          <br />
          <div className="block">
            <label>Name of the place</label>
            <input
              type="text"
              name="name"
              placeholder="Name of the place"
              onChange={this.onChange}
            />
          </div>
          <div className="block">
            <label>Country</label>
            <input
              type="text"
              name="country"
              placeholder="Country where it is located"
              onChange={this.onChange}
            />
          </div>
          <div className="block">
            <label>Continent</label>
            <input
              type="text"
              name="continent"
              placeholder="Continent"
              onChange={this.onChange}
            />
          </div>
          <div className="block">
            <label className="vertical_align">Description</label>
            <textarea
              type="text"
              name="description"
              placeholder="Description: Add a short description of the place as well as the activities allowed there."
              onChange={this.onChange}
            />
          </div>
          <button disabled={isInvalid} type="submit" onClick={notify}>
            Submit
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}
