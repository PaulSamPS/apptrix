import styles from './Button.module.scss'

export const Button = ({children,...props}) => {
    return (
        <button className={styles.btn} {...props}>
            {children}
        </button>
    )
}