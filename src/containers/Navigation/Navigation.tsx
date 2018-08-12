import * as React from 'react';
import * as style from './index.css';
import { connect } from 'react-redux';
import { RState } from '../../state/reducers';
import { NavLink } from 'react-router-dom';

class Navigation extends React.Component<ReturnType<typeof mapStateToProps>> {
  render() {
    return (
      <nav className={style['nav']}>
        {this.props.routes.map((route, i) => (
          <NavLink key={route.path} to={route.path} className={style['link']}>
            {route.name}
          </NavLink>
        ))}
      </nav>
    );
  }
}

const mapStateToProps = (state: RState) => ({
  routes: state.app.routes,
});

export default connect(mapStateToProps)(Navigation);
