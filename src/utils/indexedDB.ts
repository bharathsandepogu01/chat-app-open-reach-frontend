import { IUserDetails } from '@store/userDetailsSlice/types';
import {
	INDEXED_DB_MESSAGES_OBJECT_STORE,
	INDEXED_DB_NAME,
	INDEXED_DB_USER_DETAILS_OBJECT_STORE,
	INDEXED_DB_USER_MESSAGES_INDEX,
} from './constants';
import { IChatDetailsIndexedDB } from '@store/chatListSlice/types';

export const getIndexedDBInstance = (): Promise<IDBDatabase> => {
	return new Promise((res, rej) => {
		const openRequest = indexedDB.open(INDEXED_DB_NAME, 1);

		openRequest.onupgradeneeded = (ev: IDBVersionChangeEvent) => {
			const db = openRequest.result;
			switch (ev.oldVersion) {
				case 0: {
					// no database exist
					// perform initialization like object stores and indexing
					const messages = db.createObjectStore(INDEXED_DB_MESSAGES_OBJECT_STORE, {
						keyPath: 'id',
					});
					messages.createIndex(INDEXED_DB_USER_MESSAGES_INDEX, ['otherUser', 'timestamp']);
					db.createObjectStore(INDEXED_DB_USER_DETAILS_OBJECT_STORE, { keyPath: 'email' });
					break;
				}
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
					console.log('user details found in store');
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

export const getAllUserDetailsFromStore = (): Promise<{ [key: string]: IUserDetails }> => {
	return new Promise((res, rej) => {
		async function getAllUserDetails() {
			try {
				const db = (await getIndexedDBInstance()) as IDBDatabase;
				const transaction = db.transaction(INDEXED_DB_USER_DETAILS_OBJECT_STORE, 'readonly');
				const userDetailsStore = transaction.objectStore(INDEXED_DB_USER_DETAILS_OBJECT_STORE);
				const request = userDetailsStore.openCursor();

				const usersDetailsObj: { [key: string]: IUserDetails } = {};

				request.onsuccess = () => {
					const cursor = request.result;

					if (cursor) {
						const value = cursor.value;
						usersDetailsObj[value.email] = value;
						cursor.continue();
					} else {
						console.log('all users details found in store');
						res(usersDetailsObj);
					}
				};

				request.onerror = () => {
					console.log('Error', request.error);
					rej('error in finding all user details to store');
				};
			} catch (error) {
				console.error(error);
				rej(error);
			}
		}

		getAllUserDetails();
	});
};

export const addMessageToStore = (messageDetails: IChatDetailsIndexedDB): Promise<string> => {
	return new Promise((res, rej) => {
		async function addMessage() {
			try {
				const db = (await getIndexedDBInstance()) as IDBDatabase;
				const transaction = db.transaction(INDEXED_DB_MESSAGES_OBJECT_STORE, 'readwrite');
				const messagesStore = transaction.objectStore(INDEXED_DB_MESSAGES_OBJECT_STORE);
				const request = messagesStore.put(messageDetails);

				request.onsuccess = () => {
					console.log('message add request to the store success', request.result);
					res('message added to the store');
				};

				request.onerror = () => {
					console.log('Error', request.error);
					rej('error in adding message to store');
				};
			} catch (error) {
				console.error(error);
				rej(error);
			}
		}

		addMessage();
	});
};

export const getAllMessagedUsersWithRecentTimeStampFromStore = (): Promise<{
	[key: string]: number;
}> => {
	return new Promise((res, rej) => {
		async function getMessagedUsers() {
			try {
				const db = (await getIndexedDBInstance()) as IDBDatabase;
				const transaction = db.transaction(INDEXED_DB_MESSAGES_OBJECT_STORE, 'readonly');
				const messages = transaction.objectStore(INDEXED_DB_MESSAGES_OBJECT_STORE);
				const usersMessages = messages.index(INDEXED_DB_USER_MESSAGES_INDEX);
				const request = usersMessages.openCursor();

				const usersWithRecentMessageTimestamp: { [key: string]: number } = {};

				request.onsuccess = () => {
					const cursor = request.result;

					if (cursor) {
						const value = cursor.value;
						const userEmail = value.otherUser;

						usersWithRecentMessageTimestamp[userEmail] = value.timestamp;
						cursor.continue();
					} else {
						console.log('messaged users found in store');
						res(usersWithRecentMessageTimestamp);
					}
				};

				request.onerror = () => {
					console.log('Error', request.error);
					rej('error in finding messaged users in store');
				};
			} catch (error) {
				console.error(error);
				rej(error);
			}
		}

		getMessagedUsers();
	});
};

export const getUserMessagesFromStore = (email: string): Promise<IChatDetailsIndexedDB[]> => {
	return new Promise((res, rej) => {
		async function getUserMessages() {
			try {
				const db = (await getIndexedDBInstance()) as IDBDatabase;
				const transaction = db.transaction(INDEXED_DB_MESSAGES_OBJECT_STORE, 'readonly');
				const messages = transaction.objectStore(INDEXED_DB_MESSAGES_OBJECT_STORE);
				const usersMessages = messages.index(INDEXED_DB_USER_MESSAGES_INDEX);
				const request = usersMessages.openCursor(IDBKeyRange.bound([email, 0], [email, Infinity]));

				const usersMessagesArray: IChatDetailsIndexedDB[] = [];

				request.onsuccess = () => {
					const cursor = request.result;

					if (cursor) {
						const value = cursor.value;
						usersMessagesArray.push(value);
						cursor.continue();
					} else {
						console.log('user messages found in store');
						res(usersMessagesArray);
					}
				};

				request.onerror = () => {
					console.log('Error', request.error);
					rej('error in finding user messages in store');
				};
			} catch (error) {
				console.error(error);
				rej(error);
			}
		}

		getUserMessages();
	});
};
