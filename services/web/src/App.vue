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

<style lang="scss">
    @import "~bulma/sass/utilities/_all";
    // Set your colors
    $primary: #8c67ef;
    $primary-invert: findColorInvert($primary);
    $twitter: #4099FF;
    $twitter-invert: findColorInvert($twitter);

    // Setup $colors to use as bulma classes (e.g. 'is-twitter')
    $colors: (
        "white": ($white, $black),
        "black": ($black, $white),
        "light": ($light, $light-invert),
        "dark": ($dark, $dark-invert),
        "primary": ($turquoise, $white-ter),
        "info": ($info, $info-invert),
        "success": ($green, $white-ter),
        "warning": ($warning, $warning-invert),
        "danger": ($danger, $danger-invert),
        "twitter": ($twitter, $twitter-invert)
    );

    // Links
    $link: $primary;
    $link-invert: $primary-invert;
    $link-focus-border: $primary;
    // Import Bulma and Buefy styles
    @import "~bulma";
    @import "~buefy/src/scss/buefy";
    @import "main";
</style>
