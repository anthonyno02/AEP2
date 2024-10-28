import { Posts } from '../posts/posts.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    senha: string;
    isActive: boolean;
    posts: Posts[];
}
