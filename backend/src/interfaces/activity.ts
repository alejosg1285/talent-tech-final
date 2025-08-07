import { Types } from "mongoose";

export interface IActivity {
    name: string;
    description?: string;
    time_diary: number;
    study: Types.ObjectId;
    study_type: Types.ObjectId;
    active?: boolean;
}