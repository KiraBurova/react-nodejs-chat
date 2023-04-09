import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import ChannelList from "./components/ChannelList";
import ChannelContainer from "./components/ChannelContainer";
import Auth from "./components/Auth";

import "./App.css";
import "stream-chat-react/dist/css/index.css";

const apiKey = import.meta.env.VITE_API_KEY;

const client = StreamChat.getInstance(apiKey);

const cookies = new Cookies();
const authToken = cookies.get("token", cookies.get("token"));

if (authToken) {
  client.connectUser(
    {
      name: cookies.get("userName"),
      fullName: cookies.get("fullName"),
      id: cookies.get("userId"),
      phoneNumber: cookies.get("phoneNumber"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    authToken
  );
}

const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) {
    return <Auth />;
  }

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelList
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          isEditing={isEditing}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
