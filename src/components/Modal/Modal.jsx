import { Component } from 'react'

import { BsHeartFill, BsFillEyeFill, BsFillCloudArrowDownFill, BsXLg } from "react-icons/bs"


export default class Modal extends Component  {


componentDidMount () {

  window.addEventListener('keydown', (e) => e.code === 'Escape' &&  this.props.onClose())

}
    

render() {
  
    const { currentImage, onClose } = this.props
    const { largeImageURL, tags, user, userImageURL, pageURL, likes, views, downloads} = currentImage;
  
  return (
      <div className="Overlay"
      onClick={(e) => {
      if (e.target.nodeName !== 'IMG') {
        return onClose()
      }
      console.log(e.target.nodeName)
      }}
    >
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
        <span className="closeBtn textInfo" onClick={onClose}><BsXLg /></span>
        <div className="infoWrapper">
          <a href={pageURL}><img src={userImageURL} className="userAvatar" alt={user} /></a>
          <div className="statistickWrapper">
            <span className="textInfo"> <BsHeartFill/> {likes}</span>
            <span className="textInfo"> <BsFillEyeFill/> {views}</span>
            <span className="textInfo"> <BsFillCloudArrowDownFill /> {downloads}</span>
          </div>   
        </div>
      </div>
    </div>
  )
  }
  }

//example of using OnClick event for Overlay
//and example of using componentDidmount for onKeyDown event, to close Modal by "Escape" key.