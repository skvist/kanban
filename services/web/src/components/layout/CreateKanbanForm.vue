<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Skapa ett nytt bräde</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Namn">
                    <b-input
                        v-model="name"
                        placeholder="Namn"
                        required>
                    </b-input>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" @click="create">Skapa Kanban-bräda</button>
                <button class="button" type="button" @click="$parent.close()">Stäng</button>
            </footer>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
            };
        },
        methods: {
            create() {
                // eslint-disable-next-line
                console.log(this.name);

                /* axios.post(`${config.userUrl}:${config.userPort}/api/login`, {
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
                }); */
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