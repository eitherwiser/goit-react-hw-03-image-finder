import React, { Component } from 'react'
//import PropTypes from 'prop-types'


import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Button from '../Button/Button.jsx'
import Loader from '../Loader/Loader.jsx'

export default class ImageGallery extends Component {

  state = {
    imgGallery: null,
    page: null,
  }

  API_KEY = '23041977-a95e3e3a8961062fc7edd2a7d';
  BASE_URL = `https://pixabay.com/api/?key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;



  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ page: 1, imgGallery: null })
      await fetch(`${this.BASE_URL}&q=${this.props.searchQuery}&page=${page}`)
        .then(res => res.json())
        .then(res => this.setState({ imgGallery: res.hits }))
        .finally()
    }
    if (prevState.page !== page && page !== 1) {
      fetch(`${this.BASE_URL}&q=${this.props.searchQuery}&page=${page}`)
        .then(res => res.json())
        .then(res => this.setState(prevState => ({ imgGallery: prevState.imgGallery.concat(res.hits) })))
        .finally(() => this.pageScroll())
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
    const { imgGallery, page } = this.state

    return (
      <>
        {page && !imgGallery && <Loader />}
        {imgGallery && 
        <ul className="ImageGallery">
            {imgGallery.map(item => <ImageGalleryItem key={item.id} onClick={() => this.viewImage(item.id)} imgSrc={item.webformatURL} tags={item.tags} />)}
        </ul>
        }
        {page && imgGallery && <Button onClick={() => this.pageIncrement()} />}
      </>
      )
  }
}
