import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import baseUrl from "../../../utils/baseURL"

//redirect action
const resetUserAction = createAction('user/profile/reset')

//register action
export const registerUserAction = createAsyncThunk(
    "users/register",
    async (user, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            //http call

            const { data } = await axios.post(
                `${baseUrl}/api/v1/register`,
                user,
                config,
            )
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

//login
export const loginUserAction = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        try {
            const { data } = await axios.post(
                `${baseUrl}/api/v1/login`,
                userData,
                config,
            )
            //save user into local storage
            localStorage.setItem("userInfo", JSON.stringify(data));
            return data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

//profile
export const userProfileAction = createAsyncThunk(
    "user/profile",
    async (id, { rejectWithValue, getState, dispatch }) => {

        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }

        //http call
        try {
            const { data } = await axios.get(
                `${baseUrl}/api/v1/profile/${id}`,
                config
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch user details
export const fetchUserDetailsAction = createAsyncThunk(
    "user/detail",
    async (id, { rejectWithValue, getState, dispatch }) => {
        //http call
        try {
            const { data } = await axios.get(
                `${baseUrl}/api/v1/${id}`,

            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch all users
export const fetchUsersAction = createAsyncThunk(
    "all/users",
    async (id, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;

        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        //http call
        try {
            const { data } = await axios.get(
                `${baseUrl}/api/v1/`,
                config
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//logout action
export const logoutAction = createAsyncThunk(
    '/user/logout',
    async (payload, { rejectwithvalue, getState, dispatch }) => {

        try {
            localStorage.removeItem("userInfo")

        } catch (error) {
            if (!error?.response) {
                throw error
            }
            return rejectwithvalue(error?.response?.data)
        }
    }
)

//updATE profile action
export const updateUserAction = createAsyncThunk(
    "users/update",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            //http call

            const { data } = await axios.put(
                `${baseUrl}/api/v1`,
                {
                    lastName: userData?.lastName,
                    firstName: userData?.firstName,
                    bio: userData?.bio,
                    email: userData?.email,
                },
                config,
            )
            //dispatch
            dispatch(resetUserAction())
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

//UPLOAD PROFILE PHOTO
export const uploadProfilePhotoAction = createAsyncThunk(
    "user/profile-photo",
    async (userImg, { rejectWithValue, getState, dispatch }) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };
        try {
            //http call
            const formData = new FormData();
            formData.append("image", userImg?.image);

            const { data } = await axios.put(
                `${baseUrl}/api/v1/profilePhoto-upload`,
                formData,
                config
            );
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);


//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

//slices
const userSlices = createSlice({
    name: "users",
    initialState: {
        userAuth: userLoginFromStorage,
    },
    extraReducers: builders => {
        //register
        builders.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builders.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builders.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //user details
        builders.addCase(fetchUserDetailsAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builders.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userDetails = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builders.addCase(fetchUserDetailsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //fetch all users
        builders.addCase(fetchUsersAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builders.addCase(fetchUsersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.usersList = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builders.addCase(fetchUsersAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });


        //login
        builders.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builders.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builders.addCase(loginUserAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });

        //Profile
        builders.addCase(userProfileAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builders.addCase(userProfileAction.fulfilled, (state, action) => {
            state.profile = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builders.addCase(userProfileAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });

        //update user
        builders.addCase(updateUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builders.addCase(resetUserAction, (state, action) => {
            state.isUpdated = true;
        })
        builders.addCase(updateUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userUpdated = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.isUpdated = false;
        });
        builders.addCase(updateUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });


        //Upload profile photo
        builders.addCase(uploadProfilePhotoAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builders.addCase(uploadProfilePhotoAction.fulfilled, (state, action) => {
            state.profilePhoto = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builders.addCase(uploadProfilePhotoAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });

        //logout
        builders.addCase(logoutAction.pending, (state, action) => {
            state.loading = false;
        })
        builders.addCase(logoutAction.fulfilled, (state, action) => {
            state.userAuth = undefined;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builders.addCase(logoutAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false
        })
    }
})
export default userSlices.reducer;