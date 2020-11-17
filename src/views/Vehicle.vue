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
            </b-row>
            <br>
            <b-row>
                <b-col class="list">
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
        api.vehiclesApi.getVehicle(this.$route.params.id)
        .then(data => {
            this.vehicle = data;
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

            if(!group) {
                return Promise.resolve(false);
            }
            
            return this.getGroup(group.id).then(fullGroup => {
                this.selectedGroup = fullGroup;
                this.currentLocalNo = group.localNo;
                return true;
            });
        }
    }

}
</script>
<style scoped>
.list {
    padding-left: 7%;
    padding-right: 7%;
}
</style>