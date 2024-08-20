import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useAuthContext } from "../utils/authContext";
import { MESSAGE_CREATE, MESSAGES, MESSAGE_CREATED } from "./messages";

interface ChatMessage {
  type: "user" | "assistant";
  message: string;
}

const Chat: React.FC = () => {
  const { userInfo } = useAuthContext();
  const [fadeIn, setFadeIn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading, error, subscribeToMore } = useQuery(MESSAGES);
  const [sendMessageMutation] = useMutation(MESSAGE_CREATE, {
    errorPolicy: "all",
  });

  useEffect(() => {
    if (userInfo) {
      console.log("Preferred Username:", userInfo.preferred_username);
    } else {
      console.log("No userInfo available");
    }
  }, [userInfo]);

  useEffect(() => {
    if (data) {
      setChatLog(
        data.messages.map((msg: any) => ({
          type: "assistant",
          message: msg.content,
        }))
      );
    }
  }, [data]);

  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageCreated;

        return Object.assign({}, prev, {
          messages: [...prev.messages, newMessage],
        });
      },
    });
  }, [subscribeToMore]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setChatLog((prevChatlog) => [
      ...prevChatlog,
      { type: "user", message: inputValue },
    ]);

    if (userInfo && userInfo.preferred_username) {
      sendMessage(inputValue, userInfo.preferred_username);
    }
    setInputValue("");
  };

  const sendMessage = async (message: string, username: string) => {
    setIsLoading(true);
    try {
      const { data } = await sendMessageMutation({
        variables: { message, username },
      });
      console.log(data);
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        {
          type: "assistant",
          message: data.messageCreate.content,
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      className={`fade-in ${
        fadeIn ? "fade-in-active" : ""
      } h-screen flex flex-col flex-grow justify-center pl-10`}
    >
      <div
        style={{ border: "3px solid #1c6b59" }}
        className="h-[90%] w-[90%] border border-black bg-[#1c6b59]  ml-7 text-white rounded-2xl"
      >
        <div className="flex flex-col mx-6 my-7">
          <h2 className="tracking-wide">Chat</h2>
          <p className="tracking-wider font-thin">I'm here to help</p>
          <hr />
        </div>
        <div className="flex flex-col h-[80%] mx-auto w-[98%]">
          <div className="flex-grow p-6 overflow-auto">
            <div className="flex flex-col space-y-4">
              {chatLog.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      message.type === "user" ? "bg-[#318672ae]" : "bg-gray-800"
                    } flex rounded-full px-4 p-2 max-w-sm bg-[#318672ae] opacity-90`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="flex rounded-full border border-b-gray-300">
              <input
                className="text-white flex-grow px-4 py-4 bg-transparent focus:outline-none"
                type="text"
                placeholder="Type your message here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="bg-orange-500 hover:bg-orange-400 transition duration-200 rounded-full px-6 py-4 font-semibold focus:outline-none"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
