<template>
    <div class="start">
       <div class="columns">
            <div class="column"></div>
            <div class="column">
                <h1>Välkommen till Kanban</h1>
                <div class="field is-grouped">
                    <p class="control">
                         <button class="button is-primary is-medium" @click="isLoginActive = true">
                            Logga in
                        </button>
                        <b-modal :active.sync="isLoginActive" has-modal-card>
                            <login-form></login-form>
                        </b-modal>
                    </p>
                     <p class="control middle">
                         eller
                    </p>
                    <p class="control">
                         <button class="button is-primary is-medium" @click="isRegisterActive = true">
                            Registrera dig
                        </button>
                        <b-modal :active.sync="isRegisterActive" has-modal-card>
                            <register-form></register-form>
                        </b-modal>
                    </p>
                </div>
            </div>
            <div class="column"></div>
        </div>
    </div>
</template>

<script>
    import LoginForm from './layout/LoginForm';
    import RegisterForm from './layout/RegisterForm';

    export default {
        name: 'Start',
        components: {
            LoginForm,
            RegisterForm,
        },
        data() {
            return {
                isLoginActive: false,
                isRegisterActive: false,

            };
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    text-align: center;
}
/*
h2 {
    margin-top: 2em;
} */

.field.is-grouped {
    justify-content: center;
}

.middle {
    margin-top: 0.5em;
    font-size: 20px;
}

</style>
