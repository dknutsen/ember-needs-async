export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  server.logging = true;

  let companies = server.createList('organization', 3);
  let friends = server.createList('user', 3, { company: companies[0] });
  let users = server.createList('user', 10, { friends });

  users.forEach(user => {
    let ci = Math.floor(Math.random()*3);
    user.company = companies[ci];
    user.save();
  });
  companies.forEach(c => c.save());
}
