
import http from "../http-common";

const resetFeatureInformationViews = () => {
    return http.post<null>(`/dev/reset_feature_views`)
}

const DevToolsService = {
    resetFeatureInformationViews
}

export default DevToolsService;