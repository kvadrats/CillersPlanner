import React from "react";

interface AnonymousProps {
  login: () => Promise<void>;
}

const Anonymous: React.FC<AnonymousProps> = ({ login }) => {
  return (
    <>
      <h3>Hey friend, you're not authenticated yet.</h3>
      <button
        className="py-2 px-6 border rounded-lg hover:bg-white hover:text-black transition duration-150 ease-out hover:ease-in tracking-wide mt-4"
        onClick={login}
      >
        Login Here
      </button>
    </>
  );
};

export default Anonymous;
