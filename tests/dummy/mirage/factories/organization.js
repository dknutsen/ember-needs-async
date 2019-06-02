import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

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
