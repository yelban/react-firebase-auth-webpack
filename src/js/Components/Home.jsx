import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// import AppContext from '../AppContext';
import { useAppValue } from '../AppContext';

console.log('%c↳ Home.jsx', 'font-family: sans-serif; color:#FF0');

function Home() {
	console.log('%c<Home>', 'color:darkorange');

	// const { user, setUser } = useContext(AppContext);
	const { currentUser } = useAppValue();

	useEffect(() => {
		console.log('useEffect(,[]) <Home>');
	}, []);

	useEffect(() => {
		console.log('useEffect(,[currentUser]) <Home>', currentUser);
	}, [currentUser]);

	return (
		<div>
			<h1 className='p-3 text-xl'>Hello {currentUser && `${currentUser.displayName}`}</h1>
			<nav>
				<Link className='btn' to='/about'>
					About
				</Link>
			</nav>
		</div>
	);
}

export default Home;
