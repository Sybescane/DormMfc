import classes from './App.module.scss'
import HeaderLogoComp from '../../components/HeaderLogoComp/HeaderLogoComp';
import LoginComp from '../../components/LoginComp/LoginComp';
import TechSupportComp from '../../components/TechSupportComp/TechSupportComp';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { hideEmployeeLogin, showEmployeeLogin } from '../../redux/globalSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const isEmployeeLogin = useAppSelector(state => state.globalSlice.serviceData.isEmployeeLogin)
  const dispatch = useAppDispatch()
  const [isEmployeeActive, setIsEmployeeActive] = useState(false)
  const navigate = useNavigate()

  function employeeLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isEmployeeActive) return
    else {
      navigate('/admin')
    }
  }
  function validateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    if (/^m\d{7}@misis\.edu\.ru$/.test(e.currentTarget.value)) {
      setIsEmployeeActive(true)
      console.log('match')
    }
    else {
      setIsEmployeeActive(false)
      console.log('not match')
    }
  }

  return (
    <div className={isEmployeeLogin ? `${classes.AppOverlay}` : `${classes.App}`}>
      <div className={classes.LoginWrapper}>
        <div className={classes.HeaderWrapper}>
          <HeaderLogoComp />
        </div>
        <LoginComp />
        <TechSupportComp />
      </div>
      {isEmployeeLogin &&
        <div className={classes.EmployeeLogin}>
          <svg className={classes.Cross} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => dispatch(hideEmployeeLogin())}>
            <path d="M10.7581 21.2428L16.0011 15.9998L21.2441 21.2428M21.2441 10.7568L16.0001 15.9998L10.7581 10.7568" stroke="#2C3E50" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#2C3E50" stroke-opacity="0.12" />
          </svg>
          <h1>Вход для сотрудников</h1>
          <form id='employee_form' method='post' onSubmit={(e) => employeeLogin(e)}>
            <div className={classes.LoginInput}>
              <label htmlFor="employee_login">Логин</label>
              <input type="text" id='employee_login' name='employee_login' required autoFocus placeholder='m2300000@misis.edu.ru' onChange={e => validateEmail(e)} />
            </div>
            <div className={classes.PasswordInput}>
              <label htmlFor="employee_password">Пароль</label>
              <input type="password" id='employee_password' name='employee_password' required />
            </div>
            <button type='submit' className={isEmployeeActive ? `${classes.EmployeeActiveBtn}` : ''}>Войти</button>
          </form>
        </div>
      }
    </div>
  );
}

export default App;
