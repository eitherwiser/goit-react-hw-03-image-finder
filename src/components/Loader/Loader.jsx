import React, { Component } from 'react'

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class App extends Component {

  render() {
    return (
      <Loader
        type="Puff"
        color="#3f51b5a4"
        height={700}
        width={600}
        timeout={20000}
      />
    );
  }
}