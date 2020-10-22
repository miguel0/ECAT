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
            <h4>Grupos</h4>
            <br>
            <p v-for="group of vehicle.groups" :key="group.id">{{group.localNo}} {{group.name}}</p>
        </div>

    </div>
</template>

<script>
export default {
    name: "VehicleDetails",
    props: ['vehicle']
}
</script>

<style scoped>

</style>