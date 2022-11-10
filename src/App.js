import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage/HomePage"
import Navbar from "./components/Navigation/Navbar";
import PostDetails from "./components/Posts/PostDetails";
import PostsList from "./components/Posts/PostList";
import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from "./components/Error/Error";

//admin
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import ProtectedRoute from "./components/Navigation/ProtectedRoute/ProtectedRoute";

//logged in user
import UpdateComment from "./components/Comments/UpdateComment";
import CreatePost from "./components/Posts/CreatePost";
import UpdatePost from "./components/Posts/UpdatePost";
import Profile from "./components/Users/ProfileComponent/Profile";
import UpdateProfileForm from "./components/Users/ProfileComponent/UpdateProfileForm";
import UploadProfilePhoto from "./components/Users/ProfileComponent/UploadProfilePhoto";


function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="931713857882-ic4fva3cjipjc6lhd3jpv3koqoj28gjj.apps.googleusercontent.com">
        <Navbar />
        <Routes>
          {/* admin */}
          <Route exact path="/category-list" element={
            <ProtectedRoute>
              <CategoryList />
            </ProtectedRoute>
          }
          />
          <Route exact path="/add-category" element={
            <ProtectedRoute>
              <AddNewCategory />
            </ProtectedRoute>
          }
          />
          <Route exact path="/update-category/:id" element={
            <ProtectedRoute>
              <UpdateCategory />
            </ProtectedRoute>}
          />

          {/* logged in user */}
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

          <Route exact path="/posts" element={<PostsList />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/posts/:id" element={<PostDetails />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
