import { model, Schema } from "mongoose";
import { IStudy } from "../interfaces/study";

const studySchema = new Schema<IStudy>({
    name: { type: String, required: [true, "Study name is required"] },
    objective: { type: String },
    description: { type: String },
    tags: { type: [String] },
    time_total: { type: Number },
    active: { type: Boolean, default: true },
});

export default model<IStudy>('Study', studySchema);