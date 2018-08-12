import { Dispatch, AnyAction } from 'redux';
import { appLoad } from '../../state/reducers/app';

export const loadAppData = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    return fetch('/public/routes.json')
      .then(response => response.json())
      .then(json => {
        dispatch(appLoad(json.routes));
      });
  };
};
