import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Text,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { emitter } from "../../service/eventEmitter";
import webSocket from "../../service/webSocket";

type SearchResult = {
  userId: number;
  userName: string;
};

function searchAddressModal(props: any) {
  // event handler
  useEffect(() => {
    initSearchModal();
    emitter.on("address.show-search-result", (value: any) => {
      setSearchErrorMessage("");
      setSearchResult(value.body.resultUser);
    });
    emitter.on("address.show-search-result-not-found", () => {
      setSearchErrorMessage("ユーザーが見つかりません");
      setSearchResult(null);
    });
    return () => {
      emitter.off("address.show-search-result", () => {
        console.log("aiueo");
      });
      emitter.off("address.show-search-result", () => {
        setSearchErrorMessage("ユーザーが見つかりません");
      });
    };
  }, []);
  // result
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  // status and error message
  const [searchErrorMessage, setSearchErrorMessage] = useState<string>("");
  const [searchStatusMessage, setSearchStatusMessage] = useState<string>("");
  // form
  const [value, setValue] = useState<string>("");

  // init
  const initSearchModal = () => {
    setSearchResult(null);
    setSearchErrorMessage("");
    setSearchStatusMessage("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const onClickSearch = () => {
    if (value.length == 0) {
      setSearchErrorMessage("1文字以上入力してください");
      return;
    }

    webSocket.searchUser(value);
  };

  const addUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    const addUserId = Number(e.currentTarget.getAttribute("data-user-id"));
    webSocket.addUser(addUserId);
    props.onClose();
  };
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>連絡先 検索</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="メールアドレスを入力"
              value={value}
              onChange={handleInputChange}
            />
            <Text color="#ff0000">{searchErrorMessage}</Text>
            <Text color="#636363">{searchStatusMessage}</Text>
            <Box>
              {searchResult === null ? (
                <List>
                  <ListItem></ListItem>
                </List>
              ) : (
                <List>
                  <ListItem key={searchResult.userId}>
                    <Box display="flex">
                      <Text>{searchResult.userName}</Text>
                      <Button
                        data-user-id={searchResult.userId}
                        onClick={addUser}
                      >
                        追加
                      </Button>
                    </Box>
                  </ListItem>
                  );
                </List>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={props.onClose}>
              閉じる
            </Button>
            <Button colorScheme="blue" onClick={onClickSearch}>
              検索
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default searchAddressModal;
