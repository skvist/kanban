<template>
    <div class="start">
        <h1>{{ board.title }}</h1>
        <div class="board-nav">
            <button class="button is-primary" @click="isUserFormActive = true">Lägg till användare</button>
            <active-users :board="boardId" class="active-users"></active-users>
        </div>

        <div class="columns">
            <div class="column">
                <div class="panel">
                    <p class="panel-heading scope-backlog">
                        Backlog
                        <i class="fa fa-plus-circle new-item" @click="newItem('backlog')" aria-hidden="true"></i>
                    </p>
                    <draggable v-model="itemsBacklog" class="dragArea" :options="{group:'items'}" @end="dropped">

                    <div class="panel-block" v-for="backlog in itemsBacklog">
                        <h4 class="link" @click="showItem(backlog)">
                            {{ backlog.position }}
                            {{ backlog.title }}
                        </h4>
                    </div>

                    </draggable>
                </div>
            </div>
            <div class="column">
                <div class="panel">
                    <p class="panel-heading scope-inprogress">Pågående</p>
                    <draggable v-model="itemsInprogress" class="dragArea" :options="{group:'items'}" @end="dropped">

                    <div class="panel-block" v-for="inprogress in itemsInprogress" @click="showItem(inprogress)">
                        <h4>{{ inprogress.position }} {{ inprogress.title }}</h4>
                    </div>

                    </draggable>
                </div>
            </div>
            <div class="column">
                <div class="panel">
                    <p class="panel-heading scope-test">Test</p>
                    <draggable v-model="itemsTest" class="dragArea" :options="{group:'items'}" @end="dropped">
                    <div class="panel-block" v-for="test in itemsTest">
                        <h4 @click="showItem(test)">{{ test.position }} {{ test.title }}</h4>
                    </div>
                    </draggable>
                </div>
            </div>
            <div class="column">
                <div class="panel">
                    <p class="panel-heading scope-done">Färdiga</p>
                    <draggable v-model="itemsDone" class="dragArea" :options="{group:'items'}" @end="dropped">
                    <div class="panel-block" v-for="done in itemsDone">
                        <h4 @click="showItem(done)">{{ done.position }} {{ done.title }}</h4>
                    </div>
                    </draggable>
                </div>
            </div>
        </div>
        <b-modal :active.sync="isFormActive" has-modal-card>
            <edit-item :item="showThisItem"></edit-item>
        </b-modal>
        <b-modal :active.sync="isNewFormActive" has-modal-card>
            <new-item :type="newType" v-on:itemadded="getItems" :position="newPosition" :board="boardId" ></new-item>
        </b-modal>
        <b-modal :active.sync="isUserFormActive" has-modal-card>
            <add-user :type="newType" :board="boardId" :users="board.users" ></add-user>
        </b-modal>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import io from 'socket.io-client';


    import auth from '@/auth';
    import EditItem from '../forms/EditItem';
    import NewItem from '../forms/NewItem';
    import AddUser from '../forms/AddUserToBoard';
    import ActiveUsers from '../misc/ActiveUsers';

    const axios = require('axios');
    const config = require('@/config');

    const socket = io.connect(`${config.chatUrl}:${config.chatPort}`);

    /* eslint no-underscore-dangle: 0 */
    function updateItem(item) {
        axios.post(`${config.kanbanUrl}:${config.kanbanPort}/api/item/update/${item._id}?token=${localStorage.token}`, {
            position: item.position,
            type: item.type,
        }).then((response) => {
            // console.log(response.data);

            if (response.data.success === false) {
                this.$toast.open({
                    message: `Felmeddelande från servern: ${response.data.title}`,
                    type: 'is-danger',
                    duration: 2000,
                    position: 'is-top',
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    export default {
        name: 'KanbanBoard',

        components: {
            EditItem,
            NewItem,
            AddUser,
            ActiveUsers,
            draggable,
        },
        data() {
            return {
                boardId: this.$route.params.id,
                board: '',
                itemsBacklog: [],
                itemsInprogress: [],
                itemsTest: [],
                itemsDone: [],
                isFormActive: false,
                showThisItem: {},
                newType: null,
                newPosition: null,
                isNewFormActive: false,
                isUserFormActive: false,
            };
        },
        methods: {
            newItem(type) {
                if (type === 'backlog') {
                    this.newPosition = this.itemsBacklog.length;
                } else if (type === 'inprogress') {
                    this.newPosition = this.itemsInprogress.length;
                } else if (type === 'test') {
                    this.newPosition = this.itemsTest.length;
                } else if (type === 'done') {
                    this.newPosition = this.itemsDone.length;
                }
                this.isNewFormActive = true;
                this.newType = type;
            },
            showItem(item) {
                this.isFormActive = true;
                this.showThisItem = item;

                console.log('SHOW ITEM', this.showThisItem);
            },
            /* eslint-disable no-param-reassign */
            dropped() {
                this.itemsBacklog.forEach((element, index) => { element.position = index; element.type = 'backlog'; });
                this.itemsBacklog.forEach((element) => { updateItem(element); });
                this.itemsInprogress.forEach((element, index) => { element.position = index; element.type = 'inprogress'; });
                this.itemsInprogress.forEach((element) => { updateItem(element); });
                this.itemsTest.forEach((element, index) => { element.position = index; element.type = 'test'; });
                this.itemsTest.forEach((element) => { updateItem(element); });
                this.itemsDone.forEach((element, index) => { element.position = index; element.type = 'done'; });
                this.itemsDone.forEach((element) => { updateItem(element); });

                /* console.log('Backlog', this.itemsBacklog);
                console.log('InProgress', this.itemsInprogress);
                console.log('Test', this.itemsTest);
                console.log('Done', this.itemsDone); */
                setTimeout(() => {
                    console.log('sent emit');
                    socket.emit('updated', { board: this.boardId, username: localStorage.username });
                }, 100);
            },
            /* eslint-enable no-param-reassign */

            getItems() {
                // eslint-disable-next-line
                console.log('getItems');

                axios.get(`${config.kanbanUrl}:${config.kanbanPort}/api/item/board/${this.boardId}?token=${localStorage.token}`)
                .then((response) => {
                    // eslint-disable-next-line
                    console.log(response.data);

                    this.itemsBacklog = response.data.filter(item => item.type === 'backlog');
                    this.itemsInprogress = response.data.filter(item => item.type === 'inprogress');
                    this.itemsTest = response.data.filter(item => item.type === 'test');
                    this.itemsDone = response.data.filter(item => item.type === 'done');
                    this.itemsBacklog.sort((a, b) => a.position - b.position);
                    this.itemsInprogress.sort((a, b) => a.position - b.position);
                    this.itemsTest.sort((a, b) => a.position - b.position);
                    this.itemsDone.sort((a, b) => a.position - b.position);
                }).catch((err) => {
                    // eslint-disable-next-line
                    console.log(err);
                });
            },

            getBoard() {
                // eslint-disable-next-line
                console.log('getBoad');

                axios.get(`${config.kanbanUrl}:${config.kanbanPort}/api/board/show/${this.boardId}?token=${localStorage.token}`)
                .then((response) => {
                    // eslint-disable-next-line
                    console.log(response.data);
                    this.board = response.data;
                }).catch((err) => {
                    // eslint-disable-next-line
                    console.log(err);
                });
            },
            watchForUpdates() {
                socket.on('updateitems', (data) => {
                    console.log('Update made by: ', data);
                    // if (data !== localStorage.username) {
                    this.getItems();
                    // }
                });
            },
        },

        beforeMount() {
            this.getBoard();
            this.getItems();
            this.watchForUpdates();
        },
        beforeRouteEnter(to, from, next) {
            auth.checkAuth();
            if (auth.user.authenticated) {
                next();
            } else {
                next(false);
            }
        },
        // eslint-disable-next-line
        beforeRouteLeave(from, to, next) {
            console.log('Left room');
            const message = {
                username: localStorage.username,
                board: this.boardId,
            };
            socket.emit('leaveroom', message);

            next();
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

h1 {
    text-align: center;
}

h2 {
    margin-top: 2em;
}

.container-main p {
    margin-bottom: 0;
}

.scope-backlog {
    color: $white-ter;
    background-color: $danger;
}
.scope-inprogress {
    color: $white-ter;
    background-color: $turquoise;
}
.scope-test {
    color: $info-invert;
    background-color: $info;
}
.scope-done {
    color: $white-ter;
    background-color: $green;
}

.icon {
    margin-right: 5px;
}

.link {
    cursor: pointer;
}
.arrows {
    cursor: move;
}

.dragArea {
    min-height: 10px;
}
.new-item {
    float: right;
    font-size: 30px;
}

.board-nav {
    margin-bottom: 2em;
}
.active-users {
    float: right;
}
</style>
