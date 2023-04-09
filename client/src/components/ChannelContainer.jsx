import React from "react";
import { Channel, useChatContext } from "stream-chat-react";

import ChannelInner from "./ChannelInner";
import CreateChannel from "./CreateChannel";
import EditChannel from "./EditChannel";
import TeamMessage from "./TeamMessage";

const ChannelContainer = ({
  isEditing,
  isCreating,
  setIsCreating,
  setIsEditing,
  createType,
}) => {
  const channel = useChatContext();
  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const emptyState = () => {
    return (
      <div className="channel-empty__container">
        <p className="channel-empty__first">
          This is the beginnning of your chat history
        </p>
        <p className="channel-empty__second">
          Send messages, attachments, link, emojis and more
        </p>
      </div>
    );
  };

  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={emptyState}
        Message={(message, index) => <TeamMessage key={index} {...message} />}
      >
        <ChannelInner setIsEditing={setIsEditing}></ChannelInner>
      </Channel>
    </div>
  );
};

export default ChannelContainer;
