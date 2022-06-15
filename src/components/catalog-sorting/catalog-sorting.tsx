import {SortingType, SortingParam, SortingOrder} from '../../const';
import {SyntheticEvent} from 'react';

type PropsType = {
  handleSortingTypeChange: (evt: SyntheticEvent) => void,
  handleOrderChange: (evt: SyntheticEvent) => void,
  sorting: URLSearchParams,
}

function CatalogSorting({handleSortingTypeChange, handleOrderChange, sorting}: PropsType): JSX.Element {
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          onClick={handleSortingTypeChange}
          id={SortingType.Price}
          className={`catalog-sort__type-button ${sorting.get(SortingParam.SortType) === SortingType.Price && 'catalog-sort__type-button--active'}`}
          aria-label="по цене"
        >
          по цене
        </button>
        <button
          onClick={handleSortingTypeChange}
          id={SortingType.Rating}
          className={`catalog-sort__type-button ${sorting.get(SortingParam.SortType) === SortingType.Rating && 'catalog-sort__type-button--active'}`}
          aria-label="по популярности"
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          onClick={handleOrderChange}
          id={SortingOrder.Ascendant}
          className={`catalog-sort__order-button catalog-sort__order-button--up ${sorting.get(SortingParam.Order) === SortingOrder.Ascendant && 'catalog-sort__order-button--active'}`}
          aria-label="По возрастанию"
        />
        <button
          onClick={handleOrderChange}
          id={SortingOrder.Descendant}
          className={`catalog-sort__order-button catalog-sort__order-button--down ${sorting.get(SortingParam.Order) === SortingOrder.Descendant && 'catalog-sort__order-button--active'}`}
          aria-label="По убыванию"
        />
      </div>
    </div>
  );
}

export default CatalogSorting;
