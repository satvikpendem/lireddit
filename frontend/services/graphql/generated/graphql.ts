import { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver, StorageAdapter as GraphCacheStorageAdapter } from '@urql/exchange-graphcache';
import { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Error = {
  __typename?: 'Error';
  error: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: MutationChangePasswordResult;
  createPost?: Maybe<MutationCreatePostResult>;
  deletePost?: Maybe<MutationDeletePostResult>;
  forgotPassword: MutationForgotPasswordResult;
  login?: Maybe<MutationLoginResult>;
  logout: MutationLogoutResult;
  register?: Maybe<MutationRegisterResult>;
  updatePost?: Maybe<MutationUpdatePostResult>;
};


export type MutationChangePasswordArgs = {
  input: UserChangePasswordInput;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationDeletePostArgs = {
  input: PostInputWithId;
};


export type MutationForgotPasswordArgs = {
  input: UserSendForgotPasswordEmailInput;
};


export type MutationLoginArgs = {
  input: UserLoginInput;
};


export type MutationRegisterArgs = {
  input: UserCreateInput;
};


export type MutationUpdatePostArgs = {
  input: PostInputWithId;
};

export type MutationChangePasswordResult = Error | MutationChangePasswordSuccess;

export type MutationChangePasswordSuccess = {
  __typename?: 'MutationChangePasswordSuccess';
  data: Scalars['Boolean'];
};

export type MutationCreatePostResult = Error | MutationCreatePostSuccess;

export type MutationCreatePostSuccess = {
  __typename?: 'MutationCreatePostSuccess';
  data: Post;
};

export type MutationDeletePostResult = Error | MutationDeletePostSuccess;

export type MutationDeletePostSuccess = {
  __typename?: 'MutationDeletePostSuccess';
  data: Post;
};

export type MutationForgotPasswordResult = Error | MutationForgotPasswordSuccess;

export type MutationForgotPasswordSuccess = {
  __typename?: 'MutationForgotPasswordSuccess';
  data: Scalars['Boolean'];
};

export type MutationLoginResult = Error | MutationLoginSuccess;

export type MutationLoginSuccess = {
  __typename?: 'MutationLoginSuccess';
  data: User;
};

export type MutationLogoutResult = Error | MutationLogoutSuccess;

export type MutationLogoutSuccess = {
  __typename?: 'MutationLogoutSuccess';
  data: Scalars['Boolean'];
};

export type MutationRegisterResult = Error | MutationRegisterSuccess;

export type MutationRegisterSuccess = {
  __typename?: 'MutationRegisterSuccess';
  data: User;
};

export type MutationUpdatePostResult = Error | MutationUpdatePostSuccess;

export type MutationUpdatePostSuccess = {
  __typename?: 'MutationUpdatePostSuccess';
  data: Post;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostInput = {
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type PostInputWithId = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type UserCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserLoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type UserSendForgotPasswordEmailInput = {
  usernameOrEmail: Scalars['String'];
};

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: string, title: string, content: string, author: { __typename?: 'User', id: string, username: string } }> | null };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Error', error: string } | { __typename?: 'MutationCreatePostSuccess', data: { __typename?: 'Post', id: string, title: string, content: string, author: { __typename?: 'User', createdAt: string, email: string, id: string, updatedAt: string, username: string } } } | null };

export type RegularUserFragment = { __typename?: 'User', id: string, username: string };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, username: string }> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string } | null };

export type RegisterMutationVariables = Exact<{
  register: UserCreateInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'Error', error: string } | { __typename?: 'MutationRegisterSuccess', data: { __typename?: 'User', id: string, username: string } } | null };

export type LoginMutationVariables = Exact<{
  login: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Error', error: string } | { __typename?: 'MutationLoginSuccess', data: { __typename?: 'User', id: string, username: string } } | null };

export type ChangePasswordMutationVariables = Exact<{
  input: UserChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'Error', error: string } | { __typename?: 'MutationChangePasswordSuccess', data: boolean } };

export type ForgotPasswordMutationVariables = Exact<{
  input: UserSendForgotPasswordEmailInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'Error', error: string } | { __typename?: 'MutationForgotPasswordSuccess', data: boolean } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'Error', error: string } | { __typename?: 'MutationLogoutSuccess', data: boolean } };

export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  Error?: (data: WithTypename<Error>) => null | string,
  MutationChangePasswordSuccess?: (data: WithTypename<MutationChangePasswordSuccess>) => null | string,
  MutationCreatePostSuccess?: (data: WithTypename<MutationCreatePostSuccess>) => null | string,
  MutationDeletePostSuccess?: (data: WithTypename<MutationDeletePostSuccess>) => null | string,
  MutationForgotPasswordSuccess?: (data: WithTypename<MutationForgotPasswordSuccess>) => null | string,
  MutationLoginSuccess?: (data: WithTypename<MutationLoginSuccess>) => null | string,
  MutationLogoutSuccess?: (data: WithTypename<MutationLogoutSuccess>) => null | string,
  MutationRegisterSuccess?: (data: WithTypename<MutationRegisterSuccess>) => null | string,
  MutationUpdatePostSuccess?: (data: WithTypename<MutationUpdatePostSuccess>) => null | string,
  Post?: (data: WithTypename<Post>) => null | string,
  User?: (data: WithTypename<User>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    me?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<User> | string>,
    post?: GraphCacheResolver<WithTypename<Query>, QueryPostArgs, WithTypename<Post> | string>,
    posts?: GraphCacheResolver<WithTypename<Query>, QueryPostsArgs, Array<WithTypename<Post> | string>>,
    user?: GraphCacheResolver<WithTypename<Query>, QueryUserArgs, WithTypename<User> | string>,
    users?: GraphCacheResolver<WithTypename<Query>, QueryUsersArgs, Array<WithTypename<User> | string>>
  },
  Error?: {
    error?: GraphCacheResolver<WithTypename<Error>, Record<string, never>, Scalars['String'] | string>
  },
  MutationChangePasswordSuccess?: {
    data?: GraphCacheResolver<WithTypename<MutationChangePasswordSuccess>, Record<string, never>, Scalars['Boolean'] | string>
  },
  MutationCreatePostSuccess?: {
    data?: GraphCacheResolver<WithTypename<MutationCreatePostSuccess>, Record<string, never>, WithTypename<Post> | string>
  },
  MutationDeletePostSuccess?: {
    data?: GraphCacheResolver<WithTypename<MutationDeletePostSuccess>, Record<string, never>, WithTypename<Post> | string>
  },
  MutationForgotPasswordSuccess?: {
    data?: GraphCacheResolver<WithTypename<MutationForgotPasswordSuccess>, Record<string, never>, Scalars['Boolean'] | string>
  },
  MutationLoginSuccess?: {
    data?: GraphCacheResolver<WithTypename<MutationLoginSuccess>, Record<string, never>, WithTypename<User> | string>
  },
  MutationLogoutSuccess?: {
    data?: GraphCacheResolver<WithTypename<MutationLogoutSuccess>, Record<string, never>, Scalars['Boolean'] | string>
  },
  MutationRegisterSuccess?: {
    data?: GraphCacheResolver<WithTypename<MutationRegisterSuccess>, Record<string, never>, WithTypename<User> | string>
  },
  MutationUpdatePostSuccess?: {
    data?: GraphCacheResolver<WithTypename<MutationUpdatePostSuccess>, Record<string, never>, WithTypename<Post> | string>
  },
  Post?: {
    author?: GraphCacheResolver<WithTypename<Post>, Record<string, never>, WithTypename<User> | string>,
    content?: GraphCacheResolver<WithTypename<Post>, Record<string, never>, Scalars['String'] | string>,
    createdAt?: GraphCacheResolver<WithTypename<Post>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Post>, Record<string, never>, Scalars['ID'] | string>,
    title?: GraphCacheResolver<WithTypename<Post>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<Post>, Record<string, never>, Scalars['String'] | string>
  },
  User?: {
    createdAt?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    email?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['ID'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    username?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  changePassword?: GraphCacheOptimisticMutationResolver<MutationChangePasswordArgs, WithTypename<MutationChangePasswordResult>>,
  createPost?: GraphCacheOptimisticMutationResolver<MutationCreatePostArgs, Maybe<WithTypename<MutationCreatePostResult>>>,
  deletePost?: GraphCacheOptimisticMutationResolver<MutationDeletePostArgs, Maybe<WithTypename<MutationDeletePostResult>>>,
  forgotPassword?: GraphCacheOptimisticMutationResolver<MutationForgotPasswordArgs, WithTypename<MutationForgotPasswordResult>>,
  login?: GraphCacheOptimisticMutationResolver<MutationLoginArgs, Maybe<WithTypename<MutationLoginResult>>>,
  logout?: GraphCacheOptimisticMutationResolver<Record<string, never>, WithTypename<MutationLogoutResult>>,
  register?: GraphCacheOptimisticMutationResolver<MutationRegisterArgs, Maybe<WithTypename<MutationRegisterResult>>>,
  updatePost?: GraphCacheOptimisticMutationResolver<MutationUpdatePostArgs, Maybe<WithTypename<MutationUpdatePostResult>>>
};

export type GraphCacheUpdaters = {
  Mutation?: {
    changePassword?: GraphCacheUpdateResolver<{ changePassword: WithTypename<MutationChangePasswordResult> }, MutationChangePasswordArgs>,
    createPost?: GraphCacheUpdateResolver<{ createPost: Maybe<WithTypename<MutationCreatePostResult>> }, MutationCreatePostArgs>,
    deletePost?: GraphCacheUpdateResolver<{ deletePost: Maybe<WithTypename<MutationDeletePostResult>> }, MutationDeletePostArgs>,
    forgotPassword?: GraphCacheUpdateResolver<{ forgotPassword: WithTypename<MutationForgotPasswordResult> }, MutationForgotPasswordArgs>,
    login?: GraphCacheUpdateResolver<{ login: Maybe<WithTypename<MutationLoginResult>> }, MutationLoginArgs>,
    logout?: GraphCacheUpdateResolver<{ logout: WithTypename<MutationLogoutResult> }, Record<string, never>>,
    register?: GraphCacheUpdateResolver<{ register: Maybe<WithTypename<MutationRegisterResult>> }, MutationRegisterArgs>,
    updatePost?: GraphCacheUpdateResolver<{ updatePost: Maybe<WithTypename<MutationUpdatePostResult>> }, MutationUpdatePostArgs>
  },
  Subscription?: {},
};

export type GraphCacheConfig = {
  schema?: IntrospectionData,
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers,
  storage?: GraphCacheStorageAdapter
};
export const RegularUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RegularUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<RegularUserFragment, unknown>;
export const PostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<PostsQuery, PostsQueryVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreatePostSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"register"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"register"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationRegisterSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RegularUser"}}]}}]}}]}}]}},...RegularUserFragmentDoc.definitions]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationLoginSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RegularUser"}}]}}]}}]}}]}},...RegularUserFragmentDoc.definitions]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserChangePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationChangePasswordSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserSendForgotPasswordEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationForgotPasswordSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationLogoutSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "MutationChangePasswordResult": [
      "Error",
      "MutationChangePasswordSuccess"
    ],
    "MutationCreatePostResult": [
      "Error",
      "MutationCreatePostSuccess"
    ],
    "MutationDeletePostResult": [
      "Error",
      "MutationDeletePostSuccess"
    ],
    "MutationForgotPasswordResult": [
      "Error",
      "MutationForgotPasswordSuccess"
    ],
    "MutationLoginResult": [
      "Error",
      "MutationLoginSuccess"
    ],
    "MutationLogoutResult": [
      "Error",
      "MutationLogoutSuccess"
    ],
    "MutationRegisterResult": [
      "Error",
      "MutationRegisterSuccess"
    ],
    "MutationUpdatePostResult": [
      "Error",
      "MutationUpdatePostSuccess"
    ]
  }
};
      export default result;
    