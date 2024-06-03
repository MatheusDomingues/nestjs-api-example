import { User } from '@prisma/client';

export class UserModel implements User {
  public id: string;
  public email: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;
  public avatarUrl: string;

  constructor({ id, email, name, avatarUrl }: { id?: string; email: string; name?: string; avatarUrl?: string }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.avatarUrl = avatarUrl;
  }
}
