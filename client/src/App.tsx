import { FC, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AlertComponent from './component/AlertComponent';
import HeaderComponent from './component/HeaderComponent';
import UserService from './service/UserService';
import HomePage from './pages/HomePage';
import FeatureInformationPage from './pages/FeatureInformationPage';

const App: FC = () => {

    const [user, setUser] = useState({_id: '', username: ''});

    useEffect(() => {
        UserService.getCurrentUser()
            .then((res) => {
                setUser(res.data);
            }) 
    }, []);

    return (
        <div className="app">
            <AlertComponent user={user} />
            <HeaderComponent user={user} />
            <Routes>
                <Route path="/" element={<HomePage user={user} />} />
                <Route path="/about/feature/:id" element={<FeatureInformationPage />} />
            </Routes>
        </div>
    );
}

export default App;
