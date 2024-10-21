import { FC, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import AlertComponent from './component/AlertComponent';
import HeaderComponent from './component/HeaderComponent';
import UserService from './service/UserService';
import HomePage from './pages/HomePage';
import FeatureInformationPage from './pages/FeatureInformationPage';
import FeatureInformationService from './service/FeatureInformationService';
import DevToolsComponent from './component/DevToolsComponent';

const DEV_MODE = true;

const App: FC = () => {

    const [user, setUser] = useState({_id: "", username: ""});
    const [displayFeatureInformation, setDisplayFeatureInformation] = useState({_id: "", slug: "", alertText: ""});

    useEffect(() => {
        UserService.getCurrentUser()
            .then((res) => {
                setUser(res.data);
            });
        FeatureInformationService.getDisplayFeatureInformation()
            .then((res) => {
                if (res.data) {
                    setDisplayFeatureInformation(res.data);
                }
            });
    }, []);

    // render feature information alert
    const navigate = useNavigate();
    let featureInformationAlert = null;
    if (displayFeatureInformation._id) {
        const dismissCallback = () => {
            FeatureInformationService.flagFeatureInformationView(displayFeatureInformation._id);
        }
        const readMoreCallback = () => {
            dismissCallback();
            navigate(`/about/feature/${displayFeatureInformation.slug}`);
        };
        featureInformationAlert = <AlertComponent content={displayFeatureInformation.alertText} onDismiss={dismissCallback} onReadMore={readMoreCallback} />
    }

    return (
        <div className="app">
            {featureInformationAlert}
            <HeaderComponent user={user} />
            <Routes>
                <Route path="/" element={<HomePage user={user} />} />
                <Route path="/about/feature/:slug" element={<FeatureInformationPage />} />
            </Routes>
            <DevToolsComponent active={DEV_MODE} user={user} />
        </div>
    );
}

export default App;
