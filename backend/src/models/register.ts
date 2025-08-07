import { model, Schema } from "mongoose";
import { IRegister } from "../interfaces/register";

const registerSchema = new Schema<IRegister>({
    time: { type: Number, required: [true, 'The dedicated time is required'] },
    activity: { type: Schema.Types.ObjectId, ref: 'Activity' }
});

export default model<IRegister>('Register', registerSchema);