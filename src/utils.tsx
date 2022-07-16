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
};

const isEscKey = (keyName: string): boolean => keyName === 'Escape' || keyName === 'Esc';

const getMinPrice = (guitars: Guitar[]): number => guitars.length > 0
  ? guitars.slice().sort((guitarA, guitarB) => guitarA.price - guitarB.price)[0].price
  : 0;

const getMaxPrice = (guitars: Guitar[]): number =>  guitars.length > 0
  ? guitars.slice().sort((guitarA, guitarB) => guitarB.price - guitarA.price)[0].price
  : 0;

const getSeparatedPrice = (price: number): string => String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export {getRatingStars, getRatingText, getGuitarType, isEscKey, getMinPrice, getMaxPrice, getSeparatedPrice};
