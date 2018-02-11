export const getMsg = (state, payload) => {
  state.msg = payload.msg;
}
//只是简单的把最新得到的msg赋给state上的msg属性
