import '../css/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

console.log('%c↳ index.js', 'font-family: sans-serif; color:#FF0');

// production site
ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<App />
	// </React.StrictMode>
);
