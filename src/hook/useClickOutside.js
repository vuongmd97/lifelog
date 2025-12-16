import { useState, useEffect, useRef } from 'react';

export default function useClickOutside(initialIsVisible, idPreventClose = '') {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleHideDropdown = (event) => {
        const elPrevent = idPreventClose ? document.getElementById(idPreventClose) : null;
        if (event.key === 'Escape' && !elPrevent) {
            setIsComponentVisible(false);
        }
    };

    const handleClickOutside = (event) => {
        const elPrevent = idPreventClose ? document.getElementById(idPreventClose) : null;

        if (ref.current && !ref.current.contains(event.target) && !elPrevent) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        if (!isComponentVisible) return;

        document.addEventListener('keydown', handleHideDropdown);
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleHideDropdown);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isComponentVisible]);

    return [ref, isComponentVisible, setIsComponentVisible];
}
