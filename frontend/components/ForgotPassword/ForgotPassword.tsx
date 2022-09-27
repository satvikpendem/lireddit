import { useMutation } from "urql";

import {
  ForgotPasswordDocument,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from "../../services/graphql/generated/graphql";
import AuthenticationForm, {
  ForgotPasswordFormValues,
} from "../AuthenticationForm/AuthenticationForm";

import { _base } from "./ForgotPassword.css";

const ForgotPassword: React.FC = () => {
  const [{ fetching, data }, forgotPassword] = useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);

  const onSubmit = async (
    { usernameOrEmail }: ForgotPasswordFormValues,
  ) => {
    await forgotPassword({
      input: {
        usernameOrEmail,
      },
    });
  };

  return (
    <div className={_base}>
      <h1>Reset Password</h1>
      <AuthenticationForm
        type="forgot-password"
        data={data}
        loading={fetching}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ForgotPassword;
