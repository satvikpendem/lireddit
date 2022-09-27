import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import * as LabelPrimitive from "@radix-ui/react-label";

import {
  _error,
  _field,
  _label,
  _loading,
  _primaryButton,
  _root,
  _secondaryButton,
  _secondaryButtonGroup,
  _spacer,
} from "./AuthenticationForm.css";
import {
  ChangePasswordMutation,
  ForgotPasswordMutation,
  LoginMutation,
  RegisterMutation,
} from "../../services/graphql/generated/graphql";
import AnimatedToggle from "../AnimatedToggle/AnimatedToggle";
import Link from "next/link";

type AuthenticationFormType =
  | "register"
  | "login"
  | "forgot-password"
  | "change-password";

export interface RegisterFormValues {
  email: string;
  username: string;
  password: string;
}

export interface LoginFormValues {
  usernameOrEmail: string;
  password: string;
}

export interface ForgotPasswordFormValues {
  usernameOrEmail: string;
}

export interface ChangePasswordFormValues {
  password: string;
}

type FormValues =
  & RegisterFormValues
  & LoginFormValues
  & ForgotPasswordFormValues
  & ChangePasswordFormValues;

interface BaseProps {
  type: AuthenticationFormType;
  onSubmit: any;
  loading: boolean;
}

interface RegisterProps extends BaseProps {
  type: "register";
  data: RegisterMutation | null | undefined;
}

interface LoginProps extends BaseProps {
  type: "login";
  data: LoginMutation | null | undefined;
}

interface ChangePasswordProps extends BaseProps {
  type: "change-password";
  data: ChangePasswordMutation | null | undefined;
}

interface ForgotPasswordProps extends BaseProps {
  type: "forgot-password";
  data: ForgotPasswordMutation | null | undefined;
}

type Props =
  | RegisterProps
  | LoginProps
  | ChangePasswordProps
  | ForgotPasswordProps;

const Label = LabelPrimitive.Root;

const AuthenticationForm: React.FC<Props> = ({
  type,
  onSubmit,
  loading,
  data,
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormValues>();

  const isSuccessful = () => {
    if (type === "register") {
      return data?.register?.__typename === "MutationRegisterSuccess";
    } else if (type === "login") {
      return data?.login?.__typename === "MutationLoginSuccess";
    } else if (type === "change-password") {
      return data?.changePassword.__typename ===
        "MutationChangePasswordSuccess";
    } else if (type === "forgot-password") {
      return data?.forgotPassword.__typename ===
        "MutationForgotPasswordSuccess";
    }
    return false;
  };

  const successMessage = () => {
    if (type === "register") {
      if (data?.register?.__typename === "MutationRegisterSuccess") {
        const username = data.register.data.username;
        return `Welcome ${username}!`;
      }
    } else if (type === "login") {
      if (data?.login?.__typename === "MutationLoginSuccess") {
        const username = data.login.data.username;
        return `Welcome ${username}!`;
      }
    } else if (type === "change-password") {
      if (data?.changePassword.__typename === "MutationChangePasswordSuccess") {
        return `Your password has been changed!`;
      }
    } else if (type === "forgot-password") {
      if (data?.forgotPassword.__typename === "MutationForgotPasswordSuccess") {
        return `Check your email for a link to reset your password!`;
      }
    }
  };

  const isFailure = () => {
    if (type === "register") {
      return data?.register?.__typename === "Error";
    } else if (type === "login") {
      return data?.login?.__typename === "Error";
    } else if (type === "change-password") {
      return data?.changePassword.__typename === "Error";
    } else if (type === "forgot-password") {
      return data?.forgotPassword.__typename === "Error";
    }
    return false;
  };

  const failureMessage = () => {
    if (type === "register") {
      if (data?.register?.__typename === "Error") {
        return data.register.error;
      }
    } else if (type === "login") {
      if (data?.login?.__typename === "Error") {
        return data.login.error;
      }
    } else if (type === "change-password") {
      if (data?.changePassword.__typename === "Error") {
        return data.changePassword.error;
      }
    } else if (type === "forgot-password") {
      if (data?.forgotPassword.__typename === "Error") {
        return data.forgotPassword.error;
      }
    }
  };

  function submitButton() {
    if (type === "register") {
      return "Register";
    } else if (type === "login") {
      return "Login";
    } else if (type === "change-password") {
      return "Change Password";
    } else if (type === "forgot-password") {
      return "Send Reset Email";
    }

    return "Submit";
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={_root}
    >
      {(type === "login" || type === "forgot-password") &&
        (
          <>
            <Label htmlFor="usernameOrEmail" className={_label}>
              Username or Email
            </Label>
            <input
              placeholder="John Doe"
              {...register("usernameOrEmail", {
                required: true,
              })}
              className={_field}
            />
            <AnimatedToggle
              condition={errors.usernameOrEmail?.type === "required"}
            >
              <span className={_error}>Username or email is required</span>
            </AnimatedToggle>
            <div className={_spacer} />
          </>
        )}

      {type === "register" && (
        <>
          <Label htmlFor="username" className={_label}>
            Username
          </Label>
          <input
            placeholder="John Doe"
            {...register("username", {
              required: true,
            })}
            className={_field}
          />
          <AnimatedToggle condition={errors.username?.type === "required"}>
            <span className={_error}>Username is required</span>
          </AnimatedToggle>
          <div className={_spacer} />
          <Label htmlFor="email" className={_label}>
            Email
          </Label>
          <input
            placeholder="your@email.com"
            {...register("email", {
              required: true,
            })}
            className={_field}
          />
          <AnimatedToggle condition={errors.email?.type === "required"}>
            <span className={_error}>Username is required</span>
          </AnimatedToggle>
          <div className={_spacer} />
        </>
      )}

      {type !== "forgot-password" && (
        <>
          <Label htmlFor="password" className={_label}>
            Password
          </Label>
          <input
            placeholder="Password"
            type={"password"}
            {...register("password", {
              required: true,
            })}
            className={_field}
          />
          <AnimatedToggle condition={errors.password?.type === "required"}>
            <span className={_error}>Password is required</span>
          </AnimatedToggle>
          <div className={_spacer} />
        </>
      )}
      <motion.button
        type="submit"
        className={_primaryButton}
        initial={{ y: 0, scale: 1 }}
        whileTap={{ y: 2, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        onClick={handleSubmit(onSubmit)}
      >
        <AnimatePresence>
          {(isSubmitting || loading) &&
            <div className={_loading} />}
          {!(isSubmitting || loading) &&
            (
              <span>
                {submitButton()}
              </span>
            )}
        </AnimatePresence>
      </motion.button>
      <AnimatedToggle condition={isFailure()}>
        <span className={_error}>
          {failureMessage()}
        </span>
      </AnimatedToggle>
      <AnimatedToggle condition={isSuccessful()}>
        <span
          style={{ color: "green" }}
        >
          {successMessage()}
        </span>
      </AnimatedToggle>
      <div className={_spacer} />

      {type === "login" &&
        (
          <div className={_secondaryButtonGroup}>
            <Link href="/forgot-password">
              <button className={_secondaryButton}>Forgot Password?</button>
            </Link>
            <Link href="/register">
              <button className={_secondaryButton}>Register</button>
            </Link>
          </div>
        )}
    </form>
  );
};

export default AuthenticationForm;
