import { useMutation } from "urql";

import {
  ChangePasswordDocument,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from "../../services/graphql/generated/graphql";
import AuthenticationForm, {
  ChangePasswordFormValues,
} from "../AuthenticationForm/AuthenticationForm";

import { _base } from "./ChangePassword.css";

interface Props {
  token: string;
}

const ChangePassword: React.FC<Props> = ({ token }) => {
  const [{ fetching, data }, changePassword] = useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);

  const onSubmit = async (
    { password }: ChangePasswordFormValues,
  ) => {
    changePassword({
      input: {
        token,
        password,
      },
    });
  };

  return (
    <div className={_base}>
      <h1>Change your password</h1>
      <AuthenticationForm
        type="change-password"
        data={data}
        loading={fetching}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ChangePassword;
