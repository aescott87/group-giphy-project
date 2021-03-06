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
    yield takeEvery('SEARCH_GIF', searchGifSaga);
    yield takeEvery('FETCH_FAVORITE', getFavoriteSaga);
    yield takeEvery('ADD_FAVORITE', addFavoriteSaga);

}

      

const sagaMiddleware = createSagaMiddleware();

function* addFavoriteSaga( action ) {
    console.log('in add favorite saga', action.payload);
    try {
        yield axios.post('/api/favorite', {
            data: action.payload
        });
    }
    catch(error) {
        console.log('error in add favorite saga', error);
    }
}

function* searchGifSaga( action ) {
    console.log('in search giphy saga', action.payload);
    try { 
        const response = yield axios.get(`/api/search`,{
            params: {
            q: action.payload }});
        console.log('response arriving search saga', response)
        yield put({type: 'LIST_GIF', payload: response.data })

    }
    catch(error){
        console.log('error in search saga', error);
    }
}

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

function* getFavoriteSaga( action ) {
    console.log('in get gif saga');
    try {
        const response = yield axios.get('/api/favorite');
        yield put({type: 'LIST_FAVORITE', payload: response.data})
    }
    catch (error) {
        console.log('error in get gif saga');
    }
}



const gifListReducer = (state = {}, action) => {
    if (action.type === 'LIST_GIF'){
        console.log('in gif list reducer', action.payload);
        return action.payload[0];
    }
    return state
}

const favoriteReducer = (state = [], action) => {
    if (action.type === 'LIST_FAVORITE'){
        console.log('in favorite reducer');
        return action.payload
    }
    return state
}


const reduxStore = createStore(
    combineReducers({
        gifListReducer,
        favoriteReducer,
    }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('react-root'));
