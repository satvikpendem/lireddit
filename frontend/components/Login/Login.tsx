import { useMutation } from "@apollo/client";
import router from "next/router";
import { useEffect } from "react";
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from "../../services/graphql/generated/graphql";
import AuthenticationForm, {
  FormValues,
} from "../AuthenticationForm/AuthenticationForm";
import { _base } from "./Login.css";

const Login: React.FC = () => {
  const [register, { loading, data }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LoginDocument);

  useEffect(() => {
    if (data?.login?.__typename === "MutationLoginSuccess") {
      router.push("/");
    }
  }, [data?.login?.__typename]);

  const onSubmit = async ({ username, password }: FormValues) => {
    await register({
      variables: {
        login: {
          username,
          password,
        },
      },
    });
  };

  return (
    <div className={_base}>
      <h1>Login</h1>
      <AuthenticationForm
        type="login"
        data={data}
        loading={loading}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
