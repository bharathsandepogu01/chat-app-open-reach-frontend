import React from 'react';
import SearchIcon from '@public/icons/search-icon.svg';
import CancelIcon from '@public/icons/cancel-icon.svg';
import ArrowIcon from '@public/icons/arrow-icon.svg';
import classes from './styles.module.scss';
import { debounce } from '@utils/debounce';
import ISearchProps from './types';

function SearchBar(props: ISearchProps) {
	const [searchText, setSearchText] = React.useState<string>('');
	const [showBackIcon, setShowBackIcon] = React.useState<boolean>(false);
	const inputRef = React.useRef<HTMLInputElement>();

	const debouncedFunc = React.useCallback(debounce(props.onSearch, 300), [props.onSearch]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setShowBackIcon(true);
		setSearchText(e.target.value);
		debouncedFunc(e.target.value);
	};

	const handleSearch = () => {
		inputRef.current.focus();
	};

	const handleCancel = () => {
		setSearchText('');
		inputRef.current.blur();
	};

	const handleBack = () => {
		setSearchText('');
		props.onCancelSearch();
		setShowBackIcon(false);
	};

	return (
		<div role={'searchbox'} aria-label={'search box'} className={classes.searchBar}>
			{!showBackIcon && (
				<button onClick={handleSearch}>
					<SearchIcon className={classes.icon} />
				</button>
			)}
			{showBackIcon && (
				<button onClick={handleBack}>
					<ArrowIcon className={classes.arrowIcon} />
				</button>
			)}
			<input
				ref={inputRef}
				value={searchText}
				onChange={handleInputChange}
				placeholder={'search'}
			/>
			{searchText && (
				<button onClick={handleCancel}>
					<CancelIcon className={classes.icon} />
				</button>
			)}
		</div>
	);
}

export default SearchBar;
