import router from "next/router";
import { useEffect } from "react";
import { useQuery } from "urql";
import { MeDocument, MeQuery } from "../services/graphql/generated/graphql";

export const useIsAuthN = () => {
  const [{ fetching, data }, reexecuteQuery] = useQuery<MeQuery>({
    query: MeDocument,
  });
  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [fetching, data]);
};
