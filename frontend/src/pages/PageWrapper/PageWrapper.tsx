import ControlPanelComp from "../../components/ControlPanel/ControlPanelComp";
import EnrollStepsComp from "../../components/EnrollStepsComp/EnrollStepsComp";
import HeaderEnrollComp from "../../components/HeaderEnrollComp/HeaderEnrollComp";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { hideCalendar, showPopup } from "../../redux/globalSlice";
import classes from './PageWrapper.module.scss';
import { ReactNode, useEffect, useRef } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const isButtonsShow = /(registered|admin)/.test(window.location.href)

    function wrapperClick(e: React.MouseEvent) {
        dispatch(hideCalendar())
        dispatch(showPopup({ event: e, isShow: false, type: 'checkInPopup' }))
        dispatch(showPopup({
            event: e,
            isShow: false,
            type: 'busyWarning'
        }))
    }

    return (
        <div className={classes.Wrapper} onClick={(e) => wrapperClick(e)} ref={wrapperRef}>
            <HeaderEnrollComp />
            {!/admin/.test(window.location.href) && <EnrollStepsComp />}
            <main>{children}</main>
            <div className={classes.FooterPlaceholder}></div>
            {!isButtonsShow && <ControlPanelComp />}
        </div>
    )
}