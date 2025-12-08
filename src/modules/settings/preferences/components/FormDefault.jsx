import { useTranslation } from 'react-i18next';

export default function FormDefault({ onEdit }) {
    const { t } = useTranslation('settings');

    const _renderRows = (label, desc) => {
        return (
            <>
                {!!desc && (
                    <div className="rows">
                        <div className="rows__label">{label}</div>
                        <div className="rows__info">{desc}</div>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="form-default">
            <div className="form-header">
                <div></div>
                <div className="btn-default" onClick={onEdit}>
                    {t('edit')}
                </div>
            </div>
            <div className="form-content">
                {_renderRows(t('timezone'), 'test')}
                {_renderRows(t('date_format'), 'test')}
                {_renderRows(t('show_holiday_is'), 'test')}
                {_renderRows(t('language'), 'test')}
            </div>
        </div>
    );
}
