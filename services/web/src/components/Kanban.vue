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
                <a href="#" class="hover-box">
                <div class="box">
                     <h3>{{board.name}}</h3>
                </div>
                </a>
            </div>
        </div>

    </div>
</template>

<script>
    import chunk from 'chunk';
    import auth from '@/auth';
    import CreateKanbanForm from './layout/CreateKanbanForm';

    export default {
        name: 'Start',
        components: {
            CreateKanbanForm,
        },
        data() {
            return {
                isFormActive: false,
                boards: [
                    { id: 1, name: 'Projekt1' },
                    { id: 2, name: 'Hemligt projekt' },
                    { id: 3, name: 'Nytt projekt' },
                    { id: 4, name: 'Exjobb' },
                    { id: 5, name: 'Ramverk2 projekt' },
                ],
            };
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
