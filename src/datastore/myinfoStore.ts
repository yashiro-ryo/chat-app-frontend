const myInfo = {
  userId: 0,
  userName: "",
};

function setUserIdForMyInfo(userId: number) {
  myInfo.userId = userId;
}

function setUserNameForMyInfo(userName: string) {
  myInfo.userName = userName;
}

function setMyInfo(userId: number, userName: string) {
  myInfo.userId = userId;
  myInfo.userName = userName;
}

function getMyInfo() {
  return myInfo;
}

export default {
  setUserIdForMyInfo,
  setUserNameForMyInfo,
  setMyInfo,
  getMyInfo,
} as const;
