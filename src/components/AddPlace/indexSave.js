import React, { Component } from 'react';
import firebase from '../Firestore';
import FileUploader from 'react-firebase-file-uploader';
import { GoPlus } from 'react-icons/go';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { compose } from 'recompose';
import axios from 'axios';
import { withAuthorization, withEmailVerification } from '../Session';
import {default as UUID} from "node-uuid";
import Countries  from 'react-select-country';

toast.configure();

const notify = () => {
  toast.success('Place added!', {
    position: toast.POSITION_TOP_RIGHT,
  });
};

export class AddPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      username:this.props.authUser.username,
      name: '',
      country: '',
      continent: '',
      description: '',
      image: '',
      imageURL: '',
      progress: 0,


    };
  }
//uniqueID
  componentWillMount() {
    this.id = UUID.v4();
}

//select countries (react-select-countries)
onSelectCountry = (event) => {
  this.state.selectedCountry={
       id:event.target.value,
       name:event.target.options[event.target.selectedIndex].text,

  }
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

  onSubmit = (event, authUser, place) => {
    event.preventDefault();
    event.target.reset();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });
    const placeRef = db.collection('places').add({
      created: firebase.firestore.Timestamp.now(),
      username: this.state.username,
      image: this.state.image,
      imageURL: this.state.imageURL,
      name: this.state.name,
      country: this.state.country,
      continent: this.state.continent,
      description: this.state.description
    });


    this.setState({
      username: '',
      image: '',
      name: '',
      country: '',
      continent: '',
      description: '',
    });
  };



  render() {
    console.log('props', this.props);
    console.log('I am the ID', this.id)
    console.log(this.state)
    const { posts } = this.state;
    const {
      name,
      country,
      continent,
      description,
      error,
    } = this.state;

    const isInvalid =
      name === '' ||
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
            <label>Add a picture</label>

            <FileUploader
              accept="mage/*"
              name="image"
              storageRef={firebase.storage().ref('test')}
              onUploadStart={this.onUploadStart}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>


        <div className="block hide">
            <label>Username</label>
            <input
              type="text"
              name="username"
              readOnly={true}
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <div className="block">
            <label>Name of the place</label>
            <input
              type="text"
              name="name"
              placeholder="Name of the place"
              onChange={this.onChange}
            />
          </div>

          {/* <div className="block">
            <label>Country</label>
            <input
              type="text"
              name="country"
              placeholder="Country where it is located"
              onChange={this.onChange}
            />
          </div> */}

          <div class="block">
            <label for="country">Country:</label>
            <Countries
            ref="country"
            name="country"
            empty="Select a country"
            onChange={this.onChange} />
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



const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AddPlace);