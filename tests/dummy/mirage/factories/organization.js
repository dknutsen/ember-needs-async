import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  //name: faker.company.companyName,
  name() {
    return faker.company.companyName()
  },
  motto: faker.company.catchPhrase,

  street: faker.address.streetAddress,
  city: faker.address.city,
  state: faker.address.state,
  zip: faker.address.zipCode,
});
