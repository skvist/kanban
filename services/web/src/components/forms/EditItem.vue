<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Artikel</p>
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
                <b-input maxlength="400" type="textarea" v-model="item.description" :value="item.description"></b-input>
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
    import io from 'socket.io-client';

    const axios = require('axios');
    const config = require('@/config');

    const socket = io.connect(`${config.chatUrl}:${config.chatPort}`);

    /* eslint no-underscore-dangle: 0 */
    export default {
        data() {
            return {
                /* title: '',
                description: '', */
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

                axios.post(`${config.kanbanUrl}:${config.kanbanPort}/api/item/update/${this.item._id}?token=${localStorage.token}`, {
                    title: this.item.title,
                    description: this.item.description,
                    modified: new Date(),
                }).then((response) => {
                    // eslint-disable-next-line
                    console.log(response.data);
                    if (response.data.success) {
                        this.$toast.open({
                            message: 'Uppdaterad',
                            type: 'is-success',
                            duration: 500,
                            position: 'is-top',
                        });
                        setTimeout(() => {
                            console.log('sent emit', this.item.board);
                            socket.emit('updated', { board: this.item.board, username: localStorage.username });
                        }, 100);

                        this.$parent.close();
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
    .container-main p {
        margin-bottom: 0;
    }
</style>