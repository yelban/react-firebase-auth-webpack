import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';

import AppContext from '../AppContext';

console.log('%c↳ Home.jsx', 'font-family: sans-serif; color:#FF0');

function Home() {
	console.log('%c<Home>', 'color:darkorange');

	const { user, setUser } = useContext(AppContext);

	useEffect(() => {
		console.log('useEffect(,[]) <Home>');
	}, []);

	useEffect(() => {
		console.log('useEffect(,[user]) <Home>', user);
	}, [user]);

	return (
		<div>
			<h1>home</h1>
			<div>
				<Button
					type='button'
					onClick={() => {
						setUser((prev) => {
							return { ...prev, label: 'Home' };
						});
					}}>
					click
				</Button>
			</div>
			<nav>
				<Link to='/about'>About</Link>
			</nav>
		</div>
	);
}

export default Home;
