<template>
    <div class="start">
        <h1>Välkommen till Kanban</h1>
        <p>Kanban härstammar från bilindustrin i Japan men har anammats inom många områden, däribland web/mjukvaruutveckling, där det ibland används inom exempelvis agil utveckling. Det hjälper till visualisera arbetsflödet, så att man får en överblick av projektet och kan följa vare feature från start till slut.</p>
        <img src="../assets/postit.jpg" class="start-img">

       <div class="columns">
            <div class="column"></div>
            <div class="column">
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
    import LoginForm from './forms/LoginForm';
    import RegisterForm from './forms/RegisterForm';

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

.start-img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2em;
    border: 1px solid black;
}

</style>
