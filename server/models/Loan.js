const mongoose = require('mongoose'); 
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const loanSchema = new Schema({
  loanId: {
    type: Schema.Types.ObjectId, 
    default: function () {
      return new mongoose.Types.ObjectId(); 
    },
  },
  totalLoanAmount: {
    type: Number,
  },
  loanTerm: {
    type: Number,
    required: true,
  },
  loanTitle: {
    type: String,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  totalInterest: {
    type: Number,
  },
  loanPrincipal: {
    type: Number,
    required: true,
  },
  monthlyPayment: {
    type: Number,
    required: false,
  },
  depositAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Loan = model('Loan', loanSchema);

module.exports = Loan;
