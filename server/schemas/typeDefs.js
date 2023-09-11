const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    loanCount: Int
    savedLoans: [Loan]!  
  }

  type Loan {
    _id: ID
    loanId: String
    totalLoanAmount: Float
    loanTitle: String
    loanTerm: Int
    interestRate: Float
    totalInterest: Float
    loanPrincipal: Float
    monthlyPayment: Float
    depositAmount: Float
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    loans: [Loan]!
    loan(loanId: ID!): Loan
    users: [User]
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveLoan( loanTitle: String, loanTerm: Int!, interestRate: Float!, loanPrincipal: Float!, monthlyPayment: Float, depositAmount: Float, createdAt: String, totalLoanAmount: Float, totalInterest: Float): User
    removeLoan(loanId: ID!): User
  }
`;

module.exports = typeDefs;
