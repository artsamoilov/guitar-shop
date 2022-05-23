import {useAppDispatch, useAppSelector} from '../../hooks';
import {FormEvent, SyntheticEvent, useState} from 'react';
import {addNewComment, setAddReviewModalOpened, setReviewSuccessOpened} from '../../store/actions';
import {Guitar} from '../../types/guitar';
import dayjs from 'dayjs';
import faker from 'faker';
import {postCommentAction} from '../../store/api-actions';

type PropsType = {
  guitar: Guitar,
}

type FormDataType = {
  target: {
    name: string,
    value: string,
  }
}

function ModalAddReview({guitar}: PropsType): JSX.Element {
  const {isAddReviewModalOpened} = useAppSelector((state) => state);

  const [formData, setFormData] = useState({
    guitarId: guitar.id,
    userName: '',
    advantage: '',
    disadvantage: '',
    comment: '',
    rating: 0,
  });

  const dispatch = useAppDispatch();

  const handleCloseClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    dispatch(setAddReviewModalOpened(false));
  };

  const handleFieldChange = (evt: FormDataType) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const {userName, advantage, disadvantage, comment, rating} = formData;
    if (userName && advantage && disadvantage && comment && rating !== 0) {
      evt.currentTarget.reset();
      dispatch(addNewComment({
        id: faker.random.locale(),
        userName: userName,
        advantage: advantage,
        disadvantage: disadvantage,
        comment: comment,
        rating: rating,
        createAt: dayjs().toISOString(),
        guitarId: guitar.id,
      }));
      dispatch(postCommentAction(formData));
      dispatch(setAddReviewModalOpened(false));
      dispatch(setReviewSuccessOpened(true));
    }
  };

  return (
    <div className={`modal ${isAddReviewModalOpened && 'is-active'} modal--review`}>
      <div className="modal__wrapper">
        <div onClick={handleCloseClick} className="modal__overlay" data-close-modal />
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar.name}</h3>
          <form onSubmit={handleFormSubmit} className="form-review">
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                <input onChange={handleFieldChange} name='userName' className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" required />
                <p className="form-review__warning">Заполните поле</p>
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
                  <p className="rate__message">Поставьте оценку</p>
                </div>
              </div>
            </div>
            <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
            <input onChange={handleFieldChange} name='advantage' className="form-review__input" id="adv" type="text" autoComplete="off" required />
            <p className="form-review__warning">Заполните поле</p>
            <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
            <input onChange={handleFieldChange} name='disadvantage' className="form-review__input" id="disadv" type="text" autoComplete="off" required />
            <p className="form-review__warning">Заполните поле</p>
            <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
            <textarea onChange={handleFieldChange} name='comment' className="form-review__input form-review__input--textarea" id="comment" rows={10} autoComplete="off" required />
            <p className="form-review__warning">Заполните поле</p>
            <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
          </form>
          <button onClick={handleCloseClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
            <span className="button-cross__icon" />
            <span className="modal__close-btn-interactive-area" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddReview;
