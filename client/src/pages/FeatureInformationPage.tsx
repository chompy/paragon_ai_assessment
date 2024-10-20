
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FeatureInformationService from '../service/FeatureInformationService';

const FeatureInformationPage: FC = () => {

    let { id } = useParams();

    const [featureInformation, setFeatureInformation] = useState({_id: "", name: "", description: "", releaseDate: new Date()});

    useEffect(() => {
        if (id) {
            FeatureInformationService.getFeatureInformation(id)
                .then((res) => {
                    setFeatureInformation(res.data);
                });
        }
    }, [id]);


    if (featureInformation) {
        return (
            <div className="page page-feature-information">
                <h1>{featureInformation.name}</h1>
                <p>{featureInformation.description}</p>
            </div>
        );
    }

    return (
        <div className="page page-feature-information error">
            <h1>404 Not Found</h1>
            <p>Feature '{id}' could not be found.</p>
        </div>
    );
}

export default FeatureInformationPage;
