import ControlPanelComp from "../../components/ControlPanel/ControlPanelComp";
import EnrollStepsComp from "../../components/EnrollStepsComp/EnrollStepsComp";
import HeaderEnrollComp from "../../components/HeaderEnrollComp/HeaderEnrollComp";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { hideCalendar, showCheckInPopup } from "../../redux/globalSlice";
import classes from './PageWrapper.module.scss';
import { ReactNode, useEffect, useRef } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const isButtonsShow = /(registered|admin)/.test(window.location.href)

    function wrapperClick(e: React.MouseEvent) {
        dispatch(hideCalendar())
        dispatch(showCheckInPopup({ event: e, isShow: false }))
    }

    /* useEffect(() => {
         if (/registered/.test(window.location.href)) {
             switch (college) {
                 case "ИНМИН":
                     wrapperRef.current?.classList.add(`${classes.INMIN}`)
                     break;
                 case "ЭКОТЕХ":
                     wrapperRef.current?.classList.add(`${classes.EKOKEK}`)
                     break;
                 case "ИБО":
                     wrapperRef.current?.classList.add(`${classes.IBO}`)
                     break;
                 case "ГОРНЫЙ":
                     wrapperRef.current?.classList.add(`${classes.GORNIY}`)
                     break;
                 case "ИТКН":
                     wrapperRef.current?.classList.add(`${classes.ITKN}`)
                     break;
                 case "ЭУПП":
                     wrapperRef.current?.classList.add(`${classes.EUPP}`)
                     break;
             }
         }
     }, [enrollStep])*/

    return (
        <div className={classes.Wrapper} onClick={(e) => wrapperClick(e)} ref={wrapperRef}>
            <HeaderEnrollComp />
            {!/admin/.test(window.location.href) && <EnrollStepsComp />}
            <main>{children}</main>
            {!isButtonsShow && <ControlPanelComp />}
        </div>
    )
}