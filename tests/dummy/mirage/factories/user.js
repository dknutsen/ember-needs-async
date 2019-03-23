import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  avatar: faker.image.avatar,

  withCompany: trait({
    afterCreate(user, server) {
      let org = server.create('organization');
      user.company = org;
    }
  })
});
