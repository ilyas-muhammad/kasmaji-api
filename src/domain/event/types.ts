export interface Save {
    title: string;
    description: string;
    date: Date;
    location: string;
    image: string;
}

export interface FindAllFilter {
    uuid?: string;
    date?: any;
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
