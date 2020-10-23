<template>
    <div id="page">
        <Navbar/>
		
        <b-card-group id="search-buttons" deck class="p-3">
            
            <div class="search-btn">
                <b-card 
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
            </div>

            <div class="search-btn">
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
            </div>
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
        height: 75%;
        margin: auto;
        align-items: center;
        justify-content: center;
        
    }

    #page {
        height: 80vh;
    }

    .search-btn {
        cursor: pointer;
        width: 50%;
        
    }

</style>