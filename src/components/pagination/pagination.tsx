import React, {SyntheticEvent} from 'react';
import {useAppSelector} from '../../hooks';
import {AppRoute, CARDS_BY_PAGE, INITIAL_PAGE, TAB_INDEX_DEFAULT, TAB_INDEX_HIDDEN} from '../../const';
import {Link} from 'react-router-dom';

type PropsType = {
  page: number,
  setPage:  React.Dispatch<React.SetStateAction<number>>,
}

function Pagination({page, setPage}: PropsType): JSX.Element {
  const guitars = useAppSelector((store) => store.guitars);
  const isAddToCartModalOpened = useAppSelector((state) => state.isAddToCartModalOpened);
  const isAddReviewModalOpened = useAppSelector((state) => state.isAddReviewModalOpened);
  const isReviewSuccessOpened = useAppSelector((state) => state.isReviewSuccessOpened);

  const getTabIndex = (): number => isAddToCartModalOpened || isAddReviewModalOpened || isReviewSuccessOpened ? TAB_INDEX_HIDDEN : TAB_INDEX_DEFAULT;

  const pagesCounter = Math.ceil(guitars.length / CARDS_BY_PAGE);

  const getPaginationButtons = (): JSX.Element[] => {
    const pagesButtons: JSX.Element[] = [];
    for (let i = INITIAL_PAGE; i <= pagesCounter; i++) {
      pagesButtons.push(
        <li key={i} className={`pagination__page ${i === page && 'pagination__page--active'}`}>
          <Link tabIndex={getTabIndex()} to={`${AppRoute.Catalog}/page_${i}`} onClick={handlePageClick} className="link pagination__page-link">{i}</Link>
        </li>);
    }
    return pagesButtons;
  };

  const handlePageClick = (evt: SyntheticEvent): void => setPage(Number(evt.currentTarget.textContent));

  const handlePreviousClick = (): void => setPage(page - 1);

  const handleNextClick = (): void => setPage(page + 1);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {page !== INITIAL_PAGE && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link tabIndex={getTabIndex()} to={`${AppRoute.Catalog}/page_${page - 1}`} onClick={handlePreviousClick} className="link pagination__page-link">Назад</Link>
          </li>
        )}

        {getPaginationButtons()}

        {page !== pagesCounter && (
          <li className="pagination__page pagination__page--next" id="next">
            <Link tabIndex={getTabIndex()} to={`${AppRoute.Catalog}/page_${page + 1}`} onClick={handleNextClick} className="link pagination__page-link">Далее</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
