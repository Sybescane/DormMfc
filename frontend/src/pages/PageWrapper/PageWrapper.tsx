import { useNavigate } from "react-router-dom";
import ControlPanelComp from "../../components/ControlPanel/ControlPanelComp";
import EnrollStepsComp from "../../components/EnrollStepsComp/EnrollStepsComp";
import HeaderEnrollComp from "../../components/HeaderEnrollComp/HeaderEnrollComp";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { hideCalendar, showAddEnroll, showPopup } from "../../redux/globalSlice";
import classes from './PageWrapper.module.scss';
import { ReactNode, useRef, useEffect, useState } from "react";
import axios from "axios";
import { requestErrorHandler } from "../../utils/requestErrorsHandler";
import { addBusyTime, addNewStudent } from "../../redux/adminSlice";
import { ReactComponent as WhiteSpinner } from '../../assets/white_spinner.svg'
import { axiosRequest } from "../../configs/axiosConfig";
import { getTimeDate } from "../../utils/getTimeDate";
import AddEnrollComp from "../../components/AddEnrollComp/AddEnrollComp";

export default function PageWrapper({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const wrapperRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const isButtonsShow = /(registered|admin)/.test(window.location.href)
    const institute = useAppSelector(state => state.globalSlice.userData.faculty)
    const email = useAppSelector(state => state.globalSlice.userData.email)
    const adminToken = useAppSelector(state => state.adminSlice.token)
    const isNewEnroll = useAppSelector(state => state.globalSlice.serviceData.isAddEnroll)

    function wrapperClick(e: React.MouseEvent) {
        dispatch(hideCalendar())
        dispatch(showPopup({ event: e, isShow: false, type: 'checkInPopup' }))
        dispatch(showPopup({
            event: e,
            isShow: false,
            type: 'busyWarning'
        }))
    }

    useEffect(() => {
        if (/registered/.test(window.location.href)) {
            switch (institute) {
                case 'ИНМИН':
                    wrapperRef.current?.classList.add(`${classes.INMIN}`)
                    break;
                case 'ЭКОТЕХ':
                    wrapperRef.current?.classList.add(`${classes.EKOKEK}`)
                    break
                case 'ЭУПП':
                    wrapperRef.current?.classList.add(`${classes.EUPP}`)
                    break;
                case 'ИБО':
                    wrapperRef.current?.classList.add(`${classes.IBO}`)
                    break;
                case 'ИТКН':
                    wrapperRef.current?.classList.add(`${classes.ITKN}`)
                    break
                case 'ГОРНЫЙ':
                    wrapperRef.current?.classList.add(`${classes.GORNIY}`)
                    break
            }
        }
    }, [window.location.href])

    useEffect(() => {
        if (!/admin/.test(window.location.href)) {
            if (!email) {
                navigate("/")
            }
        }
        else {
            if (!adminToken) {
                navigate('/')
            }
        }
    }, [email, adminToken])

    return (
        <div className={isNewEnroll ? `${classes.WrapperOverlay}` : `${classes.Wrapper}`} onClick={(e) => wrapperClick(e)} ref={wrapperRef}>
            <HeaderEnrollComp />
            {!/admin/.test(window.location.href) && <EnrollStepsComp />}
            <main>{children}</main>
            {!isButtonsShow && <ControlPanelComp />}
            {isNewEnroll && <AddEnrollComp />}
        </div >
    )
}