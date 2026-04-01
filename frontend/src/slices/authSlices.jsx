import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axiosInstance.js"

export const RegisterUser = createAsyncThunk('Auth/RegisterUser', async (FormData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/user/register', FormData);
        alert("successfully registered");
        console.log(response.data)
        return response.data;
    } catch (err) {
        const msg = err.response?.data?.error || "Registration failed";
        alert(msg);
        return rejectWithValue(msg);
    }
})

export const GenerateOTP = createAsyncThunk('Auth/GenerateOTP', async (email, { rejectWithValue }) => {
    try {
        const response = await axios.post('/user/generate-otp', { email });
        alert(response.data.message);
        return response.data;
    } catch (err) {
        const msg = err.response?.data?.error || "OTP generation failed";
        alert(msg);
        return rejectWithValue(msg);
    }
})

export const GoogleLogin = createAsyncThunk('Auth/GoogleLogin', async (credential, { rejectWithValue }) => {
    try {
        const response = await axios.post('/user/google-login', { credential });
        localStorage.setItem('token', response.data.token);
        alert(response.data.message);
        return response.data;
    } catch (err) {
        const msg = err.response?.data?.error || "Google Login failed";
        alert(msg);
        return rejectWithValue(msg);
    }
})

export const VerifyOTP = createAsyncThunk('Auth/VerifyOTP', async ({ email, otp }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/user/verify-otp', { email, otp });
        localStorage.setItem('token', response.data.token);
        alert(response.data.message);
        return response.data;
    } catch (err) {
        const msg = err.response?.data?.error || "OTP verification failed";
        alert(msg);
        return rejectWithValue(msg);
    }
})


export const UserAccount = createAsyncThunk("auth/UserAccount", async () => {
    try {
        const response = await axios.get("/user/account", { headers: { Authorization: localStorage.getItem("token") } });
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
})

const AuthSlice = createSlice({
    name: "Auth",
    initialState: {
        auth: null,
        isLoggedIn: false,
        isLoading: false,
        Error: null
    },
    reducers: {
        handleLogout: (state) => {
            state.auth = null;
            state.isLoggedIn = false;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RegisterUser.pending, (state) => {
            state.Error = null;
        })
        builder.addCase(RegisterUser.fulfilled, (state, action) => {
            state.auth = action.payload;

        })
        builder.addCase(RegisterUser.rejected, (state, action) => {
            state.Error = action.payload
        })
        builder.addCase(GenerateOTP.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(VerifyOTP.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.auth = action.payload;
        })
        builder.addCase(GoogleLogin.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.auth = action.payload;
        })
         builder.addCase(UserAccount.fulfilled, (state, action) => {
            // console.log("user account", action.payload);
            state.user = action.payload;
            state.isLoggedIn = true;

        })
    }

})

export const { handleLogout } = AuthSlice.actions;
export default AuthSlice.reducer;