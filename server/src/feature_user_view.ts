import mongoose from "mongoose";

import { FeatureInformation } from "./feature_information";
import { User } from "./user";

const featureInformationViewSchema = new mongoose.Schema({
    featureInformation: { type: FeatureInformation, required: true },
    user: { type: User, required: true}
}, { collection: "feature_information", timestamps: true });

const FeatureInformationView = mongoose.model("FeatureInformationView", featureInformationViewSchema);
export { FeatureInformationView };
