import { SocketContext } from '@components/SocketProvider';
import React from 'react';

function useSocketContext() {
	const context = React.useContext(SocketContext);
	return context;
}

export default useSocketContext;
