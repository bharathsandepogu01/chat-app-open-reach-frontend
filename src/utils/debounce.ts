export function debounce(fn: (...args: unknown[]) => unknown, delay: number) {
	let timeOutId: NodeJS.Timeout;

	return function (...args: unknown[]) {
		clearTimeout(timeOutId);

		timeOutId = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
}
