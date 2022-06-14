import {SyntheticEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {useAppSelector} from '../../hooks/hooks';
import {Guitar} from '../../types/guitar';
import {useNavigate} from 'react-router-dom';

function FormSearch() {
  const navigate = useNavigate();

  const guitars = useAppSelector(({DATA}) => DATA.guitars);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchFormRef = useRef<HTMLFormElement | null>(null);

  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([] as Guitar[]);
  const [isSearchListOpened, setSearchListOpened] = useState(false);

  useEffect(() => {
    setSearchList(getFilteredSearchList(searchText));
    return () => {
      setSearchList([]);
    };
  }, [searchText]);

  const handleSearchListClose = (): void => {
    setSearchListOpened(false);
    document.removeEventListener('click', handleSearchListClose);
  };

  const handleSearchListOpen = (): void => {
    setSearchListOpened(true);
    document.addEventListener('click', handleSearchListClose);
  };

  const handleSearchChange = (): void => {
    setSearchListOpened(true);
    setSearchText(String(inputRef.current?.value));
  };

  const getFilteredSearchList = (keyword: string): Guitar[] => guitars.slice().filter(({name}) => name.toLowerCase().includes(keyword.toLowerCase()));

  const handleSearchItemClick = (evt: SyntheticEvent): void => {
    searchFormRef.current?.reset();
    handleSearchListClose();
    navigate(`/catalog/item/${evt.currentTarget.id}`);
  };

  const handleSearchItemKeypress = (evt: KeyboardEvent): void => {
    evt.key === 'Enter' && handleSearchItemClick(evt);
  };

  const handleFormSubmit = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    inputRef.current?.focus();
  };

  const handleSearchBlur = (): void => {
    document.removeEventListener('click', handleSearchListClose);
    setSearchListOpened(false);
  };

  const handleFormReset = (): void => {
    handleSearchListClose();
    setSearchText('');
  };

  return (
    <div className="form-search">
      <form ref={searchFormRef} onChange={handleSearchChange} onSubmit={handleFormSubmit} className="form-search__form" id="form-search">
        <button onBlur={handleSearchBlur} className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search" />
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input onFocus={handleSearchListOpen} ref={inputRef} className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>

      <ul className={`form-search__select-list ${isSearchListOpened && searchText ? 'list-opened' : 'hidden'}`}>
        {searchList.map(({name, id}) => <li onKeyDown={handleSearchItemKeypress} onClick={handleSearchItemClick} key={id} id={String(id)} className="form-search__select-item" tabIndex={0}>{name}</li>)}
        {searchList.length === 0 && <li style={{paddingTop: '4px', paddingBottom: '4px', fontSize: '14px', lineHeight: '19px'}}>Ничего не найдено</li>}
      </ul>

      <button onBlur={handleSearchBlur} onClick={handleFormReset} className="form-search__reset" type="reset" form="form-search">
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default FormSearch;