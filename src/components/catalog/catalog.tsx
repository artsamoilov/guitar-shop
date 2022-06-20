import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSorting from '../catalog-sorting/catalog-sorting';
import Pagination from '../pagination/pagination';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import CatalogItem from '../catalog-item/catalog-item';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {AppRoute, CARDS_BY_PAGE, SortingOrder, SearchParam, SortingType} from '../../const';
import {useParams, Navigate, useSearchParams} from 'react-router-dom';
import {Guitar} from '../../types/guitar';
import {setAllModalsClosed} from '../../store/modal-view/modal-view';
import Loader from '../loader/loader';
import * as queryString from 'querystring';

type PropsType = {
  setCurrentGuitar: Dispatch<SetStateAction<Guitar>>,
}

type SearchParamsType = {
  [SearchParam.SortType]?: string,
  [SearchParam.SortOrder]?: string,
  [SearchParam.PriceFrom]?: string,
  [SearchParam.PriceTo]?: string,
  [SearchParam.Type]?: string,
  [SearchParam.Strings]?: string,
}

function Catalog({setCurrentGuitar}: PropsType): JSX.Element {
  const {id} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(id));
  const [sortingType, setSortingType] = useState(searchParams.get(SearchParam.SortType) || '');
  const [sortingOrder, setSortingOrder] = useState(searchParams.get(SearchParam.SortOrder) || '');
  const [priceFrom, setPriceFrom] = useState(searchParams.get(SearchParam.PriceFrom) || '');
  const [priceTo, setPriceTo] = useState(searchParams.get(SearchParam.PriceTo) || '');
  const [guitarType, setGuitarType] = useState(searchParams.get(SearchParam.Type) || '');
  const [stringsNumber, setStringsNumber] = useState(searchParams.get(SearchParam.Strings) || '');

  const guitars = useAppSelector(({DATA}) => DATA.guitars);
  const isDataLoaded = useAppSelector(({DATA}) => DATA.isDataLoaded);

  const dispatch = useAppDispatch();

  const startIndex = CARDS_BY_PAGE * (page - 1);
  const endIndex = CARDS_BY_PAGE * page > guitars.length ? guitars.length : CARDS_BY_PAGE * page;

  useEffect(() => {
    setPage(Number(id));
    dispatch(setAllModalsClosed());

    const searchParameters: SearchParamsType = {};

    sortingType && (searchParameters[SearchParam.SortType] = sortingType);
    sortingOrder && (searchParameters[SearchParam.SortOrder] = sortingOrder);
    priceFrom && (searchParameters[SearchParam.PriceFrom] = priceFrom);
    priceTo && (searchParameters[SearchParam.PriceTo] = priceTo);
    guitarType && (searchParameters[SearchParam.Type] = guitarType);
    stringsNumber && (searchParameters[SearchParam.Strings] = stringsNumber);

    setSearchParams(queryString.stringify(searchParameters));

  }, [isDataLoaded, id, dispatch, setSearchParams, sortingType, sortingOrder, priceFrom, priceTo, guitarType, stringsNumber]);

  useEffect(() => {
    setPage(1);
  }, [priceFrom, priceTo, guitarType, stringsNumber]);

  if (!isDataLoaded) {
    return <Loader />;
  }

  if (isDataLoaded && Number(id) > Math.ceil(guitars.length / CARDS_BY_PAGE)) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const getFilteredGuitars = (): Guitar[] => guitars.slice().filter((guitar) => {
    const isPriceFromCorrect = priceFrom !== '' ? guitar.price >= Number(priceFrom) : true;
    const isPriceToCorrect = priceTo !== '' ? guitar.price <= Number(priceTo) : true;
    const isTypeCorrect = guitarType !== '' ? guitarType.includes(guitar.type) : true;
    const isStringsNumberCorrect = stringsNumber !== '' ? stringsNumber.includes(String(guitar.stringCount)) : true;
    return isPriceFromCorrect && isPriceToCorrect && isTypeCorrect && isStringsNumberCorrect;
  });

  const getSortedGuitars = (): Guitar[] => {
    switch (sortingType) {
      case SortingType.Price:
        if (sortingOrder === SortingOrder.Ascendant) {
          return getFilteredGuitars().sort((guitarA, guitarB) => guitarA.price - guitarB.price);
        }
        return getFilteredGuitars().sort((guitarA, guitarB) => guitarB.price - guitarA.price);
      case SortingType.Rating:
        if (sortingOrder === SortingOrder.Ascendant) {
          return getFilteredGuitars().sort((guitarA, guitarB) => guitarA.comments.length - guitarB.comments.length);
        }
        return getFilteredGuitars().sort((guitarA, guitarB) => guitarB.comments.length - guitarA.comments.length);
      default:
        return getFilteredGuitars();
    }
  };

  const slicedGuitars = getSortedGuitars().slice(startIndex, endIndex);

  return (
    <div className="catalog">

      <CatalogFilter
        setPriceFrom={setPriceFrom}
        setPriceTo={setPriceTo}
        guitarType={guitarType}
        setGuitarType={setGuitarType}
        stringsNumber={stringsNumber}
        setStringsNumber={setStringsNumber}
      />

      <CatalogSorting
        setSortingType={setSortingType}
        setSortingOrder={setSortingOrder}
      />

      <div className="cards catalog__cards">
        {slicedGuitars.map((guitar) => <CatalogItem setCurrentGuitar={setCurrentGuitar} guitar={guitar} key={guitar.id} />)}
      </div>

      <Pagination page={page} setPage={setPage} guitars={getFilteredGuitars()} />

    </div>
  );
}

export default Catalog;
