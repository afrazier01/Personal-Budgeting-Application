export const getSavedLoanIds = () => {
    const savedLoanIds = localStorage.getItem('saved_loans')
      ? JSON.parse(localStorage.getItem('saved_loans'))
      : [];
  
    return savedLoanIds;
  };
  
  export const saveLoanIds = (loanIdArr) => {
    if (loanIdArr.length) {
      localStorage.setItem('saved_loans', JSON.stringify(loanIdArr));
    } else {
      localStorage.removeItem('saved_loans');
    }
  };
  
  export const removeLoanId = (loanId) => {
    const savedLoanIds = localStorage.getItem('saved_loans')
      ? JSON.parse(localStorage.getItem('saved_loans'))
      : null;
  
    if (!savedLoanIds) {
      return false;
    }
  
    const updatedSavedLoanIds = savedLoanIds?.filter((savedLoanId) => savedLoanId !== loanId);
    localStorage.setItem('saved_loans', JSON.stringify(updatedSavedLoanIds));
  
    return true;
  };