export interface IAppRoute {
  path: string;
  exact: boolean;
  name: string;
  component: string;
  options: {
    url: string;
  };
}

export interface RAppState {
  ready: boolean;
  isCurrentRoutePropsSet: boolean;
  currentRouteProps: any;
  routes: IAppRoute[];
}

export enum RAppActionType {
  APP_LOAD = 'APP_LOAD',
  APP_CURRENT_ROUTE_PROPS_SET = 'APP_CURRENT_ROUTE_PROPS_SET',
}

export interface RAppActionLoad {
  type: RAppActionType.APP_LOAD;
  payload: {
    routes: IAppRoute[];
  };
}

export const appLoad = (routes: IAppRoute[]): RAppActionLoad => ({
  type: RAppActionType.APP_LOAD,
  payload: {
    routes,
  },
});

export interface RAppActionCurrentRouteSet {
  type: RAppActionType.APP_CURRENT_ROUTE_PROPS_SET;
  payload: {
    props: any;
  };
}

export const appSetCurrentRouteProps = (
  props: IAppRoute
): RAppActionCurrentRouteSet => ({
  type: RAppActionType.APP_CURRENT_ROUTE_PROPS_SET,
  payload: {
    props,
  },
});

const defaultAppState: RAppState = {
  ready: false,
  routes: [],
  isCurrentRoutePropsSet: false,
  currentRouteProps: null,
};

type RAppAction = RAppActionLoad | RAppActionCurrentRouteSet;

const app = (
  state: RAppState = defaultAppState,
  action: RAppAction
): RAppState => {
  switch (action.type) {
    case RAppActionType.APP_LOAD: {
      return {
        ...state,
        ready: true,
        routes: action.payload.routes,
      };
    }

    case RAppActionType.APP_CURRENT_ROUTE_PROPS_SET: {
      return {
        ...state,
        isCurrentRoutePropsSet: true,
        currentRouteProps: action.payload.props,
      };
    }

    default:
      return state;
  }
};

export default app;
