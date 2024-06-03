import { faker } from '@faker-js/faker';

import { UserModel } from '@/domain/models/user.model';

export function makeUser(): UserModel {
  return new UserModel({
    email: faker.internet.email(),
    name: faker.person.firstName(),
  });
}
