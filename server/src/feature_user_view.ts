import mongoose from "mongoose";
import { FeatureInformation } from "./feature_information";
import { User } from "./user";

const featureInformationViewSchema = new mongoose.Schema({
    featureInformation: { type: mongoose.Schema.ObjectId, ref: FeatureInformation, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: User, required: true }
}, { collection: "FeatureInformationView", timestamps: true });

const FeatureInformationView = mongoose.model("FeatureInformationView", featureInformationViewSchema);
export { FeatureInformationView };
