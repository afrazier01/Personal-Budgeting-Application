import { gql } from '@apollo/client';

export const GET_ME = gql`
query Me {
  me {
    _id
    username
    email
    loanCount
    savedLoans {
      _id
      totalLoanAmount
      loanTitle
      loanTerm
      totalInterest
      interestRate
      monthlyPayment
      loanPrincipal
      depositAmount
      createdAt
      loanId
    }
  }
}
`;


