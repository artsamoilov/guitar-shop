import {Comment} from '../../types/comment';
import {getRatingStars, getRatingText} from '../../utils';
import dayjs from 'dayjs';

type PropsType = {
  comment: Comment,
}

function Review({comment}: PropsType): JSX.Element {
  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4>
        <span className="review__date">{dayjs(comment.createAt).format('DD MMMM')}</span>
      </div>
      <div className="rate review__rating-panel">
        {getRatingStars(comment.rating)}
        <p className="visually-hidden">Оценка: {getRatingText(comment.rating)}</p>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{comment.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{comment.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment.comment}</p>
    </div>
  );
}

export default Review;
