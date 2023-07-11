export interface Question {
    question: string;
    answer: string;
    description: string;
    categories: string[];
    languages: string[];
    difficulty: number;
    madeBy: string;
    likes: number;
    _id: string;
}
export interface userType {
    avatarImg: string;
    badges: string[];
    createdAt: string;
    email: string;
    followers: string[];
    following: string[];
    friends: string[];
    langauges: string[];
    name: string;
    oAuth: boolean;
    password: string;
    tokens: [
        {
            token: string;
        }
    ];
    updatedAt: string;
    _id: string;
    _v?: string;
    gender?: string;
    DOB?: Date;
    age?: number;
}
