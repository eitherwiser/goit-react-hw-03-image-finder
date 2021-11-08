import React, { Component } from 'react'
//import PropTypes from 'prop-types'


import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Button from '../Button/Button.jsx'

export default class ImageGallery extends Component {

  state = {
    imgGallery: null,
    page: 1,
  }

API_KEY = '23041977-a95e3e3a8961062fc7edd2a7d';
BASE_URL = `https://pixabay.com/api/?key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;



  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ page: 1 })
      fetch(`${this.BASE_URL}&q=${this.props.searchQuery}&page=1`)
        .then(res => res.json())
        .then(res => this.setState({ imgGallery: res.hits }))
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
        fetch(`${this.BASE_URL}&q=${this.props.searchQuery}&page=${page}`)
        .then(res => res.json())
        .then(res => this.setState(prevState => ({ imgGallery: prevState.imgGallery.concat(res.hits) })))
        .finally (() => this.pageScroll())
    }
  }

  pageIncrement = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  }
  

  pageScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  viewImage = (id) => {
    this.props.viewImage(
      this.state.imgGallery.find(item => item.id === id)
    )
  }

  render() {
    return (
      this.state.imgGallery && (
      <>
        <ul className="ImageGallery">
            {this.state.imgGallery.map(item => <ImageGalleryItem key={item.id} onClick={() => this.viewImage(item.id)} imgSrc={item.webformatURL} tags={item.tags} />)}
        </ul>
          <Button onClick={() => this.pageIncrement()}/>
      </>
      )
    )
  }

}


