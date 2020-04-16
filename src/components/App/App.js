import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios'


class App extends Component {

  state = {
    url_image: ''
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

  render() {
    return (
      <div>
        <h1>Giphy Search!</h1>
        {JSON.stringify(this.props.reduxStore)}
        <button onClick={this.searchGifs}>search</button>
      </div>
    );
  }
  
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(App);
