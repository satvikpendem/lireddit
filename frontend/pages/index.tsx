import type { NextPage } from "next";
import { useQuery } from "urql";
import Nav from "../components/Nav/Nav";
import { MeDocument, MeQuery } from "../services/graphql/generated/graphql";

const Home: NextPage = () => {
  const [{ fetching, data }, reexecuteQuery] = useQuery<MeQuery>({
    query: MeDocument,
  });

  return (
    <div>
      <Nav />
      Hello {data?.me?.username ? data.me.username : "World"}
    </div>
  );
};

export default Home;
