<template>
    <div>
        <b-row>
            <b-col>
                <h2><b>{{vehicle.id}}</b></h2>
                <b-row class="text-secondary">
                    <b-col>{{vehicle.name}} | {{vehicle.spName}} | {{vehicle.otherName}}</b-col>
                </b-row>
                <br>
                <b-button size="sm" @click="editVehicle(vehicle.id)" variant="primary" class="m-1">
                    <img src="../assets/img/bxs-edit.svg" />
                </b-button>
                <br><br>
                <b-row>
                    <b-col>
                        <p><b>Tipo: </b> {{vehicle.type}}</p>
                        <p><b>Transmisión: </b> {{vehicle.transmission}}</p>
                    </b-col>
                    <b-col>
                        <p><b>Potencia: </b> {{vehicle.motorPower}} HP</p>
                        <p><b>Configuración: </b> {{vehicle.motorConfig}}</p>
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                <b-img src="../assets/img/test/truck.png" fluid rounded center></b-img>
            </b-col>
        </b-row>
        <br><br>
        <template v-if="selectedGroup">
            <h5>Selecciona un grupo para visualizar</h5>
            <br>
            <b-row>
                <b-col>
                    <b-form-select v-model="selectedGroup" @change="selectGroup">
                        <b-form-select-option
                            v-for="group of vehicle.groups"
                            :key="`group-${group.id}`"
                            :value="group"
                        >
                        {{group.localNo}} {{group.name}} | {{group.spName}} | {{group.chName}}
                        </b-form-select-option>
                    </b-form-select>
                </b-col>
            </b-row>
            <br>
        </template>
        <template v-else>
            <br><br>
            <ion-row class="text-center">
                <ion-col>
                    <p class="text-secondary">
                        No hay grupos asociados a este vehículo.
                    </p>
                </ion-col>
            </ion-row>
        </template>
        
    </div>
</template>

<script>
export default {
    name: "VehicleDetails",
    props: ['vehicle'],
    created() {
        this.selectDefaultGroup();
    },
    data() {
        return {
            selectedGroup: null
        }
    },
    methods: {
        selectDefaultGroup() {
            if(this.vehicleHasGroups()) {
                this.selectedGroup = this.vehicle.groups[0];
                this.selectGroup(this.selectedGroup);
            }
        },
        selectGroup: function(selection) {
            this.$emit('onGroupSelected', selection);
        },
        editVehicle(id) {
            location.href = '/editvehicle/' + id;
        },
        vehicleHasGroups() {
            return this.vehicle.groups && this.vehicle.groups.length > 0;
        }
    }
}
</script>

<style scoped>
.overflow-auto {
	max-height: 200px;
}
.clickable {
    cursor: pointer;
}
</style>