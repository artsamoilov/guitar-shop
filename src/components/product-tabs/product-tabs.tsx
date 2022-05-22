import {Guitar} from '../../types/guitar';
import {SetStateAction, SyntheticEvent, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {getGuitarType} from '../../utils';
import {useAppSelector} from '../../hooks';
import {TAB_INDEX_DEFAULT, TAB_INDEX_HIDDEN} from '../../const';

type PropsType = {
  guitar: Guitar;
}

enum TabName {
  Characteristics = 'Характеристики',
  Description = 'Описание',
}

const DESCRIPTION_HASH = '#description';
const CHARACTERISTICS_HASH = '#characteristics';

function ProductTabs({guitar}: PropsType): JSX.Element {
  const {hash} = useLocation();

  const [tabName, setTabName] = useState(hash === DESCRIPTION_HASH ? TabName.Description : TabName.Characteristics);

  const {isAddToCartModalOpened, isAddReviewModalOpened, isReviewSuccessOpened} = useAppSelector((store) => store);

  const getTabIndex = (): number => isAddToCartModalOpened || isAddReviewModalOpened || isReviewSuccessOpened ? TAB_INDEX_HIDDEN : TAB_INDEX_DEFAULT;

  const handleTabClick = (evt: SyntheticEvent): void => setTabName(evt.currentTarget.textContent as SetStateAction<TabName>);

  return (
    <div className="tabs">
      <a tabIndex={getTabIndex()}
        onClick={handleTabClick}
        className={`button ${tabName !== TabName.Characteristics && 'button--black-border'} button--medium tabs__button`}
        href={CHARACTERISTICS_HASH}
      >
        {TabName.Characteristics}
      </a>
      <a tabIndex={getTabIndex()}
        onClick={handleTabClick}
        className={`button ${tabName !== TabName.Description && 'button--black-border'} button--medium tabs__button`}
        href={DESCRIPTION_HASH}
      >
        {TabName.Description}
      </a>
      <div className="tabs__content">
        <table className={`tabs__table ${tabName !== TabName.Characteristics && 'hidden'}`}>
          <tbody>
            <tr className="tabs__table-row">
              <td className="tabs__title">Артикул:</td>
              <td className="tabs__value">{guitar?.vendorCode}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Тип:</td>
              <td className="tabs__value">{getGuitarType(guitar)}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Количество струн:</td>
              <td className="tabs__value">{guitar?.stringCount} струнная</td>
            </tr>
          </tbody>
        </table>
        <p className={`tabs__product-description ${tabName !== TabName.Description && 'hidden'}`}>
          {guitar?.description}
        </p>
      </div>
    </div>
  );
}

export default ProductTabs;
