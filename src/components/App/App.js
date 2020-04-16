import React, { Component } from 'react';
import {connect} from 'react-redux';
// import axios from 'axios'


class App extends Component {

  state = {
    url_image: '',
    searchQuery: ''
  }

  handleChange = (event) => {
    this.setState({
      searchQuery: event.target.value
    });

  }

  searchGifs = () => {
    console.log('in searchGifs, searching for', this.state.searchQuery)
    this.props.dispatch({type: 'SEARCH_GIF', payload: this.state.searchQuery})

  }

  render() {
    return (
      <div>
        <h1>Giphy Search!</h1>
 
        <input placeholder="GIF search"onChange={this.handleChange}/>
        <button value={this.state.searchQuery} onClick={this.searchGifs}>search</button>
        {JSON.stringify(this.props.reduxStore.gifListReducer)}
      </div>
    );
  }
  
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(App);
