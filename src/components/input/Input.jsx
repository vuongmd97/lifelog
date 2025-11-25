import { useReducer, forwardRef, useImperativeHandle, useEffect } from 'react';
import { reducer } from '../../const/Reducer';

const Input = forwardRef(
    (
        {
            label,
            type,
            name,
            error,
            placeholder,
            classWrapper = '',
            classWrapperInput = '',
            classInput = '',
            classLabel = 'txt',
            initValue = '',
            isRequired,
            onChange = () => {},
            autoFocus = false,
            regexCheckNumber = null,
            ...restInputProps
        },
        ref
    ) => {
        const [state, dispatchState] = useReducer(reducer, {
            value: initValue,
            stateError: ''
        });

        const { value, stateError } = state;

        useEffect(() => {
            dispatchState({
                stateError: error
            });
        }, [error]);

        useImperativeHandle(ref, () => ({
            _getValue,
            _setValue,
            _setError
        }));

        const _getValue = () => {
            return value;
        };

        const _setValue = (value = '') => {
            dispatchState({
                value: value
            });
        };

        const _setError = (value = null) => {
            dispatchState({
                stateError: value
            });
        };

        const _onChange = (event) => {
            const { value } = event.target;

            switch (type) {
                case 'number':
                    if (regexCheckNumber) {
                        (regexCheckNumber.test(value) || value === '') &&
                            dispatchState({
                                value: value
                            });
                    } else {
                        !/^[a-zA-Z]$/.test(value) &&
                            dispatchState({
                                value: value
                            });
                    }
                    break;
                default:
                    dispatchState({
                        value: value
                    });
                    break;
            }

            onChange(event);
        };

        const renderInput = () => {
            const result = (
                <input
                    className={`field-input ${classInput} ${stateError ? '--error' : ''}`}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={_onChange}
                    {...restInputProps}
                />
            );

            return result;
        };

        const _renderLabel = () => {
            if (isRequired)
                return (
                    <div className={classLabel}>
                        {label} <span className="red-default">*</span>
                    </div>
                );
            return <div className={classLabel}>{label}</div>;
        };

        return (
            <div className={classWrapper || 'rows'}>
                {label && _renderLabel()}
                <div className={classWrapperInput}>{renderInput()}</div>
                {stateError && (
                    <span className="txt-incorrect">
                        {/* {isShowIconError ? <IconError /> : null} */}
                        {stateError}
                    </span>
                )}
            </div>
        );
    }
);

export default Input;
