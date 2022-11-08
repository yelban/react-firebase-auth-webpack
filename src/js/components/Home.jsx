import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';

// import AppContext from '../AppContext';
import { useAppValue } from '../AppContext';

console.log('%c↳ Home.jsx', 'font-family: sans-serif; color:#FF0');

function Home() {
	console.log('%c<Home>', 'color:darkorange');

	// const { user, setUser } = useContext(AppContext);
	const { currentUser, setCurrentUser } = useAppValue();
	console.log('currentUser', currentUser);

	useEffect(() => {
		console.log('useEffect(,[]) <Home>');
	}, []);

	useEffect(() => {
		console.log('useEffect(,[currentUser]) <Home>', currentUser);
	}, [currentUser]);

	return (
		<div>
			<h1>home</h1>
			<div>
				<Button
					type='button'
					onClick={() => {
						setCurrentUser((prev) => {
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
