import {GuitarType, RATES, TEXT_RATES} from './const';
import {Guitar} from './types/guitar';

const getRatingStars = (guitarRating: number): JSX.Element[] => (
  RATES.map((rate) => (
    <svg key={rate} width="12" height="11" aria-hidden="true">
      <use xlinkHref={`#icon${guitarRating >= rate ? '-full' : ''}-star`} />
    </svg>
  ))
);

const getRatingText = (guitarRating: number): string => TEXT_RATES[Math.floor(guitarRating) - 1];

const getGuitarType = (guitar: Guitar): string => {
  const formattedType = `${guitar.type[0].toUpperCase()}${guitar.type.slice(1)}`;
  return GuitarType[formattedType];
}

export {getRatingStars, getRatingText, getGuitarType};