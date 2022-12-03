import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/user';
import Button from '../fields/button/button';

import './header.css';

export default function Header() {
  const { userMetadata } = useSelector(store => store.user, shallowEqual);
  const navigate = useNavigate();

  const onLogOut = () => {
    UserService.logout();
    navigate('/login');
  }
  return (
    <header>
      <h2>Halogram</h2>
      { userMetadata?.name && <div className="user-info">
        <div>
          {userMetadata.name}
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
