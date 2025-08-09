import { model, Schema } from "mongoose";
import { IRegister } from "../interfaces/register";

const registerSchema = new Schema<IRegister>({
    initial_time: { type: String },
    final_time: { type: String },
    activity_time: { type: Number, required: [true, 'The dedicated time is required'] },
    total_time: { type: Number, default: 0 },
    activity: { type: Schema.Types.ObjectId, ref: 'Activity' }
});

export default model<IRegister>('Register', registerSchema);