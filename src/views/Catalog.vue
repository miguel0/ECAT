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
                        <b-list-group-item v-for="(filter, index) of sampleFilters" :key="`filter-${index}`" :ref="`ref-filters`" v-on:click="selectFilter(index)" class="clickable">{{filter}}</b-list-group-item>
                    </b-list-group>
                    <br><br>
                    <h5>Resultados encontrados ({{sampleVehicleList.length}})</h5>
                    <br>
                    <b-card-group>
                        <b-card no-body v-for="(vehicle, index) in sampleVehicleList" :key="index" img-left class="overflow-hidden clickable">
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
            searchPlaceHolder: 'Busca por VIN...',
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
    },
    methods: {
        selectFilter: function(filterIndex) {
            let ref = 'ref-filters';
            let theClass = 'active';
            let element = this.$refs[ref][filterIndex];

            element.classList.add(theClass);

            for(let e of this.$refs[ref]) {
                if(e != element) {
                    e.classList.remove(theClass);
                }
            }

        }
    }
}
</script>

<style scoped>
.thumb {
    height: 150px;
    width: 150px;
}

.clickable {
    cursor: pointer;
}
</style>
