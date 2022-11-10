import { Route, Routes } from "react-router-dom";
import AddNewCategory from "../components/Categories/AddNewCategory";
import CategoryList from "../components/Categories/CategoryList";
import UpdateCategory from "../components/Categories/UpdateCategory";
import ProtectedRoute from "../components/Navigation/ProtectedRoute/ProtectedRoute";


const AdminRoute1 = () => {
    return (
        <Routes>
            <Route path="/category-list" element={
                <ProtectedRoute>
                    <CategoryList />
                </ProtectedRoute>
            }
            />
            <Route path="/add-category" element={
                <ProtectedRoute>
                    <AddNewCategory />
                </ProtectedRoute>
            }
            />
            <Route path="/update-category/:id" element={
                <ProtectedRoute>
                    <UpdateCategory />
                </ProtectedRoute>
            }
            />
            {/* <Route exact path="*" element={<Error />} /> */}
        </Routes>
    )
}
export default AdminRoute1;