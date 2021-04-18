import { get } from 'lodash';

export const getErrorMessage = (error, defaultMessage) =>
  get(error, 'response.data.message', defaultMessage);

export function errorParser(error) {
  const message = get(error, 'response.message', 'Failed to run action');
  const status = get(error, 'response.status');

  return { message, status };
}

export function has404Error(errors) {
  for (let error of errors) {
    if (get(error, 'status') === 404) {
      return true;
    }
  }

  return false;
}
