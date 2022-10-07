import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<div>home page</div>} />
          <Route path={"/dashboard"} element={<div>dashboard</div>} />
          <Route path={"/login"} element={<div>ログイン</div>} />
          <Route
            path={"/tailwindcss"}
            element={
              <h1 className="text-3xl font-bold underline">Hello world!</h1>
            }
          />
          <Route
            path={"/chakra"}
            element={<Button colorScheme="blue">Button</Button>}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
