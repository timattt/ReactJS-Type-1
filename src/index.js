import React from 'react';
import thunkMiddleware from 'redux-thunk'
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './other/reportWebVitals';
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./store/reducers/root-reducer";
import {Provider} from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducer, applyMiddleware(
    thunkMiddleware
))

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
