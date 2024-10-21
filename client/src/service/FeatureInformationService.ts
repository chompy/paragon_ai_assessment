
import http from "../http-common";
import { FeatureInformation } from "../model/FeatureInformation";

const getFeatureInformation = (id: string) => {
    return http.get<FeatureInformation>(`/feature_information/${id}`)
}

const getDisplayFeatureInformation = () => {
    return http.get<FeatureInformation|null>(`/feature_information/display`)
}

const flagFeatureInformationView = (id: string) => {
    http.post<null>(`/feature_information/${id}/flag_view`);
}

const reset = () => {
    http.post<null>(`/reset`);
}

const FeatureInformationService = {
    getFeatureInformation,
    getDisplayFeatureInformation,
    flagFeatureInformationView,
    reset
}

export default FeatureInformationService;