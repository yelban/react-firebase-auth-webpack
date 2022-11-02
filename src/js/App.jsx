import React, { useContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppProvider } from './AppContext';
import About from './components/About';
import Home from './components/Home';

console.log('%c↳ App.jsx', 'font-family: sans-serif; color:#FF0');

const router = createBrowserRouter([
	{
		path: '/', // 首頁
		element: <Home />,
	},
	{
		path: '/about', // 功能頁面
		element: <About />,
	},
]);

function App() {
	console.log('%c<App>', 'color:darkorange');

	// App / AppContext / [ Auth / Wallet ]
	// Auth -> Wallet -> AppContext -> App
	useEffect(() => {
		console.log('useEffect(,[]) <App>');
	}, []);

	return (
		<div className='app p-5'>
			<h1>web3.js</h1>
			<AppProvider>
				<RouterProvider router={router} />
			</AppProvider>
		</div>
	);
}

export default App;
