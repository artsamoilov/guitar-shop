import {Guitar} from '../types/guitar';
import {Comment} from '../types/comment';

const MAX_GUITARS_NUMBER = 27;
const MAX_COMMENTS_COUNTER = 6;

const getMockGuitars = (): Guitar[] => {
  const guitars = [];
  for (let i = 1; i <= MAX_GUITARS_NUMBER; i++) {
    guitars.push({
      id: i,
      name: "Guitar name",
      vendorCode: "Vendor code",
      type: "electric",
      description: "Guitar description",
      previewImg: "img/guitar-0.jpg",
      stringCount: 6,
      rating: 5,
      price: 10000,
    });
  }
  return guitars;
};

const getMockComments = (guitarId: number): Comment[] => {
  const comments = [];
  for (let i = 1; i <= MAX_COMMENTS_COUNTER; i++) {
    comments.push({
      id: String(i),
      userName: "User name",
      advantage: "Advantage",
      disadvantage: "Disadvantage",
      comment: "Comment",
      rating: 5,
      createAt: `2022-05-24T00:00:0${i}.000Z`,
      guitarId: guitarId,
    });
  }
  return comments;
};

export {getMockGuitars, getMockComments};
