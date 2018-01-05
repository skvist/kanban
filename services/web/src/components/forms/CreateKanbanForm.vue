<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Skapa ett nytt bräde</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Namn">
                    <b-input
                        v-model="title"
                        placeholder="Namn"
                        required>
                    </b-input>
                </b-field>
                <b-field label="Beskrivning">
                    <b-input
                        v-model="description"
                        placeholder="Beskrivning">
                    </b-input>
                </b-field>

            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" @click="create">Skapa Kanban-bräde</button>
                <button class="button" type="button" @click="$parent.close()">Stäng</button>
            </footer>
        </div>
    </form>
</template>

<script>
    const axios = require('axios');
    const config = require('@/config');

    export default {
        data() {
            return {
                title: '',
                description: '',
            };
        },
        methods: {
            create() {
                // eslint-disable-next-line
                console.log(this.title);

                axios.post(`${config.kanbanUrl}:${config.kanbanPort}/api/board/create?token=${localStorage.token}`, {
                    title: this.title,
                    description: this.description,
                    owner: localStorage.username,
                    users: [localStorage.username],

                }).then((response) => {
                    // eslint-disable-next-line
                    console.log(response.data);
                    if (response.data.success) {
                        this.$toast.open({
                            message: 'Ett nytt Kanban-bräde har skapats!',
                            type: 'is-success',
                            duration: 2000,
                            position: 'is-top',
                        });
                        this.$emit('boardadded');
                        this.$parent.close();
                        // this.$router.push('/kanban');
                    } else {
                        this.$toast.open({
                            message: `Felmeddelande från servern: ${response.data.title}`,
                            type: 'is-danger',
                            duration: 2000,
                            position: 'is-top',
                        });
                    }
                }).catch((err) => {
                    // eslint-disable-next-line
                    console.log(err);
                });
            },
        },
    };
</script>

<style scoped>
    .modal-card {
        width: auto;
    }
    .field.is-grouped .field + .field {
        margin-left: 0;
    }
</style>