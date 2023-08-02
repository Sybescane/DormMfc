import { useEffect, useState } from 'react';
import classes from './LoginComp.module.scss'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { showEmployeeLogin } from '../../redux/globalSlice';

export default function LoginComp() {
    const navigate = useNavigate()
    const [isStudActive, setIsStudActive] = useState(false)
    const dispatch = useAppDispatch()
    const isEmployeeLogin = useAppSelector(state => state.globalSlice.serviceData.isEmployeeLogin)

    function validateEmail(e: React.ChangeEvent<HTMLInputElement>) {
        if (/^m\d{7}(@misis\.edu\.ru)?$/.test(e.currentTarget.value)) {
            setIsStudActive(true)
        }
        else setIsStudActive(false)
    }
    function sendStudEmail() {
        if (isStudActive) navigate('/enrollment')
    }

    return (
        <form action="#" className={classes.Form}>
            <h1>Регистрация на заселение в общежитие</h1>
            <label htmlFor="MISIS email">Введите вашу корпоративную почту</label>
            <div className={classes.FormControls}>
                <InputGroup className={`mb-3`}>
                    <Form.Control
                        className={isEmployeeLogin ? `${classes.InputStud}` : ''}
                        placeholder="m2300000"
                        aria-label="MISIS email"
                        aria-describedby="basic-addon2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateEmail(e)}
                    />
                    <InputGroup.Text id="basic-addon2" className={isEmployeeLogin ? `${classes.InputClue} ${classes.InputStud}` : `${classes.InputClue}`}>@misis.edu.ru</InputGroup.Text>
                </InputGroup>
                <button type="button" onClick={() => sendStudEmail()} className={isStudActive ? `${classes.ActiveStudent}` : `${classes.InactiveStudent}`}>Отправить код на почту</button>
                <button type="button" className={classes.WhiteBtn} onClick={(e) => dispatch(showEmployeeLogin())}>Войти как сотрудник</button>
            </div>
        </form>
    )
}