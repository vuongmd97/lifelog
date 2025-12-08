import { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { reducer } from '../../../const/Reducer';
import { upsertProfiles, updatePassword, uploadAvatar } from '../../redux/users/userSlice';
//
import UsersInfo from './components/UsersInfo';
import UsersForm from './components/UsersForm';
import useSiteTitle from '../../../hook/useSiteTitle';
import { Toast } from '../../../components/toast/Toast';

export default function Users() {
    useSiteTitle('users');

    const profiles = useSelector((state) => state.user.profiles);
    const dispatch = useDispatch();
    const { t } = useTranslation('auth');
    const [state, dispatchState] = useReducer(reducer, {
        isEdit: false,
        loading: false,
        msgError: {},
        msgSuccess: '',
        avatarUrl: profiles?.avatar_url || '',
        file: null
    });

    const { isEdit, msgError, msgSuccess, loading, avatarUrl, file: avatarFile } = state;

    const _onEdit = () =>
        dispatchState({
            isEdit: true,
            avatarUrl: profiles?.avatar_url || '',
            file: null
        });
    const _offEdit = () =>
        dispatchState({
            isEdit: false,
            msgError: {},
            avatarUrl: profiles?.avatar_url || '',
            file: null
        });

    const checkValidForm = (value) => {
        const formData = new FormData(value);

        const data = {
            first_name: formData.get('first_name')?.trim(),
            last_name: formData.get('last_name')?.trim(),
            phone: formData.get('phone')?.trim(),
            new_password: formData.get('new_password')?.trim(),
            re_password: formData.get('re_password')?.trim(),
            avatar_url: avatarUrl
        };

        const { first_name, new_password, re_password, avatar_url } = data;
        const errors = {};

        if (!first_name) {
            errors.first_name = t('first_name_required');
        }

        if (new_password || re_password) {
            if (new_password.length < 6) {
                errors.new_password = t('password_min_length');
            } else if (new_password !== re_password) {
                errors.re_password = t('must_be_repeated_exactly');
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            data,
            errors
        };
    };

    const hasDataChanged = (formData) => {
        return (
            profiles.first_name !== formData.first_name ||
            profiles.last_name !== formData.last_name ||
            profiles.phone !== formData.phone ||
            profiles.avatar_url !== formData.avatar_url
        );
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const { isValid, data, errors } = checkValidForm(e.target);

        if (!isValid) {
            dispatchState({
                msgError: errors
            });
            return;
        }

        dispatchState({
            loading: true
        });

        try {
            let finalAvatarUrl = profiles?.avatar_url || '';

            if (avatarFile) {
                finalAvatarUrl = await dispatch(uploadAvatar(avatarFile)).unwrap();
            }

            const profileData = {
                first_name: data.first_name,
                last_name: data.last_name || '',
                phone: data.phone || '',
                avatar_url: finalAvatarUrl || '',
                updated_at: new Date().toISOString()
            };

            if (hasDataChanged(data) || avatarFile) {
                await dispatch(upsertProfiles(profileData)).unwrap();

                dispatchState({
                    msgSuccess: t('settings:success_update_customer_info')
                });
            }

            if (data.new_password) {
                await dispatch(updatePassword(data.new_password)).unwrap();

                dispatchState({
                    msgSuccess: t('settings:success_update_password')
                });
            }

            _offEdit();
        } catch (err) {
            dispatchState({
                loading: false,
                msgError: { general: err.message || 'Update failed' }
            });
        } finally {
            dispatchState({
                loading: false
            });
        }
    };

    const _clearErrors = (fieldName) => {
        dispatchState({
            msgError: {
                ...msgError,
                [fieldName]: ''
            }
        });
    };

    const onChangeAvatar = (file, public_url) => {
        dispatchState({
            file,
            avatarUrl: public_url
        });
    };

    return (
        <div className="wrapper-form page-users">
            {msgSuccess && (
                <Toast desc={msgSuccess} status="success" onClose={() => dispatchState({ msgSuccess: '' })} />
            )}
            {isEdit ? (
                <UsersForm
                    data={profiles || {}}
                    onChangeAvatar={onChangeAvatar}
                    avatarUrl={avatarUrl}
                    onClose={_offEdit}
                    onSubmit={handleSubmitForm}
                    error={msgError}
                    checkValidForm={checkValidForm}
                    saveLoading={loading}
                    clearErrors={_clearErrors}
                />
            ) : (
                <UsersInfo data={profiles || {}} onEdit={_onEdit} />
            )}
        </div>
    );
}
