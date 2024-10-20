import { FC } from 'react';
import userProfileImg from "../user.png"
import { User } from "../model/User";

interface UserLoginProps {
    user: User;
}

const UserLoginComponent: FC<UserLoginProps> = ({ user }) => {
    
    // not logged in, render login button
    if (!user._id) {
        return (
            <div className="user-login not-logged-in">
                <ul>
                    <li><button>Login</button></li>
                </ul>
            </div>
        );
    }

    // logged in, render user details and options
    return (
        <div className="user-login logged-in">
            <img className="user-pic" src={userProfileImg} alt={user.username} />
            <div className="user-details">
                <a className="user-name" href="/">{user.username}</a>
                <ul>
                    <li><button>Dashboard</button></li>
                    <li><button>Logout</button></li>
                </ul>
            </div>
    
        </div>
    );
}

export default UserLoginComponent;
