import classes from './ProfileBlockComp.module.scss'
import UserIconSVG from './assets/user_icon.svg'

export default function ProfileBlockComp() {
    return (
        <div className={classes.Wrapper}>
            <img src={UserIconSVG} alt="user_icon" />
            <div className={classes.EmailExit}>
                <p>m2306825@edu.misis.ru</p>
                <a href="#">ВЫЙТИ</a>
            </div>
        </div>
    )
}