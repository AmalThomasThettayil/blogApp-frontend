import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

//action to redirect
const resetPost = createAction("category/reset");
const resetPostEdit = createAction("post/reset")
const resetPostDelete = createAction("post/delete")

//Create Post action
export const createpostAction = createAsyncThunk(
    "post/created",
    async (post, { rejectWithValue, getState, dispatch }) => {
        console.log(post);
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
            formData.append("title", post?.title);
            formData.append("description", post?.description);
            formData.append("category", post?.category);
            formData.append("image", post?.image);

            const { data } = await axios.post(
                `${baseUrl}/api/posts`,
                formData,
                config
            );
            //dispatch action
            dispatch(resetPost());
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Update Post action
export const updatepostAction = createAsyncThunk(
    "post/updated",
    async (post, { rejectWithValue, getState, dispatch }) => {
        console.log(post);
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
            const { data } = await axios.put(
                `${baseUrl}/api/posts/${post?.id}`,
                post,
                config
            );
            //dispatch
            dispatch(resetPostEdit())
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Delete Post action
export const deletepostAction = createAsyncThunk(
    "post/deleted",
    async (postId, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.delete(
                `${baseUrl}/api/posts/${postId}`,
                config
            );
            //dispatch
            dispatch(resetPostDelete())
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);


//fetch all posts
export const fetchPostsAction = createAsyncThunk(
    "post/list",

    async (category, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(
                `${baseUrl}/api/posts?category=${category}`,
            );
            return data;
        } catch (error) {
            console.log(error);
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch post details
export const fetchPostDetailsAction = createAsyncThunk(
    "post/detail",

    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(
                `${baseUrl}/api/posts/${id}`,
            );
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);

//likes to posts
export const toggleAddLikesToPost = createAsyncThunk(
    'post/like',
    async (postId, { rejectWithValue, getState, dispatch }) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };

        try {
            const { data } = await axios.put(
                `${baseUrl}/api/posts/likes`,
                { postId },
                config,
            );
            return data
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    })

//dislikes to posts
export const toggleAddDislikesToPost = createAsyncThunk(
    'post/dislike',
    async (postId, { rejectWithValue, getState, dispatch }) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };
        try {
            const { data } = await axios.put(
                `${baseUrl}/api/posts/dislikes`,
                { postId },
                config,
            );
            return data
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    })


//slice

const postSlice = createSlice({
    name: "post",
    initialState: {},
    extraReducers: builder => {
        //create post
        builder.addCase(createpostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetPost, (state, action) => {
            state.isCreated = true;
        });
        builder.addCase(createpostAction.fulfilled, (state, action) => {
            state.postCreated = action?.payload;
            state.loading = false;
            state.isCreated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createpostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });


        //update post
        builder.addCase(updatepostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetPostEdit, (state, action) => {
            state.isUpdated = true;
        })
        builder.addCase(updatepostAction.fulfilled, (state, action) => {
            state.postUpdated = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.isUpdated = false;
        });
        builder.addCase(updatepostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //delete post
        builder.addCase(deletepostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetPostDelete, (state, action) => {
            state.isDeleted = true;
        })
        builder.addCase(deletepostAction.fulfilled, (state, action) => {
            state.postDeleted = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.isDeleted = false;
        });
        builder.addCase(deletepostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //fetch post
        builder.addCase(fetchPostsAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
            state.postLists = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchPostsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //fetch post details
        builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
            state.postDetails = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //like post
        builder.addCase(toggleAddLikesToPost.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(toggleAddLikesToPost.fulfilled, (state, action) => {
            state.likes = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(toggleAddLikesToPost.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //dislike post
        builder.addCase(toggleAddDislikesToPost.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(toggleAddDislikesToPost.fulfilled, (state, action) => {
            state.dislikes = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(toggleAddDislikesToPost.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    },
});

export default postSlice.reducer;
