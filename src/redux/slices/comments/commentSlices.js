import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

//action to redirect
const resetCommentAction = createAction("comment/reset");

//create action
export const createCommentAction = createAsyncThunk(
    "comment/create",
    async (comment, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.post(
                `${baseUrl}/api/comments`,
                {
                    description: comment?.description,
                    postId: comment?.postId,

                },
                config
            );
            console.log(data)
            // //dispatch action
            // dispatch(resetCategoryAction())
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);


//delete action

export const deleteCommentAction = createAsyncThunk(
    "comment/delete",
    async (commentId, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.delete(
                `${baseUrl}/api/comments/${commentId}`,
                config
            );
            console.log(data)
            // //dispatch action
            // dispatch(resetCategoryAction())
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//update action

export const updateCommentAction = createAsyncThunk(
    "comment/update",
    async (comment, { rejectWithValue, getState, dispatch }) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,

            }
        }
        console.log(comment);
        //http call
        try {
            const { data } = await axios.put(
                `${baseUrl}/api/comments/${comment?.id}`,
                { description: comment?.description },
                config
            );
            console.log(data)
            //dispatch action
            dispatch(resetCommentAction())
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch commend details
export const fetchCommentAction = createAsyncThunk(
    "comment/fetch-details",
    async (id, { rejectWithValue, getState, dispatch }) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,

            }
        }
        //http call
        try {
            const { data } = await axios.get(
                `${baseUrl}/api/comments/${id}`,
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


const commentSlices = createSlice({
    name: "comment",
    initialState: {},
    extraReducers: builder => {
        //create
        builder.addCase(createCommentAction.pending, (state, action) => {
            state.loading = true;
        });
        //dispatch action to redirect
        // builder.addCase(deleteCommentAction, (state, action) => {
        //     state.isCreated = true;
        // })
        builder.addCase(createCommentAction.fulfilled, (state, action) => {
            state.loading = false;
            state.commentCreated = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createCommentAction.rejected, (state, action) => {
            state.loading = false;
            state.commentCreated = undefined;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //delete
        builder.addCase(deleteCommentAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
            state.loading = false;
            state.commentDeleted = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(deleteCommentAction.rejected, (state, action) => {
            state.loading = false;
            state.commentDeleted = undefined;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //update
        builder.addCase(updateCommentAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetCommentAction, (state, action) => {
            state.isUpdated = true;
        })
        builder.addCase(updateCommentAction.fulfilled, (state, action) => {
            state.loading = false;
            state.commentUpdate = action?.payload;
            state.isUpdated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(updateCommentAction.rejected, (state, action) => {
            state.loading = false;
            state.commentUpdate = undefined;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //fetch
        builder.addCase(fetchCommentAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchCommentAction.fulfilled, (state, action) => {
            state.loading = false;
            state.commentDetails = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchCommentAction.rejected, (state, action) => {
            state.loading = false;
            state.commentDetails = undefined;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    },
});

export default commentSlices.reducer;