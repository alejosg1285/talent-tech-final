import { model, Schema, Types } from "mongoose";
import { IActivity } from "../interfaces/activity";

const activitySchema = new Schema<IActivity>({
    name: { type: String, required: [true, 'Activity name is required'] },
    description: { type: String },
    time_diary: { type: Number },
    study: { type: Schema.Types.ObjectId, ref: 'Study' },
    study_type: { type: Schema.Types.ObjectId, ref: 'ActivityType' },
    active: { type: Boolean, default: true },
});

export default model<IActivity>('Activity', activitySchema);