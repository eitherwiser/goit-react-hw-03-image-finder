import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';

import Searchbar from './components/Searchbar/Searchbar.jsx';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import Modal from './components/Modal/Modal.jsx';

import './App.css';

export default class App extends Component {
  state = {
    currentImage: null,
    searchQuery: '',
    showModal: false,
  };

  onSearch = query => {
    if (this.setState.searchQuery !== query) {
      this.setState({ searchQuery: query });
    }
  };

  componentDidUpdate(prevState) {
    if (prevState.currentImage !== this.state.currentImage) {
    }
  }

  viewImage = obj => {
    this.setState({ currentImage: { ...obj } });
  };

  //toggleModal = () => {
  //  this.setState(({ showModal }) => ({
  //    showModal: !showModal
  //  }))
  //}

  closeModal = () => {
    this.setState(() => ({ currentImage: null }));
  };

  render() {
    const { currentImage, searchQuery } = this.state;
    return (
      <div className="App">
        {currentImage && (
          <Modal currentImage={currentImage} btnClose={this.closeModal} />
        )}
        <Searchbar onSearch={this.onSearch} />
        <ImageGallery searchQuery={searchQuery} viewImage={this.viewImage} />
      </div>
    );
  }
}
