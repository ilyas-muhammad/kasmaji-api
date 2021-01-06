export interface Save {
    title: string;
    description: string;
    date: Date;
    location: string;
    image: string;
}

export interface FindAllFilter {
    date?: any;
}

export interface FilterFindOne {
    uuid: string;
}

export interface Paginate {
    limit: number;
    skip: number;
}

export interface GetEventParams {
    page?: number;
    size?: number;
    date?: string;
    month?: string;
}
