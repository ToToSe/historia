import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

var script = document.createElement('script');
script.onload = function () {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
};
script.src = 'https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js';

document.head.appendChild(script); //or something of the likes


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// window.addEventListener("message", (event) => {
//   var data = event.data;
//   console.log('message', data)
// }, false)

// setTimeout(() => {
//   document.getElementById('wikipedia').contentDocument.addEventListener('scroll', () => {

//   })
// }, 1000)