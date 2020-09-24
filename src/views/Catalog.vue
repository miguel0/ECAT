<template>
    <div>
        <Navbar/>
        <br> 
        <b-container>
            <b-row>
                <b-col>
                    <b-form-input :placeholder="searchPlaceHolder" type='search'></b-form-input>
                    <br><br>
                    <h5>Buscando</h5>
                    <br>
                    <b-list-group horizontal>
                        <b-list-group-item v-for="(filter, index) of sampleFilters" :key="`filter-${index}`" >{{filter}}</b-list-group-item>
                    </b-list-group>
                    <br><br>
                    <h4>Resultados encontrados ({{sampleVehicleList.length}})</h4>
                    <br>
                    <b-card-group>
                        <b-card no-body v-for="(vehicle, index) in sampleVehicleList" :key="index" img-left class="overflow-hidden">
                            <b-row no-gutters>
                                <b-card-img :src="sampleImg" class="thumb"></b-card-img>
                                <b-col>
                                    <b-card-body :title="vehicle.name">
                                        <b-card-text class="text-secondary">
                                            {{vehicle.vin}}
                                        </b-card-text>
                                    </b-card-body>
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-card-group>
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
            ],
            //sampleImg: '../assets/img/test/truck.png'
            sampleImg: 'https://placekitten.com/300/300',
            sampleFilters: [
                'Vehículos',
                'Componentes',
                'Piezas'
            ]
        }
    }
}
</script>

<style scoped>
.thumb {
    height: 150px;
    width: 150px;
}

</style>
