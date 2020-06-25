import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import firebase from '../Firestore';
import { storage } from '../Firestore';
import FileUploader from 'react-firebase-file-uploader';
import upload from '../../assets/img/upload.gif';
import { GoPlus } from 'react-icons/go';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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
      imageURL: '',
      progress: 0,
    };
  }


componentDidMount(){
console.log('mounted')
const db = firebase.firestore();
db.collection('users')
  .get()
  .then((snapshot) => {
    const users = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      users.push(data);
    });
    this.setState({ users: users });
  })
  .catch((error) => console.log(error));
}


  //Change for texte
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //Send image
  handleUploadStart = () => {
    this.setState({
      progress: 0,
    });
  };

  handleUploadSuccess = (filename) => {
    this.setState({
      image: filename,
      progress: 100,
    });
    firebase
      .storage()
      .ref('test')
      .child(filename)
      .getDownloadURL()
      .then((url) =>
        this.setState({
          imageURL: url,
        }),
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
      imageURL: this.state.imageURL,
      name: this.state.name,
      country: this.state.country,
      continent: this.state.continent,
      description: this.state.description,
    });
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
          This is your turn to contribute to this community and add
          your best spot ! <br />
          Please ensure you fill all the fields to make easier to
          others to find your post.
        </p>
        <form onSubmit={this.onSubmit}>
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
          <div className="block">
            <label>Add a picture</label>

            <FileUploader
              accept="mage/*"
              name="image"
              storageRef={firebase.storage().ref('test')}
              onUploadStart={this.onUploadStart}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>

          <div className="block image">
            {this.state.image && <img src={this.state.imageURL} />}
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
