import React, { Component } from 'react'

import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa'



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
      toast.error('Type your wuery!');
      return
    };
    this.props.onSearch(this.state.query.toLowerCase());
    e.preventDefault();
    this.setState({query: ''})
  }
    

  
  render() {
  
    return (
      <header className="Searchbar">
        <form className="SearchForm">
          <button onClick={this.onSubmit} className="SearchForm-button">
            <FaSearch />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={(e) => this.onChange(e)}
            value={this.state.query}
          />
        </form>
      </header>
    )
  }
}