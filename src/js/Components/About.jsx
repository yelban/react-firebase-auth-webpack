import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';

// import AppContext from '../AppContext';
import { useAppValue } from '../AppContext';

console.log('%c↳ About.jsx', 'font-family: sans-serif; color:#FF0');

function About() {
	console.log('%c<About>', 'color:darkorange');

	// const { user, setUser } = useContext(AppContext);
	const { currentUser, setCurrentUser } = useAppValue();
	console.log('currentUser', currentUser);

	useEffect(() => {
		console.log('useEffect(,[]) <About>');
	}, []);

	useEffect(() => {
		console.log('useEffect(,[currentUser]) <About>', currentUser);
	}, [currentUser]);

	return (
		<div>
			<h1>about</h1>
			<div>
				<Button
					type='button'
					onClick={() => {
						setCurrentUser((prev) => {
							return { ...prev, label: 'About' };
						});
					}}>
					click
				</Button>
			</div>
			<nav>
				<Link to='/'>Home</Link>
			</nav>
		</div>
	);
}

export default About;
