import React, { Component } from 'react';
import {connect} from 'react-redux';


class App extends Component {

  render() {
    return (
      <div>
        <h1>Giphy Search!</h1>
        {JSON.stringify(this.props.reduxStore)}
      </div>
    );
  }
  
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(App);
