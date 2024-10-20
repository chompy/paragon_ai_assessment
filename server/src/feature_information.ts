import mongoose from "mongoose";

const featureInformationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    alertText: { type: String },
    description: { type: String },
    releaseDate: { type: Date, required: true }
}, { collection: "feature_information", timestamps: true });

const FeatureInformation = mongoose.model("FeatureInformation", featureInformationSchema);
export { FeatureInformation };