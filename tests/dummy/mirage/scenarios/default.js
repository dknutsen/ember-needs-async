export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  server.logging = true;

  let companies = server.createList('organization', 3);
  let friends = server.createList('user', 3, { company: companies[0] });
  let users = server.createList('user', 10, { friends });
  let me = friends[0];
  me.friends.add(friends[1]);
  me.friends.add(friends[2]);
  me.save();

  users.forEach(user => {
    let ci = Math.floor(Math.random()*3);
    user.company = companies[ci];
    user.save();
  });

  users.forEach(user => {
    server.createList('message', 5, {
      sender: me,
      receiver: user
    });
    server.createList('message', 5, {
      sender: user,
      receiver: me
    });
  });
  companies.forEach(c => c.save());
}
