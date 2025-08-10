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

export interface IActivityRequestDto {
    name: string;
    description?: string;
    time_diary: number;
    study: string;
    study_type: string;
    active?: boolean;
}