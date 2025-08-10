import { Types } from "mongoose";

export interface IRegister {
    initial_time: Date,
    final_time: Date;
    activity_time: number;
    total_time: number;
    activity: Types.ObjectId;
}