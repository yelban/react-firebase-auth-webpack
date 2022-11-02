import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';

import AppContext from '../AppContext';

console.log('%c↳ About.jsx', 'font-family: sans-serif; color:#FF0');

function About() {
	console.log('%c<About>', 'color:darkorange');

	const { user, setUser } = useContext(AppContext);

	useEffect(() => {
		console.log('useEffect(,[]) <About>');
	}, []);

	useEffect(() => {
		console.log('useEffect(,[user]) <About>', user);
	}, [user]);

	return (
		<div>
			<h1>about</h1>
			<div>
				<Button
					type='button'
					onClick={() => {
						setUser((prev) => {
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
