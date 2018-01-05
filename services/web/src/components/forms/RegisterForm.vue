<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Registrera dig</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Användarnamn">
                    <b-input
                        v-model="username"
                        placeholder="Användarnamn"
                        required>
                    </b-input>
                </b-field>
                <b-field label="E-post">
                    <b-input
                        type="email"
                        v-model="email"
                        placeholder="johndoe@example.com"
                        required>
                    </b-input>
                </b-field>
                <b-field label="Namn">
                    <b-input
                        v-model="name"
                        placeholder="John Doe"
                        required>
                    </b-input>
                </b-field>
                <b-field label="Lösenord">
                    <b-input
                        type="password"
                        v-model="password"
                        password-reveal
                        placeholder="Lösenord"
                        required>
                    </b-input>
                </b-field>

            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" @click="register">Registrera</button>
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
                username: '',
                email: '',
                name: '',
                password: '',
            };
        },
        methods: {
            register() {
                // eslint-disable-next-line
                console.log(this.username);

                axios.post(`${config.userUrl}:${config.userPort}/api/create`, {
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    name: this.name,
                }).then((response) => {
                    // eslint-disable-next-line
                    console.log(response.data);
                    if (response.data.success) {
                        this.$toast.open({
                            message: 'Registreringen lyckades, vänligen logga in!',
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