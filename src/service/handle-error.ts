import request from 'axios';
import {HTTPCode} from '../const';
import {toast} from 'react-toastify';

const handleError = (error: unknown) => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  switch (error.response?.status) {
    case HTTPCode.BadRequest:
      toast.warn('400 Некорректный запрос');
      break;
    case HTTPCode.Unauthorized:
      toast.info('401 Ошибка авторизации');
      break;
    case HTTPCode.NotFound:
      toast.error('404 Страница не найдена');
      break;
    default:
      toast.warn('Неизвестная ошибка. Попробуйте перезагрузить страницу');
  }
};

export {handleError};
