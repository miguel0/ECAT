<template>
    <div>
        <Navbar/>
        <br>
        <b-container>
            <b-row>
                <b-col>
                    <b-form-input :placeholder="searchPlaceHolder" type='search'></b-form-input>
                    <br>
                    <b-list-group>
                        <b-list-group-item v-for="(vehicle, index) in sampleVehicleList" :key="index" class="flex-column align-items-start">
                            <div>
                                <h5>
                                    
                                </h5>
                            </div>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
            </b-row>
        </b-container>
        
    </div>
    
</template>

<script>

import Navbar from '../components/Navbar' 

export default {
    name: 'Catalog',
    components: {
        Navbar
    },
    data() {
        return {
            searchPlaceHolder: 'Busca por VIN',
            sampleVehicleList: [
                {
                    name: 'TRACTOR C7H',
                    vin: 'CYMS18010001-C7H 6X2 MT13.43-50 ZF16S2231TO HR7 MCY13Q(4.11)'
                }
            ]
        }
    }
}
</script>
<style scoped>
.back {
    background-color: red;
}
.main {
    max-width: 70%;
}
</style>