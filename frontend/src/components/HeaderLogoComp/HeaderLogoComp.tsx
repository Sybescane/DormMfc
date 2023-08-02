import MisisLogoSVG from './assets/MISIS_logo.svg'
import classes from './HeaderLogoComp.module.scss'

export default function HeaderLogoComp() {
    return (
        <div className={classes.Header}>
            <img src={MisisLogoSVG} alt='MISIS_logo' className={classes.Logo} />
            <a href="#">РУС</a>
            <a href="#">ENG</a>
        </div>
    )
}