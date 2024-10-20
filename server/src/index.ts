import express, { Express, Request, Response, NextFunction } from "express";

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { FeatureInformation } from "./feature_information";
import { User } from "./user";
import { FeatureInformationView } from "./feature_user_view";

// init database
const mongod = await MongoMemoryServer.create();
const mongoUri = mongod.getUri();
mongoose.connect(mongoUri);

// init http server
const PORT = process.env.PORT || 3001;
const app: Express = express();
app.use(express.json());

// test data for the database, since we're using an in memory database to demo this app
await User.create({ username: "test_user" });
await FeatureInformation.create({ name: "Test Feature", slug: "test_feature", alertText: "🎉 New in 1.0.2: The new Test Feature is here! 🎉", description: "More information blah blah blah", releaseDate: new Date("2024-10-20") });
//await FeatureInformation.create({ name: "Test Feature B", description: "The new Test Feature is here! Try it out today!", releaseDate: new Date("2024-10-19"), url: "https://www.example.com" });

const getCurrentUser = async () => {
    return await User.findOne();
}

// define routes

// GET /api/me -- Get the current user, for this demo it's always the first user found in database
app.get("/api/me", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = getCurrentUser();
        res.json(user);
    } catch (e) {
        next(e);
    }
});

// GET /api/feature_information -- List all available feature informations
app.get("/api/feature_information", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const featureInformationList = await FeatureInformation.find()
        res.json(featureInformationList);
    } catch (e) {
        next(e);
    }
});

// GET /api/feature_information/display -- Return the feature information that should be displayed to user, if any
app.get("/api/feature_information/display", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const featureInformation = await FeatureInformation.findOne({ releaseDate: { $lte: new Date() } }).sort("-releaseDate");
        res.json(featureInformation)
    } catch (e) {
        next(e);
    }
});

// GET /api/feature_information/:id -- Return feature information matching id
app.get("/api/feature_information/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const featureInformation = await FeatureInformation.findById(req.params.id)
        res.json(featureInformation);
    } catch (e) {
        next(e);
    }
});

// POST /api/feature_information -- Create new feature information
app.post("/api/feature_information", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const featureInformation = await FeatureInformation.create(req.body);
        res.json(featureInformation);
    } catch (e) {
        next(e);
    } 
});

// PUT /api/feature_information/:id -- Update existing feature information
app.put("/api/feature_information/:id", async (req: Request, res: Response) => {
    // TODO
    throw new Error("Endpoint not yet implemented.");
});

// DELETE /api/feature_information/:id -- Delete feature information
app.delete("/api/feature_information/:id", async (req: Request, res: Response) => {
    // TODO
    throw new Error("Endpoint not yet implemented.");
});

// POST /api/feature_information/:id/flag_view -- Log that current user has viewed the feature information so it isn't shown again
app.post("/api/feature_information/:id/flag_view", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = getCurrentUser();
        const featureInformation = await FeatureInformation.findById(req.params.id);
        const featureInformationView = await FeatureInformationView.create({ user: user, featureInformation: featureInformation })
        res.json(featureInformationView);
    } catch (e) {
        next(e);
    }
});


// start server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});