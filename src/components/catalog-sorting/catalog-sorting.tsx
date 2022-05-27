import {useAppSelector} from '../../hooks/hooks';
import {TAB_INDEX_DEFAULT, TAB_INDEX_HIDDEN} from '../../const';

function CatalogSorting(): JSX.Element {
  const isAddToCartModalOpened = useAppSelector(({MODAL}) => MODAL.isAddToCartModalOpened);
  const isAddReviewModalOpened = useAppSelector(({MODAL}) => MODAL.isAddReviewModalOpened);
  const isReviewSuccessOpened = useAppSelector(({MODAL}) => MODAL.isReviewSuccessOpened);

  const getTabIndex = (): number => isAddToCartModalOpened || isAddReviewModalOpened || isReviewSuccessOpened ? TAB_INDEX_HIDDEN : TAB_INDEX_DEFAULT;

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button tabIndex={getTabIndex()} className="catalog-sort__type-button" aria-label="по цене">по цене</button>
        <button tabIndex={getTabIndex()} className="catalog-sort__type-button" aria-label="по популярности">по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button tabIndex={getTabIndex()} className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию" />
        <button tabIndex={getTabIndex()} className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию" />
      </div>
    </div>
  );
}

export default CatalogSorting;
