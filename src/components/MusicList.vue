<template>
  <div id="music-list">
    <div v-show="isNewSong">
      <div class="tag">
      </div>
      <p class="title">{{ title }}</p>
    </div>
    <div class="remd_sg">
      <div class="m-sglst" v-for="(item, index) in musicList" :key="index">
        <div class="m-sg-item">
          <div class="sg_num" v-show="!isNewSong && !isSearch">{{ index+1 }}</div>
          <v-touch class="sg-btn" v-on:tap="handleClick(item.id)" v-on:press="handleClick(item.id)">
            <div class="pic" v-show="isNewSong || isSearch">
              <img v-lazy="item.blurPicUrl" alt="">
            </div>
            <div sg-left>
              <div class="sg-title">{{ item.name }}</div>
              <div class="sg-singer">{{ item.singerName }}</div>
            </div>
          </v-touch>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    isNewSong: Boolean,
    isSearch: Boolean,
    title: String,
    musicList: Array
  },
  data: () => ({
  }),
  mounted() {
  },
  methods: {
    ...mapActions(['handleClickMusic']),
    handleClick(id) {
      // 点击歌曲之后的处理
      this.handleClickMusic(id)
    }
  }
}
</script>

<style lang="less" scoped>
#music-list {
  position: relative;
  .title {
    width: 68px;
    text-align: center;
    padding: 5px 0 5px 0;
    color: #666;
    font-size: 13px;
    margin-left: 1rem;
    margin-top: 21rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
  }
  .remd_sg {
    position: relative;
    .m-sglst {
      margin-left: 10px;
      padding-bottom: 5px;
      padding-top: 5px;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      .m-sg-item {
        text-decoration: none;
        color: #000;
        display: flex;
        font-size: 14px;
        .sg_num {
          line-height: 50px;
          margin-right: 20px;
          font-size: 16px;
          margin-left: 10px;
          color: #666;
        }
        .sg-btn {
          -webkit-box-flex: 1;
          flex: 1 1 auto;
          display: -webkit-box;
          display: flex;
          position: relative;
          padding-top: 6px;
          .pic {
            img {
              width: 50px;
              height: 50px;
              margin-right: 20px;
            }
          }
          .sg-left {
            -webkit-box-flex: 1;
            flex: 1 1 auto;
            padding: 6px 0;
            width: 0;
          }
          .sg-play {
            background-position: 0px -265px;
            position: absolute;
            right: 10px;
            width: 40px;
            height: 40px;
            background-size: 250px;
            background-repeat: no-repeat;
          }
          .sg-title {
            width: 55vw;
            height: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .sg-singer {
            color: #888;
            font-size: 12px;
            margin-top: 5px;
            width: 55vw;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>