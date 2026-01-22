import { forwardRef, useImperativeHandle, useReducer, useRef } from 'react';
import { reducer } from '../../../const/Reducer';
import { useDispatch } from 'react-redux';
import ReactModal from 'react-modal';
import { createEvent } from '../../redux/calendar/calendarSlice';

import SelectText from './components/SelectText';

import IconClose from '../../../assets/svg/IconClose';

const ModalCustomEvents = ({}, ref) => {
    const [state, dispatchState] = useReducer(reducer, {
        isOpen: false,
        isLoading: false,
        data: {
            start: '',
            end: ''
        }
    });
    const dispatch = useDispatch();

    const refTitle = useRef(null);

    const { isOpen, isLoading, data } = state;

    useImperativeHandle(ref, () => ({ _open, _getTimeRange }));

    const _open = () => {
        dispatchState({ isOpen: true });
    };

    const _close = () => {
        dispatchState({ isOpen: false });
    };

    const _getTimeRange = (start, end) => {
        dispatchState({
            data: {
                start,
                end
            }
        });
    };

    const handleSubmit = () => {
        const title = refTitle.current.getValue();
        const start = data.start;
        const end = data.end;

        dispatch(createEvent({ title, start, end }));
        _close();
    };

    if (!isOpen) return;
    return (
        <ReactModal isOpen className="modal --right modal-custom-events">
            <div className="modal__overlay" onClick={_close}></div>
            <div className="modal__container">
                <div className="modal-header">
                    <p className="header-title">Custom Events</p>
                    <div className="btn-default --icon-lg --transparent svg-11" onClick={_close}>
                        <IconClose />
                    </div>
                </div>

                <div className="modal-body">
                    <div className="custom-event">
                        <SelectText ref={refTitle} placeholder="Title" name="title" autoFocus />
                    </div>
                </div>

                <div className="modal-footer justify-space-between">
                    <div className="btn-default --transparent" onClick={_close}>
                        Cancel
                    </div>
                    <div className="btn-main" onClick={handleSubmit}>
                        Save
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default forwardRef(ModalCustomEvents);
