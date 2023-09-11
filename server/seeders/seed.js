const db = require('../config/connection');
const { Loan, User } = require('../models');
const loanSeed = require('./loanSeed.json');
const userSeed = require('./userSeed.json')
const cleanDB = require('./cleanDB');


db.once('open', async () => {
  await cleanDB('Loan', 'loans');

  await cleanDB('User', 'users');
  
  await Loan.create(loanSeed);

  await User.create(userSeed);

  console.log(`\n ${loanSeed.length} Loans created & ${userSeed.length} Users have been seeded!`);
  process.exit(0);
});
