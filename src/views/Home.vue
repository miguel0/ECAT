<template>
    <div>
        <Navbar/>
        <Catalog/>
    </div>
    
</template>

<script>
    import Navbar from '../components/Navbar'
    //import Section from '../components/Section'
    import Catalog from '../views/Catalog'

    export default {
        name: 'Home',
        components: {
            Navbar,
            Catalog
        }
    }
</script>