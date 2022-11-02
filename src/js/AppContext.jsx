import React, { createContext, useEffect, useMemo, useState } from 'react';

console.log('%c↳ AppContext.jsx', 'font-family: sans-serif; color:#FF0');

const AppContext = createContext({});

export function AppProvider({ children }) {
	console.log('%c<AppContext>', 'color:darkorange');

	// 初始話 useState 變數
	const [user, setUser] = useState({ id: 0 });
	// const [peers, setPeers] = useState({ id: 0 });

	// 初始化 useMemo 變數，隨時取用不用等 useEffect()
	const ab = useMemo(() => ({ id: 0 }), []);
	// const value = useMemo(() => ({ user, setUser }), [user]);

	useEffect(() => {
		console.log('useEffect(,[]) <AppContext>');

		console.log('user', user);

		console.log('ab', ab);

		// ***** to stay neutral when use react router *****
		// ***** 網頁第一次開啟，還沒有經過路由 *****
		// ***** 可以用來設定初始初始值 *****
		// setUser({ id: null });
		// ab.id = null;
	}, []);

	useEffect(() => {
		console.log('useEffect(,[user]) <AppContext>', user);
	}, [user]);

	// useEffect(() => {
	// 	console.log('useEffect(,[peers]) <AppContext>', peers);
	// }, [peers]);

	// useEffect(() => {
	// 	console.log('useMemo(,[]) <AppContext>', ab);
	// }, [ab]);

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	return <AppContext.Provider value={{ user, setUser, ab }}>{children}</AppContext.Provider>;
}

export default AppContext;
