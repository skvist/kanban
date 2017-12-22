<template>
    <div id="app">
        <section class="section">
            <div class="container container-wrapper">
                <navbar :show="true"></navbar>
                <div class="container container-main">
                    <router-view/>
                </div>
                <main-footer :show="true"></main-footer>
            </div>
        </section>
    </div>
</template>

<script>
//import '@/assets/style.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';


export default {
    name: 'app',
    components: {
        Navbar,
        'main-footer': Footer,
    },
};
</script>

<style>


#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}

.section {
    padding: 0;
}
</style>
