import {SyntheticEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {useNavigate} from 'react-router-dom';
import {fetchGuitarsSearchAction} from '../../store/api-actions';
import {clearGuitarsSearchList, setGuitarsSearchListLoading} from '../../store/guitars-data/guitars-data';
import Loader from '../loader/loader';

function FormSearch(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const guitarsSearchList = useAppSelector(({DATA}) => DATA.guitarsSearchList);
  const isSearchListLoaded = useAppSelector(({DATA}) => DATA.isSearchListLoaded);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchFormRef = useRef<HTMLFormElement | null>(null);

  const [searchText, setSearchText] = useState('');
  const [isSearchListOpened, setSearchListOpened] = useState(false);

  useEffect(() => {
    dispatch(setGuitarsSearchListLoading());
    dispatch(fetchGuitarsSearchAction(searchText));
    document.addEventListener('click', handleSearchListClose);
    return () => {
      dispatch(clearGuitarsSearchList());
      document.removeEventListener('click', handleSearchListClose);
    };
  }, [searchText]);

  const handleSearchListClose = (): void => setSearchListOpened(false);

  const handleSearchListOpen = (): void => setSearchListOpened(true);

  const handleSearchChange = (): void => {
    setSearchListOpened(true);
    setSearchText(String(inputRef.current?.value));
  };

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

  const handleSearchBlur = (): void => setSearchListOpened(false);

  const handleFormReset = (): void => {
    setSearchText('');
    handleSearchListClose();
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
        {guitarsSearchList.map(({name, id}) => <li onKeyDown={handleSearchItemKeypress} onClick={handleSearchItemClick} key={id} id={String(id)} className="form-search__select-item" tabIndex={0}>{name}</li>)}
        {isSearchListLoaded && guitarsSearchList.length === 0 && <li style={{paddingTop: '4px', paddingBottom: '4px', fontSize: '14px', lineHeight: '19px'}}>Ничего не найдено</li>}
        {!isSearchListLoaded && <Loader />}
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
