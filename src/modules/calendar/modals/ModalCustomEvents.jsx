import { forwardRef, useImperativeHandle, useReducer, useRef } from 'react';
import Sketch from '@uiw/react-color-sketch';
import TextareaAutosize from 'react-textarea-autosize';
import { reducer } from '../../../const/Reducer';
import { useDispatch } from 'react-redux';
import { createEvent, updateEvent } from '../../redux/calendar/calendarSlice';
import ReactModal from 'react-modal';

import SelectText from './components/SelectText';

import IconClose from '../../../assets/svg/IconClose';
import useClickOutside from '../../../hook/useClickOutside';
import IconLocation from '../../../assets/svg/IconLocation';
import IconDescription from '../../../assets/svg/IconDescription';
import IconCalendar from '../../../assets/svg/IconCalendar';
import { TimeLength } from '../components/TimeLength';
import { formatTimeRange } from '../../../utils/DateUtils';

const INITIAL_DATA = {
    title: '',
    start: '',
    end: '',
    color: '#c827dd',
    location: '',
    description: ''
};

const ModalCustomEvents = (_, ref) => {
    const [state, dispatchState] = useReducer(reducer, {
        isOpen: false,
        data: INITIAL_DATA,
        editingId: null
    });
    const dispatch = useDispatch();

    const refTitle = useRef(null);
    const refTimeLength = useRef(null);

    const { isOpen, data, editingId } = state;

    const [refColorPicker, isVisible, setIsVisible] = useClickOutside(false);

    const showColorPicker = (e) => {
        e && e.stopPropagation();
        setIsVisible(!isVisible);
    };

    useImperativeHandle(ref, () => ({ _open, _getTimeRange, _openEdit }));

    const _open = () => {
        dispatchState({
            isOpen: true,
            editingId: null
        });
    };

    const _openEdit = (event) => {
        dispatchState({
            isOpen: true,
            data: {
                ...event,
                color: event.backgroundColor || event.color
            },
            editingId: event.id
        });
    };

    const _close = () => {
        dispatchState({
            isOpen: false,
            data: INITIAL_DATA,
            editingId: null
        });
    };

    const _getTimeRange = (start, end) => {
        dispatchState({
            data: {
                ...data,
                start,
                end
            }
        });
    };

    const handleSubmit = () => {
        const title = refTitle.current.getValue();
        const start = data.start;
        const end = data.end;
        const color = data.color;
        const location = data.location;
        const description = data.description;

        if (!title) return;

        const payload = { title, start, end, color, location, description };

        if (editingId) {
            dispatch(updateEvent({ id: editingId, ...payload }));
        } else {
            dispatch(createEvent(payload));
        }

        _close();
    };

    const getTitle = () => {
        return editingId ? 'Edit Custom Event' : 'Custom Event';
    };

    const start = new Date(data.start);
    const end = new Date(data.end);
    const diffMin = (end - start) / 60000;
    const initialHours = Math.max(0, Math.min(23, Math.floor(diffMin / 60)));
    const initialMinutes = diffMin % 60;

    const handleTimeChange = () => {
        if (!refTimeLength.current) return;
        const { hours, minutes } = refTimeLength.current.getValue();
        const totalMin = hours * 60 + minutes;

        dispatchState((prev) => {
            const startDate = new Date(prev.data.start);
            const endDate = new Date(startDate.getTime() + totalMin * 60_000);
            return {
                ...prev,
                data: {
                    ...prev.data,
                    end: endDate.toISOString()
                }
            };
        });
    };

    if (!isOpen) return;

    return (
        <ReactModal isOpen className="modal --right modal-custom-events">
            <div className="modal__overlay" onClick={_close}></div>
            <div className="modal__container">
                <div className="modal-header">
                    <p className="header-title">{getTitle()}</p>
                    <div className="btn-default --icon-lg --transparent svg-11" onClick={_close}>
                        <IconClose />
                    </div>
                </div>

                <div className="modal-body">
                    <div className="custom-event">
                        <SelectText
                            ref={refTitle}
                            defaultValue={data?.title || ''}
                            placeholder="Title"
                            name="title"
                            autoFocus
                        />

                        <div className="row">
                            <div className="row__icon svg-9">
                                <IconCalendar />
                            </div>
                            <div className="row__details">
                                <div className="range-time">{formatTimeRange(data.start, data.end)}</div>
                                <TimeLength
                                    ref={refTimeLength}
                                    initialMinutes={initialMinutes}
                                    initialHours={initialHours}
                                    onTimeChange={handleTimeChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="row__icon svg-9">
                                <span className="dots" style={{ backgroundColor: data.color }}></span>
                            </div>
                            <div className="row__details">
                                <input
                                    type="text"
                                    className="field-input --transparent text-uppercase"
                                    readOnly
                                    value={data.color}
                                    onClick={showColorPicker}
                                />

                                {isVisible && (
                                    <div className="color-picker" ref={refColorPicker}>
                                        <div
                                            className="color-picker__close btn-default --icon-sm svg-9"
                                            onClick={showColorPicker}
                                        >
                                            <IconClose />
                                        </div>
                                        <Sketch
                                            disableAlpha
                                            color={data.color}
                                            onChange={(color) => {
                                                dispatchState({
                                                    data: {
                                                        ...data,
                                                        color: color.hex
                                                    }
                                                });
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="row__icon svg-9">
                                <IconLocation />
                            </div>
                            <div className="row__details">
                                <TextareaAutosize
                                    type="text"
                                    className="field-textarea --transparent"
                                    placeholder="Location"
                                    value={data.location}
                                    onChange={(e) =>
                                        dispatchState({
                                            data: {
                                                ...data,
                                                location: e.target.value
                                            }
                                        })
                                    }
                                ></TextareaAutosize>
                            </div>
                        </div>

                        <div className="row">
                            <div className="row__icon svg-9">
                                <IconDescription />
                            </div>
                            <div className="row__details">
                                <TextareaAutosize
                                    type="text"
                                    className="field-textarea --transparent"
                                    placeholder="Description"
                                    value={data.description}
                                    onChange={(e) =>
                                        dispatchState({
                                            data: {
                                                ...data,
                                                description: e.target.value
                                            }
                                        })
                                    }
                                ></TextareaAutosize>
                            </div>
                        </div>
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
