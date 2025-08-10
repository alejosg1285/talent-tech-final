export interface IStudy {
    _id?: string;
    name: string;
    objective?: string;
    description?: string;
    tags?: string[];
    time_total?: number;
    active?: boolean;
}