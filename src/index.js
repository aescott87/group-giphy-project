import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';


function* rootSaga() {
    yield takeEvery('GET_GIF', getGifSaga);
}

const sagaMiddleware = createSagaMiddleware();

function* getGifSaga( action ) {
    console.log('in get gif saga');
    try {
        yield axios.get('/actuallyPutURLHERE');
        yield put({type: 'LIST_GIF'})
    }
    catch (error) {
        console.log('error in get gif saga');
    }
}



const gifListReducer = (state = [], action) => {
    if (action.type === 'LIST_GIF'){
        console.log('in gif list reducer');
    }
    return state
}


const reduxStore = createStore(
    combineReducers({
        gifListReducer,
    }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('react-root'));
