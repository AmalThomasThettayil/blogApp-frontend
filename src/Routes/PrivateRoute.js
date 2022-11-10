import { Route, Routes } from "react-router-dom";
import UpdateComment from "../components/Comments/UpdateComment";
import Error from "../components/Error/Error";
import ProtectedRoute from "../components/Navigation/ProtectedRoute/ProtectedRoute";
import CreatePost from "../components/Posts/CreatePost";
import UpdatePost from "../components/Posts/UpdatePost";
import Profile from "../components/Users/ProfileComponent/Profile";
import UpdateProfileForm from "../components/Users/ProfileComponent/UpdateProfileForm";
import UploadProfilePhoto from "../components/Users/ProfileComponent/UploadProfilePhoto";


const Privateroute = () => {
    return (
        <Routes>
            <Route path="/update-post/:id" element={
                <ProtectedRoute>
                    <UpdatePost />
                </ProtectedRoute>
            } />
            <Route path="/upload-profile-photo" element={
                <ProtectedRoute>
                    <UploadProfilePhoto />
                </ProtectedRoute>
            } />
            <Route path="/create-post" element={
                <ProtectedRoute>
                    <CreatePost />
                </ProtectedRoute>
            } />
            <Route path="/update-comment/:id" element={
                <ProtectedRoute>
                    <UpdateComment />
                </ProtectedRoute>
            } />
            <Route path="/profile/:id" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />
            <Route path="/update-profile/:id" element={
                <ProtectedRoute>
                    <UpdateProfileForm />
                </ProtectedRoute>
            } />
            <Route exact path="*" element={<Error />} />
        </Routes>
    )
}
export default Privateroute;