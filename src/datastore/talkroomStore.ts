let nowSelectedTalkroomId = 0;

function getNowSelectedTalkroomId() {
  return nowSelectedTalkroomId;
}

function setNowSelectedTalkroomId(talkroomId: number) {
  nowSelectedTalkroomId = talkroomId;
}

export default {
  getNowSelectedTalkroomId,
  setNowSelectedTalkroomId,
} as const;
