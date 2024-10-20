import { FC } from 'react';
import { User } from '../model/User';

function test() {
    alert("TEST");
}

interface AlertProps {
    user: User;
  }  

const AlertComponent: FC<AlertProps> = ({ user }) => {
    return (
    <div className="alert feature-alert">
        <div className="feature-description">🎉 New In 1.0.1: The Test Feature is here! 🎉</div>
        <div className="feature-url"><a href="/check">Click here to check it out!</a></div>
        <div className="alert-options">
            <button onClick={test}>Remind Me Later</button>
            <button onClick={test}>Dismiss</button>
        </div>
    </div>
    );
}

export default AlertComponent;
