import {useDispatch} from "react-redux";
import {logout} from "../../redux/actions/authAction";


export const Panel = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div>
            <h1>Panel</h1>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}
