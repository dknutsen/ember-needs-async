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

  let foldersPerLevel = 3;
  let treeGrower = (node, level=1, maxLevel=4) => {
    server.createList('file', 2, { folder: node });
    if (level === maxLevel) { return; }
    let levelNodes = server.createList('folder', foldersPerLevel);
    levelNodes.forEach(friend => {
      node.folders.add(friend);
      treeGrower(friend, level+1, maxLevel);
    });
    node.save();
  };
  let root = server.create('folder', { id: 'root', name: '/' });
  treeGrower(root, 1);
}
