import { reducer } from '../../../const/Reducer';
import { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { signIn } from '../authSlice';
import { validateEmail } from '../../../utils/EmailUtils';
import ButtonLoading from '../../../components/loaders/ButtonLoading';
//
import IconEye from '../../../assets/svg/IconEye';
import classNames from 'classnames';
import useSiteTitle from '../../../hook/useSiteTitle';

export default function Signin() {
    useSiteTitle('login');

    const { t } = useTranslation(['auth']);
    const dispatch = useDispatch();
    const [state, dispatchState] = useReducer(reducer, {
        email: '',
        password: '',
        showPassword: false,
        loading: false,
        msgError: {},
        disableBtn: true
    });

    const { email, password, showPassword, loading, msgError, disableBtn } = state;

    useEffect(() => {
        const shouldDisable = !email || !password;

        dispatchState((prev) => {
            if (prev.disableBtn !== shouldDisable) {
                return { ...prev, disableBtn: shouldDisable };
            }
            return prev;
        });
    }, [email, password]);

    const checkValidForm = () => {
        const errors = {};

        if (!validateEmail(email)) {
            errors.email = t('wrong_format_email');
        }

        if (password.length < 6) {
            errors.password = t('password_min_length');
        }

        if (Object.keys(errors).length > 0) {
            dispatchState({
                msgError: {
                    ...errors
                }
            });
            return false;
        }

        return true;
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        const isValid = checkValidForm();
        if (isValid === false) return;

        dispatchState({
            loading: true,
            msgError: {}
        });

        try {
            await dispatch(signIn({ email, password })).unwrap();
        } catch (error) {
            console.log('SignIn failed!!!', error);
        } finally {
            dispatchState({
                loading: false
            });
        }
    };

    const handleShowPassword = () => {
        dispatchState({ showPassword: !showPassword });
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        dispatchState({
            [name]: value,
            msgError: {
                ...msgError,
                [name]: ''
            }
        });
    };

    return (
        <form onSubmit={handleSignIn} className="auth">
            <div className="auth-header">
                <h3 className="title-label">{t('welcome_back')}</h3>
                <p className="txt-sm txt-gray mt-1">{t('login_description')}</p>
            </div>
            <div className="auth-content">
                <div className="flex-column gap-6">
                    <p className="txt-sm">{t('email')}</p>
                    <div>
                        <div className="relative">
                            <input
                                name="email"
                                type="text"
                                className="field-input h-8"
                                placeholder="email@example.com"
                                autoComplete="off"
                                value={email}
                                onChange={handleOnChange}
                            />
                        </div>

                        {msgError.email && <p className="txt-incorrect">{msgError.email}</p>}
                    </div>
                </div>

                <div className="flex-column gap-6">
                    <p className="txt-sm">{t('password')}</p>
                    <div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="field-input h-8"
                                placeholder={t('enter_your_password')}
                                value={password}
                                onChange={handleOnChange}
                            />

                            <div
                                className="btn-default --icon-sm --transparent icon-absolute svg-8"
                                onClick={handleShowPassword}
                            >
                                <IconEye closeEye={!showPassword} />
                            </div>
                        </div>

                        {msgError.password && <p className="txt-incorrect">{msgError.password}</p>}
                    </div>
                </div>

                <button
                    className={classNames('btn-main w-100 fs-3 h-8 justify-center', {
                        'is-disable': disableBtn
                    })}
                >
                    {t('login')}
                    {loading && <ButtonLoading />}
                </button>

                <div className="text-center">
                    <p className="txt-sm txt-gray">
                        {t('dont_have_account')}
                        <Link to="/auth/signup" className="color-primary ml-1">
                            {t('sign_up')}
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    );
}
