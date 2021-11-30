import { Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "../redux/actions/authAction";
import {Spinner} from "../components/Spinner/Spinner";

const PrivateRoute = ({ component: Component }) => {
    const dispatch = useDispatch()
    const isAuth = localStorage.getItem("AccessToken")
    const isLoading = useSelector(state => state.auth.isLoading)

    if (isAuth) {
        return <Component/>
    } else if (!isAuth) {
        dispatch(checkAuth())
    }
    if (isLoading) {
        return <Spinner/>
    }
    return <Navigate to='/' />
}

export default PrivateRoute