<template>
    <div class="active">
        <p>
            <span class="user" v-for="user in users">{{ user }}</span>
        </p>
    </div>
</template>

<script>
    import io from 'socket.io-client';

    const config = require('@/config');

    const socket = io.connect(`${config.chatUrl}:${config.chatPort}`);

    /* eslint no-underscore-dangle: 0 */
    export default {
        data() {
            return {
                users: [],
            };
        },
        props: {
            board: {
                type: String,
            },
        },
        methods: {
            enterRoom() {
                const message = {
                    username: localStorage.username,
                    board: this.board,
                };
                socket.emit('room', message);

                socket.on('room', (data) => {
                    console.log(data);
                    this.users = data;
                });

                /* socket.on('itemsupdated', (data) => {
                    console.log(data);
                    console.log('SOMEONE CHANGED SOMETHING!');
                }); */
            },

        },
        beforeMount() {
            this.enterRoom();
        },
    };
</script>

<style lang="scss" scoped>
    @import "~bulma/sass/utilities/_all";
    .container-main p {
        margin-bottom: 0;
    }

    .user {
        margin-right: 1em;
        color: white;
        background-color: $green;
        padding: 0.7em;
        border-radius: 10px;
    }
</style>