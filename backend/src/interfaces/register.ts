import { Types } from "mongoose";

export interface IRegister {
    time: number;
    activity: Types.ObjectId;
}