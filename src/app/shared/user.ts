export class userObj {
    userId?: string;
    userName?: {
        title: string;
        first: string;
        last: string;
    };
    location?:{
        country: string;
        city: string;
        street?: {
            name: string;
            number: number;
        };
    };
    email?: string;
    image?: string;

    
}

export interface Name{
    title: string;
    first: string;
    last: string;
}