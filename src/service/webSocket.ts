import Log from "../tools/log";
import { emitter } from "./eventEmitter";
let con: WebSocket | null = null;

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjYyNDMwNTQsInRva2VuLXR5cGUiOiJ0b2tlbiIsInVzZXJfaWQiOjF9.C8ugH9ec5Kwg3v5mjc-1zKtOaEyiqf_skZJGk9yRmnE";

function setupEventHandler() {
  if (con !== null) {
    return;
  }
  Log.v("setup websocket event handler");

  // test 用のcookieを挿入する
  document.cookie = "token=" + token;
  console.log(document.cookie);

  // TODO https にかえる -> wss
  con = new WebSocket("ws://localhost:8080/ws");
  con.onopen = () => {
    Log.v("websocket connected");
    // TODO エラーダイアログ非表示する
    emitter.emit("websocket-connected");
  };

  // any は滅ぼす
  con.onmessage = (event: any) => {
    // json -> obj
    const data = JSON.parse(String(event.data));
    Log.v(data);
    handleWebsocketResponse(data);
  };

  con.onerror = () => {
    Log.v("websocket not connected");
    // TODO エラーダイアログ表示する
  };
}

function sendMessage(contentType: string, text: string, talkroomId: number) {
  if (con === null) {
    return;
  }
  const content = {
    token: "yashirotoken-desu",
    request: "add-message",
    data: {
      userId: 1,
      contentType: contentType,
      content: text,
      talkroomId: talkroomId,
    },
  };
  con.send(JSON.stringify(content));
  Log.v("successed send message");
}

function searchUser(email: string) {
  if (con === null) {
    return;
  }
  const content = {
    token: "yashirotoken-desu",
    request: "search-user",
    data: {
      queryEmail: email,
    },
  };
  con.send(JSON.stringify(content));
  Log.v("successed send search query email");
}

function getUserInfos(userId: number) {
  if (con === null) {
    return;
  }

  const content = {
    token: "yashirotoken-desu",
    request: "get-user",
    data: {
      userId: userId,
    },
  };
  con.send(JSON.stringify(content));
  Log.v("successed send get users request");
}

function getTalkrooms(userId: number) {
  if (con === null) {
    return;
  }
  const content = {
    token: "yashirotoken-desu",
    request: "get-talkrooms",
    data: {
      userId: userId,
    },
  };
  con.send(JSON.stringify(content));
  Log.v("successed send get talkrooms request");
}

function getTalk(talkroomId: number) {
  if (con === null) {
    return;
  }

  const content = {
    token: "yashirotoken-desu",
    request: "get-message",
    data: {
      talkroomId: talkroomId,
    },
  };
  con.send(JSON.stringify(content));
  Log.v("successed send get message request");
}

function deleteUser(deleteUserId: number) {
  if (con === null) {
    return;
  }

  const content = {
    token: "yashirotoken-desu",
    request: "delete-user",
    data: {
      UserId: 1,
      DeleteUserId: deleteUserId,
    },
  };
  con.send(JSON.stringify(content));
  Log.v("successed send get message request");
}

function addUser(addUserId: number) {
  if (con === null) {
    return;
  }

  const content = {
    token: "yashirotoken-desu",
    request: "add-user",
    data: {
      UserId: 1,
      AddUserId: addUserId,
    },
  };
  con.send(JSON.stringify(content));
  Log.v("successed send add user request");
}

function connectionClose() {
  if (con === null) {
    return;
  }
  con.close();
  Log.v("close connection");
}

function handleWebsocketResponse(data: any) {
  switch (data.response) {
    case "search-user-result":
      Log.v("response search user");
      // ステータスコードチェック
      if (data.status == 400) {
        emitter.emit("address.show-search-result-not-found");
      } else if (data.status == 200) {
        emitter.emit("address.show-search-result", data);
      }
      break;
    case "get-talkrooms-result":
      Log.v("response get talkrooms");
      emitter.emit("update-talkrooms", data);
      break;
    case "get-message-result":
      Log.v("response get message");
      emitter.emit("update-talk", data);
      console.log(data);
      break;
    case "get-users-result":
      Log.v("response get users");
      emitter.emit("update-users", data);
      break;
  }
}

export default {
  setupEventHandler,
  sendMessage,
  getTalkrooms,
  deleteUser,
  addUser,
  connectionClose,
  searchUser,
  getTalk,
  getUserInfos,
} as const;
