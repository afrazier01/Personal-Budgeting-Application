import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
      loanCount
      savedLoans {
        _id
        totalLoanAmount
        loanTitle
        loanTerm
        interestRate
        totalInterest
        loanPrincipal
        monthlyPayment
        depositAmount
        createdAt
        loanId
      }
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
      loanCount
      savedLoans {
        _id
        totalLoanAmount
        loanTitle
        loanTerm
        interestRate
        totalInterest
        loanPrincipal
        monthlyPayment
        depositAmount
        createdAt
        loanId
      }
    }
  }
}
`;
//edit
export const SAVE_LOAN = gql`
mutation saveLoan($loanTerm: Int!, $interestRate: Float!, $loanPrincipal: Float!, $loanTitle: String, $depositAmount: Float) {
  saveLoan(loanTerm: $loanTerm, interestRate: $interestRate, loanPrincipal: $loanPrincipal, loanTitle: $loanTitle, depositAmount: $depositAmount) {
    _id
    username
    email
    loanCount
    savedLoans {
      _id
      totalLoanAmount
      loanTitle
      loanTerm
      interestRate
      totalInterest
      loanPrincipal
      monthlyPayment
      depositAmount
      createdAt
      loanId
    }
  }
}
`;

//edit
export const REMOVE_LOAN = gql`
mutation removeLoan($loanId: ID!) {
  removeLoan(loanId: $loanId) {
    _id
    username
    email
    password
    loanCount
    savedLoans {
      createdAt
      depositAmount
      totalInterest
      totalLoanAmount
      _id
      loanTitle
      loanTerm
      interestRate
      loanPrincipal
      loanId
      monthlyPayment
    }
  }
}
`;
