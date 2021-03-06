<template>
    <div id="commen">
        <drawer :show="sidebarShow" :pos="pos" :tran="tran" @change-show="changeDrawerShow">
            <div class="sidebar" slot="drawer">
                <sidebar></sidebar>
            </div>
            <transition :name="transitionName">
                <slot></slot>
            </transition>
            <playbar></playbar>
            <loading v-model="isLoading"></loading>
            <div v-transfer-dom>
                <alert v-model="alertStatus.alertStatus" title="提示" @on-hide="onHide"> {{ alertText }}</alert>
            </div>
            <div v-transfer-dom>
                <confirm v-model="confirmStatus.confirmStatus" title="提示" @on-cancel="onCancel" @on-confirm="onConfirm">
                    <p style="text-align:center;">{{ confirmText == 'login' ? '你还未登录，赶紧去登录吧~' : '确定退出吗？' }}</p>
                </confirm>
            </div>
            <listenLists></listenLists>
            <transition name="fold">
                <play v-show="playShow"></play>
            </transition>
        </drawer>
    </div>
</template>

<script>
import {
    Loading,
    Alert,
    Confirm,
    TransferDomDirective as TransferDom
} from 'vux'
// 底部播放栏
import playbar from '@/components/Playbar'
// 左侧过渡效果
import drawer from '@/components/drawer'
// 侧边栏
import sidebar from '@/components/Sidebar'
// 试听列表
import listenLists from '@/components/ListenLists'
import play from '@/components/Play'
import { mapGetters } from 'vuex';

export default {
    name: 'commen',
    data: () => ({
        // 侧边栏方向
        pos: 'left',
        // 过渡效果类型
        tran: 'push'
    }),
    directives: {
        TransferDom
    },
    computed: {
        ...mapGetters([
            // 过渡效果
            'transitionName',
            // 加载状态是否显示
            'isLoading',
            // 弹窗提示是否显示
            'alertStatus',
            // 弹窗提示文字
            'alertText',
            // confirm弹窗提示文字
            'confirmText',
            // confirm弹窗是否显示
            'confirmStatus',
            // 左侧菜单是否显示
            'sidebarShow',
            // 是否显示播放页面
            'playShow'
        ])
    },
    methods: {
        // 网络错误弹窗确定按钮判断是否后退
        onHide() {
            this.$store.commit(this.$types.SET_ALERT_STATUS, false)
        },
        // 登录或退出弹窗
        onCancel() {
            this.$store.commit(this.$types.SET_CONFIRM_STATUS, false)
            this.$route.path == '/user' ? this.$router.go(-1) : ''
        },
        // 登录或退出弹窗
        onConfirm() {
            if (this.confirmText == 'sign_out') {
                this.$store.state.user = ''
                localStorage.removeItem('user')
            }
            this.$store.commit(this.$types.SET_CONFIRM_STATUS, false)
            this.$router.push('/login')
        },
        // 显示侧边栏
        drawerToggle() {
            this.drawerShow = !this.drawerShow
        },
        // 点击遮罩层关闭侧边栏
        changeDrawerShow(state) {
            this.$store.state.sidebarShow = state
        }
    },
    components: {
        Loading,
        Alert,
        Confirm,
        playbar,
        drawer,
        sidebar,
        listenLists,
        play
    }
}
</script>

<style lang="less" scoped>
#commen {
    width: 100%;
    height: 100%;
    .sidebar {
        width: 45vw;
    }
    .fold-enter-active,
    .fold-leave-active {
        transition: all .5s ease-in;
    }
    .fold-enter,
    .fold-leave-active {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
}
</style>
