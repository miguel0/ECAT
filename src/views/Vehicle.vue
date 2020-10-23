<template>
    <div>
        <Navbar/>
        <b-container style="padding-top: 3%">
            <b-row>
                <b-col>
                    <VehicleDetails 
                        v-if='vehicle' 
                        :vehicle='vehicle'
                        @onGroupSelected='switchGroup'
                    />
                </b-col>
                <b-col>
                    <ComponentList 
                        v-if='selectedGroup && currentLocalNo' 
                        :group='selectedGroup' 
                        :localNoBase='currentLocalNo' 
                    />
                </b-col> 
            </b-row>
            
        </b-container>
        

    </div>
</template>

<script>
import VehicleDetails from '../components/VehicleDetails';
import ComponentList from '../components/ComponentList';
import Navbar from '../components/Navbar';
import api from '../services/api/api';

export default {
    name: "Vehicle",
    data() {
        return {
            vehicle: null,
            selectedGroup: null,
            currentLocalNo: null
        }
    },
    components: {
        VehicleDetails,
        ComponentList,
        Navbar
    },
    created: function() {
        api.vehiclesApi.getVehicle('CYMS18010001-C7H 6X2 MT13.43-50 ZF16S2231TO HR7 MCY13Q(4.11)')
        .then(data => {
            this.vehicle = data;
        })
        .then(() => {
            if(this.vehicle.groups.length > 0){
                let first = this.vehicle.groups[0];
                return this.switchGroup(first);
            }
        })
        .catch((err) => {
            console.log("axios errur:", err);
        })
    },
    methods: {
        getGroup: function(groupId) { 
            // Retrieve group and its components from db.
            return api.groupsApi.getGroup(groupId);
        },
        switchGroup: function (group) { 
            // Receive group with local number. 
            // Retrieve full group and its components.
            console.log("SELECTED:", group.name);
            return this.getGroup(group.id).then(fullGroup => {
                this.selectedGroup = fullGroup;
                this.currentLocalNo = group.localNo;
                return true;
            });
        }
    }

}
</script>