<template>
    <div id="page">
        <Navbar/>
		
        <b-card-group id="search-buttons" deck class="p-3">
            
            <b-card 
            id="vehicle-search"
            img-alt="Card image" 
            class="text-center position-relative p-2"
            img-top
            @click="goToVehicle()">
                <b-card-img 
                :src="require('../assets/img/test/vehicle-default.png')">
                </b-card-img>

                <b-card-text>
                Búsqueda por Vehículos
                </b-card-text>
            </b-card>

            <b-card 
            id="individual-search"
            img-alt="Card image" 
            class="text-center position-relative p-2"
            img-top>
                <b-card-img 
                :src="require('../assets/img/test/individual-parts-default.png')">
                </b-card-img>

                <b-card-text>
                Búsqueda por Partes
                </b-card-text>
            </b-card>
        </b-card-group>
        
		
    </div>
    
</template>

<script>
    import Navbar from '../components/Navbar'

    export default {
        name: 'Home',
        components: {
            Navbar
        },

        methods:{

            goToVehicle(){
                location.href = "/trucksearch";
            }

        }
    }
</script>

<style scoped>

    #search-buttons {
        display: flex;
        max-width: 800px;
        width: 75%;
        height: 100%;
        margin: auto;
        align-items: center;
        justify-content: center;

    }

    #page {
        height: 80vh;
    }

    b-card {
        background: darkgray;
        
    }

    b-card-img {
        width: 30%;
        height: 30%;
    }

    b-card-text {

    }


</style>