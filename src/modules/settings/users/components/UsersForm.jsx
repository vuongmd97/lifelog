import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
//
import Input from '../../../../components/input/Input';
import IconDefaultAvatar from '../../../../assets/svg/IconDefaultAvatar';
import IconTrash from '../../../../assets/svg/IconTrash';

const UsersForm = forwardRef(({ data, onClose = () => {} }, ref) => {
    const { t } = useTranslation(['settings', 'auth']);

    const { first_name, last_name, phone, avatar_url } = data;

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={onSubmit} className="form-editing">
            <div className="form-header flex-betweenitems align-top">
                <div className="avatar-img">
                    {avatar_url ? (
                        <img src={avatar_url} alt="avatar" width={40} height={40} />
                    ) : (
                        <IconDefaultAvatar className="img" />
                    )}
                </div>

                <div className="flexcenter gap-8">
                    <div className="btn-default">{t('upload_new_avatar')}</div>
                    <div className="btn-default --icon-lg --transparent svg-10 --delete">
                        <IconTrash />
                    </div>
                </div>
            </div>
            <div className="form-content">
                <div className="flextop gap-8">
                    <Input
                        label={t('first_name')}
                        name="first_name"
                        initValue={first_name}
                        placeholder={t('first_name')}
                        type="text"
                        classWrapper="rows flex-1"
                        classLabel="rows__label"
                        classWrapperInput="rows__info"
                        autoFocus
                    />

                    <Input
                        label={t('last_name')}
                        name="last_name"
                        initValue={last_name}
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
                    initValue={phone}
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
                    />

                    <Input
                        label={t('auth:re_password')}
                        name="re_password"
                        type="password"
                        classWrapper="rows flex-1"
                        classLabel="rows__label"
                        classWrapperInput="rows__info"
                        autoFocus
                    />
                </div>
            </div>

            <div className="form-footer d-flex justify-space-between mt-5">
                <div className="btn-default" onClick={onClose}>
                    {t('close')}
                </div>
                <button className="btn-main">{t('save_changes')}</button>
            </div>
        </form>
    );
});

export default UsersForm;
