import { IUserDetails } from '@store/userDetailsSlice/types';
import {
	INDEXED_DB_MESSAGES_OBJECT_STORE,
	INDEXED_DB_NAME,
	INDEXED_DB_USERS_OBJECT_STORE,
	INDEXED_DB_USER_DETAILS_OBJECT_STORE,
} from './constants';

export const getIndexedDBInstance = (): Promise<IDBDatabase> => {
	return new Promise((res, rej) => {
		const openRequest = indexedDB.open(INDEXED_DB_NAME, 1);

		openRequest.onupgradeneeded = (ev: IDBVersionChangeEvent) => {
			const db = openRequest.result;
			switch (ev.oldVersion) {
				case 0:
					// no database exist
					// perform initialization like object stores and indexing
					db.createObjectStore(INDEXED_DB_USERS_OBJECT_STORE, { keyPath: 'email' });
					db.createObjectStore(INDEXED_DB_MESSAGES_OBJECT_STORE, { keyPath: 'id' });
					db.createObjectStore(INDEXED_DB_USER_DETAILS_OBJECT_STORE, { keyPath: 'email' });
					break;
			}
		};

		openRequest.onerror = () => {
			console.error('indexedDB error', openRequest.error);
			rej('error in opening indexedDB');
		};

		openRequest.onsuccess = () => {
			console.log('indexedDB ready to use');
			res(openRequest.result);
		};
	});
};

export const deleteIndexedDB = () => {
	return new Promise((res, rej) => {
		const deleteRequest = indexedDB.deleteDatabase(INDEXED_DB_NAME);

		deleteRequest.onerror = () => {
			console.error('delete indexedDB error', deleteRequest.error);
			rej('error in deleting indexedDB');
		};

		deleteRequest.onsuccess = () => {
			console.log('deleted indexedDB', deleteRequest.result);
			res('deleted indexedDB');
		};
	});
};

export const resetIndexedDB = (): Promise<string> => {
	return new Promise((res, rej) => {
		async function reset() {
			try {
				const db = (await getIndexedDBInstance()) as IDBDatabase;
				db.deleteObjectStore(INDEXED_DB_USERS_OBJECT_STORE);
				db.deleteObjectStore(INDEXED_DB_MESSAGES_OBJECT_STORE);
				db.deleteObjectStore(INDEXED_DB_USER_DETAILS_OBJECT_STORE);
				res('reset indexedDB done');
			} catch (error) {
				console.error('error in resetting', error);
				rej('error in resetting indexedDB');
			}
		}

		reset();
	});
};

export const addUserDetailsToStore = (userDetails: IUserDetails): Promise<string> => {
	return new Promise((res, rej) => {
		async function addUserDetails() {
			try {
				const db = (await getIndexedDBInstance()) as IDBDatabase;
				const transaction = db.transaction(INDEXED_DB_USER_DETAILS_OBJECT_STORE, 'readwrite');
				const userDetailsStore = transaction.objectStore(INDEXED_DB_USER_DETAILS_OBJECT_STORE);
				const request = userDetailsStore.put(userDetails);

				request.onsuccess = () => {
					console.log('user details add request to the store success', request.result);
					res('user details added to the store');
				};

				request.onerror = () => {
					console.log('Error', request.error);
					rej('error in adding user details to store');
				};
			} catch (error) {
				console.error(error);
				rej(error);
			}
		}

		addUserDetails();
	});
};

export const getUserDetailsFromStore = (userEmail: string): Promise<IUserDetails> => {
	return new Promise((res, rej) => {
		async function getUserDetails() {
			try {
				const db = (await getIndexedDBInstance()) as IDBDatabase;
				const transaction = db.transaction(INDEXED_DB_USER_DETAILS_OBJECT_STORE, 'readonly');
				const userDetailsStore = transaction.objectStore(INDEXED_DB_USER_DETAILS_OBJECT_STORE);
				const request = userDetailsStore.get(userEmail);

				request.onsuccess = () => {
					console.log('user details found in store', request.result);
					res(request.result);
				};

				request.onerror = () => {
					console.log('Error', request.error);
					rej('error in finding user details to store');
				};
			} catch (error) {
				console.error(error);
				rej(error);
			}
		}

		getUserDetails();
	});
};
