import React from "react";
import { ApolloProvider } from "@apollo/client";
import create_api_client from "../utils/apolloClient";

interface AuthenticatedProps {
  userInfo: Record<string, any>;
  logout: () => void;
  csrf: string;
}

function on_graphql_error(messages: string[]) {
  messages.forEach((message) => alert(message));
}

const Authenticated: React.FC<AuthenticatedProps> = ({
  userInfo,
  logout,
  csrf,
}) => {
  return (
    <ApolloProvider client={create_api_client(csrf, on_graphql_error)}>
      <div className="flex flex-col items-start p-4 w-auto">
        <div>
          <h3>Heey {userInfo.preferred_username}! 👋</h3>
        </div>
        <button
          onClick={logout}
          className="font-bold opacity-70 hover:opacity-100 mt-6"
        >
          Logout
        </button>
      </div>
    </ApolloProvider>
  );
};

export default Authenticated;
