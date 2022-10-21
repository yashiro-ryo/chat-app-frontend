import React, { useEffect, useState } from "react";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { emitter } from "../service/eventEmitter";
import myInfoStore from "../datastore/myinfoStore";
function navbar() {
  const [user, setUser] = useState<{ userId: number; userName: string }>({
    userId: 0,
    userName: "dummy user",
  });
  useEffect(() => {
    emitter.on("websocket-connected", () => {
      setUser(myInfoStore.getMyInfo());
    });
    return () => {
      emitter.off("websocket-connected", () => {
        console.log("off");
      });
    };
  }, []);
  return (
    <>
      {/* TODO レスポンシブル対応 */}
      <Box bg="#46ccd7" h="60px">
        <Flex padding="10px">
          <Box fontSize="2xl">
            <Link to="/talkpage">chat-app</Link>
          </Box>
          <Spacer />
          <Box lineHeight="35px" marginRight="10px">
            <Menu isLazy>
              <MenuButton>{user.userName} さん</MenuButton>
              <MenuList>
                {/* MenuItems are not rendered unless Menu is open */}
                <Link to="/talkpage">
                  <MenuItem>トークページ</MenuItem>
                </Link>
                <Link to="/mypage">
                  <MenuItem>マイページ</MenuItem>
                </Link>
                <Link to="/address">
                  <MenuItem>連絡先</MenuItem>
                </Link>
                <Link to="/signout">
                  <MenuItem>ログアウト</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default navbar;
