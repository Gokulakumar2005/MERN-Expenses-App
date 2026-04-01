import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/authSlices";
import ExpenseSlice from "../slices/expenseSlices";

export const store = configureStore({
    reducer: {
        Auth: AuthSlice,
        Expense: ExpenseSlice
    },
}); 