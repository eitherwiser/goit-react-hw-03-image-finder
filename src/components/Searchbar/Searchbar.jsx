import React, { Component } from 'react'

import { FaSearch } from 'react-icons/fa'

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { ReactComponent as Logo } from '../../icons/logo.svg'



export default class Searchbar extends Component {

  state = {
    query: ''
  }

  onChange= (e) => {
    const { value } = e.currentTarget;
    this.setState({ query: value })
  }

  onSubmit = (e) => {
    if(this.state.query.trim() === '') {
      toast.error('Type your query!');
      this.setState({ query: '' })
      e.preventDefault();
      return
    };
    e.preventDefault();
    this.props.onSearch(this.state.query.toLowerCase());
    this.setState({query: ''})
  }
    

  
  render() {
  
    return (
      <header className="Searchbar">
        <a href="https://pixabay.com/">
          <Logo className="logo" />
        </a>
        <form
          className="SearchForm"
          onKeyDown={
            (e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                this.onSubmit(e);
                }
              }}
        >
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={(e) => this.onChange(e)}
            value={this.state.query}
          />
          <button onClick={this.onSubmit} className="SearchForm-button" type="button">
            <FaSearch />
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </header>
    )
  }
}