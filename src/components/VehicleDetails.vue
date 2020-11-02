<template>
    <div>
        <b-img src="../assets/img/test/truck.png" fluid rounded center></b-img>
        <br>
        <p style="font-size: large;"><b>{{vehicle.id}}</b></p>
        <div>
            <b-row class="text-secondary">
                <b-col>{{vehicle.name}} | {{vehicle.spName}} | {{vehicle.otherName}}</b-col>
            </b-row>
            <br><br>
            <h4>Detalles</h4>
            <br>
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
            <br><br>
            <h4>Grupos ({{vehicle.groups.length}})</h4>
            <br>
            <b-list-group class="overflow-auto">
                <b-list-group-item v-for="group of vehicle.groups" :key="`group-${group.id}`" @click='selectGroup(group)' ref="ref-groups" class="clickable d-flex align-items-center">
                    <b-row>
                        <b-col class="text-center">
                            {{group.localNo}}
                        </b-col>
                        <b-col>
                            <span class="mr-auto">{{group.name}}</span>
                        </b-col>
                    </b-row>
                </b-list-group-item>
            </b-list-group>
        </div>

    </div>
</template>

<script>
export default {
    name: "VehicleDetails",
    props: ['vehicle'],
    methods: {
        selectGroup: function(selectedGroup) {
            this.$emit('onGroupSelected', selectedGroup);
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