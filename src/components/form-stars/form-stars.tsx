import {KeyboardEvent, MutableRefObject, SyntheticEvent, useRef} from 'react';
import './form-stars.css';

type FormDataType = {
  target: {
    name: string,
    value: string,
  }
}

type PropsType = {
  isRatingCorrect: boolean,
  handleFieldChange: (evt: FormDataType) => void,
  starsRef: MutableRefObject<HTMLDivElement | null>,
}

function FormStars({isRatingCorrect, handleFieldChange, starsRef}: PropsType): JSX.Element {
  const star1Ref = useRef<HTMLInputElement | null>(null);
  const star2Ref = useRef<HTMLInputElement | null>(null);
  const star4Ref = useRef<HTMLInputElement | null>(null);
  const star5Ref = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (!event.currentTarget.classList.contains('rate--alternate')) {
        event.currentTarget.classList.add('rate--alternate');
      }
      if (star1Ref.current && star2Ref.current && star4Ref.current && star5Ref.current) {
        star1Ref.current.value = '1';
        star2Ref.current.value = '2';
        star4Ref.current.value = '4';
        star5Ref.current.value = '5';
      }
      return;
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.currentTarget.classList.remove('rate--alternate');
      if (star1Ref.current && star2Ref.current && star4Ref.current && star5Ref.current) {
        star1Ref.current.value = '5';
        star2Ref.current.value = '4';
        star4Ref.current.value = '2';
        star5Ref.current.value = '1';
      }
    }
  };

  const handleStarsClick = (event: SyntheticEvent) => {
    if (event.currentTarget.classList.contains('rate--alternate')) {
      event.currentTarget.classList.remove('rate--alternate');
    }
  };

  return (
    <div>
      <span className="form-review__label form-review__label--required">Ваша Оценка</span>
      <div ref={starsRef} onMouseDown={handleStarsClick} onKeyDown={handleKeyDown} className="rate rate--reverse">
        <input ref={star1Ref} onChange={handleFieldChange} className="visually-hidden" id="star-5" name="rating" type="radio" value="5" />
        <label className="rate__label" htmlFor="star-5" title="Отлично" />
        <input ref={star2Ref} onChange={handleFieldChange} className="visually-hidden" id="star-4" name="rating" type="radio" value="4" />
        <label className="rate__label" htmlFor="star-4" title="Хорошо" />
        <input onChange={handleFieldChange} className="visually-hidden" id="star-3" name="rating" type="radio" value="3" />
        <label className="rate__label" htmlFor="star-3" title="Нормально" />
        <input ref={star4Ref} onChange={handleFieldChange} className="visually-hidden" id="star-2" name="rating" type="radio" value="2" />
        <label className="rate__label" htmlFor="star-2" title="Плохо" />
        <input ref={star5Ref} onChange={handleFieldChange} className="visually-hidden" id="star-1" name="rating" type="radio" value="1" />
        <label className="rate__label" htmlFor="star-1" title="Ужасно" />
        <p className="rate__message">{!isRatingCorrect && 'Поставьте оценку'}&zwnj;</p>
      </div>
    </div>
  );
}

export default FormStars;
