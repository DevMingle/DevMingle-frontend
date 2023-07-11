<<<<<<< HEAD
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
=======
export interface userType {
    avatarImg:string,
    badges:string[],
    createdAt:string,
    email:string,
    followers:string[],
    following:string[],
    friends:string[],
    langauges:string[],
    name:string,
    oAuth:boolean,
    password:string,
    tokens:[{
        token:string
    }],
    updatedAt:string,
    _id:string,
    _v?:string,
    gender?:string,
    DOB?:Date,
    age?:number
}
>>>>>>> c428c1f7d0651a6ca5d3e72b9e41ebcc62d3cdb3
