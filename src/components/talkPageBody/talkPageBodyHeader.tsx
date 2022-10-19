import React from 'react'
import { Box, Link, Flex, Spacer } from "@chakra-ui/react";
const talkroomName = "山田太郎連盟";
const talkerNum = 78;

function talkPageBodyHeader() {
  return (
    <>
      <Flex height="50px" border="1px" display="flex">
        <Box height="100%" lineHeight="50px" marginLeft="10px">
          {talkroomName} ({talkerNum})
        </Box>
        <Spacer />
        <Link lineHeight="50px" marginRight="10px">
          トーク設定
        </Link>
      </Flex>
    </>
  );
}

export default talkPageBodyHeader;
