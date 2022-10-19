import React from "react";
import { Container, Box, Text, Link } from "@chakra-ui/react";

export default function errorPage() {
  return (
    <>
      <Container marginTop="50px">
        <Box>
          <Text fontSize="2xl">サーバーに接続できません</Text>
          <Text>しばらくしてから再度接続してください。</Text>
          <Text>
            メンテナンス・サーバー停止情報は<Link href="#">こちら</Link>
          </Text>
        </Box>
      </Container>
    </>
  );
}
