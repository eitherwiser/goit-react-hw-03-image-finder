import { render } from '@testing-library/react';
import React from 'react'

const Modal = (imgRef, tags) => {

  render(
    <div className="Overlay">
      <div className="Modal">
        <img src={imgRef} alt={tags} />
      </div>
    </div>
  )
}

export default Modal;
