<template>
    <div class="about">
        <div class="columns">
            <div class="column"></div>
            <div class="column is-two-thirds">
                <h1>Om</h1>
                    <p>Denna webbplats är en del av kursen Webbaserade ramverk 2 (ramverk2) som går på Blekinge Tekniska Högskola.</p><br>
                    <p>
                        Projektet är uppbyggt med en microservices-arkitektur när det kommer till att ha tjänsterna uppdelade, för detta projekt så är allt samlat under ett repo och ingen vikt har lagts på skalning och liknande. Följande tjänster används: Web (frontend), Users (Rest API), Kanban (Rest API), Realtime och MongoDB-server.

                    </p>
                    <p>
                        <a href="https://github.com/skvist/kanban">Github Projekt</a><br>

                        <a href="https://github.com/skvist/ramverk2-server">Github ramverk2-server</a><br>

                        <a href="https://github.com/skvist/ramverk2-client">Github ramverk2-client</a><br>
                    </p>
            </div>
            <div class="column"></div>
        </div>

    </div>

</template>

<script>
export default {
    name: 'About',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {

}
</style>
