import React, { useEffect, useState } from "react";
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
  Input,
} from "@chakra-ui/react";
import friendStore from "../../datastore/friendUserStore";
import webSocket from "../../service/webSocket";

export default function BasicUsage(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    setUsers(friendStore.getFriend());
  }, []);
  const [users, setUsers] = useState<
    Array<{ userId: number; userName: string }>
  >([]);
  const [createTalkroomUser, setUser] = useState<Array<number>>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [inputField, setField] = useState<string>("");

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setField(inputValue);
  };

  const doCreateTalkroom = () => {
    if (inputField.length === 0) {
      setErrorMsg("1文字以上入力してください");
      return;
    }
    if (createTalkroomUser.length === 0) {
      setErrorMsg("ユーザーを１人以上選択してください");
      return
    }
    webSocket.createTalkroom(createTalkroomUser, inputField)
    props.onClose();
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
                {users.map((value: { userId: number; userName: string }) => {
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

              <Box
                border="1px"
                borderRadius="5px"
                marginTop="10px"
                padding="5px"
              >
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
                <Text>トークルーム名</Text>
                <Input
                  type="text"
                  placeholder="トークルーム名"
                  onChange={handleInputChange}
                ></Input>
              </Box>
            </Box>
            <Text color="red">{errorMsg}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.onClose}>キャンセル</Button>
            <Button
              colorScheme="blue"
              marginLeft="10px"
              onClick={doCreateTalkroom}
            >
              トークを開始する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
