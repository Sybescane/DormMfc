import classes from './TechSupportComp.module.scss'

export default function TechSupportComp() {
    return (
        <div className={classes.Wrapper}>
            <p>Телефон тех. поддержки</p>
            <a href="tel:+79504777777">8 &#40;950&#41; 477-7777</a>
        </div>
    )
}