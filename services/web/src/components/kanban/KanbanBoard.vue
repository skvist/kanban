<template>
    <div class="start">
        <h1>Kanban</h1>
       <div class="columns">
            <div class="column"></div>
            <div class="column"></div>
            <div class="column"></div>
            <div class="column"></div>
        </div>
    </div>
</template>

<script>
    import auth from '@/auth';

    export default {
        name: 'Start',

        components: {
        },
        data() {
            return {
            };
        },
        beforeRouteEnter(to, from, next) {
            auth.checkAuth();
            if (auth.user.authenticated) {
                next();
            } else {
                next(false);
            }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    text-align: center;
}

h2 {
    margin-top: 2em;
}
</style>
