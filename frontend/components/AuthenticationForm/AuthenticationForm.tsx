import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as LabelPrimitive from "@radix-ui/react-label";

import {
  _error,
  _field,
  _label,
  _loading,
  _root,
  _spacer,
  _submit,
} from "./AuthenticationForm.css";
import {
  LoginMutation,
  RegisterMutation,
} from "../../services/graphql/generated/graphql";
import AnimatedToggle from "../AnimatedToggle/AnimatedToggle";

type AuthenticationFormType = "register" | "login";

export type FormValues = {
  username: string;
  password: string;
};

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

type Props = RegisterProps | LoginProps;

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
    } else {
      return data?.login?.__typename === "MutationLoginSuccess";
    }
  };

  const successMessage = () => {
    let username = "";
    if (type === "register") {
      if (data?.register?.__typename === "MutationRegisterSuccess") {
        username = data.register.data.username;
      }
    } else {
      if (data?.login?.__typename === "MutationLoginSuccess") {
        username = data.login.data.username;
      }
    }
    return `Welcome ${username}!`;
  };

  const isFailure = () => {
    if (type === "register") {
      return data?.register?.__typename === "Error";
    } else {
      return data?.login?.__typename === "Error";
    }
  };

  const failureMessage = () => {
    if (type === "register") {
      if (data?.register?.__typename === "Error") {
        return data.register.error;
      }
    } else {
      if (data?.login?.__typename === "Error") {
        return data.login.error;
      }
    }
    return "";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={_root}
    >
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
      <motion.button
        type="submit"
        className={_submit}
        initial={{ y: 0, scale: 1 }}
        whileTap={{ y: 2, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        onClick={handleSubmit(onSubmit)}
      >
        <AnimatePresence>
          {(isSubmitting || loading) &&
            <div className={_loading} />}
          {!(isSubmitting || loading) &&
            <span>{type === "login" ? "Login" : "Register"}</span>}
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
    </form>
  );
};

export default AuthenticationForm;
