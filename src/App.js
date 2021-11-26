import {Auth} from "./components/Auth/Auth";
import {useSelector} from "react-redux";
import {Panel} from "./components/Panel/Panel";
import styles from "./App.module.scss";

const App = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    return (
        <div className={styles.wrapper}>
          {!isAuth ? <Auth/> : <Panel/>}
        </div>
    )
}
export default App
