import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import TalkPage from "./components/talkpage";
import Mypage from "./components/mypage";
import Address from "./components/address";
import websocket from "./service/webSocket";

function App() {
  useEffect(() => {
    return () => {
      websocket.connectionClose;
    };
  }, []);
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"/talkpage"} element={<TalkPage />} />
          <Route path={"/mypage"} element={<Mypage />} />
          <Route path={"/address"} element={<Address />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
