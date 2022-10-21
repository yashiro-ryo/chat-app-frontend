type Friend = {
  userId: number;
  userName: string;
};

let friend: Array<Friend> = [];
function getFriend() {
  return friend;
}

function setFriend(newFriend: Array<Friend>) {
  friend = newFriend;
}

export default {
  getFriend,
  setFriend,
} as const;
