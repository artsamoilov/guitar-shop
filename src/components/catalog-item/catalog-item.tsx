import {Guitar} from '../../types/guitar';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type PropsType = {
  guitar: Guitar,
}

const rates = [1, 2, 3, 4, 5];
const textRates = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

function CatalogItem({guitar}: PropsType): JSX.Element {
  const ratingIndex = Math.floor(guitar.rating) - 1;

  return (
    <div className="product-card">
      <img src={`/${guitar.previewImg}`} width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {rates.map((rate) => (
            <svg key={rate} width="12" height="11" aria-hidden="true">
              <use xlinkHref={`#icon${guitar.rating >= rate ? '-full' : ''}-star`} />
            </svg>
          ))}
          <p className="visually-hidden">Рейтинг: {textRates[ratingIndex]}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{guitar.rating}
          </p>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link to={`${AppRoute.Catalog}/${guitar.id}`} className="button button--mini">Подробнее</Link>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default CatalogItem;
