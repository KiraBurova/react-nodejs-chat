import React from "react";
import Cookies from "universal-cookie";
import {
  ChannelList as StreamChannelList,
  useChatContext,
} from "stream-chat-react";

import ChannelSearch from "./ChannelSearch";
import TeamChannelPreview from "./TeamChannelPreview";
import TeamChannelList from "./TeamChannelList";
import HospitalIcon from "../assets/hospital.png";
import LogoutIcon from "../assets/logout.png";

const SideBar = () => {
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src={HospitalIcon} alt="Hospital" width={30} />
        </div>
      </div>
      <div className="channel-list__sidebar__icon2">
        <div className="icon1__inner">
          <img src={LogoutIcon} alt="Logout" width={30} />
        </div>
      </div>
    </div>
  );
};

const CompanyHeader = () => {
  return (
    <div className="channel-list__header">
      <p className="channel-list__header__text">Chat</p>
    </div>
  );
};

const ChannelList = () => {
  return (
    <>
      <SideBar />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <StreamChannelList
          filters={{}}
          channelRenderFilterFunction={() => {}}
          List={(props) => <TeamChannelList {...props} type="team" />}
          Preview={(props) => <TeamChannelPreview {...props} type="team" />}
        />
        <StreamChannelList
          filters={{}}
          channelRenderFilterFunction={() => {}}
          List={(props) => <TeamChannelList {...props} type="messaging" />}
          Preview={(props) => (
            <TeamChannelPreview {...props} type="messaging" />
          )}
        />
      </div>
    </>
  );
};

export default ChannelList;
