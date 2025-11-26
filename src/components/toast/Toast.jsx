import { useEffect } from 'react';
import IconClose from '../../assets/svg/IconClose';

export const Toast = ({ desc = '', status = 'errors', duration = 3000, onClose = () => {} }) => {
    useEffect(() => {
        if (!desc) return;

        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [desc, duration, onClose]);

    if (!desc) return null;

    return (
        <div className={`alert --${status}`}>
            <p className="alert__description">{desc}</p>
            <button
                className="alert__btn btn-default --icon-sm --transparent svg-10"
                onClick={onClose}
                type="button"
                aria-label="Close notification"
            >
                <IconClose />
            </button>
        </div>
    );
};
