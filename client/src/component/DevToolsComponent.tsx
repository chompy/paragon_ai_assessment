import { FC } from 'react';
import { User } from "../model/User";
import DevToolsService from '../service/DevToolsService';

interface DevToolsProps {
    active: boolean;
    user: User;
}

const DevToolsComponent: FC<DevToolsProps> = ({ active, user }) => {    
    if (!active || !user._id) {
        return null;
    }

    const resetFeatureView = () => {
        DevToolsService.resetFeatureInformationViews()
            .then(() => {
                window.location.reload();
            });
    }

    return (
        <div className="dev-tools">
            Dev Tools
            <button onClick={resetFeatureView}>Reset Feature View/Dismiss</button>
        </div>
    );
}

export default DevToolsComponent;
