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
  createPost?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  forgotPassword: Scalars['Boolean'];
  login?: Maybe<MutationLoginResult>;
  logout: Scalars['Boolean'];
  register?: Maybe<MutationRegisterResult>;
  updatePost?: Maybe<Post>;
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UserLoginInput;
};


export type MutationRegisterArgs = {
  input: UserCreateInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type MutationLoginResult = Error | MutationLoginSuccess;

export type MutationLoginSuccess = {
  __typename?: 'MutationLoginSuccess';
  data: User;
};

export type MutationRegisterResult = Error | MutationRegisterSuccess;

export type MutationRegisterSuccess = {
  __typename?: 'MutationRegisterSuccess';
  data: User;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
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

export type UserCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserLoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

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

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  Error?: (data: WithTypename<Error>) => null | string,
  MutationLoginSuccess?: (data: WithTypename<MutationLoginSuccess>) => null | string,
  MutationRegisterSuccess?: (data: WithTypename<MutationRegisterSuccess>) => null | string,
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
  MutationLoginSuccess?: {
    data?: GraphCacheResolver<WithTypename<MutationLoginSuccess>, Record<string, never>, WithTypename<User> | string>
  },
  MutationRegisterSuccess?: {
    data?: GraphCacheResolver<WithTypename<MutationRegisterSuccess>, Record<string, never>, WithTypename<User> | string>
  },
  Post?: {
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
  createPost?: GraphCacheOptimisticMutationResolver<MutationCreatePostArgs, Maybe<WithTypename<Post>>>,
  deletePost?: GraphCacheOptimisticMutationResolver<MutationDeletePostArgs, Maybe<WithTypename<Post>>>,
  forgotPassword?: GraphCacheOptimisticMutationResolver<MutationForgotPasswordArgs, Scalars['Boolean']>,
  login?: GraphCacheOptimisticMutationResolver<MutationLoginArgs, Maybe<WithTypename<MutationLoginResult>>>,
  logout?: GraphCacheOptimisticMutationResolver<Record<string, never>, Scalars['Boolean']>,
  register?: GraphCacheOptimisticMutationResolver<MutationRegisterArgs, Maybe<WithTypename<MutationRegisterResult>>>,
  updatePost?: GraphCacheOptimisticMutationResolver<MutationUpdatePostArgs, Maybe<WithTypename<Post>>>
};

export type GraphCacheUpdaters = {
  Mutation?: {
    createPost?: GraphCacheUpdateResolver<{ createPost: Maybe<WithTypename<Post>> }, MutationCreatePostArgs>,
    deletePost?: GraphCacheUpdateResolver<{ deletePost: Maybe<WithTypename<Post>> }, MutationDeletePostArgs>,
    forgotPassword?: GraphCacheUpdateResolver<{ forgotPassword: Scalars['Boolean'] }, MutationForgotPasswordArgs>,
    login?: GraphCacheUpdateResolver<{ login: Maybe<WithTypename<MutationLoginResult>> }, MutationLoginArgs>,
    logout?: GraphCacheUpdateResolver<{ logout: Scalars['Boolean'] }, Record<string, never>>,
    register?: GraphCacheUpdateResolver<{ register: Maybe<WithTypename<MutationRegisterResult>> }, MutationRegisterArgs>,
    updatePost?: GraphCacheUpdateResolver<{ updatePost: Maybe<WithTypename<Post>> }, MutationUpdatePostArgs>
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
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"register"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"register"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationRegisterSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RegularUser"}}]}}]}}]}}]}},...RegularUserFragmentDoc.definitions]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationLoginSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RegularUser"}}]}}]}}]}}]}},...RegularUserFragmentDoc.definitions]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "MutationLoginResult": [
      "Error",
      "MutationLoginSuccess"
    ],
    "MutationRegisterResult": [
      "Error",
      "MutationRegisterSuccess"
    ]
  }
};
      export default result;
    