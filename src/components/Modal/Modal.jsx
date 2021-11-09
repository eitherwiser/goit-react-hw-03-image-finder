import React from 'react'

const Modal = ({ currentImage, btnClose }) => {
  const { largeImageURL, tags } = currentImage;

  return (
    <div className="Overlay"
      onClick={(e) => {
      if (e.target.nodeName !== 'IMG') {
        return btnClose()
      }
      console.log(e.target.nodeName)
      }}
    >
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
        <button onClick={btnClose}>close</button>
      </div>
    </div>
  )
}

export default Modal;
