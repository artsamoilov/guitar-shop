import {GuitarType} from '../../const';
import {Guitar} from '../../types/guitar';
import {SetStateAction, SyntheticEvent, useState} from 'react';
import {useLocation} from 'react-router-dom';

type PropsType = {
  guitar: Guitar;
}

enum TabName {
  Characteristics = 'Характеристики',
  Description = 'Описание',
}

const DESCRIPTION_HASH = '#description';

function ProductTabs({guitar}: PropsType): JSX.Element {
  const {hash} = useLocation();

  const [tabName, setTabName] = useState(hash === DESCRIPTION_HASH ? TabName.Description : TabName.Characteristics);

  const formattedType = `${guitar?.type[0].toUpperCase()}${guitar?.type.slice(1)}`;

  const handleTabClick = (evt: SyntheticEvent): void => setTabName(evt.currentTarget.textContent as SetStateAction<TabName>);

  return (
    <div className="tabs">
      <a onClick={handleTabClick}
        className={`button ${tabName !== TabName.Characteristics && 'button--black-border'} button--medium tabs__button`}
        href="#characteristics"
      >
        {TabName.Characteristics}
      </a>
      <a onClick={handleTabClick}
        className={`button ${tabName !== TabName.Description && 'button--black-border'} button--medium tabs__button`}
        href="#description"
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
              <td className="tabs__value">{GuitarType[formattedType]}</td>
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
