<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Item</p>
            </header>
            <section class="modal-card-body">
                <p>Skapad: {{ item.created.substring(0,10) }}</p>
                <b-field label="Namn">
                    <b-input
                        v-model="item.title"
                        required>
                    </b-input>
                </b-field>
                <b-field label="Beskrivning">
                <b-input maxlength="400" type="textarea" :value="item.description"></b-input>
                </b-field>



            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" @click="create">Uppdatera</button>
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
        props: {
            item: {
                type: Object,
            },
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
                        this.$parent.close();
                        this.$router.push('/kanban');
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