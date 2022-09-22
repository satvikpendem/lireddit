import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

import {
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables,
} from "../../services/graphql/generated/graphql";
import AuthenticationForm, {
  FormValues,
} from "../AuthenticationForm/AuthenticationForm";

import { _base } from "./Register.css";

const Register: React.FC = () => {
  const [register, { loading, data }] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument);

  const router = useRouter();

  useEffect(() => {
    if (data?.register?.__typename === "MutationRegisterSuccess") {
      router.push("/");
    }
  }, [data?.register?.__typename]);

  const onSubmit = ({ username, password }: FormValues) => {
    register({
      variables: {
        register: {
          username,
          password,
        },
      },
    });
  };

  return (
    <div className={_base}>
      <h1>Register</h1>
      <AuthenticationForm
        type="register"
        data={data}
        loading={loading}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
