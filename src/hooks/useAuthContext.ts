import React from 'react';
import { AuthContext } from '@components/AuthProvider';

function useAuthContext() {
	const context = React.useContext(AuthContext);
	return context;
}

export default useAuthContext;
