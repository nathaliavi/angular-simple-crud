//npm run start-server

const faker = require('faker');

let data = { users: [] };

for (let i = 0; i < 10; i++) {
  data.users.push({
    id: i,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email()
  })
}

console.log(JSON.stringify(data));
