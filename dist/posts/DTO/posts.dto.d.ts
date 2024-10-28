import { User } from 'src/users/user.entity';
export declare class PostsDTO {
    titulo: string;
    descricao: string;
    user: User;
    userId?: {
        id: number;
    };
    isActive: boolean;
    imageUrl: string;
}
