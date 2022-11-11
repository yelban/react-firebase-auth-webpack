/* eslint-disable import/prefer-default-export */

import { initializeApp } from 'firebase/app';
import { browserPopupRedirectResolver, getAuth, GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth';

import firebaseConfig from './firebase-config';

console.log('%c firebase.js', 'color:#BB0');

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
auth.useDeviceLanguage();

export const signOutDb = async () => {
	console.log('Ⓐ signOutDb()');

	await signOut(auth);

	return true;
};

export const signInDb = async () => {
	console.log('Ⓐ signInDb()');

	// ***** late in onAuthStateChanged() *****
	// ***** use to hint button is loading *****
	window.sessionStorage.setItem('pending', 1);

	// Sign in using a redirect.
	const provider = new GoogleAuthProvider();

	// You can add additional scopes to the provider:
	// provider.addScope('user_birthday');

	// Start a sign in process for an unauthenticated user.
	await signInWithRedirect(auth, provider, browserPopupRedirectResolver);
};
