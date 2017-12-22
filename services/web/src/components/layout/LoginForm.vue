<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Inloggning</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Användarnamn">
                    <b-input
                        v-model="username"
                        placeholder="Användarnamn"
                        required>
                    </b-input>
                </b-field>
                <b-field label="Lösenord">
                    <b-input
                        type="password"
                        v-model="password"
                        password-reveal
                        placeholder="Ditt lösenord"
                        required>
                    </b-input>
                </b-field>

                <b-checkbox>Kom ihåg mig</b-checkbox>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" @click="login">Logga in</button>
                <button class="button" type="button" @click="$parent.close()">Stäng</button>
            </footer>
        </div>
    </form>
</template>

<script>
    const axios = require('axios');
    const config = require('../../config.js');

    export default {
        data() {
            return {
                username: '',
                password: '',
            };
        },
        methods: {
            login() {
                // eslint-disable-next-line
                console.log(this.username);

                axios.post(`${config.userUrl}:${config.userPort}/api/login`, {
                    username: this.username,
                    password: this.password,
                }).then((response) => {
                    // eslint-disable-next-line
                    console.log(response.data);
                    if (response.data.success) {
                        localStorage.username = response.data.username;
                        localStorage.token = response.data.token;
                        this.$toast.open({
                            message: 'Inloggningen lyckades, välkommen in!',
                            type: 'is-success',
                            duration: 2000,
                            position: 'is-top',
                        });
                        this.$router.push('/kanban');
                    } else {
                        this.$toast.open({
                            message: `Felmeddelande från servern: ${response.data.title}`,
                            type: 'is-danger',
                            duration: 5000,
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