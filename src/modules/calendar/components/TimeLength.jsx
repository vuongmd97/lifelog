import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import DropdownSingleSelect from '../../../components/dropdowns/DropdownSingleSelect';

const DEFAULT_SELECTED = { name: '00', value: 0 };
const UNIT_HOURS = 'h';
const UNIT_MINUTES = 'm';

export const TimeLength = forwardRef(({ initialMinutes, initialHours, onTimeChange }, ref) => {
    const refHoursSelected = useRef(initialHours ? HOURS.find((h) => h.value === initialHours) : DEFAULT_SELECTED);
    const refMinutesSelected = useRef(
        initialMinutes ? MINUTES.find((m) => m.value === initialMinutes) : DEFAULT_SELECTED
    );

    useImperativeHandle(ref, () => ({
        getValue: () => ({
            hours: refHoursSelected.current.value,
            minutes: refMinutesSelected.current.value
        })
    }));

    const handleSelect = (unit, value) => {
        if (unit === UNIT_HOURS) {
            refHoursSelected.current = value;
            onTimeChange?.();
        }
        if (unit === UNIT_MINUTES) {
            refMinutesSelected.current = value;
            onTimeChange?.();
        }
    };

    return (
        <div className="flexcenter gap-5">
            <span>Length</span>
            <div className="choosetime">
                <DropdownTime
                    id="hours"
                    unit="h"
                    subText="hrs"
                    options={HOURS}
                    defaultValue={refHoursSelected.current}
                    onSelect={handleSelect}
                />
                <DropdownTime
                    id="minutes"
                    unit="m"
                    subText="mins"
                    options={MINUTES}
                    defaultValue={refMinutesSelected.current}
                    onSelect={handleSelect}
                />
            </div>
        </div>
    );
});

const DropdownTime = ({ unit, subText = '', defaultValue = DEFAULT_SELECTED, options = [], onSelect = () => {} }) => {
    const [selected, setSelected] = useState(defaultValue);

    const mappedOptions = options.map((opt) => ({
        label: `${opt.name} ${subText}`.trim(),
        value: opt.value
    }));

    const handleSelect = (value) => {
        const newSelected = options.find((opt) => opt.value === value);
        setSelected(newSelected);
        onSelect(unit, newSelected);
    };

    return (
        <div className="from-time">
            <DropdownSingleSelect options={mappedOptions} defaultSelect={selected} onSelect={handleSelect} />
        </div>
    );
};

const HOURS = [
    { name: '00', value: 0 },
    { name: '01', value: 1 },
    { name: '02', value: 2 },
    { name: '03', value: 3 },
    { name: '04', value: 4 },
    { name: '05', value: 5 },
    { name: '06', value: 6 },
    { name: '07', value: 7 },
    { name: '08', value: 8 },
    { name: '09', value: 9 },
    { name: '10', value: 10 },
    { name: '11', value: 11 },
    { name: '12', value: 12 },
    { name: '13', value: 13 },
    { name: '14', value: 14 },
    { name: '15', value: 15 },
    { name: '16', value: 16 },
    { name: '17', value: 17 },
    { name: '18', value: 18 },
    { name: '19', value: 19 },
    { name: '20', value: 20 },
    { name: '21', value: 21 },
    { name: '22', value: 22 },
    { name: '23', value: 23 }
];

const MINUTES = [
    { name: '00', value: 0 },
    { name: '05', value: 5 },
    { name: '10', value: 10 },
    { name: '15', value: 15 },
    { name: '20', value: 20 },
    { name: '25', value: 25 },
    { name: '30', value: 30 },
    { name: '35', value: 35 },
    { name: '40', value: 40 },
    { name: '45', value: 45 },
    { name: '50', value: 50 },
    { name: '55', value: 55 }
];
