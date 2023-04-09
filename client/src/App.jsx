import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import ChannelList from "./components/ChannelList";
import Channel from "./components/Channel";

import "./App.css";

const apiKey = import.meta.env.VITE_API_KEY;

const client = StreamChat.getInstance(apiKey);

const App = () => {
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelList />
        <Channel />
      </Chat>
    </div>
  );
};

export default App;
