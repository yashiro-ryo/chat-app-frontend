import React, { useState } from "react";
import Navbar from "./navbar";
import TalkPageLeftSideBar from "./talkPageLeftSideBar/talkPageLeftSideBar";
import TalkPageBody from "./talkPageBody/talkPageBody";

export default function talkpage() {
  return (
    <>
      <Navbar />
      <div className="flex w-full h-[calc(100vh_-_60px)]">
        <div className="w-1/3">
          <TalkPageLeftSideBar />
        </div>
        <div className="w-2/3">
          <TalkPageBody />
        </div>
      </div>
    </>
  );
}
