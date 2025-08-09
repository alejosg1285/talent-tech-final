import axios, { type AxiosResponse } from "axios";
import type { IStudy } from "../interfaces/study";
import type { IActivity } from "../interfaces/activity";

axios.defaults.baseURL = 'http://127.0.0.1:3030/';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
};

const studies = {
    list: () => requests.get<IStudy[]>('study/'),
    byId: (id: string) => requests.get<IStudy>(`study/${id}`),
}

const activities = {
    listByStudy: (studyId: string) => requests.get<IActivity[]>(`activity/${studyId}`),
}

const agent = {
    studies,
    activities
};

export default agent;