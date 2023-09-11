const { Loan } = require('../models');
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const calculateLoan = (loanPrincipal, loanTerm, interestRate) => {
  const interestRateDecimal = interestRate / 100;
  const monthlyInterestRate = interestRateDecimal / 12;
  const monthlyPayment = loanPrincipal * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTerm)));

  // Calculate the total interest
  let remainingLoanBalance = loanPrincipal;
  let totalInterestPaid = 0;

  for (let paymentNumber = 1; paymentNumber <= loanTerm; paymentNumber++) {
    const interestPayment = remainingLoanBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;

    totalInterestPaid += interestPayment;
    remainingLoanBalance -= principalPayment;
  }

  const totalInterest = parseFloat(totalInterestPaid.toFixed(2));
  const totalLoanAmount = parseFloat((totalInterest + loanPrincipal).toFixed(2));

  return { totalInterest, totalLoanAmount, monthlyPayment };
};

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    loans: async () => {
      return Loan.find();
    },
    
    user: async (parent, {userId}) => {
        console.log(`Requested User ID => `+ userId)
      return User.findOne({ _id: userId })
      .select('-__v');
    },
    me: async (parent, args, context) => {
        if (context.user) {
          console.log(context.user)
          return User.findOne({ _id: context.user._id });
        }
        throw AuthenticationError;
      },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveLoan: async (parent, { loanTerm, interestRate, loanPrincipal, loanTitle, depositAmount }, context) => {
      if (!loanTitle) {
        loanTitle = 'Default Title';
      }
    
      // Calculate the total interest and total loan amount based on the default values
      const { totalInterest, totalLoanAmount, monthlyPayment } = calculateLoan(loanPrincipal, loanTerm, interestRate);
    
      // Create a new Loan document
      const newLoan = await Loan.create({
        loanTerm,
        interestRate,
        loanPrincipal,
        monthlyPayment,
        loanTitle,
        depositAmount,
        totalInterest,
        totalLoanAmount,
      });
    
      // Retrieve the user
      const user = await User.findOne({ _id: context.user._id });
    
      // Add the new Loan's data to the user's savedLoans array
      user.savedLoans.push({
        _id: newLoan._id,
        loanId: newLoan.loanId,
        loanTerm,
        interestRate,
        loanPrincipal,
        monthlyPayment,
        loanTitle,
        depositAmount,
        totalInterest,
        totalLoanAmount,
        createdAt: newLoan.createdAt,
      });
    
      // Save the user document with the new Loan
      await user.save();
    
      // Return the updated user object, including the newly added loan
      return user;
    },
    removeLoan: async (parent, args, context) => {
      const user = context.user;

      if (!user) {
        throw new Error("User not found");
      }
    
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedLoans: {loanId: args._id } } },
        { new: true }
      );
    
      if (!updatedUser) {
        throw new Error("User not found");
      }
    
      return updatedUser;
    },
  },
};

module.exports = resolvers;
