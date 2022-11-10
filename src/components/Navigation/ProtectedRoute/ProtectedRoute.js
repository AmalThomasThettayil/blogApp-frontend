import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const Navigate = useNavigate();
    const user = useSelector(state => state.users)
    const { userAuth } = user
    if (!userAuth) {
        return <Navigate to="/login" />
    }
    return (
        children
    )
}
export default ProtectedRoute