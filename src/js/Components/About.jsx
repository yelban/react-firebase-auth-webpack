import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// import AppContext from '../AppContext';
import { useAppValue } from '../AppContext';

console.log('%c↳ About.jsx', 'font-family: sans-serif; color:#FF0');

function About() {
	console.log('%c<About>', 'color:darkorange');

	// const { user, setUser } = useContext(AppContext);
	const { currentUser } = useAppValue();

	useEffect(() => {
		console.log('useEffect(,[]) <About>');
	}, []);

	useEffect(() => {
		console.log('useEffect(,[currentUser]) <About>', currentUser);
	}, [currentUser]);

	return (
		<div>
			<h1 className='p-3 text-xl'>about {currentUser && `${currentUser.email}`}</h1>
			<nav>
				<Link className='btn' to='/'>
					Home
				</Link>
			</nav>
		</div>
	);
}

export default About;
