import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axiosInstance.js";

export const AddExpense = createAsyncThunk(
    "Expense/AddExpense",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "/expense/add",
                formData
            );

            return response.data;

        } catch (err) {
            let msg = "Failed to add expense";

            if (err.response?.data?.error) {
                if (typeof err.response.data.error === "string") {
                    msg = err.response.data.error;
                } else if (err.response.data.error.message) {
                    msg = err.response.data.error.message;
                }
            }

            return rejectWithValue(msg);
        }
    }
);

export const ListExpenses = createAsyncThunk('Expense/ListExpenses', async (params = {}, { rejectWithValue }) => {
    try {
        const { page = 1, limit = 15, search = "" } = params;
        const query = new URLSearchParams({ page, limit, search }).toString();
        const response = await axios.get(`/expense/list?${query}`);
        return response.data;
    } catch (err) {
        const msg = err.response?.data?.error || "Failed to fetch expenses";
        return rejectWithValue(msg);
    }
});

export const GetStats = createAsyncThunk('Expense/GetStats', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/expense/stats');
        return response.data;
    } catch (err) {
        const msg = err.response?.data?.error || "Failed to fetch stats";
        return rejectWithValue(msg);
    }
});

export const RemoveExpense = createAsyncThunk('Expense/RemoveExpense', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/expense/remove/${id}`);
        return response.data;
    } catch (err) {
        const msg = err.response?.data?.error || "Failed to remove expense";
        return rejectWithValue(msg);
    }
});

export const UpdateExpense = createAsyncThunk('Expense/UpdateExpense', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/expense/update/${id}`, formData);
        return response.data;
    } catch (err) {
        const msg = err.response?.data?.error || "Failed to update expense";
        return rejectWithValue(msg);
    }
});

const ExpenseSlice = createSlice({
    name: "Expense",
    initialState: {
        expenses: [],
        stats: {
            totalAmount: 0,
            totalCount: 0,
            chartData: []
        },
        pagination: {
            totalPages: 1,
            currentPage: 1,
            totalItems: 0
        },
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ListExpenses.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(ListExpenses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.expenses = action.payload.expenses;
            state.pagination = {
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                totalItems: action.payload.totalItems
            };
        });
        builder.addCase(ListExpenses.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(GetStats.fulfilled, (state, action) => {
            state.stats = action.payload;
        });
        builder.addCase(AddExpense.fulfilled, (state, action) => {
            state.expenses.unshift(action.payload);
            state.pagination.totalItems += 1;
        });
        builder.addCase(RemoveExpense.fulfilled, (state, action) => {
            state.expenses = state.expenses.filter(exp => exp._id !== action.payload.id);
            state.pagination.totalItems -= 1;
        });
        builder.addCase(UpdateExpense.fulfilled, (state, action) => {
            const index = state.expenses.findIndex(exp => exp._id === action.payload._id);
            if (index !== -1) {
                state.expenses[index] = action.payload;
            }
        });
    }
});

export default ExpenseSlice.reducer;
