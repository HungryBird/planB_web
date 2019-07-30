<template>
    <div class="dash">
        <h1>
            {{ chrono }}好，{{ user.Name }}
        </h1>
    </div>
</template>

<script>
import store from '@/store'
import { getChrono } from '@/util/util'
import { setInterval } from 'timers'
import dash from '@/api/dash'

export default {
    data() {
        return {
            user: store.getters.getUser,    // 用户信息
            chrono: '', // 时辰
            rw: [],
        }
    },
    mounted() {
        this.setChrono();   // 获取时刻
    },
    methods: {
        setChrono() {
            const self = this;
            setInterval(() => {
                const date = new Date();
                const hours = date.getHours();
                self.chrono = getChrono(hours);
            }, 1000);
        },
    }
}
</script>

<style lang="scss">
    .dash{
        width: 1080px;
        .box-card{
            cursor: pointer;
            h1{
                text-align: center;
                font-size: 48px;
            }
        }
        .box-card.doing{
            background: rgba(255, 223, 37, 1);
        }
        .box-card.wait{
            background: rgba(54, 169, 206, 1);
        }
    }
</style>
