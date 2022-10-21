import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { emitter } from "../../service/eventEmitter";

export type MessageInfo = {
  isMe: boolean;
  messageBody: string;
  sentAt: string;
  messageId: number;
  isRead: boolean;
};

function talkPageBodyTimeLine() {
  const [messageInfos, setMessageInfo] = useState<Array<any>>([]);
  useEffect(() => {
    emitter.on("update-talk", (talk) => {
      if (talk.body.message == null) {
        setMessageInfo([]);
        return;
      }
      if (talk == undefined || talk.length == 0) {
        console.log("トークを表示できないよ!");
        return;
      }
      console.log(talk.body.message);
      setMessageInfo(talk.body.message);
    });
    return () => {
      emitter.off("update-talk", (talk) => {
        console.log(talk);
      });
    };
  });
  return (
    <>
      <Box
        overflowY="scroll"
        border="1px"
        className="h-[calc(100vh_-_60px_-_50px_-_175px)]"
        display="block"
      >
        {messageInfos.length === 0 || messageInfos == null ? (
          <Text>メッセージがありません</Text>
        ) : (
          <Box>
            {messageInfos.map((message: any) => {
              return message.Sent_user_id == 2 ? (
                <Box
                  key={message.Message_id}
                  display="flex"
                  justifyContent="end"
                >
                  <Box bgColor="#008995" width="200px" margin="5px">
                    <Box>{message.Content}</Box>
                    <Box>{message.Sent_at}</Box>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={message.Message_id}
                  display="flex"
                  justifyContent="start"
                >
                  <Box bgColor="#ebeff2" width="200px" margin="5px">
                    <Box>{message.Content}</Box>
                    <Box>{message.Sent_at}</Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </>
  );
}

export default talkPageBodyTimeLine;
