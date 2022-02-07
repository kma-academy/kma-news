import { UserRole } from '../../user/entities/user.entity';
export interface LoginResultInterface {
  access_token: string;
  expiredAt: Date;
  refresh_token: string;
  user: {
    id: number;
    email: string;
    avatarURL: string;
    name: string;
    role: UserRole;
  };
}
