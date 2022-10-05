import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "urql";

import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from "../../services/graphql/generated/graphql";
import AuthenticationForm, {
  LoginFormValues,
} from "../AuthenticationForm/AuthenticationForm";

import { _base } from "./Login.css";

const Login: React.FC = () => {
  const [{ fetching, data }, login] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LoginDocument);

  const router = useRouter();

  useEffect(() => {
    if (data?.login?.__typename === "MutationLoginSuccess") {
      if (typeof router.query["next"] === "string") {
        router.push(router.query["next"]);
      } else {
        router.push("/");
      }
    }
  }, [data?.login?.__typename, router]);

  const onSubmit = async (
    { usernameOrEmail, password }: LoginFormValues,
  ) => {
    login({
      login: {
        usernameOrEmail,
        password,
      },
    });
  };

  return (
    <div className={_base}>
      <h1>Login</h1>
      <AuthenticationForm
        type="login"
        data={data}
        loading={fetching}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
