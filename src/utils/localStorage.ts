export const setLocalStorage = (key: string, value: string) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
	const storedValue = localStorage.getItem(key);
	return storedValue ? JSON.parse(storedValue) : null;
};

export const removeLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
	localStorage.clear();
};
