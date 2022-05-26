import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSorting from '../catalog-sorting/catalog-sorting';
import Pagination from '../pagination/pagination';
import {useAppDispatch, useAppSelector} from '../../hooks';
import CatalogItem from '../catalog-item/catalog-item';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {AppRoute, CARDS_BY_PAGE} from '../../const';
import {useParams, Navigate} from 'react-router-dom';
import {Guitar} from '../../types/guitar';
import {setAllModalsClosed} from '../../store/modal-view/modal-view';

type PropsType = {
  setCurrentGuitar: Dispatch<SetStateAction<Guitar>>,
}

function Catalog({setCurrentGuitar}: PropsType): JSX.Element {
  const {id} = useParams();
  const [page, setPage] = useState(Number(id));

  const guitars = useAppSelector(({DATA}) => DATA.guitars);
  const isDataLoaded = useAppSelector(({DATA}) => DATA.isDataLoaded);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setPage(Number(id));
    dispatch(setAllModalsClosed());
  }, [id]);

  if (!isDataLoaded) {
    return <p>Loading...</p>;
  }

  if (isDataLoaded && Number(id) > Math.ceil(guitars.length / CARDS_BY_PAGE)) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const startIndex = CARDS_BY_PAGE * (page - 1);
  const endIndex = CARDS_BY_PAGE * page > guitars.length ? guitars.length : CARDS_BY_PAGE * page;
  const guitarsSlice = guitars.slice(startIndex, endIndex);

  return (
    <div className="catalog">

      <CatalogFilter />
      <CatalogSorting />

      <div className="cards catalog__cards">
        {guitarsSlice.map((guitar) => <CatalogItem setCurrentGuitar={setCurrentGuitar} guitar={guitar} key={guitar.id} />)}
      </div>

      <Pagination page={page} setPage={setPage} />

    </div>
  );
}

export default Catalog;
