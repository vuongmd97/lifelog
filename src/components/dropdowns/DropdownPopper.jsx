import classNames from 'classnames';
import { forwardRef, useImperativeHandle, useRef, cloneElement, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import useClickOutside from '../../hook/useClickOutside';

//
import IconArrow from '../../assets/svg/IconArrow';

const SAME_WIDTH_MODIFIER = {
    name: 'sameWidth',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn: ({ state }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
    }
};

const DEFAULT_MODIFIERS = [{ name: 'offset', options: { offset: [0, 5] } }, SAME_WIDTH_MODIFIER];

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
        const [mounted, setMounted] = useState(true);

        const [refDropdownPopper, isVisible, setIsVisible] = useClickOutside(false);

        const { styles, attributes, update } = usePopper(refPreference.current, refPopper.current, {
            placement,
            strategy,
            modifiers: modifiers || DEFAULT_MODIFIERS
        });

        useEffect(() => {
            if (isVisible) {
                update?.();
            }
        }, [isVisible, update]);

        useEffect(() => {
            if (mounted) setMounted(false);
        }, []);

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

                {(mounted || isVisible) && (
                    <div ref={refPopper} style={styles.popper} {...attributes.popper} className={wrapperListClass}>
                        {typeof children?.type === 'string' ? children : cloneElement(children, { update })}
                    </div>
                )}
            </div>
        );
    }
);

export default DropdownPopper;
