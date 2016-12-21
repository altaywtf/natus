// Core
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Actions
import fetchInfo from 'modules/user/actions';

// Helpers
import tokenStorage from 'helpers/tokenStorage';

// Constants
import config from 'config';

// PropTypes
const { func, object } = PropTypes;
const propTypes = {
  user: object,
  fetchInfo: func,
  location: object,
};

class Authenticate extends Component {
  constructor() {
    super();
    this.authURL = `${config.apiURL}/oauth2/authenticate?client_id=${config.client_id}&response_type=token&redirect_uri=${config.redirect_uri}`;
  }

  componentDidMount() {
    this.checkLocationHash();
  }

  checkLocationHash() {
    const { location: { hash }, fetchInfo } = this.props;

    if (hash.includes('access_token')) {
      const token = hash.split('=')[1];
      tokenStorage.set(token);
      fetchInfo();
    }
  }

  render() {
    const { user: { isLoading } } = this.props;

    return (
      <div>
        {isLoading ?
          'Authenticating...' :
          <a href={this.authURL}>
           Authenticate
          </a>
        }
      </div>
    );
  }
}

Authenticate.propTypes = propTypes;

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  fetchInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);