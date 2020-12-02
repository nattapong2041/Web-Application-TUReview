import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';

import store from './helpers/store';

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

