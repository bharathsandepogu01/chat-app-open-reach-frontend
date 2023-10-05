export const getDateFormatFromUTC = (utcTimestamp: number) => {
	const dateInUTC = new Date(utcTimestamp);
	return dateInUTC.toLocaleString('en-GB', { dateStyle: 'short' });
};

export const getDiffDaysFromTodayFromUTC = (utcTimestamp: number) => {
	const dateInUTC = new Date(utcTimestamp);
	const todayDateInUTC = new Date();

	const diffInTime = todayDateInUTC.getTime() - dateInUTC.getTime();

	return diffInTime / (1000 * 60 * 60 * 24);
};

export const isTodayTime = (utcTimestamp: number) => {
	const dateInUTC = new Date(utcTimestamp).setHours(0, 0, 0, 0);
	const todayDateInUTC = new Date().setHours(0, 0, 0, 0);

	return dateInUTC === todayDateInUTC;
};

export const isSameTime = (utcTimestamp1: number, utcTimestamp2: number) => {
	const dateInUTC1 = new Date(utcTimestamp1).setSeconds(0, 0);
	const dateInUTC2 = new Date(utcTimestamp2).setSeconds(0, 0);

	return dateInUTC1 === dateInUTC2;
};

export const getIsTimeOfDiffDays = (utcTimestamp1: number, utcTimeStamp2: number) => {
	const dateInUTC = new Date(utcTimestamp1);
	const todayDateInUTC = new Date(utcTimeStamp2);

	return dateInUTC.getDate() === todayDateInUTC.getDate();
};

export const getTimeFormatFromUTC = (utcTimestamp: number) => {
	const dateInUTC = new Date(utcTimestamp);
	return dateInUTC.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

export const getDateDisplayText = (utcTimestamp: number) => {
	const diffDays = getDiffDaysFromTodayFromUTC(utcTimestamp);

	if (diffDays > 2) {
		return getDateFormatFromUTC(utcTimestamp);
	} else if (!isTodayTime(utcTimestamp)) {
		return 'yesterday';
	} else {
		return getTimeFormatFromUTC(utcTimestamp);
	}
};

export const getChatDateDisplayText = (utcTimestamp: number) => {
	const diffDays = getDiffDaysFromTodayFromUTC(utcTimestamp);

	if (diffDays > 2) {
		return getDateFormatFromUTC(utcTimestamp);
	} else if (!isTodayTime(utcTimestamp)) {
		return 'yesterday';
	} else {
		return 'today';
	}
};
