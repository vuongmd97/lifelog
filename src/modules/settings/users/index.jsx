import { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { reducer } from '../../../const/Reducer';
import { upsertProfiles, updatePassword } from '../../redux/users/userSlice';
//
import UsersInfo from './components/UsersInfo';
import UsersForm from './components/UsersForm';

export default function Users() {
    const profiles = useSelector((state) => state.user.profiles);
    const dispatch = useDispatch();
    const { t } = useTranslation(['auth']);
    const [state, dispatchState] = useReducer(reducer, {
        isEdit: false,
        msgError: {},
        loading: false
    });

    const { isEdit, msgError, loading } = state;

    const _onEdit = () => dispatchState({ isEdit: true });
    const _offEdit = () => dispatchState({ isEdit: false, msgError: {} });

    const checkValidForm = (value) => {
        const formData = new FormData(value);

        const data = {
            first_name: formData.get('first_name')?.trim(),
            last_name: formData.get('last_name')?.trim(),
            phone: formData.get('phone')?.trim(),
            new_password: formData.get('new_password')?.trim(),
            re_password: formData.get('re_password')?.trim()
        };

        const { first_name, new_password, re_password } = data;
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
            profiles.phone !== formData.phone
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
            const profileData = {
                first_name: data.first_name,
                last_name: data.last_name || '',
                phone: data.phone || '',
                updated_at: new Date().toISOString()
            };

            if (hasDataChanged(data)) {
                await dispatch(upsertProfiles(profileData)).unwrap();
            }

            if (data.new_password) {
                await dispatch(updatePassword(data.new_password)).unwrap();
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

    return (
        <>
            {isEdit ? (
                <UsersForm
                    data={profiles || {}}
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
        </>
    );
}
