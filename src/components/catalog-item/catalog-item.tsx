import {Guitar} from '../../types/guitar';
import {Link} from 'react-router-dom';
import {AppRoute, TAB_INDEX_DEFAULT, TAB_INDEX_HIDDEN} from '../../const';
import {getRatingStars, getRatingText} from '../../utils';
import {Dispatch, SetStateAction, SyntheticEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setAddToCartModalOpened} from '../../store/modal-view/modal-view';

type PropsType = {
  guitar: Guitar,
  setCurrentGuitar: Dispatch<SetStateAction<Guitar>>,
}

function CatalogItem({guitar, setCurrentGuitar}: PropsType): JSX.Element {
  const dispatch = useAppDispatch();

  const isAddToCartModalOpened = useAppSelector(({MODAL}) => MODAL.isAddToCartModalOpened);
  const isAddReviewModalOpened = useAppSelector(({MODAL}) => MODAL.isAddReviewModalOpened);
  const isReviewSuccessOpened = useAppSelector(({MODAL}) => MODAL.isReviewSuccessOpened);

  const getTabIndex = (): number => isAddToCartModalOpened || isAddReviewModalOpened || isReviewSuccessOpened ? TAB_INDEX_HIDDEN : TAB_INDEX_DEFAULT;

  const handleBuyClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    setCurrentGuitar(guitar);
    dispatch(setAddToCartModalOpened(true));
  };

  return (
    <div className="product-card">
      <img src={`/${guitar.previewImg}`} width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {getRatingStars(guitar.rating)}
          <p className="visually-hidden">Рейтинг: {getRatingText(guitar.rating)}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{guitar.rating}
          </p>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{guitar.price}&nbsp;₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link tabIndex={getTabIndex()} to={`${AppRoute.Catalog}/item/${guitar.id}`} className="button button--mini">Подробнее</Link>
        <Link tabIndex={getTabIndex()} onClick={handleBuyClick} to={'/'} className="button button--red button--mini button--add-to-cart">Купить</Link>
      </div>
    </div>
  );
}

export default CatalogItem;
