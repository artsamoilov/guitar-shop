import {Comment} from '../../types/comment';
import Review from '../review/review';
import {SyntheticEvent, useState} from 'react';
import dayjs from 'dayjs';
import {setAddReviewModalOpened} from '../../store/actions';
import {useAppDispatch, useAppSelector} from '../../hooks';

const START_INDEX = 0;
const COMMENTS_STEP = 3;

function ProductReviews(): JSX.Element {
  const {comments} = useAppSelector((store) => store);
  const [commentsCounter, setCommentsCounter] = useState(COMMENTS_STEP);

  const dispatch = useAppDispatch();

  const sortedComments = comments
    .slice()
    .sort((commentA, commentB) => dayjs(commentB.createAt).diff(dayjs(commentA.createAt)));

  const getSlicedComments = (): Comment[] => sortedComments.slice(START_INDEX, commentsCounter);

  const handleMoreReviewsClick = (): void => comments.length > (commentsCounter + COMMENTS_STEP) ?
    setCommentsCounter(commentsCounter + COMMENTS_STEP) :
    setCommentsCounter(comments.length);

  const handleAddReviewClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    dispatch(setAddReviewModalOpened(true));
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a onClick={handleAddReviewClick} className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>

      {getSlicedComments().map((comment) => <Review key={comment.id} comment={comment} />)}

      {commentsCounter < comments.length && <button onClick={handleMoreReviewsClick} className="button button--medium reviews__more-button">Показать еще отзывы</button>}

      <a style={{zIndex: '1'}} className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
    </section>
  );
}

export default ProductReviews;
