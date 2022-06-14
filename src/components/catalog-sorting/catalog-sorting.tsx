import {useSearchParams} from 'react-router-dom';
import {SortingType, SortingParam, SortingOrder} from '../../const';
import {SyntheticEvent, useState} from 'react';

function CatalogSorting(): JSX.Element {
  const [sorting, setSorting] = useSearchParams();

  const [sortingType, setSortingType] = useState(sorting.get(SortingParam.SortType) || '');
  const [sortingOrder, setSortingOrder] = useState(sorting.get(SortingParam.Order) || '');

  const handleSortingTypeChange = (evt: SyntheticEvent): void => {
    setSortingType(evt.currentTarget.id);
    setSorting({[SortingParam.SortType]: evt.currentTarget.id, [SortingParam.Order]: sortingOrder});
  };

  const handleOrderChange = (evt: SyntheticEvent): void => {
    setSortingOrder(evt.currentTarget.id);
    !sorting.get(SortingParam.SortType) && setSortingType(SortingType.Price);
    setSorting({[SortingParam.SortType]: sortingType, [SortingParam.Order]: evt.currentTarget.id});
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          onClick={handleSortingTypeChange}
          id={SortingType.Price}
          className={`catalog-sort__type-button ${sortingType === SortingType.Price && 'catalog-sort__type-button--active'}`}
          aria-label="по цене"
        >
          по цене
        </button>
        <button
          onClick={handleSortingTypeChange}
          id={SortingType.Rating}
          className={`catalog-sort__type-button ${sortingType === SortingType.Rating && 'catalog-sort__type-button--active'}`}
          aria-label="по популярности"
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          onClick={handleOrderChange}
          id={SortingOrder.Ascendant}
          className={`catalog-sort__order-button catalog-sort__order-button--up ${sortingOrder === SortingOrder.Ascendant && 'catalog-sort__order-button--active'}`}
          aria-label="По возрастанию"
        />
        <button
          onClick={handleOrderChange}
          id={SortingOrder.Descendant}
          className={`catalog-sort__order-button catalog-sort__order-button--down ${sortingOrder === SortingOrder.Descendant && 'catalog-sort__order-button--active'}`}
          aria-label="По убыванию"
        />
      </div>
    </div>
  );
}

export default CatalogSorting;
