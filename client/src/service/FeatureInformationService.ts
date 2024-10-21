
import http from "../http-common";
import { FeatureInformation } from "../model/FeatureInformation";

const getFeatureInformation = (slug: string) => {
    return http.get<FeatureInformation>(`/feature_information/${slug}`)
}

const getDisplayFeatureInformation = () => {
    return http.get<FeatureInformation|null>(`/feature_information/display`)
}

const flagFeatureInformationView = (id: string) => {
    http.post<null>(`/feature_information/${id}/flag_view`);
}

const FeatureInformationService = {
    getFeatureInformation,
    getDisplayFeatureInformation,
    flagFeatureInformationView
}

export default FeatureInformationService;