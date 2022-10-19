import React, { useEffect, useState } from "react";
import { List, ListItem, Box, Button, Text, Spacer } from "@chakra-ui/react";
import { emitter } from "../../service/eventEmitter";
import webSocket from "../../service/webSocket";

const addresses = [
  {
    name: "川端　康成",
    id: 79878970987098,
  },
  {
    name: "山川　一斉",
    id: 67679878979879,
  },
  {
    name: "川口　一輝",
    id: 70738098098890,
  },
];

function addressList(props: any) {
  // any は滅ぼす
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    emitter.on("websocket-connected", () => {
      webSocket.getUserInfos(1);
    });
    emitter.on("update-users", (data) => {
      setUsers(data.body.UserInfos);
    });
    return () => {
      emitter.off("websocket-connected", () => {
        console.log("off");
      });
      emitter.off("update-users", () => {
        console.log("off");
      });
    };
  }, []);

  const updateUsers = () => {
    // token や datastore からデータを取得する
    webSocket.getUserInfos(1);
  };

  const deleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    const deleteUserId = Number(e.currentTarget.getAttribute("data-user-id"));
    webSocket.deleteUser(deleteUserId);
  };

  return (
    <>
      <Box borderRadius="5px" border="1px" marginTop="30px" padding="10px">
        <Box paddingBottom="5px">
          <Text as="b" marginRight="5px">
            連絡先 一覧
          </Text>
          <Button colorScheme="blue" marginRight="5px" onClick={updateUsers}>
            リスト更新
          </Button>
          <Button colorScheme="blue" onClick={props.onOpen}>
            連絡先追加
          </Button>
        </Box>
        <List>
          {users.length === 0 ? (
            <Box>
              <Text>友達がいません 検索してみましょう!</Text>
            </Box>
          ) : (
            <Box>
              {users.map((address: { userId: number; userName: string }) => {
                return (
                  <ListItem
                    data-user-id={address.userId}
                    key={address.userId}
                    display="flex"
                    width="100%"
                    height="50px"
                    border="1px"
                  >
                    <Text
                      lineHeight="50px"
                      marginLeft="10px"
                      display="inline-block"
                    >
                      {address.userName}
                    </Text>
                    <Spacer />
                    <Button
                      colorScheme="blue"
                      display="inline-block"
                      marginTop="5px"
                      marginRight="10px"
                      data-user-id={address.userId}
                      onClick={deleteUser}
                    >
                      削除
                    </Button>
                  </ListItem>
                );
              })}
            </Box>
          )}
        </List>
      </Box>
    </>
  );
}

export default addressList;
