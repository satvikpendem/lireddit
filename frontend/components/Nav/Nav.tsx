import Link from "next/link";
import { useState } from "react";

import { useMutation, useQuery } from "urql";

import {
  LogoutDocument,
  LogoutMutation,
  MeDocument,
  MeQuery,
} from "../../services/graphql/generated/graphql";
import { _base, _username } from "./Nav.css";

interface Props {}

const Nav: React.FC<Props> = () => {
  const [{ fetching, data }, reexecuteQuery] = useQuery<MeQuery>({
    query: MeDocument,
  });
  const [_, logout] = useMutation<LogoutMutation>(LogoutDocument);
  const [loggingOut, setLoggingOut] = useState(false);

  if (fetching) {
    return <div>Loading...</div>;
  }

  console.log({ data });

  if (data?.me) {
    return (
      <div className={_base}>
        <div className={_username}>{data.me.username}</div>
        <button
          onClick={async () => {
            setLoggingOut(true);
            await logout();
            reexecuteQuery();
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
