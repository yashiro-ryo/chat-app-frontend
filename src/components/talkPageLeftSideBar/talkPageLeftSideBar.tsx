import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  Link,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import CreateTalkroomModal from "./createTalkroomModal";
import { emitter } from "../../service/eventEmitter";
import websocket from "../../service/webSocket";

function talkPageLeftSideBar() {
  const [talkrooms, setTalkrooms] = useState([]);
  useEffect(() => {
    emitter.on("update-talkrooms", (data: any) => {
      setTalkrooms(data.body.talkrooms);
    });
    // websocket の接続が完了してからデータをrequestする
    emitter.on("websocket-connected", () => {
      // TODO userIdはdatastoreから取得する
      const userId = 1;
      websocket.getTalkrooms(userId);
    });
    return () => {
      emitter.off("update-talkrooms", () => {
        console.log("off");
      });
    };
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleTalkroom = (e: React.MouseEvent) => {
    const talkroomId = Number(e.currentTarget.getAttribute("data-talkroom-id"));
    console.log("talkroom id :" + talkroomId);
    websocket.getTalk(talkroomId);
  };

  return (
    <>
      <Box border="1px" height="100%">
        <Box padding="5px" height="50px">
          <Button colorScheme="blue" onClick={onOpen}>
            トークルームを作る
          </Button>
        </Box>
        {talkrooms.length == 0 ? (
          <Box>トークルームが存在しません</Box>
        ) : (
          <List>
            {talkrooms.map((value: any) => {
              return (
                <ListItem
                  width="100%"
                  height="70px"
                  border="1px"
                  className="hover:bg-gray-200"
                  key={"talkroom-" + value.talkroomId}
                  data-talkroom-id={value.talkroomId}
                  onClick={handleTalkroom}
                >
                  <Link
                    paddingLeft="10px"
                    display="block"
                    height="100%"
                    lineHeight="70px"
                    className="hover:no-underline"
                  >
                    {value.talkroomName}
                  </Link>
                </ListItem>
              );
            })}
          </List>
        )}
        <CreateTalkroomModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
}

export default talkPageLeftSideBar;
