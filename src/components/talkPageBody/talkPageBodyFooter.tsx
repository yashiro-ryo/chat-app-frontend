import React, { useState } from "react";
import { Box, Textarea, Button } from "@chakra-ui/react";
import webSocket from "../../service/webSocket";
import Log from "../../tools/log";

function talkPageBodyFooter() {
  const sendMessage = () => {
    Log.v("send message :" + value);
    if (value.length === 0) {
      // TODO メッセージを入力していないときはボタンを押せなくするなど対応必要
      return;
    }
    // TODO datastore から取るようにする
    const talkroomId = 2;
    webSocket.sendMessage("text", value, talkroomId);
  };

  const [value, setValue] = useState<string>("");
  // any は滅ぼす
  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  return (
    <>
      <Box border="1px" padding="10px" maxHeight="175px" overflow="hidden">
        <Textarea
          rows={4}
          placeholder="メッセージを入力"
          value={value}
          onChange={handleInputChange}
        />
        <Button marginTop="10px" colorScheme="blue" onClick={sendMessage}>
          送信
        </Button>
        <Button marginTop="10px" marginLeft="10px">
          ファイル添付
        </Button>
      </Box>
    </>
  );
}

export default talkPageBodyFooter;
