import { Posts } from "src/posts/posts.entity";

export class UsersDTO {
    name: string
    email: string
    senha: string
    isActive: boolean
    post: Posts[];
}