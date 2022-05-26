import request from 'axios';
import {HTTPCode} from '../const';
import {toast} from 'react-toastify';

const handleError = (error: unknown) => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTPCode.BadRequest:
        toast.warn(response.data.error);
        break;
      case HTTPCode.Unauthorized:
        toast.info(response.data.error);
        break;
      case HTTPCode.NotFound:
        toast.error(response.data.error);
        break;
      default:
        toast.error(response.data.error);
    }
  }
};

export {handleError};
