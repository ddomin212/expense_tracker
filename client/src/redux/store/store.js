import { configureStore } from "@reduxjs/toolkit";
import userSlices from "../slices/users/usersSlice";
import expensesSlice from "../slices/expense/expensesSlice";
import incomeSlice from "../slices/income/incomeSlice";
import accountSlices from "../slices/users/accountSlice";
import contactSlice from "../slices/home/contactSlice";
import newsletterSlice from "../slices/home/newsletterSlice";
import authSlice from "../slices/auth/authSlice";
import fioSlice from "../slices/connect/fioSlice";
import xtbSlice from "../slices/connect/xtbSlice";
import degiroSlice from "../slices/connect/degiroSlice";
import currencySlices from "../slices/users/currencySlice";
import paymentSlices from "../slices/users/paymentSlice";
const store = configureStore({
  reducer: {
    users: userSlices,
    expenses: expensesSlice,
    income: incomeSlice,
    accounts: accountSlices,
    newsletter: newsletterSlice,
    contact: contactSlice,
    auth: authSlice,
    fio: fioSlice,
    degiro: degiroSlice,
    xtb: xtbSlice,
    currency: currencySlices,
    payment: paymentSlices,
  },
});
export default store;
