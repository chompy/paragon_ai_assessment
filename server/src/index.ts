import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { MongoMemoryServer } from "mongodb-memory-server";
import { FeatureInformation } from "./feature_information";
import { User } from "./user";
import { FeatureInformationView } from "./feature_user_view";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
await FeatureInformation.create({ name: "Test Feature", slug: "test_feature", alertText: "🎉 New in 1.0.1: The new Test Feature is here! 🎉", description: "This new feature is ground breaking! Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.", releaseDate: new Date("2024-10-20") });

const getCurrentUser = async () => {
    let user = await User.findOne();
    if (!user) {
        throw new Error("User not found.");
    }
    return user;
}

// define routes

// GET /api/me -- Get the current user, for this demo it's always the first user found in database
app.get("/api/me", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getCurrentUser();
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
        const user = await getCurrentUser();
        // TODO: find a way to write a query that returns only the most recent feature information that the user hasn't viewed
        const featureInformationResults = await FeatureInformation.aggregate([
            {
                $lookup: {
                    from: "FeatureInformationView",
                    localField: "_id",
                    foreignField: "featureInformation",
                    as: "userView",
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$user", user._id],
                                }
                            }
                        }
                    ]
                },
            },
            {
                $match: {
                    $expr: {
                        $lte: [ "$releaseDate", new Date() ]
                    }
                }
            },
            {
                $sort: { releaseDate: -1, userView: -1 }
            }
        ]);
        if (featureInformationResults && featureInformationResults[0].userView.length == 0) {
            res.json(featureInformationResults[0]);
            return;
        }
        res.json(null);
    } catch (e) {
        next(e);
    }
});

// GET /api/feature_information/:slug -- Return feature information matching slug
app.get("/api/feature_information/:slug", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const featureInformation = await FeatureInformation.findOne({ slug: req.params.slug })
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
        const user = await getCurrentUser();
        const featureInformation = await FeatureInformation.findById(req.params.id);
        if (!featureInformation) {
            throw new Error("FeatureInformation not found.");
        }

        // check if already exists
        let featureInformationView = await FeatureInformationView.findOne({ user: user._id, featureInformation: featureInformation._id })
        if (featureInformationView) {
            res.json(featureInformationView);
            return;
        }

        // create record
        featureInformationView = await FeatureInformationView.create({ user: user._id, featureInformation: featureInformation._id })
        res.json(featureInformationView);
    } catch (e) {
        next(e);
    }
});

// POST - /api/dev/reset_feature_views -- Reset feature views for current user
app.post("/api/dev/reset_feature_views", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getCurrentUser();
        await FeatureInformationView.deleteMany({ user: user._id });
        res.json(null);
    } catch (e) {
        next(e);
    }
});

app.use(express.static(path.join("..", "client", "build")));
app.use((req: Request, res: Response, next: NextFunction) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header("Cache-Control', 'private, no-cache, no-store, must-revalidate");
        res.header("Expires", "-1");
        res.header("Pragma", "no-cache");
        
        res.sendFile(path.join(__dirname, "..", "..", "client", "build", "index.html"));
    }
});

// start server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});