import { useAppSelector } from "../../hooks"
import classes from './DormDescriptionComp.module.scss'

export default function DormDescriptionComp() {
    const dormitory = useAppSelector(state => state.globalSlice.userData.dormitory)
    const contacts = useAppSelector(state => state.globalSlice.userData.contacts)

    return (
        <div className={classes.Wrapper}>
            <div className={classes.Content}>
                <h3>Вы распределены в общежитие {dormitory.name}</h3>
                <div className={classes.Info}>
                    <div className={classes.NameAddress}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 10C20 14.418 12 22 12 22C12 22 4 14.418 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#2C3E50" strokeOpacity="0.56" />
                            <path d="M12 11C12.2652 11 12.5196 10.8946 12.7071 10.7071C12.8946 10.5196 13 10.2652 13 10C13 9.73478 12.8946 9.48043 12.7071 9.29289C12.5196 9.10536 12.2652 9 12 9C11.7348 9 11.4804 9.10536 11.2929 9.29289C11.1054 9.48043 11 9.73478 11 10C11 10.2652 11.1054 10.5196 11.2929 10.7071C11.4804 10.8946 11.7348 11 12 11Z" fill="#2C3E50" fillOpacity="0.56" stroke="#2C3E50" strokeOpacity="0.56" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                            <p>&#171;{dormitory.name}&#187;</p>
                            <strong>{dormitory.address}</strong>
                        </div>
                    </div>
                    <div className={classes.Contacts}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.9217 14.702L13.8037 15.5C11.0217 14.104 9.3037 12.5 8.3037 10L9.0737 5.87L7.6187 2H3.8677C2.7397 2 1.8517 2.932 2.0207 4.047C2.4407 6.83 3.6807 11.877 7.3037 15.5C11.1087 19.305 16.5897 20.956 19.6057 21.613C20.7707 21.866 21.8037 20.958 21.8037 19.765V16.181L17.9217 14.702Z" stroke="#2C3E50" strokeOpacity="0.56" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className={classes.ContactsInfo}>
                            <p>{contacts.phone}</p>
                            <p>{`${contacts.position}, ${contacts.fullname}`}</p>
                        </div>

                    </div>
                </div>
                <div className={classes.Description}>
                    <p>{dormitory.description}</p>
                </div>
            </div>
            <Map />
        </div >
    )
}

function Map() {
    const dormitory = useAppSelector(state => state.globalSlice.userData.dormitory.name)
    switch (dormitory) {
        case 'М-1':
            return (
                <iframe style={{ borderRadius: '16px' }} src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b166ec03ca4faffd6f64dd0f34adce124a0021a785b36b34a080e398516c89c&amp;source=constructor" width="560" height="300" frameBorder="0"></iframe>
            )
        case 'М-2':
            return (
                <iframe style={{ borderRadius: '16px' }} src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b166ec03ca4faffd6f64dd0f34adce124a0021a785b36b34a080e398516c89c&amp;source=constructor" width="560" height="300" frameBorder="0"></iframe>
            )
        case 'М-3':
            return (
                <iframe style={{ borderRadius: '16px' }} src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b166ec03ca4faffd6f64dd0f34adce124a0021a785b36b34a080e398516c89c&amp;source=constructor" width="560" height="300" frameBorder="0"></iframe>
            )
        case 'М-4':
            return (
                <iframe style={{ borderRadius: '16px' }} src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b166ec03ca4faffd6f64dd0f34adce124a0021a785b36b34a080e398516c89c&amp;source=constructor" width="560" height="300" frameBorder="0"></iframe>
            )
        case 'Г-1':
            return (
                <iframe style={{ borderRadius: '16px' }} src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b166ec03ca4faffd6f64dd0f34adce124a0021a785b36b34a080e398516c89c&amp;source=constructor" width="560" height="300" frameBorder="0"></iframe>
            )
        case 'Г-2':
            return (
                <iframe style={{ borderRadius: '16px' }} src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b166ec03ca4faffd6f64dd0f34adce124a0021a785b36b34a080e398516c89c&amp;source=constructor" width="560" height="300" frameBorder="0"></iframe>
            )
        case 'ДСГ-5,6':
            return (
                <iframe style={{ borderRadius: '16px' }} src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b166ec03ca4faffd6f64dd0f34adce124a0021a785b36b34a080e398516c89c&amp;source=constructor" width="560" height="300" frameBorder="0"></iframe>
            )
        case 'ДК':
            return (
                <iframe style={{ borderRadius: '16px' }} src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b166ec03ca4faffd6f64dd0f34adce124a0021a785b36b34a080e398516c89c&amp;source=constructor" width="560" height="300" frameBorder="0"></iframe>
            )
        default:
            return <></>
    }
}