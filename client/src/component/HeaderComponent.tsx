import { FC } from 'react';
import { User } from '../model/User';
import UserLoginComponent from './UserLoginComponent';
import { Link } from 'react-router-dom';

interface HeaderProps {
  user: User;
}

const HeaderComponent: FC<HeaderProps> = ({ user }) => {
  return (
    <div className="header">
        <Link className="app-name" to="/">Nathan's Features INC</Link>
        <UserLoginComponent user={user} />
        <div className="clear"></div>
    </div>
  );
}

export default HeaderComponent;
