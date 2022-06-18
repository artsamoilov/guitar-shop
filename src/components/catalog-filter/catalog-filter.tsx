import {SearchParam} from '../../const';
import {useRef} from 'react';
import {useAppSelector} from '../../hooks/hooks';
import {getMaxPrice, getMinPrice} from '../../utils';

type EventPropsType = {
  target: {
    value: string,
  },
}

type PropsType = {
  handlePriceFromChange: (evt: EventPropsType) => void,
  handlePriceToChange: (evt: EventPropsType) => void,
  searchParams: URLSearchParams,
}

function CatalogFilter({handlePriceFromChange, handlePriceToChange, searchParams}: PropsType): JSX.Element {
  const guitars = useAppSelector(({DATA}) => DATA.guitars);

  const priceFromRef = useRef<HTMLInputElement | null>(null);

  const handlePriceFromBlur = (evt: EventPropsType): void => {
    const minPrice = getMinPrice(guitars);
    if (evt.target.value && Number(evt.target.value) < minPrice) {
      evt.target.value = String(minPrice);
      handlePriceFromChange({target: {value: String(minPrice)}});
    }
  };

  const handlePriceToBlur = (evt: EventPropsType): void => {
    const maxPrice = getMaxPrice(guitars);
    const paramFromPrice = searchParams.get(SearchParam.PriceFrom);
    if (evt.target.value && Number(evt.target.value) > maxPrice) {
      evt.target.value = String(maxPrice);
      handlePriceToChange({target: {value: String(maxPrice)}});
    }
    if (evt.target.value && paramFromPrice && Number(evt.target.value) < Number(paramFromPrice)) {
      evt.target.value = paramFromPrice;
      handlePriceToChange({target: {value: paramFromPrice}});
    }
  };

  const getDefaultPriceFrom = (): string => {
    const paramPrice = searchParams.get(SearchParam.PriceFrom);
    const minPrice = getMinPrice(guitars);
    if (searchParams.get(SearchParam.PriceFrom)) {
      if (Number(paramPrice) < minPrice) {
        return String(minPrice);
      }
      return String(paramPrice);
    }
    return '';
  };

  const getDefaultPriceTo = (): string => {
    const paramPrice = searchParams.get(SearchParam.PriceTo);
    const maxPrice = getMaxPrice(guitars);
    if (paramPrice) {
      if (Number(paramPrice) > maxPrice) {
        return String(maxPrice);
      }
      if (searchParams.get(SearchParam.PriceFrom) && Number(paramPrice) < Number(searchParams.get(SearchParam.PriceFrom))) {
        return String(searchParams.get(SearchParam.PriceFrom));
      }
      return String(paramPrice);
    }
    return '';
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              ref={priceFromRef}
              onChange={handlePriceFromChange}
              onBlur={handlePriceFromBlur}
              defaultValue={getDefaultPriceFrom()}
              type="number"
              placeholder={String(getMinPrice(guitars))}
              min="0"
              id="priceMin"
              name="от"
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              onChange={handlePriceToChange}
              onBlur={handlePriceToBlur}
              defaultValue={getDefaultPriceTo()}
              type="number"
              placeholder={String(getMaxPrice(guitars))}
              min="0"
              id="priceMax"
              name="до"
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric" />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

export default CatalogFilter;
