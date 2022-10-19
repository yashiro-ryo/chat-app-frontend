import React from "react";
import { List, ListItem, Box, Button, Text, Spacer } from "@chakra-ui/react";

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
  return (
    <>
      <Box borderRadius="5px" border="1px" marginTop="30px" padding="10px">
        <Box paddingBottom="5px">
          <Text as="b" marginRight="5px">
            連絡先 一覧
          </Text>
          <Button colorScheme="blue" marginRight="5px">
            リスト更新
          </Button>
          <Button colorScheme="blue" onClick={props.onOpen}>
            連絡先追加
          </Button>
        </Box>
        <List>
          {addresses.map((address) => {
            return (
              <ListItem
                data-user-id={address.id}
                key={address.id}
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
                  {address.name}
                </Text>
                <Spacer />
                <Button
                  colorScheme="blue"
                  display="inline-block"
                  marginTop="5px"
                  marginRight="10px"
                >
                  削除
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
}

export default addressList;
