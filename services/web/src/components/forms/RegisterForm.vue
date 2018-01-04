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
                <button class="button is-primary">Registrera</button>
                <button class="button" type="button" @click="$parent.close()">Stäng</button>
            </footer>
        </div>
    </form>
</template>

<script>
    export default {
        props: ['username', 'email', 'name', 'password'],
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