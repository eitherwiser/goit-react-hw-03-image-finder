import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Searchbar from './components/Searchbar/Searchbar.jsx';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import Modal from './components/Modal/Modal.jsx';

import './App.css';

export default class App extends Component {
  state = {
    loading: false,
    currentImage: null,
    searchQuery: '',
  };

  onSearch = query => {
    if (this.setState.searchQuery !== query) {
      this.setState({ searchQuery: query });
    }
  };

  viewImage = obj => {
    this.setState({ currentImage: { ...obj } });
    console.log(this.state.currentImage);
  };

  render() {
    return (
      <div className="App">
        {/*{this.state.currentImage && console.log(this.currentImage.largeImageURL)}*/}
        <ToastContainer position="top-right" autoClose={3000} />
        <Searchbar onSearch={this.onSearch} />
        {this.state.loading && <h1>PLEASE WAIT...</h1>}
        <ImageGallery
          searchQuery={this.state.searchQuery}
          viewImage={this.viewImage}
        />
      </div>
    );
  }
}

{
  /*<Modal imgRef={this.currentImage.largeImageURL} tags={this.currentImage.tags}*/
}
