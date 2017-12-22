<template>
    <div class="is-paddingless">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link :to="{ name: 'Start' }" class="navbar-item">
            <img src="../../assets/logo.png">
            </router-link>

            <div class="navbar-burger" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }">
            <span></span>
            <span></span>
            <span></span>
            </div>
        </div>
        <div class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">

        <!-- <div id="main-nav" class="navbar-menu"> -->
        <div class="navbar-start">
        <router-link :to="{ name: 'Start' }" class="navbar-item">
             <span class="icon">
                    <i class="fa fa-home"></i>
                </span>
                <span>
                    Hem
                </span>
        </router-link>
        <router-link :to="{ name: 'Kanban' }" class="navbar-item">
        <span class="icon">
                <i class="fa fa-list"></i>
            </span>
            <span>
                Kanban
            </span>
        </router-link>
        <router-link :to="{ name: 'About' }" class="navbar-item">
        <span class="icon">
                <i class="fa fa-question-circle-o"></i>
            </span>
            <span>
                Om
            </span>
        </router-link>

        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <p class="control">
                <a class="bd-tw-button button" href="#" @click="logout">
                Logout
                </a>
            </p>
            </div>
        <div class="navbar-item">
            <div class="field is-grouped">
            <p class="control">
                <a class="bd-tw-button button" target="_blank" href="https://github.com/skvist/ramverk2-app">
                <span class="icon">
                    <i class="fa fa-github"></i>
                </span>
                <span>
                    GitHub
                </span>
                </a>
            </p>

            </div>
        </div>
        </div>
    </div>
    </nav>
    </div>


</template>

<script>
import auth from '../../auth';


export default {
    name: 'Navbar',
    data() {
        return {
            showNav: false,
        };
    },
    methods: {
        logout() {
            auth.logout();
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main-nav {
    z-index: 1000;
}

i {
    font-size: 18px;
    margin-right: 3px;
}

</style>
