import * as React from 'react';
import * as actions from './actions';
import { RouteComponentProps } from 'react-router';
import { RState } from '../../state/reducers';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Components from '..';

class RouteProxy extends React.Component<
  RouteComponentProps<any> &
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>,
  any
> {
  componentDidMount() {
    const currentRoutePath = this.props.match.path;
    const route = this.props.routes.find(
      route => route.path === currentRoutePath
    )!;
    this.props.setCurrentRouteProps(route);
  }

  render() {
    const currentRoutePath = this.props.match.path;
    const route = this.props.routes.find(
      route => route.path === currentRoutePath
    )!;

    const TargetComponent = (Components as any)[route.component];
    return <TargetComponent options={route.options || {}} />;
  }
}

const mapStateToProps = (state: RState) => ({
  routes: state.app.routes,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteProxy);
