import {SortingType, SearchParam, SortingOrder, AppRoute, INITIAL_PAGE} from '../../const';
import {Dispatch, SetStateAction, SyntheticEvent} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/hooks';
import {setSearchParamsChanged} from '../../store/guitars-data/guitars-data';

type PropsType = {
  setSortingType: Dispatch<SetStateAction<string>>,
  setSortingOrder: Dispatch<SetStateAction<string>>,
}

function CatalogSorting({setSortingType, setSortingOrder}: PropsType): JSX.Element {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSortingTypeChange = (evt: SyntheticEvent): void => {
    dispatch(setSearchParamsChanged());
    setSortingType(evt.currentTarget.id);
    !searchParams.get(SearchParam.SortOrder) && setSortingOrder(SortingOrder.Ascendant);
    navigate(`${AppRoute.Catalog}/page_${INITIAL_PAGE}`);
  };

  const handleOrderChange = (evt: SyntheticEvent): void => {
    dispatch(setSearchParamsChanged());
    setSortingOrder(evt.currentTarget.id);
    !searchParams.get(SearchParam.SortType) && setSortingType(SortingType.Price);
    navigate(`${AppRoute.Catalog}/page_${INITIAL_PAGE}`);
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          onClick={handleSortingTypeChange}
          id={SortingType.Price}
          className={`catalog-sort__type-button ${searchParams.get(SearchParam.SortType) === SortingType.Price && 'catalog-sort__type-button--active'}`}
          aria-label="по цене"
        >
          по цене
        </button>
        <button
          onClick={handleSortingTypeChange}
          id={SortingType.Rating}
          className={`catalog-sort__type-button ${searchParams.get(SearchParam.SortType) === SortingType.Rating && 'catalog-sort__type-button--active'}`}
          aria-label="по популярности"
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          onClick={handleOrderChange}
          id={SortingOrder.Ascendant}
          className={`catalog-sort__order-button catalog-sort__order-button--up ${searchParams.get(SearchParam.SortOrder) === SortingOrder.Ascendant && 'catalog-sort__order-button--active'}`}
          aria-label="По возрастанию"
        />
        <button
          onClick={handleOrderChange}
          id={SortingOrder.Descendant}
          className={`catalog-sort__order-button catalog-sort__order-button--down ${searchParams.get(SearchParam.SortOrder) === SortingOrder.Descendant && 'catalog-sort__order-button--active'}`}
          aria-label="По убыванию"
        />
      </div>
    </div>
  );
}

export default CatalogSorting;
