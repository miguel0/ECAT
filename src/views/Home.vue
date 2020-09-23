<template>
    <Navbar/>
</template>

<script>
    import Navbar from '../components/Navbar'

    export default {
        name: 'Home',
        components: {
            Navbar
        },
        methods: {
            goTo: function(route) {
                window.location.href = route;
            }
        }
    }
</script>