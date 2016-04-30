import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class AppContainer extends Component {
  componentDidMount() {
    let { children, location } = this.props;
    let isRoot = location.pathname === '/';
    if (!children && isRoot) {
      this.context.router.push('prices/')
    }
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <div className="header-left">
              <a className="header-item" href="#">
                <h1 className="logo title">Maestro</h1>
              </a>
              <a className="header-tab is-active" href="#">
                Каталоги
              </a>
              <Link to="prices/" className="header-tab">
                Розрахунки
              </Link>
            </div>

            <span className="header-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>

            <div className="header-right header-menu">
              <a href="" className="header-item">
                <i className="fa fa-cog"></i>
              </a>
            </div>
          </div>
        </header>
        {this.props.children ? this.props.children : <div className="spinner"></div>}
      </div>
    );
  }
}

AppContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

AppContainer.propTypes = {
  children: PropTypes.element
}

function select(state) {
  return {
    routing: state.routing,
    prices: state.prices
  }
}

export default connect(select)(AppContainer);
