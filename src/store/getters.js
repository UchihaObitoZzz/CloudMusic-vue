export default {
  // 用户信息
  user: state => state.user,
  // 用户详细信息
  userDetail: state => state.userDetail,
  // 用户歌单
  userPlayList: state => state.userPlayList,
  // 是否加载状态
  isLoading: state => state.isLoading,
  // 是否显示弹窗提示
  alertStatus: state => state,
  // 是否显示confirm弹窗
  confirmStatus: state => state,

  /* 判断前进后退 */
  count: state => state.count,
  transitionName: state => state.transitionName,
  routeChain: state => state.routeChain,
  /* END */

  // 弹窗提示文字
  alertText: state => state.alertText,
  // confirm弹窗提示文字
  confirmText: state => state.confirmText,
  // 侧边栏显示状态
  sidebarShow: state => state.sidebarShow,
  // 试听列表显示状态
  listenListStatus: state => state,
  // 是否显示播放页
  playShow: state => state,
  // 导航下标位置
  activeTab: state => state.activeTab,
  // 试听列表
  listenLists: state => state.listenLists,
  // 播放模式
  playType: state => state.playType, 
  // 当前播放歌曲Url
  audioUrl: state => state.audioUrl,
  // 推荐歌单
  songsheet: state => state.songsheet,
  // 音乐列表
  newMusicList: state => state.newMusicList,
  // 歌单详情
  songsheetDetail: state => state.songsheetDetail,
  // 搜索列表
  searchList: state => state.searchList,
  // 歌曲详情
  musicDetail: state => state.musicDetail,
  // 排行榜歌单详情
  rankDetail: state => state.rankDetail,
  // 歌手单曲
  singerSong: state => state.singerSong,
  // 专辑旋转角度
  rotate: state => state.rotate,
  // 音乐歌词
  Lyric: state => state.Lyric,
  // 当前歌词下标
  nowLrcIndex: state => state.nowLrcIndex,
  // 当前歌词位置
  nowLrcTop: state => state.nowLrcTop,
  // 播放状态
  playStatus: state => state.playStatus,
  // 歌曲总时间
  musicDuration: state => state.musicDuration,
  // 歌曲当前时间
  musicCurrentTime: state => state,
  // 是否滑动播放进度条
  isTouchMove: state => state.isTouchMove,
  // 滑动进度条后的时间节点
  newTime: state => state.newTime,
  // 是否当前音乐
  curMusic: state => state.curMusic,
  // 底部播放列表开关
  songListStatus: state => state.songListStatus
}