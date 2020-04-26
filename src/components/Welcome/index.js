import React, { Component } from 'react';
import firebase from '../Firestore';
import {withFirebase} from '../Firebase'
import FileUploader from 'react-firebase-file-uploader';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      imageURL: '',
      username: '',
      bio: '',
      progress: 0,
    };
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  handleUploadStart = () => {
    this.setState({ progress: 0 });
  };

  handleUploadSuccess = (filename) => {
    this.setState({
      image: filename,
      progress: 100,
    });

    firebase
      .storage()
      .ref('profile')
      .child(filename)
      .getDownloadURL()
      .then((url) =>
        this.setState({
          imageURL: url,
        }),
      );
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { image, username, bio } = this.state;
    firebase
      .firestore()
      .collection('users')
      .set({
        image,
        username,
        bio,
      })
      .then((docRef) => {
        this.setState({
          image: '',
          username: '',
          bio: '',
        });
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  handleProgress = (progress) => {
    this.setState({
      progress: progress,
    });
  };

  render() {
    const { image, username, bio } = this.state;
    console.log(this.state);
    return (
      <div>
        <h1>Welcome to Restuary</h1>
        <p>
          Before starting to use this app, please fill the fields
          below. <br />
          You will then be able to modify these information in your
          profile panel.
        </p>
        <form onSubmit={this.onSubmit}>
          <label>progress</label>
          <p>{this.state.progress}%</p>

          <label>Image</label>
          {this.state.image && <img src={this.state.imageURL} />}
          {this.state.imageURL && (
            <a href={this.state.imageURL}>Download</a>
          )}
          <FileUploader
            className="DropImg"
            accept="image/*"
            name="image"
            storageRef={firebase.storage().ref('profile')}
            onUploadStart={this.handleUploadStart}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.onChange}
          />
          <textarea
            type="text"
            name="bio"
            value={bio}
            onChange={this.onChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
