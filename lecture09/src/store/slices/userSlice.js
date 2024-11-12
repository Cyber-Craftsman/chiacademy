import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../../api/userActions';

// Асинхронні дії для логіну та реєстрації
export const login = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  try {
    const response = await loginUser(credentials);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk('user/register', async (userData, thunkAPI) => {
  try {
    const response = await registerUser(userData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = {
          id: action.payload.userId,
          username: action.payload.userName,
        };
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed. Please try again.';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = {
          id: action.payload.userId,
          username: action.payload.userName,
        };
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed. Please try again.';
      });
  },
});

export const { logout, clearErrors } = userSlice.actions;
export default userSlice.reducer;
