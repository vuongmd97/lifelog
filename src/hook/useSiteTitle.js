import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function useSiteTitle(title) {
    const { t } = useTranslation('pageTitle');

    useEffect(() => {
        document.title = `lifeLOG. ${title ? `- ${t(title)}` : ''}`;
    }, [t]);
}
