import React, {SyntheticEvent} from 'react';
import {useAppSelector} from '../../hooks';
import {CARDS_BY_PAGE, INITIAL_PAGE} from '../../const';

type PropsType = {
  page: number,
  setPage:  React.Dispatch<React.SetStateAction<number>>,
}

function Pagination({page, setPage}: PropsType): JSX.Element {
  const guitars = useAppSelector((store) => store.guitars);
  const pagesCounter = Math.ceil(guitars.length / CARDS_BY_PAGE);

  const getPaginationButtons = (): JSX.Element[] => {
    const pagesButtons: JSX.Element[] = [];
    for (let i = INITIAL_PAGE; i <= pagesCounter; i++) {
      pagesButtons.push(
        <li key={i} className={`pagination__page ${i === page && 'pagination__page--active'}`}>
          <a onClick={handlePageClick} className="link pagination__page-link" href={`${i}`}>{i}</a>
        </li>);
    }
    return pagesButtons;
  };

  const handlePageClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    setPage(Number(evt.currentTarget.textContent));
  };

  const handlePreviousClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    setPage(page - 1);
  };

  const handleNextClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    setPage(page + 1);
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {page !== INITIAL_PAGE && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <a onClick={handlePreviousClick} className="link pagination__page-link" href="1">Назад</a>
          </li>
        )}

        {getPaginationButtons()}

        {page !== pagesCounter && (
          <li className="pagination__page pagination__page--next" id="next">
            <a onClick={handleNextClick} className="link pagination__page-link" href="2">Далее</a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
