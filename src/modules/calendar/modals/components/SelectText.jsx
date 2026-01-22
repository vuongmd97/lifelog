import { forwardRef, useRef, useImperativeHandle } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import IconTitle from '../../../../assets/svg/IconTitle';

const SelectText = ({ icon = null, isTextarea = false, defaultValue = '', ...props }, ref) => {
    const refValue = useRef(null);

    useImperativeHandle(ref, () => ({ getValue: () => refValue.current.value }));

    return (
        <div className="row">
            <div className="row__icon svg-9">{icon || <IconTitle />}</div>
            <div className="row__details">
                {isTextarea ? (
                    <TextareaAutosize
                        ref={refValue}
                        type="text"
                        className="field-control field-input --transparent"
                        defaultValue={defaultValue}
                        {...props}
                    />
                ) : (
                    <input
                        ref={refValue}
                        type="text"
                        className="field-input --transparent"
                        defaultValue={defaultValue}
                        {...props}
                    />
                )}
            </div>
        </div>
    );
};

export default forwardRef(SelectText);
