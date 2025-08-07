import { model, Schema } from "mongoose";
import { IActivityType } from "../interfaces/activityType";

const activityTypeSchema = new Schema<IActivityType>({
    type: { type: String, required: true }
});

export default model<IActivityType>('ActivityType', activityTypeSchema);