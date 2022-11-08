import React, { useContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppProvider } from './AppContext';
import About from './Components/About';
import Home from './Components/Home';

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

	const [currentUser, setCurrentUser] = useState(null);

	// App / AppContext / [ Auth / Wallet ]
	// Auth -> Wallet -> AppContext -> App
	useEffect(() => {
		console.log('useEffect(,[]) <App>');

		setCurrentUser({ id: 1 });
	}, []);

	useEffect(() => {
		console.log('useEffect(,[currentUser]) <App>', currentUser);
	}, [currentUser]);

	return (
		<div className='app p-5'>
			<h1>web3.js</h1>
			<AppProvider value={{ currentUser, setCurrentUser }}>
				<RouterProvider router={router} />
			</AppProvider>
		</div>
	);
}

export default App;
