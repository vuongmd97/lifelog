import IconClose from '../../../assets/svg/IconClose';
import IconTrash from '../../../assets/svg/IconTrash';
import IconPen from '../../../assets/svg/IconPen';
import IconDescription from '../../../assets/svg/IconDescription';
import IconLocation from '../../../assets/svg/IconLocation';
import IconCalendar from '../../../assets/svg/IconCalendar';
import { formatTimeRange } from '../../../utils/DateUtils';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearPreviewEvent,
    closeCustomEventModal,
    deleteEvent,
    selectPreviewEvent
} from '../../redux/calendar/calendarSlice';

export const CustomEventPreview = ({ onOpenEdit = () => {} }) => {
    const previewEvent = useSelector(selectPreviewEvent);
    const dispatch = useDispatch();

    if (!previewEvent) return;

    const { title, color, start, end, description, location, id } = previewEvent;

    const _handleDeleteEvent = () => {
        dispatch(deleteEvent(id));
    };

    const _handleOpenEditEvent = () => {
        _handleOpenEditEvent(previewEvent);
    };

    const _handleClosePreview = () => {
        dispatch(clearPreviewEvent());
        dispatch(closeCustomEventModal());
    };

    return (
        <div className="custom-event">
            <div className="custom-event__header">
                <p className="event-label">Custom Event</p>

                <div className="btn-default --icon-lg svg-9" onClick={onOpenEdit}>
                    <IconPen />
                </div>
                <div className="btn-default --icon-lg svg-9" onClick={_handleDeleteEvent}>
                    <IconTrash />
                </div>
                <div className="btn-default --icon-lg svg-9" onClick={_handleClosePreview}>
                    <IconClose />
                </div>
            </div>

            <div className="row">
                <div className="row__icon svg-9">
                    <span className="dots" style={{ backgroundColor: color }}></span>
                </div>
                <div className="row__details">
                    <p className="preview-label">{title}</p>
                </div>
            </div>

            <div className="row">
                <div className="row__icon svg-9">
                    <IconCalendar />
                </div>
                <div className="row__details">
                    <div className="range-time">{formatTimeRange(start, end)}</div>
                </div>
            </div>

            {!!description && (
                <div className="row">
                    <div className="row__icon svg-9">
                        <IconDescription />
                    </div>
                    <div className="row__details">
                        <p className="preview-label" style={{ whiteSpace: 'pre-wrap' }}>
                            {description}
                        </p>
                    </div>
                </div>
            )}

            {!!location && (
                <div className="row">
                    <div className="row__icon svg-9">
                        <IconLocation />
                    </div>
                    <div className="row__details">
                        <p className="preview-label" style={{ whiteSpace: 'pre-wrap' }}>
                            {location}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
