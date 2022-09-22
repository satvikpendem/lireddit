import { PropsWithChildren } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import * as LabelPrimitive from "@radix-ui/react-label";

import {
  _error,
  _field,
  _label,
  _loading,
  _root,
  _spacer,
  _submit,
} from "./RegisterForm.css";
import { useMutation } from "@apollo/client";
import {
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables,
} from "../../services/graphql/generated/graphql";

const AnimatedToggle: React.FC<
  PropsWithChildren & {
    condition: any;
    key?: string;
  }
> = ({ condition, children, key }) => (
  <AnimatePresence>
    {!!condition && (
      <motion.div
        key={key}
        initial={{ opacity: 0, height: 0, y: 0 }}
        animate={{ opacity: 1, height: 20, y: 10 }}
        exit={{ opacity: 0, height: 0, y: 0 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const Label = LabelPrimitive.Root;

type FormValues = {
  username: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const [register, { loading, data }] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument);

  const {
    register: registerField,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<
    FormValues
  >();

  const onSubmit = async (values: FormValues) => {
    register({
      variables: {
        register: {
          username: values.username,
          password: values.password,
        },
      },
    });
  };

  const isSuccessfulRegistration =
    data?.register?.__typename === "MutationRegisterSuccess";
  const successMessage =
    data?.register?.__typename === "MutationRegisterSuccess" &&
    `${data?.register?.data.username} has been registered successfully`;
  const isServerError = data?.register?.__typename === "Error";
  const serverErrorMessage = data?.register?.__typename === "Error" &&
    data?.register?.error;

  console.log({ loading, data });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={_root}>
      <Label htmlFor="username" className={_label}>
        Username
      </Label>
      <input
        placeholder="John Doe"
        {...registerField("username", {
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
        {...registerField("password", {
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
            <span>Register</span>}
        </AnimatePresence>
      </motion.button>
      <AnimatedToggle condition={isServerError}>
        <span className={_error}>
          {serverErrorMessage}
        </span>
      </AnimatedToggle>
      <AnimatedToggle condition={isSuccessfulRegistration}>
        <span
          style={{ color: "green" }}
        >
          {successMessage}
        </span>
      </AnimatedToggle>
    </form>
  );
};

export default RegisterForm;
