import { User } from '../users/user.entity';
export declare class Posts {
    id: number;
    titulo: string;
    descricao: string;
    isActive: boolean;
    userId: {
        id: number;
    };
    user: User;
    imageUrl: string;
}
