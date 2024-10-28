import { Posts } from "src/posts/posts.entity";
export declare class UsersDTO {
    name: string;
    email: string;
    senha: string;
    isActive: boolean;
    post: Posts[];
}
