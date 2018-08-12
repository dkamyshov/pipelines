import * as React from 'react';
import * as style from './index.css';
import * as actions from './actions';
import {
  withRouter,
  RouteComponentProps,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { RState } from '../../state/reducers';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { Navigation, RouteProxy } from '..';

type ApplicationStateProps = ReturnType<typeof mapStateToProps>;
type ApplicationDispatchProps = ReturnType<typeof mapDispatchToProps>;
type ApplicationProps = ApplicationStateProps &
  ApplicationDispatchProps &
  RouteComponentProps<any>;

export class Application extends React.Component<ApplicationProps> {
  componentDidMount() {
    this.props.loadAppData();
  }

  render() {
    if (!this.props.ready) {
      return <h1>Загрузка...</h1>;
    }

    return (
      <div className={style['application']}>
        <Navigation />

        <div
          style={{
            padding: '8pt',
          }}
        >
          <Switch>
            {this.props.routes.map((route, i) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={RouteProxy}
              />
            ))}
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RState) => ({
  ready: state.app.ready,
  routes: state.app.routes,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(actions, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Application)
);
