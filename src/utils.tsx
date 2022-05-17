import {RATES, TEXT_RATES} from './const';

const getRatingStars = (guitarRating: number): JSX.Element[] => (
  RATES.map((rate) => (
    <svg key={rate} width="12" height="11" aria-hidden="true">
      <use xlinkHref={`#icon${guitarRating >= rate ? '-full' : ''}-star`} />
    </svg>
  ))
);

const getRatingText = (guitarRating: number): string => TEXT_RATES[Math.floor(guitarRating) - 1];

export {getRatingStars, getRatingText};
