import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {FormEvent, SyntheticEvent, useRef, useState} from 'react';
import {addNewComment} from '../../store/guitars-data/guitars-data';
import {setAddReviewModalOpened, setReviewSuccessOpened} from '../../store/modal-view/modal-view';
import {Guitar} from '../../types/guitar';
import dayjs from 'dayjs';
import faker from 'faker';
import {postCommentAction} from '../../store/api-actions';
import FocusTrap from 'focus-trap-react';
import FormStars from '../form-stars/form-stars';

type PropsType = {
  guitar: Guitar,
}

type FormDataType = {
  target: {
    name: string,
    value: string,
  }
}

const USER_NAME_ID = '#user-name';

function ModalAddReview({guitar}: PropsType): JSX.Element {
  const isAddReviewModalOpened = useAppSelector(({MODAL}) => MODAL.isAddReviewModalOpened);

  const [isNameCorrect, setIsNameCorrect] = useState(true);
  const [isRatingCorrect, setIsRatingCorrect] = useState(true);
  const [isAdvantageCorrect, setIsAdvantageCorrect] = useState(true);
  const [isDisadvantageCorrect, setIsDisadvantageCorrect] = useState(true);
  const [isCommentCorrect, setIsCommentCorrect] = useState(true);

  const [formData, setFormData] = useState({
    guitarId: guitar.id,
    userName: '',
    advantage: '',
    disadvantage: '',
    comment: '',
    rating: 0,
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  const resetFormData = (): void => {
    setIsNameCorrect(true);
    setIsRatingCorrect(true);
    setIsAdvantageCorrect(true);
    setIsDisadvantageCorrect(true);
    setIsCommentCorrect(true);
    setFormData({
      guitarId: guitar.id,
      userName: '',
      advantage: '',
      disadvantage: '',
      comment: '',
      rating: 0,
    });
    formRef.current?.reset();
  };

  const handleCloseClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    dispatch(setAddReviewModalOpened(false));
    resetFormData();
  };

  const handleFieldChange = (evt: FormDataType) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (isNameCorrect && isRatingCorrect && isAdvantageCorrect && isDisadvantageCorrect && isCommentCorrect) {
      const {userName, rating, advantage, disadvantage, comment} = formData;
      dispatch(addNewComment({
        id: faker.datatype.uuid(),
        userName: userName,
        rating: rating,
        advantage: advantage,
        disadvantage: disadvantage,
        comment: comment,
        createAt: dayjs().toISOString(),
        guitarId: guitar.id,
      }));
      dispatch(postCommentAction(formData));
      dispatch(setAddReviewModalOpened(false));
      dispatch(setReviewSuccessOpened(true));
      resetFormData();
    }
  };

  const handleSubmitClick = (): void => {
    if (starsRef.current?.classList.contains('rate--alternate')) {
      starsRef.current.classList.remove('rate--alternate');
    }
    const {userName, rating, advantage, disadvantage, comment} = formData;
    setIsNameCorrect(Boolean(userName));
    setIsRatingCorrect(Boolean(rating));
    setIsAdvantageCorrect(Boolean(advantage));
    setIsDisadvantageCorrect(Boolean(disadvantage));
    setIsCommentCorrect(Boolean(comment));
  };

  return (
    <FocusTrap active={isAddReviewModalOpened} focusTrapOptions={{allowOutsideClick: true, fallbackFocus: USER_NAME_ID}}>
      <div className={`modal ${isAddReviewModalOpened && 'is-active'} modal--review`}>
        <div className="modal__wrapper">
          <div onClick={handleCloseClick} className="modal__overlay" data-close-modal />
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar.name}</h3>
            <form ref={formRef} onSubmit={handleFormSubmit} className="form-review">
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input onChange={handleFieldChange} name='userName' className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" required />
                  <p className="form-review__warning">{!isNameCorrect && 'Заполните поле'}&zwnj;</p>
                </div>

                <FormStars starsRef={starsRef} isRatingCorrect={isRatingCorrect} handleFieldChange={handleFieldChange} />

              </div>
              <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
              <input onChange={handleFieldChange} name='advantage' className="form-review__input" id="adv" type="text" autoComplete="off" required />
              <p className="form-review__warning">{!isAdvantageCorrect && 'Заполните поле'}&zwnj;</p>
              <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
              <input onChange={handleFieldChange} name='disadvantage' className="form-review__input" id="disadv" type="text" autoComplete="off" required />
              <p className="form-review__warning">{!isDisadvantageCorrect && 'Заполните поле'}&zwnj;</p>
              <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
              <textarea onChange={handleFieldChange} name='comment' className="form-review__input form-review__input--textarea" id="comment" rows={10} autoComplete="off" required />
              <p className="form-review__warning">{!isCommentCorrect && 'Заполните поле'}&zwnj;</p>
              <button onClick={handleSubmitClick} className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
            </form>
            <button onClick={handleCloseClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
              <span className="button-cross__icon" />
              <span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default ModalAddReview;
