import MisisLogoSVG from './assets/MISIS_logo.svg'
import classes from './HeaderLogoComp.module.scss'

export default function HeaderLogoComp() {
    return (
        <div className={classes.Header}>
            <img src={MisisLogoSVG} alt='MISIS_logo' className={classes.Logo} onClick={() => window.open('https://misis.ru/', '_blank')} />
        </div>
    )
}