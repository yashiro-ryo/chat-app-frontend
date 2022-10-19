import React from "react";
import { Container, useDisclosure } from "@chakra-ui/react";
import NavBar from "../components/navbar";
import AddressList from "../components/addressList/addressList";
import SearchAddressModal from "../components/searchAddress/searchAddressModal";

function address() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <NavBar />
      <Container>
        <AddressList onOpen={onOpen} />
      </Container>
      <SearchAddressModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}

export default address;
