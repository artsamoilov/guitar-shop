import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSorting from '../catalog-sorting/catalog-sorting';
import Pagination from '../pagination/pagination';
import {useAppSelector} from '../../hooks';
import CatalogItem from '../catalog-item/catalog-item';
import {useState} from 'react';
import {AppRoute, CARDS_BY_PAGE} from '../../const';
import {useParams, Navigate} from 'react-router-dom';

function Catalog(): JSX.Element {
  const {id} = useParams();
  const [page, setPage] = useState(Number(id));

  const {guitars, isDataLoaded} = useAppSelector((store) => store);

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
        {guitarsSlice.map((guitar) => <CatalogItem guitar={guitar} key={guitar.id} />)}
      </div>

      <Pagination page={page} setPage={setPage} />

    </div>
  );
}

export default Catalog;
