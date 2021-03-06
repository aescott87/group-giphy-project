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

  componentDidMount() {
    this.getFavorites();
  }

  searchGifs = () => {
    console.log('in searchGifs, searching for', this.state.searchQuery)
    this.props.dispatch({type: 'SEARCH_GIF', payload: this.state.searchQuery})

  }

  getFavorites = () => {
    this.props.dispatch({type: 'FETCH_FAVORITE'})
  }

  favoriteGif = () => {
    console.log('click to favorite');
    this.props.dispatch({type: 'ADD_FAVORITE', payload: this.props.reduxStore.gifListReducer.images.original.url})
  }

  render() {
    return (
      <>
      <div>
        <h1>Giphy Search!</h1>
 
        <input placeholder="GIF search"onChange={this.handleChange}/>
        <button value={this.state.searchQuery} onClick={this.searchGifs}>search</button>
          {this.props.reduxStore.gifListReducer.images && 
          <div>   
            <img src={this.props.reduxStore.gifListReducer.images.original.url}/>
            <button onClick={this.favoriteGif}>Click here to favorite this image</button>
          </div>}
      </div>
      <div>
        <h1>Favorites</h1>
        <ul>
          {this.props.reduxStore.favoriteReducer.map(item => (
            <li key={item.id}><img src={item.path}/></li>
          ))}
        </ul>

      </div>
      </>
    );
    
  }
  
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
  
})

export default connect(mapStateToProps)(App);
