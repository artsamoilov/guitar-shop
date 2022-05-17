import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {useAppSelector} from '../../hooks';
import {Link, useParams} from 'react-router-dom';
import {AppRoute} from '../../const';
import {getRatingStars, getRatingText} from '../../utils';
import ProductTabs from '../../components/product-tabs/product-tabs';
import {Guitar} from '../../types/guitar';

function ProductPage(): JSX.Element {
  const {id} = useParams();
  const guitars = useAppSelector((state) => state.guitars);

  const guitar = guitars.find((item) => item.id === Number(id)) as Guitar;

  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{guitar?.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Main} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to={`${AppRoute.Catalog}/page_1`} className="link">Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">{guitar?.name}</a>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={`/${guitar?.previewImg}`} width="90" height="235" alt={guitar?.name} />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{guitar?.name}</h2>
              <div className="rate product-container__rating">
                {getRatingStars(guitar?.rating || 1)}
                <p className="visually-hidden">Оценка: {getRatingText(guitar?.rating || 1)}</p>
              </div>

              <ProductTabs guitar={guitar} />

            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{guitar?.price} ₽</p>
              <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
            </div>
          </div>
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3>
            <a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, струны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в комплекте нет чехла и ремня.</p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Преображенская Ксения</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и
                ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары
                отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше
                дерево. Тяжелая, в компдлекте неть чехла и ремня.
              </p>
            </div>
            <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
            <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
          </section>
        </div>
      </main>

      <Footer />

    </div>
  );
}

export default ProductPage;
