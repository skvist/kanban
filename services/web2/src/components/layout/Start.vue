<template>
    <div class="start">
        Hej hej
    </div>
</template>

<script>

    export default {
        name: 'Start',
        data() {
            return {
                msg: 'Ramwerk2',
            };
        },
        components: {
            'me-image-card': CardImage,
            'me-message': Message,
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
    margin-top: 4em;
}

h2 {
    margin-top: 2em;
}

</style>
