import { IAppRoute, appSetCurrentRouteProps } from '../../state/reducers/app';

export const setCurrentRouteProps = (props: IAppRoute) =>
  appSetCurrentRouteProps(props);
