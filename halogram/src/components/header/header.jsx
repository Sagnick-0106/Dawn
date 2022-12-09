import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/user';
import Button from '../fields/button/button';
import { selectUserMetadata } from '../../store/selectors/user';

import './header.css';

const Header = (props) => {
  const navigate = useNavigate();

  const onLogOut = () => {
    UserService.logout();
    navigate('/login');
  }
  return (
    <header>
      <h2>Halogram</h2>
      { props.userMetadata?.name && <div className="user-info">
        <div>
          {props.userMetadata.name}
        </div>
        <Button
          onClick={onLogOut}
        >
          Log out
        </Button>
      </div>}
    </header>
  )
}

const mapStateToProps = createStructuredSelector({
  userMetadata: selectUserMetadata,
});
export default connect(mapStateToProps)(Header);
