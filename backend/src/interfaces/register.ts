import { Types } from "mongoose";

export interface IRegister {
    initial_time: string,
    final_time: string;
    activity_time: number;
    total_time: number;
    activity: Types.ObjectId;
}