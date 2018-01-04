<template>
    <div class="start">
        <h1>Kanban</h1>
        <div class="columns">
            <div class="column"></div>
            <div class="column">
                <div class="field is-grouped">
                <p class="control">
                    <button class="button is-primary is-medium" @click="isFormActive = true">
                        Skapa en ny Kanban-bräda
                    </button>
                    <b-modal :active.sync="isFormActive" has-modal-card>
                        <create-kanban-form></create-kanban-form>
                    </b-modal>
                </p>
                </div>
            </div>
            <div class="column"></div>
        </div>

        <div class="columns" v-for="boards in chunkedBoards">
            <div class="column" v-for="board in boards">
                <router-link :to="{ name: 'KanbanBoard', params: { id: board._id }}" class="hover-box">
                <div class="box">
                     <h3>{{ board.title }}</h3>
                </div>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
    import chunk from 'chunk';
    import auth from '@/auth';
    import CreateKanbanForm from './forms/CreateKanbanForm';

    const axios = require('axios');
    const config = require('@/config');


    export default {
        name: 'Start',
        components: {
            CreateKanbanForm,
        },
        data() {
            return {
                isFormActive: false,
                boards: [
                ],
            };
        },
        methods: {
            getBoards() {
                // eslint-disable-next-line
                console.log('getBoads');

                axios.get(`${config.kanbanUrl}:${config.kanbanPort}/api/board/user?token=${localStorage.token}`)
                .then((response) => {
                    // eslint-disable-next-line
                    console.log(response.data);
                    this.boards = response.data;
                }).catch((err) => {
                    // eslint-disable-next-line
                    console.log(err);
                });
            },
        },
        beforeMount() {
            this.getBoards();
        },


        beforeRouteEnter(to, from, next) {
            if (auth.checkAuth()) {
                next();
            } else {
                next(false);
            }
        },
        computed: {
            chunkedBoards() {
                return chunk(this.boards, 4);
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    text-align: center;
}

h2 {
    margin-top: 2em;
}

.field.is-grouped {
    justify-content: center;
}

.message.is-info {

}

.box {
    border-radius: 3px;
    color: #fff;
    background-color: #23D160;
    padding: 1em 1.25em;
    max-width: 314px;
}

.box:hover {
    background-color: rgb(29, 179, 82)
}
/* a .hover-box {

} */



</style>
