import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  List,
  ListItem,
  Button,
} from "@chakra-ui/react";

const dummyUser = [
  {
    userId: 787897988,
    userName: "林田 こうた",
  },
  {
    userId: 79879878098,
    userName: "川俣 義和",
  },
];

export default function BasicUsage(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [createTalkroomUser, setUser] = useState<Array<number>>([]);

  const addMember = (e: React.MouseEvent) => {
    const userId = Number(e.currentTarget.getAttribute("data-user-id"));
    if (userId == null) {
      return;
    }
    setUser([...createTalkroomUser, userId]);
  };

  const removeUser = (e: React.MouseEvent) => {
    const userId = Number(e.currentTarget.getAttribute("data-user-id"));
    if (userId == null) {
      return;
    }
    setUser(createTalkroomUser.filter((user) => user !== userId));
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>トークルーム作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>トークを開始するユーザーを選択してください</Text>
            <Box>
              <List>
                {dummyUser.map((value) => {
                  return (
                    <ListItem key={value.userId}>
                      <Text>{value.userName}</Text>
                      <Button data-user-id={value.userId} onClick={addMember}>
                        追加
                      </Button>
                    </ListItem>
                  );
                })}
              </List>

              <Box border="1px" borderRadius="5px" marginTop="10px" padding="5px">
                <Text>追加するユーザー</Text>
                <List>
                  {createTalkroomUser.map((value: number) => {
                    return (
                      <ListItem key={value}>
                        {value}
                        <Button data-user-id={value} onClick={removeUser}>
                          取り消し
                        </Button>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.onClose}>キャンセル</Button>
            <Button colorScheme="blue" marginLeft="10px">
              トークを開始する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
