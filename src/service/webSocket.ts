import Log from "../tools/log";
import { emitter } from "./eventEmitter";
import friendStore from "../datastore/friendUserStore";
import myInfoStore from "../datastore/myinfoStore";
let con: WebSocket | null = null;

function setupEventHandler() {
  if (con !== null) {
    return;
  }
  Log.v("setup websocket event handler");

  // test 用のcookieを挿入する
  console.log(document.cookie);

  // TODO https にかえる -> wss
  con = new WebSocket("ws://localhost:8080/ws");
  con.onopen = () => {
    Log.v("websocket connected");
    // TODO エラーダイアログ非表示する
    // 情報を取得する
    getMyInfo();
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

// cookieから自分の情報を取得する
function getMyInfo() {
  if (con === null) {
    return;
  }
  const content = {
    token: "yashirotoken-desu",
    request: "get-myinfo",
    data: {},
  };
  con.send(JSON.stringify(content));
  Log.v("successed send get myinfo request");
}

function sendMessage(contentType: string, text: string, talkroomId: number) {
  if (con === null) {
    return;
  }
  const content = {
    token: "yashirotoken-desu",
    request: "add-message",
    data: {
      userId: myInfoStore.getMyInfo().userId,
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
      userId: myInfoStore.getMyInfo().userId,
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
      userId: myInfoStore.getMyInfo().userId,
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

function createTalkroom(users: Array<number>, talkroomName: string) {
  if (con === null) {
    return;
  }

  const content = {
    token: "yashirotoken-desu",
    request: "create-talkroom",
    data: {
      UserId: myInfoStore.getMyInfo().userId,
      TalkroomName: talkroomName,
      UserIds: users,
    },
  };
  con.send(JSON.stringify(content));
  Log.v("successed send create talkroom request");
  return;
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
    case "get-myinfo-result":
      Log.v("response get myinfo");
      myInfoStore.setMyInfo(data.body.userId, data.body.userName);
      emitter.emit("websocket-connected");
      break;
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
      friendStore.setFriend(data.body.UserInfos);
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
  createTalkroom,
} as const;
