import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {FormEvent, SyntheticEvent, useRef, useState} from 'react';
import {addNewComment} from '../../store/guitars-data/guitars-data';
import {setAddReviewModalOpened, setReviewSuccessOpened} from '../../store/modal-view/modal-view';
import {Guitar} from '../../types/guitar';
import dayjs from 'dayjs';
import faker from 'faker';
import {postCommentAction} from '../../store/api-actions';
import FocusTrap from 'focus-trap-react';

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
                <div>
                  <span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    <input onChange={handleFieldChange} className="visually-hidden" id="star-5" name="rating" type="radio" value="5" />
                    <label className="rate__label" htmlFor="star-5" title="Отлично" />
                    <input onChange={handleFieldChange} className="visually-hidden" id="star-4" name="rating" type="radio" value="4" />
                    <label className="rate__label" htmlFor="star-4" title="Хорошо" />
                    <input onChange={handleFieldChange} className="visually-hidden" id="star-3" name="rating" type="radio" value="3" />
                    <label className="rate__label" htmlFor="star-3" title="Нормально" />
                    <input onChange={handleFieldChange} className="visually-hidden" id="star-2" name="rating" type="radio" value="2" />
                    <label className="rate__label" htmlFor="star-2" title="Плохо" />
                    <input onChange={handleFieldChange} className="visually-hidden" id="star-1" name="rating" type="radio" value="1" />
                    <label className="rate__label" htmlFor="star-1" title="Ужасно" />
                    <p className="rate__message">{!isRatingCorrect && 'Поставьте оценку'}&zwnj;</p>
                  </div>
                </div>
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
