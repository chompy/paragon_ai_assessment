
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FeatureInformationService from '../service/FeatureInformationService';

const FeatureInformationPage: FC = () => {

    let { slug } = useParams();

    const [featureInformation, setFeatureInformation] = useState({_id: "", slug: "", name: "", description: "", releaseDate: new Date()});

    useEffect(() => {
        if (slug) {
            FeatureInformationService.getFeatureInformation(slug)
                .then((res) => {
                    setFeatureInformation(res.data);
                });
        }
    }, [slug]);


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
            <p>Feature '{slug}' could not be found.</p>
        </div>
    );
}

export default FeatureInformationPage;
