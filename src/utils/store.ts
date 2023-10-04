import { store } from '@store/index';
import { clearUserDetails } from '@store/userDetailsSlice';

export function clearRootState() {
	const dispatch = store.dispatch;

	dispatch(clearUserDetails());
}
