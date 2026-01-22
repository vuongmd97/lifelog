import { Fragment, useRef } from 'react';
import IconEvent from '../../../assets/svg/IconEvent';
import { EVENT_TYPES } from '../const';

export default function ModalAddJobs({ data, onCreateEvent = () => {}, onClose = () => {} }) {
    const refPopup = useRef(null);
    const { x, y, date, active } = data;

    const _handleSelect = (type) => {
        switch (type) {
            case EVENT_TYPES.JOB:
                break;
            case EVENT_TYPES.EVENT:
                onCreateEvent();
                break;
            default:
                break;
        }
    };

    if (!active) return;
    return (
        <Fragment>
            <div
                ref={refPopup}
                className="calendar-popup"
                style={{
                    position: 'fixed',
                    top: `${y}px`,
                    left: `${x}px`,
                    transform: 'translate(-50%, -110%)',
                    zIndex: 1001
                }}
            >
                <div className="items gap-5" onClick={() => _handleSelect(EVENT_TYPES.EVENT)}>
                    <div className="svg-10">
                        <IconEvent />
                    </div>
                    Custom Event
                </div>
            </div>

            <div className="modal__overlay --transparent" onClick={onClose}></div>
        </Fragment>
    );
}
