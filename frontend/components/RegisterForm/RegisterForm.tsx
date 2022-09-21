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
  const { register, formState: { errors, isSubmitting }, handleSubmit } =
    useForm<
      FormValues
    >();

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values: FormValues) => {
    await sleep(1000);
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={_root}>
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
          {isSubmitting &&
            <div className={_loading} />}
          {!isSubmitting &&
            <span>Register</span>}
        </AnimatePresence>
      </motion.button>
    </form>
  );
};

export default RegisterForm;
