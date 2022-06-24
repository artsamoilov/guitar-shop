import {FilterGuitarType, FilterStrings, SearchParam} from '../../const';
import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {useAppSelector} from '../../hooks/hooks';
import {getMaxPrice, getMinPrice} from '../../utils';
import {useSearchParams} from 'react-router-dom';

type EventPropsType = {
  target: {
    name: string,
    value: string,
  },
}

type PropsType = {
  setPriceFrom: Dispatch<SetStateAction<string>>,
  setPriceTo: Dispatch<SetStateAction<string>>,
  guitarTypes: string[],
  setGuitarTypes: Dispatch<SetStateAction<string[]>>,
  stringsNumbers: string[],
  setStringsNumbers: Dispatch<SetStateAction<string[]>>,
  setPage: Dispatch<SetStateAction<number>>,
}

function CatalogFilter({setPriceFrom, setPriceTo, guitarTypes, setGuitarTypes, stringsNumbers, setStringsNumbers, setPage}: PropsType): JSX.Element {
  const guitars = useAppSelector(({DATA}) => DATA.guitars);

  const [searchParams] = useSearchParams();

  const acousticRef = useRef<HTMLInputElement | null>(null);
  const electricRef = useRef<HTMLInputElement | null>(null);
  const ukuleleRef = useRef<HTMLInputElement | null>(null);

  const strings4Ref = useRef<HTMLInputElement | null>(null);
  const strings6Ref = useRef<HTMLInputElement | null>(null);
  const strings7Ref = useRef<HTMLInputElement | null>(null);
  const strings12Ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (acousticRef.current && electricRef.current && ukuleleRef.current && strings4Ref.current && strings6Ref.current && strings7Ref.current && strings12Ref.current) {
      strings4Ref.current.disabled = false;
      strings6Ref.current.disabled = false;
      strings7Ref.current.disabled = false;
      strings12Ref.current.disabled = false;

      if (searchParams.has(SearchParam.Strings)) {
        const searchParamStrings = searchParams.getAll(SearchParam.Strings);
        strings4Ref.current.checked = searchParamStrings.includes(FilterStrings.Strings4);
        strings6Ref.current.checked = searchParamStrings.includes(FilterStrings.Strings6);
        strings7Ref.current.checked = searchParamStrings.includes(FilterStrings.Strings7);
        strings12Ref.current.checked = searchParamStrings.includes(FilterStrings.Strings12);
      }

      if (searchParams.has(SearchParam.Type)) {
        const searchParamType = searchParams.getAll(SearchParam.Type);
        acousticRef.current.checked = searchParamType.includes(FilterGuitarType.Acoustic);
        electricRef.current.checked = searchParamType.includes(FilterGuitarType.Electric);
        ukuleleRef.current.checked = searchParamType.includes(FilterGuitarType.Ukulele);

        if (!searchParamType.includes(FilterGuitarType.Acoustic)) {
          stringsNumbers.includes(FilterStrings.Strings12) && handleStringsNumberChange({target: {name: FilterStrings.Strings12, value: ''}});
          strings12Ref.current.checked = false;
          strings12Ref.current.disabled = true;
        }

        if (!searchParamType.includes(FilterGuitarType.Electric) && !searchParamType.includes(FilterGuitarType.Ukulele)) {
          stringsNumbers.includes(FilterStrings.Strings4) && handleStringsNumberChange({target: {name: FilterStrings.Strings4, value: ''}});
          strings4Ref.current.checked = false;
          strings4Ref.current.disabled = true;
        }

        if (!searchParamType.includes(FilterGuitarType.Acoustic) && !searchParamType.includes(FilterGuitarType.Electric)) {
          stringsNumbers.includes(FilterStrings.Strings6) && handleStringsNumberChange({target: {name: FilterStrings.Strings6, value: ''}});
          stringsNumbers.includes(FilterStrings.Strings7) && handleStringsNumberChange({target: {name: FilterStrings.Strings7, value: ''}});
          strings6Ref.current.checked = false;
          strings7Ref.current.checked = false;
          strings6Ref.current.disabled = true;
          strings7Ref.current.disabled = true;
        }
      }
    }
  }, [searchParams]);

  const handlePriceFromChange = (evt: EventPropsType): void => {
    if (evt.target.value) {
      Number(evt.target.value) ? setPriceFrom(evt.target.value) : setPriceFrom(String(getMinPrice(guitars)));
      return;
    }
    setPriceFrom('');
  };

  const handlePriceToChange = (evt: EventPropsType): void => {
    if (evt.target.value) {
      Number(evt.target.value) > getMinPrice(guitars) ? setPriceTo(evt.target.value) : setPriceTo(String(getMinPrice(guitars)));
      return;
    }
    setPriceTo('');
  };

  const handleTypeChange = (evt: EventPropsType): void => {
    if (guitarTypes.includes(evt.target.name)) {
      const newTypeParams = guitarTypes.filter((element) => element !== evt.target.name);
      setGuitarTypes(newTypeParams);
      return;
    }
    guitarTypes.length > 0 ? setGuitarTypes([...guitarTypes, evt.target.name]) : setGuitarTypes([evt.target.name]);
  };

  const handleStringsNumberChange = (evt: EventPropsType): void => {
    const newParam = evt.target.name.split('-')[0];
    if (stringsNumbers.includes(newParam)) {
      const newStringsParams = stringsNumbers.filter((element) => element !== newParam);
      setStringsNumbers(newStringsParams);
      return;
    }
    stringsNumbers.length > 0 ? setStringsNumbers([...stringsNumbers, newParam]) : setStringsNumbers([newParam]);
  };

  const handlePriceFromBlur = (evt: EventPropsType): void => {
    const minPrice = getMinPrice(guitars);
    if (evt.target.value && Number(evt.target.value) < minPrice) {
      evt.target.value = String(minPrice);
      handlePriceFromChange({target: {name: '', value: String(minPrice)}});
    }
  };

  const handlePriceToBlur = (evt: EventPropsType): void => {
    const maxPrice = getMaxPrice(guitars);
    const paramFromPrice = searchParams.get(SearchParam.PriceFrom);
    if (evt.target.value && Number(evt.target.value) > maxPrice) {
      evt.target.value = String(maxPrice);
      handlePriceToChange({target: {name: '', value: String(maxPrice)}});
    }
    if (evt.target.value && paramFromPrice && Number(evt.target.value) < Number(paramFromPrice)) {
      evt.target.value = paramFromPrice;
      handlePriceToChange({target: {name: '', value: paramFromPrice}});
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

  const handleFilterReset = (): void => {
    setPriceFrom('');
    setPriceTo('');
    setGuitarTypes([]);
    setStringsNumbers([]);
  };

  const onFormChange = (): void => setPage(1);

  return (
    <form onChange={onFormChange} className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
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
          <input
            ref={acousticRef}
            onChange={handleTypeChange}
            className="visually-hidden"
            type="checkbox"
            id={FilterGuitarType.Acoustic}
            name={FilterGuitarType.Acoustic}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            ref={electricRef}
            onChange={handleTypeChange}
            className="visually-hidden"
            type="checkbox"
            id={FilterGuitarType.Electric}
            name={FilterGuitarType.Electric}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            ref={ukuleleRef}
            onChange={handleTypeChange}
            className="visually-hidden"
            type="checkbox"
            id={FilterGuitarType.Ukulele}
            name={FilterGuitarType.Ukulele}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            ref={strings4Ref}
            onChange={handleStringsNumberChange}
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            ref={strings6Ref}
            onChange={handleStringsNumberChange}
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            ref={strings7Ref}
            onChange={handleStringsNumberChange}
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            ref={strings12Ref}
            onChange={handleStringsNumberChange}
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button onClick={handleFilterReset} className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

export default CatalogFilter;
