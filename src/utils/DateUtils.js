import { format } from 'date-fns';

export const formatShortTime = (date) => {
    return format(date, 'HH:mm');
};

export const formatTimeRange = (start, end) => {
    return `${formatShortTime(start)} - ${formatShortTime(end)}`;
};
