
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image: string;
    company: {
        name: string;
        title: string;
        departament: string;
    };
}

export interface ApiResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}