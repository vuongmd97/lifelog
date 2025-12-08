import { useTranslation } from 'react-i18next';

//
import ButtonLoading from '../../../../components/loaders/ButtonLoading';

export default function FormEdit({ onClose }) {
    const { t } = useTranslation('settings');

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={onSubmit} className="form-editing">
            <div className="form-content"></div>

            <div className="form-footer d-flex justify-space-between mt-5">
                <div className="btn-default" onClick={onClose}>
                    {t('close')}
                </div>
                <button className="btn-main">
                    {t('save_changes')}
                    {/* {saveLoading && <ButtonLoading />} */}
                </button>
            </div>
        </form>
    );
}
