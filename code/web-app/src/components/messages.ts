import { gql } from "@apollo/client";

export const MESSAGE_CREATE = gql`
  mutation MessageCreate($message: String!, $username: String!) {
    messageCreate(message: $message, username: $username) {
      content
    }
  }
`;

export const MESSAGES = gql`
  query MessagesGet {
    messages {
      content
      username
    }
  }
`;

export const MESSAGE_CREATED = gql`
  subscription OnMessageCreated {
    messageCreated {
      content
      username
    }
  }
`;
