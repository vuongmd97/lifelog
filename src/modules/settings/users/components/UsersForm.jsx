import { forwardRef, useRef } from 'react';
import { useTranslation } from 'react-i18next';
//
import Input from '../../../../components/input/Input';
import ButtonLoading from '../../../../components/loaders/ButtonLoading';
import UsersAvatar from './UsersAvatar';

const UsersForm = forwardRef(
    (
        {
            data,
            error,
            saveLoading,
            clearErrors = () => {},
            onClose = () => {},
            onSubmit = () => {},
            onChangeAvatar = () => {},
            avatarUrl
        },
        ref
    ) => {
        const { t } = useTranslation('settings');

        const { first_name, last_name, phone } = data;
        const refAvatar = useRef(null);

        const onChange = (e) => {
            const { name } = e.target;
            clearErrors(name);
        };

        return (
            <form onSubmit={onSubmit} className="form-editing">
                <UsersAvatar urlAvatar={avatarUrl} ref={refAvatar} onChangeAvatar={onChangeAvatar} />
                <div className="form-content">
                    <div className="flextop gap-8">
                        <Input
                            label={t('first_name')}
                            name="first_name"
                            initValue={first_name || ''}
                            placeholder={t('first_name')}
                            type="text"
                            classWrapper="rows flex-1"
                            classLabel="rows__label"
                            classWrapperInput="rows__info"
                            autoFocus
                            error={error?.first_name}
                            isRequired
                            onChange={onChange}
                        />

                        <Input
                            label={t('last_name')}
                            name="last_name"
                            initValue={last_name || ''}
                            placeholder={t('last_name')}
                            type="text"
                            classWrapper="rows flex-1"
                            classLabel="rows__label"
                            classWrapperInput="rows__info"
                            autoFocus
                        />
                    </div>

                    <Input
                        label={t('phone')}
                        name="phone"
                        placeholder={t('phone')}
                        initValue={phone || ''}
                        type="text"
                        classWrapper="rows"
                        classLabel="rows__label"
                        classWrapperInput="rows__info"
                        autoFocus
                    />

                    <div className="flextop gap-8">
                        <Input
                            label={t('auth:new_password')}
                            name="new_password"
                            type="password"
                            classWrapper="rows flex-1"
                            classLabel="rows__label"
                            classWrapperInput="rows__info"
                            autoFocus
                            error={error?.new_password}
                            onChange={onChange}
                        />

                        <Input
                            label={t('auth:re_password')}
                            name="re_password"
                            type="password"
                            classWrapper="rows flex-1"
                            classLabel="rows__label"
                            classWrapperInput="rows__info"
                            autoFocus
                            error={error?.re_password}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="form-footer d-flex justify-space-between mt-5">
                    <div className="btn-default" onClick={onClose}>
                        {t('close')}
                    </div>
                    <button className="btn-main">
                        {t('save_changes')}
                        {saveLoading && <ButtonLoading />}
                    </button>
                </div>
            </form>
        );
    }
);

export default UsersForm;
