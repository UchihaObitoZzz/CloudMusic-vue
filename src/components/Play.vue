<template>
    <div id="play">
        <div class="header-box-p">
            <div class="header-box-c">
                <div class="play-box" v-if="musicDetail.length !==0">
                    <div class="header">
                        <div class="back" @click="back">
                            <i class="iconfont">&#xe617;</i>
                        </div>
                        <div class="title">
                            <marquee v-if="musicDetail.alia.length !==0" scrolldelay="150">
                                <p class="top">
                                    {{ musicDetail.name }}{{ '(' + musicDetail.alia[0] + ')' }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ musicDetail.name }}{{ '(' + musicDetail.alia[0] + ')' }}
                                </p>
                            </marquee>
                            <p v-else class="top">{{ musicDetail.name }}</p>
                            <p class="bottom">{{ musicDetail.ar[0].name }}{{ musicDetail.ar[1] ? '/' + musicDetail.ar[1].name : ''}}</p>
                        </div>
                        <v-touch class="share" v-on:tap="share" v-on:press="share">
                            <i class="iconfont">&#xe635;</i>
                        </v-touch>
                    </div>
                    <div class="play-bg" :style="'background-image: url(' + musicDetail.al.picUrl + ')'">
                    </div>
                    <div :class="[{'circling-pause': !playStatus}, 'play-disc', 'circling']" :style="'background-image: url(' + discbg + ')'">
                        <div class="play-img">
                            <img class="u-img" :src="musicDetail.al.picUrl">
                        </div>
                    </div>
                    <div class="play-disc-img"></div>
                    <v-touch class="progress-bar" v-on:panstart="panstart" v-on:panend="panend">
                        <span class="currentTime">{{ Math.floor(musicCurrentTime.musicCurrentTime/60)+":"+(musicCurrentTime.musicCurrentTime%60/100).toFixed(2).slice(-2) }}</span>
                        <range v-model="currentTime" @on-change="onChange" :rangeBarHeight="2"></range>
                        <span class="duration">{{ Math.floor(musicDuration/60)+":"+(musicDuration%60/100).toFixed(2).slice(-2) }}</span>
                    </v-touch>
                    <div class="lyric ">
                        <ul v-if="Lyric.length == 0">
                            <li>暂无歌词！</li>
                        </ul>
                        <ul :style="{'top': nowLrcTop + 'px'}" v-if="Lyric">
                            <li ref="lrc" v-for="(item, index) in Lyric" :key="index" :class="{'now-lrc': nowLrcIndex == index}">
                                {{ item.lrc }}
                            </li>
                        </ul>
                    </div>
                    <v-touch class="play-bar">
                        <ul>
                            <v-touch tag="li" v-on:tap="togglePlayType" v-on:press="togglePlayType">
                                <i v-show="playType == 'listloop'" class="iconfont">&#xe6f2;</i>
                                <i v-show="playType == 'random'" class="iconfont random">&#xe612;</i>
                            </v-touch>
                            <v-touch tag="li" v-on:tap="prev" v-on:press="prev">
                                <i class="iconfont prev">&#xe603;</i>
                            </v-touch>
                            <v-touch tag="li" v-on:tap="play(playStatus)" v-on:press="play(playStatus)">
                                <i v-show="playStatus == false" class="iconfont btn">&#xe625;</i>
                                <i v-show="playStatus" class="iconfont btn">&#xe629;</i>
                            </v-touch>
                            <v-touch tag="li" v-on:tap="next" v-on:press="next">
                                <i class="iconfont next">&#xe603;</i>
                            </v-touch>
                            <li @click="getListenLists">
                                <i class="iconfont">&#xe640;</i>
                            </li>
                        </ul>
                    </v-touch>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Range } from 'vux'
import { mapGetters } from 'vuex';
import discbg from './../../static/img/disc.png'
export default {
    name: 'play',
    data: () => ({
        // 滑动到的时间节点
        newTime: 0,
        // 旋转角度
        rotate: 0,
        discbg
    }),
    computed: {
        ...mapGetters([
            'playType',
            'musicDetail',
            // 播放状态
            'playStatus',
            // 歌曲总时间
            'musicDuration',
            // 歌曲当前时间
            'musicCurrentTime',
            // 歌词
            'Lyric',
            // 当前歌词下标
            'nowLrcIndex',
            // 当前歌词位置
            'nowLrcTop',
        ]),
        // 当前播放进度
        currentTime: {
            get() {
                return this.musicCurrentTime.musicCurrentTime / this.musicDuration * 100
            },
            set(newVal) {
            }
        }
    },
    methods: {
        //滑动开始
        panstart() {
            this.$store.state.isTouchMove = true
        },
        // 滑动结束
        panend() {
            this.$store.state.isTouchMove = false
            this.$store.state.newTime = this.newTime
        },
        onChange(val) {
            this.newTime = this.musicDuration * val / 100
        },
        // 返回
        back() {
           this.$store.state.playShow = false
        },
        // 分享
        share() {
            this.$store.state.alertText = '暂不可用，敬请期待~'
            this.$store.commit(this.$types.SET_ALERT_STATUS, true)
        },
        // 切换播放模式
        togglePlayType() {
            this.$store.state.playType = this.playType == 'listloop' ? 'random' : 'listloop'
        },
        // 播放或暂停
        play(status) {
            this.$store.state.playStatus = !status
        },
        // 上一首
        prev() {
            this.$store.dispatch('set_next_or_prev_Music', 'prev')
        },
        // 下一首
        next() {
            this.$store.dispatch('set_next_or_prev_Music', 'next')
        },
        //获取试听列表
        getListenLists() {
            this.$store.state.listenListStatus = true
        }
    },
    components: { Range },
    watch: {
        nowLrcIndex(val) {
            // 计算当前歌词位置
            if (val >= 2) {
                this.$store.state.nowLrcTop = -((val - 1) * 17 - (this.$refs.lrc[val].clientHeight - 17))
            }
        }
    }
}
</script>

<style lang="less">
#play {
    overflow: hidden;
    z-index: 100;
    @keyframes circling {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg)
        }
        to {
            -webkit-transform: rotate(1turn);
            transform: rotate(1turn)
        }
    }
    @-webkit-keyframes circling {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg)
        }
        to {
            -webkit-transform: rotate(1turn);
            transform: rotate(1turn)
        }
    }
    .lyric {
        height: 51px;
        position: relative;
        overflow: hidden;
        margin-top: -23vh;
        z-index: 100;
        display: flex;
        justify-content: center;
        ul {
            width: 80%;
            position: absolute;
            transition: all .5s;
            li {
                list-style: none;
                color: hsla(0, 0%, 100%, .6);
                font-size: 13px;
                min-height: 17px;
                text-align: center;
            }
            .now-lrc {
                color: #FFF;
            }
        }
    }
    .header-box-p {
        height: 100vh;
        position: relative;
        background: #FFF;
        z-index: 100;
        transition: all 1.5s;
        .header-box-c {
            list-style: none;
            height: 100%;
            .play-box {
                height: 90vh;
                background: transparent;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                .header {
                    position: fixed;
                    top: 15px;
                    width: 100%;
                    height: 50px;
                    z-index: 100;
                    background: transparent;
                    display: flex;
                    .back {
                        width: 50px;
                        height: 50px;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .iconfont {
                            font-size: 23px;
                            color: #FFF;
                        }
                    }
                    .title {
                        position: absolute;
                        top: 10px;
                        left: 60px;
                        width: 80vw;
                        display: inline-block;
                        text-align: left;
                        marquee {
                            width: 65vw;
                        }
                        .top {
                            color: #FFF;
                            font-size: 13px;
                        }
                        .bottom {
                            margin-top: 1px;
                            font-size: 12px;
                            color: hsla(0, 0%, 100%, .6);
                        }
                    }
                    .share {
                        width: 50px;
                        height: 50px;
                        position: absolute;
                        right: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .iconfont {
                            font-size: 23px;
                            color: #FFF;
                        }
                    }
                }
                .play-bg {
                    width: 100%;
                    height: 80%;
                    background-repeat: no-repeat;
                    background-size: 100% auto;
                    -webkit-transform: scale(1.5);
                    transform: scale(1.5);
                    -webkit-transform-origin: center top;
                    transform-origin: center top;
                    z-index: -1;
                    transition: opacity .3s linear;
                    filter: blur(20px);
                }
                .play-bg:after {
                    content: " ";
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    background-color: rgba(0, 0, 0, .5);
                }
                .play-disc {
                    position: absolute;
                    z-index: 100;
                    top: 100px;
                    left: 0;
                    right: 0;
                    margin: auto;
                    width: 260px;
                    height: 260px;
                    background-size: contain;
                    background-repeat: no-repeat;
                    .play-img {
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        width: 160px;
                        height: 160px;
                        border-radius: 50%;
                        overflow: hidden;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .circling {
                    -webkit-animation: circling 20s infinite linear;
                    animation: circling 20s infinite linear;
                }
                .circling-pause {
                    -webkit-animation-play-state: paused;
                    animation-play-state: paused;
                }
                .play-disc-img {
                    position: absolute;
                    top: 30px;
                    left: 42%;
                    z-index: 100;
                    width: 84px;
                    height: 122px;
                    background: url('./../../static/img/disc1.png') no-repeat;
                    background-size: contain;
                }
                .progress-bar {
                    position: relative;
                    width: 85%;
                    height: 50px;
                    margin-left: 4vw;
                    margin: 0 auto;
                    margin-top: 30px;
                    .range-quantity {
                        background: #2A78DC;
                    }
                    .range-bar {
                        width: 93%;
                    }
                    .range-handle {
                        width: 18px;
                        height: 18px;
                        top: -8px !important;
                    }
                    .range-min {
                        color: transparent;
                    }
                    .range-max {
                        color: transparent;
                    }
                    .currentTime {
                        position: absolute;
                        color: #FFF;
                        top: -6px;
                        left: 8px;
                        font-size: 12px;
                    }
                    .duration {
                        color: hsla(0, 0%, 100%, .6);
                        position: absolute;
                        top: -6px;
                        right: 0;
                        font-size: 12px;
                    }
                }
                .play-bar {
                    width: 100%;
                    position: absolute;
                    bottom: -10px;
                    ul {
                        overflow: hidden;
                        height: 50px;
                        padding-left: 10px;
                        li {
                            vertical-align: text-top;
                            display: inline-flex;
                            width: 18.9%;
                            align-items: center;
                            justify-content: center;
                            .iconfont {
                                color: #FFF;
                                font-size: 30px;
                            }
                            .btn {
                                font-size: 35px;
                            }
                            .prev {
                                width: 30px;
                                height: 30px;
                                transform: rotate(180deg)
                            }
                            .next {
                                width: 30px;
                                height: 30px;
                            }
                            .random {
                                font-size: 35px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
