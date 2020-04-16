import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios'


class App extends Component {

  state = {
    url_image: ''
  }

  componentDidMount() {
    this.getFavorites();
  }

  searchGifs = () => {
    console.log('in searchGifs')
    axios.get('/api/search')
      .then((response) => {
        console.log('response is', response.data)
        this.setState({
          url_image: response.data
        })
      })
      .catch(error => {
        alert('error on get', error);
        console.log(error);
      })
  }

  getFavorites = () => {
    this.props.dispatch({type: 'FETCH_FAVORITE'})
  }

  render() {
    return (
      <>
      <div>
        <h1>Giphy Search!</h1>
        {JSON.stringify(this.props.reduxStore)}
        <button onClick={this.searchGifs}>search</button>
      </div>
      <div>
        <h1>Favorites</h1>
        <ul>
          {this.props.favorite.map(item => (
            <li key={item.id}><img src={item.path}/></li>
          ))}
        </ul>

      </div>
      </>
    );
    
  }
  
}

const mapStateToProps = (reduxStore) => ({
  favorite: reduxStore.favoriteReducer,
})

export default connect(mapStateToProps)(App);
