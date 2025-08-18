import axios, { type AxiosResponse } from "axios";
import type { IStudy } from "../interfaces/study";
import type { IActivity, IActivityRequestDto } from "../interfaces/activity";
import type { IActivityType } from "../interfaces/activityType";
import type { IRegister } from "../interfaces/register";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
};

const studies = {
    list: () => requests.get<IStudy[]>('study/'),
    byId: (id: string) => requests.get<IStudy>(`study/${id}`),
    create: (study: IStudy) => requests.post<IStudy>('study/', study),
}

const activities = {
    listByStudy: (studyId: string) => requests.get<IActivity[]>(`activity/${studyId}`),
    create: (activity: IActivityRequestDto) => requests.post<IActivity>(`activity/${activity.study}`, activity),
}

const typesActivity = {
    getAll: () => requests.get<IActivityType[]>('/activityType'),
    create: (type: IActivityType) => requests.post<IActivityType>('/activityType',type),
}

const register = {
    create: (info: IRegister) => requests.post<IRegister>(`/register/${info.activity}`, info),
    listByActivity: (activityId: string) => requests.get<IRegister[]>(`/register/${activityId}`),
};

const agent = {
    studies,
    activities,
    typesActivity,
    register,
};

export default agent;