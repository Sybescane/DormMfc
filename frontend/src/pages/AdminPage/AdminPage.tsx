import classes from './AdminPage.module.scss'
import CalendarComp from '../../components/CalendarComp/CalendarComp'

export default function AdminPage() {

    return (
        <div className={classes.Wrapper}>
            <h1>Список зарегестрированных студентов</h1>
            <div className={classes.Controls}>
                <div className={classes.InputsBlock}>
                    <CalendarComp />
                    <select name="dorm" id="dorm">
                        <option value="М-1">М-1</option>
                        <option value="М-2">М-2</option>
                        <option value="М-3">М-3</option>
                        <option value="М-4">М-4</option>
                        <option value="Г-1">Г-1</option>
                        <option value="Г-2">Г-2</option>
                        <option value="ДСГ-5,6">ДСГ-5,6</option>
                    </select>
                </div>
                <button type='button' className={`${classes.AddStudent} DefaultButton_2`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7H7M7 7H13M7 7V1M7 7V13" stroke="#1D92F8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p>Добавить запись</p>
                </button>
            </div>
        </div>
    )
}