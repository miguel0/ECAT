<template>
    <div>
        <h3><b>{{localNoBase}} {{group.name}}</b></h3>
        <b-row class="text-secondary">
            <b-col>{{group.spName}} | {{group.chName}} | {{group.otherName}}</b-col>
        </b-row>
        <br><br>
        <h4>Componentes</h4>
    </div>
</template>

<script>
export default {
    name: "ComponentList",
    props: ['group', 'localNoBase']
}
</script>