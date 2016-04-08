import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return (
      <div className="container main-container">
        <h1 className="title is-3 main-title">Maestro <small>(Alpha)</small></h1>
        <div className="column is-4 is-offset-4 form-wrapper">
          <p className="login-input">
            <input
              className="input"
              type="text"
              placeholder="email or username"
            />
          </p>
          <p className="login-input">
            <input
              className="input"
              type="password"
              placeholder="password"
            />
          </p>
          <button className="button is-primary">Login</button>
          {" "}
          <a className="button is-link sign-up-link">Sign up</a>
        </div>
        <footer className="footer">
          <div className="container">
            <div className="content is-centered">
              <p>
                <strong>Maestro</strong> by <a href="http://github.com/necinc">Max Vyznyuk</a>. The source code is licensed
                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('root')
);