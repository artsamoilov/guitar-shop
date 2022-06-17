import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSorting from '../catalog-sorting/catalog-sorting';
import Pagination from '../pagination/pagination';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import CatalogItem from '../catalog-item/catalog-item';
import {Dispatch, SetStateAction, SyntheticEvent, useEffect, useState} from 'react';
import {AppRoute, CARDS_BY_PAGE, SortingOrder, SortingParam, SortingType} from '../../const';
import {useParams, Navigate, useSearchParams} from 'react-router-dom';
import {Guitar} from '../../types/guitar';
import {setAllModalsClosed} from '../../store/modal-view/modal-view';
import Loader from '../loader/loader';

type PropsType = {
  setCurrentGuitar: Dispatch<SetStateAction<Guitar>>,
}

function Catalog({setCurrentGuitar}: PropsType): JSX.Element {
  const {id} = useParams();
  const [sorting, setSorting] = useSearchParams();

  const [page, setPage] = useState(Number(id));
  const [sortingType, setSortingType] = useState(sorting.get(SortingParam.SortType) || '');
  const [sortingOrder, setSortingOrder] = useState(sorting.get(SortingParam.Order) || '');

  const guitars = useAppSelector(({DATA}) => DATA.guitars);
  const isDataLoaded = useAppSelector(({DATA}) => DATA.isDataLoaded);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setPage(Number(id));
    dispatch(setAllModalsClosed());
    if (sortingType !== '' && sortingOrder !== '') {
      setSorting({[SortingParam.SortType]: sortingType, [SortingParam.Order]: sortingOrder});
    }
  }, [id, dispatch]);

  if (!isDataLoaded) {
    return <Loader />;
  }

  if (isDataLoaded && Number(id) > Math.ceil(guitars.length / CARDS_BY_PAGE)) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const startIndex = CARDS_BY_PAGE * (page - 1);
  const endIndex = CARDS_BY_PAGE * page > guitars.length ? guitars.length : CARDS_BY_PAGE * page;

  const handleSortingTypeChange = (evt: SyntheticEvent): void => {
    setSortingType(evt.currentTarget.id);
    !sorting.get(SortingParam.Order) && setSortingOrder(SortingOrder.Ascendant);
    setSorting({[SortingParam.SortType]: evt.currentTarget.id, [SortingParam.Order]: (sortingOrder || SortingOrder.Ascendant)});
  };

  const handleOrderChange = (evt: SyntheticEvent): void => {
    setSortingOrder(evt.currentTarget.id);
    !sorting.get(SortingParam.SortType) && setSortingType(SortingType.Price);
    setSorting({[SortingParam.SortType]: sortingType || SortingType.Price, [SortingParam.Order]: evt.currentTarget.id});
  };

  const getSortedGuitars = (): Guitar[] => {
    switch (sortingType) {
      case SortingType.Price:
        if (sortingOrder === SortingOrder.Ascendant) {
          return guitars.slice().sort((guitarA, guitarB) => guitarA.price - guitarB.price);
        }
        return guitars.slice().sort((guitarA, guitarB) => guitarB.price - guitarA.price);
      case SortingType.Rating:
        if (sortingOrder === SortingOrder.Ascendant) {
          return guitars.slice().sort((guitarA, guitarB) => guitarA.comments.length - guitarB.comments.length);
        }
        return guitars.slice().sort((guitarA, guitarB) => guitarB.comments.length - guitarA.comments.length);
      default:
        return guitars.slice();
    }
  };

  const slicedGuitars = getSortedGuitars().slice(startIndex, endIndex);

  return (
    <div className="catalog">

      <CatalogFilter />
      <CatalogSorting handleSortingTypeChange={handleSortingTypeChange} handleOrderChange={handleOrderChange} sorting={sorting} />

      <div className="cards catalog__cards">
        {slicedGuitars.map((guitar) => <CatalogItem setCurrentGuitar={setCurrentGuitar} guitar={guitar} key={guitar.id} />)}
      </div>

      <Pagination page={page} setPage={setPage} />

    </div>
  );
}

export default Catalog;
