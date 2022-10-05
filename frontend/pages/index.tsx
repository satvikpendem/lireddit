import type { NextPage } from "next";
import { useQuery } from "urql";
import Layout from "../components/Layout/Layout";
import {
  PostsDocument,
  PostsQuery,
} from "../services/graphql/generated/graphql";

const Home: NextPage = () => {
  // const [{ fetching, data }, reexecuteQuery] = useQuery<MeQuery>({
  //   query: MeDocument,
  // });

  const [{ fetching, data }] = useQuery<PostsQuery>({
    query: PostsDocument,
  });

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data?.posts?.map((post) => {
          return (
            <div key={post.id}>
              <div>{post.title}</div>
              <div>{post.content}</div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
