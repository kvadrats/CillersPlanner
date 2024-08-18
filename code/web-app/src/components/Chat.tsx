import React, { useEffect, useState } from "react";
import axios from "axios";

interface ChatMessage {
  type: "user" | "bot";
  message: string;
}

const Chat: React.FC = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setChatLog((prevChatlog) => [
      ...prevChatlog,
      { type: "user", message: inputValue },
    ]);

    sendMessage(inputValue);
    setInputValue("");
  };

  const sendMessage = (message: string) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    };
    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: message }],
    };

    setIsLoading(true);

    axios
      .post(url, data, { headers: headers })
      .then((response) => {
        console.log(response);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: response.data.choices[0].message.content },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    setFadeIn(true);
  }, []);

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
