import React from "react";
import { Box } from "@chakra-ui/react";
import TalkPageBodyHeader from "./talkPageBodyHeader";
import TalkPageBodyFooter from "./talkPageBodyFooter";
import TalkPageBodyTimeLine from "./talkPageBodyTimeLine";

function talkPageBody() {
  return (
    <>
      <Box height="100%">
        <TalkPageBodyHeader />
        <TalkPageBodyTimeLine />
        <TalkPageBodyFooter />
      </Box>
    </>
  );
}

export default talkPageBody;
