import { Fragment, useRef } from 'react';
import IconEvent from '../../../assets/svg/IconEvent';

export default function ModalAddJobs({ info, onClose = () => {} }) {
    const refPopup = useRef(null);
    const { x, y, date, active } = info;

    if (!active) return;

    return (
        <Fragment>
            <div
                data-date={date}
                ref={refPopup}
                className="calendar-popup"
                style={{
                    position: 'fixed',
                    top: `${y}px`,
                    left: `${x}px`,
                    transform: 'translate(-50%, -105%)',
                    zIndex: 1001
                }}
            >
                <div className="items gap-5">
                    <div className="svg-11">
                        <IconEvent />
                    </div>
                    Custom Event
                </div>
            </div>

            <div className="modal__overlay --transparent" onClick={onClose}></div>
        </Fragment>
    );
}
