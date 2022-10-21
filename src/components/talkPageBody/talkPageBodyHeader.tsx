import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";

function talkPageBodyHeader() {
  return (
    <>
      <Flex height="50px" border="1px" display="flex">
        <Box height="100%" lineHeight="50px" marginLeft="10px">
          トークルーム
        </Box>
        <Spacer />
      </Flex>
    </>
  );
}

export default talkPageBodyHeader;
