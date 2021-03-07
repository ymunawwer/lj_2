import apiRequest from "./apiRequest";
import companyApis from "../../constants/companyApis";

export const backupNewCustomerRecord = async (localId, localBookId, remoteBookId, amount, date, dueDate, remarks, give, take, attachment, partnerContact, phoneId, type) => {
  const data = {
    localBookId,
    remoteBookId,
    amount,
    date,
    dueDate,
    remarks,
    give,
    take,
    attachment,
    partnerContact,
    phoneId,
    type,
    localId,
  }
  return apiRequest('post', companyApis.MAKE_NEW_CUSTOMER_RECORD, data, 'json', true)
}

export const backupNewCustomer = async (localId, localBookId, remoteBookId, contactNo, name, lastUpdated, loanYes, address, rAmount, pAmount, netAmount) => {
  const data = {
    localId,
    localBookId,
    remoteBookId,
    contactNo,
    name,
    lastUpdated,
    loanYes,
    address,
    receivableAmount: rAmount,
    payableAmount: pAmount,
    netAmount
  }
  return apiRequest('post', companyApis.MAKE_NEW_CUSTOMER, data, 'json', true);
}

export const backupNewLoanRecord = async (localId, localBookId, remoteBookId, amount, date, dueDate, remarks, give, take, attachment, partnerContact, phoneId, type, interest, installmentAmount, installments, loanName, totalMonths) => {
  const data = {
    localId,
    localBookId,
    remoteBookId,
    amount,
    date,
    dueDate,
    remarks,
    give,
    take,
    attachment,
    partnerContact,
    phoneId,
    type,
    interest,
    installments,
    totalMonths,
    loanName,
    installmentAmount,
  }
  return apiRequest('post', companyApis.MAKE_NEW_LOAN_RECORD, data, 'json', true);
}

export const backupLoans = async (localId, isActive, contactName, loanName, contactNo, lastUpdated) => {
  const data = {
    localId,
    contactName,
    contactNo,
    lastUpdated,
    isActive
  }
  return apiRequest('post', companyApis.MAKE_NEW_LOAN, data, 'json', true);
}
