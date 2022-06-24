import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSorting from '../catalog-sorting/catalog-sorting';
import Pagination from '../pagination/pagination';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import CatalogItem from '../catalog-item/catalog-item';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {AppRoute, CARDS_BY_PAGE, SearchParam} from '../../const';
import {useParams, Navigate, useSearchParams} from 'react-router-dom';
import {Guitar} from '../../types/guitar';
import {setAllModalsClosed} from '../../store/modal-view/modal-view';
import Loader from '../loader/loader';
import * as queryString from 'querystring';
import {fetchFilteredGuitarsAction} from '../../store/api-actions';

type PropsType = {
  setCurrentGuitar: Dispatch<SetStateAction<Guitar>>,
}

type SearchParamsType = {
  [SearchParam.SortType]?: string,
  [SearchParam.SortOrder]?: string,
  [SearchParam.PriceFrom]?: string,
  [SearchParam.PriceTo]?: string,
  [SearchParam.Type]?: string[],
  [SearchParam.Strings]?: string[],
}

function Catalog({setCurrentGuitar}: PropsType): JSX.Element {
  const {id} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(id));
  const [sortingType, setSortingType] = useState(searchParams.get(SearchParam.SortType) || '');
  const [sortingOrder, setSortingOrder] = useState(searchParams.get(SearchParam.SortOrder) || '');
  const [priceFrom, setPriceFrom] = useState(searchParams.get(SearchParam.PriceFrom) || '');
  const [priceTo, setPriceTo] = useState(searchParams.get(SearchParam.PriceTo) || '');
  const [guitarTypes, setGuitarTypes] = useState(searchParams.getAll(SearchParam.Type) || []);
  const [stringsNumbers, setStringsNumbers] = useState(searchParams.getAll(SearchParam.Strings) || []);

  const guitars = useAppSelector(({DATA}) => DATA.guitars);
  const isDataLoaded = useAppSelector(({DATA}) => DATA.isDataLoaded);

  const dispatch = useAppDispatch();

  const startIndex = CARDS_BY_PAGE * (page - 1);
  const endIndex = CARDS_BY_PAGE * page > guitars.length ? guitars.length : CARDS_BY_PAGE * page;

  useEffect(() => {
    dispatch(setAllModalsClosed());

    const searchParameters: SearchParamsType = {};

    sortingType && (searchParameters[SearchParam.SortType] = sortingType);
    sortingOrder && (searchParameters[SearchParam.SortOrder] = sortingOrder);
    priceFrom && (searchParameters[SearchParam.PriceFrom] = priceFrom);
    priceTo && (searchParameters[SearchParam.PriceTo] = priceTo);
    guitarTypes.length > 0 && (searchParameters[SearchParam.Type] = guitarTypes);
    stringsNumbers.length > 0 && (searchParameters[SearchParam.Strings] = stringsNumbers);

    setSearchParams(queryString.stringify(searchParameters));
    dispatch(fetchFilteredGuitarsAction(queryString.stringify(searchParameters)));
  }, [isDataLoaded, id, dispatch, setSearchParams, sortingType, sortingOrder, priceFrom, priceTo, guitarTypes, stringsNumbers]);

  if (!isDataLoaded) {
    return <Loader />;
  }

  if (isDataLoaded && Number(page) !== 1 && Number(page) > Math.ceil(guitars.length / CARDS_BY_PAGE)) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const slicedGuitars = guitars.slice(startIndex, endIndex);

  return (
    <div className="catalog">

      <CatalogFilter
        setPriceFrom={setPriceFrom}
        setPriceTo={setPriceTo}
        guitarTypes={guitarTypes}
        setGuitarTypes={setGuitarTypes}
        stringsNumbers={stringsNumbers}
        setStringsNumbers={setStringsNumbers}
        setPage={setPage}
      />

      <CatalogSorting
        setSortingType={setSortingType}
        setSortingOrder={setSortingOrder}
      />

      <div className="cards catalog__cards">
        {slicedGuitars.map((guitar) => <CatalogItem setCurrentGuitar={setCurrentGuitar} guitar={guitar} key={guitar.id} />)}
      </div>

      <Pagination page={page} setPage={setPage} guitars={guitars} />

    </div>
  );
}

export default Catalog;
