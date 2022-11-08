import React, { createContext, useContext } from 'react';

console.log('%c↳ AppContext.jsx', 'font-family: sans-serif; color:#FF0');

const AppContext = createContext({});

export function AppProvider({ children, value }) {
	console.log('%c<AppContext>', 'color:darkorange');

	// // 初始話 useState 變數
	// const [user, setUser] = useState({ id: 0 });
	// // const [peers, setPeers] = useState({ id: 0 });

	// // 初始化 useMemo 變數，隨時取用不用等 useEffect()
	// const ab = useMemo(() => ({ id: 0 }), []);
	// // const value = useMemo(() => ({ user, setUser }), [user]);

	// useEffect(() => {
	// 	console.log('useEffect(,[]) <AppContext>');

	// 	// ***** to stay neutral when use react router *****
	// 	// ***** 網頁第一次開啟，還沒有經過路由 *****
	// 	// ***** 可以用來設定初始初始值 *****
	// 	// setUser({ id: null });
	// 	// ab.id = null;
	// }, []);

	// useEffect(() => {
	// 	console.log('useEffect(,[user]) <AppContext>', user);
	// }, [user]);

	// useEffect(() => {
	// 	console.log('useEffect(,[ab]) <AppContext>', ab);
	// }, [ab]);

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// export default AppContext;
export function useAppValue() {
	return useContext(AppContext);
}
