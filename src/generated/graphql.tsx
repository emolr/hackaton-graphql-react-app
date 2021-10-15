import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Minumum 0 and maximum page count of 50 per page scalar type */
  CountPerPage: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
};

/** Agent user represents a user + including agent specific data like presence */
export type Agent = UserInterface & {
  __typename?: 'Agent';
  /** Optional avatar image for the user */
  avatarUrl?: Maybe<Scalars['URL']>;
  /** A display name that return the first possible option name > email > phone number > id */
  displayName: Scalars['String'];
  /** The email of the user */
  email: Scalars['EmailAddress'];
  /** The id representing the user */
  id: Scalars['ID'];
  /** A phone number to contact the agent */
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
  /** The presence object for agent users with information about working status and other things */
  presence?: Maybe<AgentPresence>;
};

/** Data specific to describe the presence of an Agent, like status */
export type AgentPresence = {
  __typename?: 'AgentPresence';
  status?: Maybe<AgentPresenceStatus>;
};

/** An enum describing the presence status state */
export enum AgentPresenceStatus {
  Away = 'AWAY',
  Working = 'WORKING'
}

/** Authentication tokens are generated tokens with a limited lifespan used to authorize agains the API */
export type AuthenticationTokens = {
  __typename?: 'AuthenticationTokens';
  /** A short lived token to use as authentication against API calls */
  accessToken: Scalars['String'];
  /** The time until the access token expires represented in milliseconds */
  expiresIn: Scalars['Int'];
  /** A longer lived token that can be used to generate new access tokens and refresh tokens */
  refreshToken: Scalars['String'];
};

/** Conversation type */
export type Conversation = {
  __typename?: 'Conversation';
  agent?: Maybe<Agent>;
  createdAt: DateTimeObject;
  id: Scalars['ID'];
  status: ConversationStatus;
  updatedAt: DateTimeObject;
  user: User;
};

/** The current status of a conversation */
export enum ConversationStatus {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

/** Conversations type with pagination */
export type Conversations = {
  __typename?: 'Conversations';
  edges: Array<ConversationsEdge>;
  pageInfo: ConversationsPageInfo;
};

/** The list of paginated conversations */
export type ConversationsEdge = {
  __typename?: 'ConversationsEdge';
  node: Conversation;
};

/** Meta information to tell if there's more pages */
export type ConversationsPageInfo = {
  __typename?: 'ConversationsPageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

/** An object containing dateTime in multiple formats */
export type DateTimeObject = {
  __typename?: 'DateTimeObject';
  dateTime: Scalars['DateTime'];
  timestamp: Scalars['Timestamp'];
};

/** Filter input for comparing if agent id is equal */
export type FilterConversationsIdEqualsInput = {
  equals: Scalars['ID'];
};

/** Filter input for filtering based on agent id */
export type FilterConversationsIdInput = {
  id: FilterConversationsIdEqualsInput;
};

/** Filters for filtering conversations */
export type FilterConversationsInput = {
  agent?: Maybe<FilterConversationsIdInput>;
  status?: Maybe<FilterConversationsStatusInput>;
};

/** Filter input for returning only conversations with a specific status */
export type FilterConversationsStatusInput = {
  equals: ConversationStatus;
};

/** Magic link response is a return type letting the client know that the creation of a magic link has succeeded */
export type MagicLinkResponse = {
  __typename?: 'MagicLinkResponse';
  /** Whether the magic link email created succeeded */
  isSent: Scalars['Boolean'];
};

/** Root mutation type */
export type Mutation = {
  __typename?: 'Mutation';
  /**
   * generate new authentication tokens by providing a login token
   * @deprecated The field name was reffering a single token, use createAuthenticationTokensFromLoginToken.
   */
  createAuthenticationTokenFromLoginToken: AuthenticationTokens;
  /**
   * Generate new authentication tokens by providing a refresh token
   * @deprecated The field name was reffering a single token, use createAuthenticationTokensFromRefreshToken.
   */
  createAuthenticationTokenFromRefreshToken: AuthenticationTokens;
  /** generate new authentication tokens by providing a login token */
  createAuthenticationTokensFromLoginToken: AuthenticationTokens;
  /** Generate new authentication tokens by providing a refresh token */
  createAuthenticationTokensFromRefreshToken: AuthenticationTokens;
  /** Generate a magic link email containing links to get login tokens sent to the email provided */
  createMagicLinkEmail: MagicLinkResponse;
  /** Generate a new Twilio access token */
  createTwilioToken: TwilioAccessToken;
  /** Set's the status for an agent user. Eg. away */
  updateUserPresenceStatus: Agent;
};


/** Root mutation type */
export type MutationCreateAuthenticationTokenFromLoginTokenArgs = {
  loginToken: Scalars['String'];
  organisationId: Scalars['String'];
};


/** Root mutation type */
export type MutationCreateAuthenticationTokenFromRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


/** Root mutation type */
export type MutationCreateAuthenticationTokensFromLoginTokenArgs = {
  loginToken: Scalars['String'];
  organisationId: Scalars['String'];
};


/** Root mutation type */
export type MutationCreateAuthenticationTokensFromRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


/** Root mutation type */
export type MutationCreateMagicLinkEmailArgs = {
  customProtocol?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
};


/** Root mutation type */
export type MutationUpdateUserPresenceStatusArgs = {
  status: AgentPresenceStatus;
};

/** Root query type */
export type Query = {
  __typename?: 'Query';
  /** Query for conversations, supporting pagination.  */
  conversations: Conversations;
  /** Me query return the currently logged in agent user */
  me: Agent;
};


/** Root query type */
export type QueryConversationsArgs = {
  page?: Maybe<Scalars['Int']>;
  resultsPerPage?: Maybe<Scalars['Int']>;
  where?: Maybe<FilterConversationsInput>;
};

/** The access token used by twilio client sdk to authorize against Twilio */
export type TwilioAccessToken = {
  __typename?: 'TwilioAccessToken';
  /** Access token generated for Twilio clients, hardcoded for organisation messenger-playground */
  accessToken: Scalars['String'];
};

export type User = UserInterface & {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['URL']>;
  displayName: Scalars['String'];
  email?: Maybe<Scalars['EmailAddress']>;
  id: Scalars['ID'];
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
};

/** Shared interface representing a user */
export type UserInterface = {
  avatarUrl?: Maybe<Scalars['URL']>;
  displayName: Scalars['String'];
  email?: Maybe<Scalars['EmailAddress']>;
  id: Scalars['ID'];
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
};

export type CreateMagicLinkEmailMutationMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type CreateMagicLinkEmailMutationMutation = { __typename?: 'Mutation', createMagicLinkEmail: { __typename?: 'MagicLinkResponse', isSent: boolean } };


export const CreateMagicLinkEmailMutationDocument = gql`
    mutation CreateMagicLinkEmailMutation($email: String!) {
  createMagicLinkEmail(email: $email) {
    isSent
  }
}
    `;
export type CreateMagicLinkEmailMutationMutationFn = Apollo.MutationFunction<CreateMagicLinkEmailMutationMutation, CreateMagicLinkEmailMutationMutationVariables>;

/**
 * __useCreateMagicLinkEmailMutationMutation__
 *
 * To run a mutation, you first call `useCreateMagicLinkEmailMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMagicLinkEmailMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMagicLinkEmailMutationMutation, { data, loading, error }] = useCreateMagicLinkEmailMutationMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateMagicLinkEmailMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateMagicLinkEmailMutationMutation, CreateMagicLinkEmailMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMagicLinkEmailMutationMutation, CreateMagicLinkEmailMutationMutationVariables>(CreateMagicLinkEmailMutationDocument, options);
      }
export type CreateMagicLinkEmailMutationMutationHookResult = ReturnType<typeof useCreateMagicLinkEmailMutationMutation>;
export type CreateMagicLinkEmailMutationMutationResult = Apollo.MutationResult<CreateMagicLinkEmailMutationMutation>;
export type CreateMagicLinkEmailMutationMutationOptions = Apollo.BaseMutationOptions<CreateMagicLinkEmailMutationMutation, CreateMagicLinkEmailMutationMutationVariables>;