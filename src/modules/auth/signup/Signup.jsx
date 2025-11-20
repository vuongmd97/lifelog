import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { reducer } from "../../../const/Reducer";
import { useDispatch } from "react-redux";
import { useReducer } from "react";
import { handleSignUp } from "../authSlice";
import { validateEmail } from "../../../utils/EmailUtils";
import SpinnerLoading from "../../../components/loaders/SpinnerLoading";

export default function Signup() {
  const dispatch = useDispatch();

  const { t } = useTranslation(["auth"]);
  const [state, dispatchState] = useReducer(reducer, {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    loading: false,
    needsEmailConfirmation: false,
    msgError: {},
  });

  const {
    email,
    password,
    firstName,
    lastName,
    loading,
    needsEmailConfirmation,
    msgError,
  } = state;

  const checkValidForm = () => {
    const errors = {};

    if (!validateEmail(email)) {
      errors.email = t("wrong_format_email");
    }

    if (password.length < 6) {
      errors.password = t("password_min_length");
    }

    if (!firstName) {
      errors.firstName = t("first_name_required");
    }

    if (Object.keys(errors).length > 0) {
      dispatchState({
        msgError: {
          ...errors,
        },
      });

      return false;
    }

    return true;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatchState({
      [name]: value,
      msgError: {
        ...msgError,
        [name]: "",
      },
    });
  };

  const handleSignupNewUser = async (e) => {
    e.preventDefault();

    const isValid = checkValidForm();
    if (isValid === false) return;

    dispatchState({
      loading: true,
      msgError: {},
    });

    try {
      await dispatch(
        handleSignUp({ email, password, firstName, lastName })
      ).unwrap();

      dispatchState({
        needsEmailConfirmation: true,
      });
    } catch (err) {
      console.log("Signup New User Failed!!!", err);

      dispatchState({
        loading: false,
        needsEmailConfirmation: false,
      });
    } finally {
      dispatchState({
        loading: false,
        msgError: {},
      });
    }
  };

  if (!!needsEmailConfirmation) {
    return (
      <div className="auth">
        <div className="auth-header text-center">
          <h3 className="title-label">Check Your Email</h3>
          <p className="txt-sm txt-gray mt-2">
            We've sent a verification link to <strong>{email}</strong>
          </p>
        </div>
        <div className="auth-content">
          <div className="info-box">
            <p className="txt-sm">
              Please check your inbox and click the verification link to
              activate your account.
            </p>
          </div>
          <div className="text-center">
            <p className="txt-sm txt-gray mt-3">
              <Link to="/auth/signin" className="btn-default">
                Back to Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSignupNewUser} className="auth">
      <div className="auth-header">
        <h3 className="title-label">{t("create_account")}</h3>
        <p className="txt-sm txt-gray mt-1">
          {t("create_account_description")}
        </p>
      </div>

      <div className="auth-content">
        <div className="flexcenter align-top gap-6">
          <div className="flex-column flex-1 gap-6">
            <p className="txt-sm">{t("first_name")}</p>
            <div>
              <div className="relative">
                <input
                  name="firstName"
                  type="text"
                  className="field-input h-8"
                  placeholder={t("enter_your_first_name")}
                  autoComplete="off"
                  value={firstName}
                  onChange={handleOnChange}
                />
              </div>
              {msgError.firstName && (
                <p className="txt-incorrect">{msgError.firstName}</p>
              )}
            </div>
          </div>

          <div className="flex-column flex-1 gap-6">
            <p className="txt-sm">{t("last_name")}</p>
            <div className="relative">
              <input
                name="lastName"
                type="text"
                className="field-input h-8"
                placeholder={t("enter_your_last_name")}
                autoComplete="off"
                value={lastName}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>

        <div className="flex-column gap-6">
          <p className="txt-sm">{t("email")}</p>
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
            {msgError.email && (
              <p className="txt-incorrect">{msgError.email}</p>
            )}
          </div>
        </div>

        <div className="flex-column gap-6">
          <p className="txt-sm">{t("password")}</p>
          <div>
            <div className="relative">
              <input
                name="password"
                type={"password"}
                className="field-input h-8"
                placeholder={t("enter_your_password")}
                value={password}
                onChange={handleOnChange}
              />
            </div>
            {msgError.password && (
              <p className="txt-incorrect">{msgError.password}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn-default w-100 btn-main fs-3 h-8 justify-center"
        >
          {loading && <SpinnerLoading />}
          {t("create_account_button")}
        </button>

        <div className="text-center">
          <p className="txt-sm txt-gray">
            {t("already_have_account")}
            <Link to="/auth/signin" className="color-primary ml-1">
              {t("login")}
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
