import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
//
import './css/styles.scss';

export default function NotFoundPage() {
    const { t } = useTranslation(['common']);

    return (
        <div className="errors-page">
            <div className="flex-column align-center gap-10">
                <h1 className="title fs-7">{t('oops')}</h1>
                <p className="txt fs-3">{t('page_not_found')}</p>

                <Link to="/" className="btn-default">
                    {t('go_to_calendar')}
                </Link>
            </div>
        </div>
    );
}
