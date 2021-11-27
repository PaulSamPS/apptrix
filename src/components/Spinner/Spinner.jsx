import styles from './Spinner.module.scss'

export const Spinner = () => {
    return (
        <div className={styles.spinnerCenter}>
            <div className={styles.spinner}></div>
        </div>
    )
}