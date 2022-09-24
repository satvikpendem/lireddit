import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "urql";

import {
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables,
} from "../../services/graphql/generated/graphql";
import AuthenticationForm, {
  RegisterFormValues,
} from "../AuthenticationForm/AuthenticationForm";

import { _base } from "./Register.css";

const Register: React.FC = () => {
  const [{ fetching, data }, register] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument);

  const router = useRouter();

  useEffect(() => {
    if (data?.register?.__typename === "MutationRegisterSuccess") {
      router.push("/");
    }
  }, [data?.register?.__typename]);

  const onSubmit = ({ username, email, password }: RegisterFormValues) => {
    register({
      register: {
        username,
        email,
        password,
      },
    });
  };

  return (
    <div className={_base}>
      <h1>Register</h1>
      <AuthenticationForm
        type="register"
        data={data}
        loading={fetching}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
