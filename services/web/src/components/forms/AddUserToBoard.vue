<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Lägg till användare till brädet</p>
            </header>
           <section class="modal-card-body">
              <!--    <b-field label="Användarnamn">
                    <b-input
                        v-model="username"
                        placeholder="Användarnamn"
                        required>
                    </b-input>
                </b-field>
             -->
            <p class="content"><b>Vald användare:</b> {{ username }}</p>
            <b-field label="Lägg till användare">
                <b-autocomplete
                    v-model="name"
                    :data="filteredDataArray"
                    placeholder="doe"
                    icon="magnify"
                    @select="option => username = option">
                    <template slot="empty">Användaren kan inte hittas.</template>
                </b-autocomplete>
            </b-field>
            </section>

            <footer class="modal-card-foot">
                <button class="button is-primary" @click="addUser">Lägg till</button>
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
                username: null,
                name: '',
                existingUsers: [],
            };
        },
        props: {
            board: {
                type: String,
            },
            users: {
                type: Array,
            },
        },
        computed: {
            filteredDataArray() {
                return this.existingUsers.filter(option =>
                    (option.toString().toLowerCase().indexOf(this.name.toLowerCase()) >= 0),
                );
            },
        },
        beforeMount() {
            this.getAllUsers();
        },
        methods: {
            getAllUsers() {
                axios.get(`${config.userUrl}:${config.userPort}/api/all`, {
                }).then((response) => {
                    response.data.forEach((element) => { this.existingUsers.push(element.username); });
                }).catch((err) => {
                    // eslint-disable-next-line
                    console.log(err);
                });
            },
            addUser() {
                // eslint-disable-next-line
                console.log(this.username);

                // eslint-disable-next-line
                console.log('existing:', this.existingUsers);
                const existsInDb = this.existingUsers.indexOf(this.username);
                if (existsInDb === -1) {
                    this.$toast.open({
                        message: 'Användaren existerar inte',
                        type: 'is-danger',
                        duration: 2000,
                        position: 'is-top',
                    });
                    return;
                }

                const existsInBoard = this.users.indexOf(this.username);
                if (existsInBoard > -1) {
                    this.$toast.open({
                        message: 'Användaren har redan tillgång till brädet',
                        type: 'is-danger',
                        duration: 2000,
                        position: 'is-top',
                    });
                    return;
                }
                /* eslint-disable */
                this.users.push(this.username);

                axios.post(`${config.kanbanUrl}:${config.kanbanPort}/api/board/update/${this.board}?token=${localStorage.token}`, {
                    users: this.users,
                }).then((response) => {
                    // eslint-disable-next-line
                    console.log(response.data);
                    if (response.data.success) {
                        this.$toast.open({
                            message: 'Användaren har nu tillgång till brädet!',
                            type: 'is-success',
                            duration: 2000,
                            position: 'is-top',
                        });
                        // eslint-disable-next-line
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
    .modal-card-body {
        min-height: 15em;
    }
</style>