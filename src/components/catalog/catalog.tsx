import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSorting from '../catalog-sorting/catalog-sorting';
import Pagination from '../pagination/pagination';
import {useAppSelector} from '../../hooks';
import CatalogItem from '../catalog-item/catalog-item';
import {useState} from 'react';
import {CARDS_BY_PAGE, INITIAL_PAGE} from '../../const';

function Catalog(): JSX.Element {
  const [page, setPage] = useState(INITIAL_PAGE);

  const guitars = useAppSelector((store) => store.guitars);

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
