import { User } from './User';

export class LoginResponse {
    constructor(public status:string, public user:User){}
}