import classNames from 'classnames';
import { forwardRef, useImperativeHandle, useRef, cloneElement, useEffect } from 'react';
import { usePopper } from 'react-popper';
import useClickOutside from '../../hook/useClickOutside';
//
import IconArrow from '../../assets/svg/IconArrow';

const DropdownPopper = forwardRef(
    (
        {
            children,
            wrapperClassName = 'dropdown',
            wrapperListClass = 'dropdown__menu scrolls',
            buttonClassName = 'btn-default',
            dropdownIcon = <IconArrow />,
            customButton = null,
            placement = 'bottom-start',
            strategy = 'fixed',
            modifiers = null
        },
        ref
    ) => {
        const refPreference = useRef(null);
        const refPopper = useRef(null);

        const [refDropdownPopper, isVisible, setIsVisible] = useClickOutside(false);

        const sameWidth = {
            name: 'sameWidth',
            enabled: true,
            phase: 'beforeWrite',
            requires: ['computeStyles'],
            fn: ({ state }) => {
                state.styles.popper.width = `${state.rects.reference.width}px`;
            },
            effect: ({ state }) => {
                state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
            }
        };

        const defaultModifiers = [{ name: 'offset', options: { offset: [0, 5] } }, sameWidth];

        const { styles, attributes, update } = usePopper(refPreference.current, refPopper.current, {
            placement,
            strategy,
            modifiers: modifiers || defaultModifiers
        });

        useEffect(() => {
            if (isVisible) {
                update?.();
            }
        }, [isVisible, update]);

        useImperativeHandle(ref, () => ({
            _open,
            _close,
            _toggle
        }));

        const _open = (e) => {
            e && e.stopPropagation();
            setIsVisible(true);
        };

        const _close = (e) => {
            e && e.stopPropagation();
            setIsVisible(false);
        };

        const _toggle = (e) => {
            e && e.stopPropagation();
            setIsVisible(!isVisible);
        };

        return (
            <div ref={refDropdownPopper} className={classNames(wrapperClassName, { active: isVisible })}>
                <div ref={refPreference} className={buttonClassName} onClick={_toggle}>
                    {customButton || dropdownIcon}
                </div>

                {isVisible && (
                    <div ref={refPopper} style={styles.popper} {...attributes.popper} className={wrapperListClass}>
                        {typeof children?.type === 'string' ? children : cloneElement(children, { update })}
                    </div>
                )}
            </div>
        );
    }
);

export default DropdownPopper;
