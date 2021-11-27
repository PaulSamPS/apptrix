import {Auth} from "./components/Auth/Auth";
import {UserList} from "./components/Panel/UserList";
import styles from "./App.module.scss";
import {Route, Routes} from "react-router-dom";
import {UserDetail} from "./components/CardDetail/UserDetail";

const App = () => {
    return (
        <div className={styles.wrapper}>
            <Routes>
                <Route path='/' element={<Auth/>}/>
                <Route path='panel' element={<UserList/>}/>
                <Route path='panel/:userId' element={<UserDetail/>}/>
            </Routes>
        </div>
    )
}
export default App
