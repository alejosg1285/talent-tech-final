import type { IActivityType } from "./activityType";

export interface IActivity {
    _id: string;
    name: string;
    description?: string;
    time_diary: number;
    study: string;
    study_type: IActivityType;
    active?: boolean;
}