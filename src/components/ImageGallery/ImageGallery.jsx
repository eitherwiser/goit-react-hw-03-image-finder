import React, { Component } from 'react'
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem.jsx'
import Button from '../Button/Button.jsx'
import Loader from '../Loader/Loader.jsx'

export default class ImageGallery extends Component {

  state = {
    imgGallery: null,
    page: null,
  }

  API_KEY = '23041977-a95e3e3a8961062fc7edd2a7d';
  BASE_URL = `https://pixabay.com/api/?key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;



  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const URL = `${this.BASE_URL}&q=${this.props.searchQuery}&page=${page}`
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ imgGallery: null, page: 1 })
      fetch(URL)
        .then(res => res.json())
        .then(res => this.setState({ imgGallery: res.hits }))
    }
    if (prevState.page !== page && page !== 1) {
      fetch(URL)
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
    const { imgGallery, page} = this.state

    return (
      <>
        {page && !imgGallery  && <Loader />}
        {imgGallery && 
        <ul className="ImageGallery">
            {imgGallery.map(item => <ImageGalleryItem key={item.id} onClick={() => this.viewImage(item.id)} imgSrc={item.webformatURL} tags={item.tags} />)}
        </ul>
        }
        { imgGallery && imgGallery.length === 0 && <h1>Sorry, but is no pictures with tag "{this.props.searchQuery}" there .</h1> }
        {
        // eslint-disable-next-line
          imgGallery && ((imgGallery.length % 12) == false) && imgGallery.length > 11  && <Button onClick={() => this.pageIncrement()} />
        }
      </>
      )
  }
}
