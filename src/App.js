import {Login} from "./Pages/Login/Login";
import {UserList} from "./Pages/UsersList/UserList";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {UserDetail} from "./Pages/UserDetail/UserDetail";
import {ProjectList} from "./Pages/ProjectList/ProjectList";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "./redux/actions/authAction";
import {Button} from "./components/Button/Button";
import {NotFound} from "./Pages/NotFound/NotFound";
import PrivateRoute from "./helpers/requireAuth";
import styles from "./App.module.scss";

const App = () => {
    const dispatch = useDispatch()
    const navVisible = useSelector(state => state.auth.navVisible)

    return (
            <BrowserRouter>
                {navVisible &&
                    <div className={styles.main}>
                        <nav className={styles.nav}>
                            <NavLink to='/users' className={({isActive}) => isActive ? styles.activeLink : ''}>
                                Пользователи
                            </NavLink>
                            <NavLink to='/projects' className={({isActive}) => isActive ? styles.activeLink : ''}>
                                Задачи
                            </NavLink>
                        </nav>
                        <Button onClick={() => dispatch(logout())}>Выйти</Button>
                    </div>
                }
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/users' element={<PrivateRoute component={UserList}/>}/>
                <Route path='/user/:userId' element={<PrivateRoute component={UserDetail}/>}/>
                <Route path='/projects' element={<PrivateRoute component={ProjectList}/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
            </BrowserRouter>

    )
}
export default App
