export interface IStudy {
    name: string;
    objective?: string;
    description?: string;
    tags?: string[];
    time_total?: number;
    active?: boolean;
}