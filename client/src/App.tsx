import { FC, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import AlertComponent from './component/AlertComponent';
import HeaderComponent from './component/HeaderComponent';
import UserService from './service/UserService';
import HomePage from './pages/HomePage';
import FeatureInformationPage from './pages/FeatureInformationPage';
import FeatureInformationService from './service/FeatureInformationService';

const App: FC = () => {

    const [user, setUser] = useState({_id: "", username: ""});
    const [displayFeatureInformation, setDisplayFeatureInformation] = useState({_id: "", alertText: ""});

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
            navigate(`/about/feature/${displayFeatureInformation._id}`);
        };
        featureInformationAlert = <AlertComponent content={displayFeatureInformation.alertText} onDismiss={dismissCallback} onReadMore={readMoreCallback} />
    }

    return (
        <div className="app">
            {featureInformationAlert}
            <HeaderComponent user={user} />
            <Routes>
                <Route path="/" element={<HomePage user={user} />} />
                <Route path="/about/feature/:id" element={<FeatureInformationPage />} />
            </Routes>
            <hr/>
            <button onClick={FeatureInformationService.reset}>Reset</button>
        </div>
    );
}

export default App;
