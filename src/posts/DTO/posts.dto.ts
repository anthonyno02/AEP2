
import { User } from 'src/users/user.entity';

export class PostsDTO {
  titulo: string;
  descricao: string;
  user: User; // Relacionamento com o usuário
  userId?: { id: number };
  isActive: boolean;
  imageUrl: string; // Campo para armazenar o caminho da imagem
}
