<template>
    <div class="start">
        <h1>{{ board.title }}</h1>
        <div class="columns">
            <div class="column">
                <div class="panel">
                    <p class="panel-heading scope-backlog">Backlog</p>
                    <draggable v-model="itemsBacklog" class="dragArea" :options="{group:'people'}" @end="dropped">

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
                    <draggable v-model="itemsInprogress" class="dragArea" :options="{group:'people'}" @end="dropped">

                    <div class="panel-block" v-for="inprogress in itemsInprogress" @click="showItem(inprogress)">
                        <h4>{{ inprogress.position }} {{ inprogress.title }}</h4>
                    </div>

                    </draggable>
                </div>
            </div>
            <div class="column">
                <div class="panel">
                    <p class="panel-heading scope-test">Test</p>
                    <draggable v-model="itemsTest" class="dragArea" :options="{group:'people'}" @end="dropped">
                    <div class="panel-block" v-for="test in itemsTest">
                        <h4 @click="showItem(test)">{{ test.position }} {{ test.title }}</h4>
                    </div>
                    </draggable>
                </div>
            </div>
            <div class="column">
                <div class="panel">
                    <p class="panel-heading scope-done">Färdiga</p>
                    <draggable v-model="itemsDone" class="dragArea" :options="{group:'people'}" @end="dropped">
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
    </div>
</template>

<script>
    import draggable from 'vuedraggable';

    import auth from '@/auth';
    import EditItem from '../forms/EditItem';

    const axios = require('axios');
    const config = require('@/config');

    export default {
        name: 'KanbanBoard',

        components: {
            EditItem,
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
            };
        },
        methods: {
            showItem(item) {
                this.isFormActive = true;
                this.showThisItem = item;
                // eslint-disable-next-line
                console.log('SHOW ITEM', this.showThisItem);
            },
            /* eslint-disable no-param-reassign */
            dropped() {
                this.itemsBacklog.forEach((element, index) => {
                    element.position = index;
                });
                this.itemsInprogress.forEach((element, index) => {
                    element.position = index;
                });
                this.itemsTest.forEach((element, index) => {
                    element.position = index;
                });
                this.itemsDone.forEach((element, index) => {
                    element.position = index;
                });
                // eslint-disable-next-line
                console.log('Backlog', this.itemsBacklog);
                // eslint-disable-next-line
                console.log('InProgress', this.itemsInprogress);
                // eslint-disable-next-line
                console.log('Test', this.itemsTest);
                // eslint-disable-next-line
                console.log('Done', this.itemsDone);
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
        },
        beforeMount() {
            this.getBoard();
            this.getItems();
        },
        beforeRouteEnter(to, from, next) {
            auth.checkAuth();
            if (auth.user.authenticated) {
                next();
            } else {
                next(false);
            }
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
</style>
