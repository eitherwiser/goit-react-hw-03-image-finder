import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar.jsx';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import Modal from './components/Modal/Modal.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './App.css';

export default class App extends Component {
  state = {
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
  };

  closeModal = () => {
    this.setState(() => ({ currentImage: null }));
  };

  render() {
    const { currentImage, searchQuery } = this.state;
    return (
      <div className="App">
        <ToastContainer position="top-right" autoClose={3000} />
        {currentImage && (
          <Modal currentImage={currentImage} onClose={this.closeModal} />
        )}
        <Searchbar onSearch={this.onSearch} />
        <ImageGallery searchQuery={searchQuery} viewImage={this.viewImage} />
      </div>
    );
  }
}
