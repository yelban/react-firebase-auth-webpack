/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppProvider } from './AppContext';
import About from './Components/About';
import Home from './Components/Home';
import { auth, signInDb, signOutDb } from './Utils/firebase';

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

	const handleBtnLogin = () => {
		console.log('handleBtnLogin()');

		signInDb();
	};

	const handleBtnLogout = async () => {
		console.log('handleBtnLogout()');

		setCurrentUser(null);

		await signOutDb();

		if (window.sessionStorage.getItem('pending')) {
			window.sessionStorage.removeItem('pending');
		}

		// ***** page reload *****
		setTimeout(() => {
			window.location.reload();
		}, 500);
	};

	// App / AppContext / [ About / Home ]
	// [ About / Home ] -> AppContext -> App
	useEffect(() => {
		console.log('useEffect(,[]) <App>');

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			console.log('onAuthStateChanged()', currentUser);

			if (user) {
				window.sessionStorage.removeItem('pending');

				setCurrentUser(user);
			} else {
				console.log('not login');
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		console.log('useEffect(,[currentUser]) <App>', currentUser);
	}, [currentUser]);

	return (
		<div className='app p-5'>
			<h1 className='pb-5 text-5xl text-pink-800'>web3.js</h1>
			<div>
				{!currentUser && (
					<div>
						<button className='btn' type='button' onClick={handleBtnLogin}>
							login {window.sessionStorage.getItem('pending') && '...'}
						</button>
					</div>
				)}
				{currentUser && (
					<div>
						<button className='btn' type='button' onClick={handleBtnLogout}>
							logout
						</button>
					</div>
				)}
			</div>
			<AppProvider value={{ currentUser, setCurrentUser }}>
				<RouterProvider router={router} />
			</AppProvider>
		</div>
	);
}

export default App;
