import { useReducer, useRef } from 'react';
import classNames from 'classnames';
import { reducer } from '../../const/Reducer';
import DropdownPopper from './DropdownPopper';
import IconArrow from '../../assets/svg/IconArrow';

const DropdownSingleSelect = (props) => {
    const { options = [], defaultSelect = {}, onSelect = () => {} } = props;
    const [state, dispatchState] = useReducer(reducer, { selected: defaultSelect });
    const { selected } = state;
    const refDropdown = useRef(null);

    const handleSelect = (opt) => {
        refDropdown.current?._close();
        dispatchState({ selected: opt });
        onSelect(opt);
    };

    return (
        <DropdownPopper ref={refDropdown} customButton={<CustomButton selected={selected} />}>
            <ListItems options={options} selected={selected} onClick={handleSelect} />
        </DropdownPopper>
    );
};

const CustomButton = ({ selected = {} }) => {
    return (
        <>
            <span className="txt-ellipsis">{selected.label}</span>
            <span className="arrow">
                <IconArrow />
            </span>
        </>
    );
};

const ListItems = ({ options = [], selected = {}, onClick = () => {} }) => {
    if (options.length === 0) return null;

    return (
        <ul>
            {options.map((opt) => {
                const active =
                    selected.id != null && opt.id != null ? opt.id === selected.id : opt.value === selected.value;

                return (
                    <li
                        key={opt.id ?? opt.value}
                        onClick={() => onClick(opt)}
                        className={classNames('items', { active })}
                    >
                        <span className="txt-ellipsis">{opt.label}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default DropdownSingleSelect;
