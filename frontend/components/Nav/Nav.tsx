import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useMutation, useQuery } from "@apollo/client";

import {
  LogoutDocument,
  LogoutMutation,
  MeDocument,
  MeQuery,
} from "../../services/graphql/generated/graphql";
import { _base, _username } from "./Nav.css";

interface Props {}

const Nav: React.FC<Props> = () => {
  const { loading, data } = useQuery<MeQuery>(MeDocument, {
    fetchPolicy: "network-only",
  });
  const [logout] = useMutation<LogoutMutation>(LogoutDocument);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data?.me) {
    return (
      <div className={_base}>
        <div className={_username}>{data.me.username}</div>
        <button
          onClick={async () => {
            setLoggingOut(true);
            await logout();
            router.reload();
          }}
          disabled={loggingOut}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className={_base}>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <Link href="/register">
        <a>Register</a>
      </Link>
    </div>
  );
};

export default Nav;
