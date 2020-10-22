<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <VehicleDetails v-if='vehicle' :vehicle='vehicle' />
                </b-col>
                <b-col>
                    <!--<ComponentList :group='vehicle.groups[0]' />-->
                </b-col> 
            </b-row>
            
        </b-container>
        

    </div>
</template>

<script>
import VehicleDetails from '../components/VehicleDetails';
import api from '../services/api/api';

export default {
    name: "Vehicle",
    data() {
        return {
            vehicle: null
        }
    },
    components: {
        VehicleDetails,
        //ComponentList
    },
    created: function() {
        api.vehiclesApi.getVehicle('CYMS18010001-C7H 6X2 MT13.43-50 ZF16S2231TO HR7 MCY13Q(4.11)')
        .then(res => {
            this.vehicle = res.data;
        })
        .catch(() => {
            console.log("An error has occurred!!");
        })
    }

}
</script>