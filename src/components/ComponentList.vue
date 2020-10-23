<template>
    <div>
        <h3><b>{{localNoBase}} {{group.name}}</b></h3>
        <b-row class="text-secondary">
            <b-col>{{group.spName}} | {{group.chName}} | {{group.otherName}}</b-col>
        </b-row>
        <br><br>
        <h4>Componentes</h4>
        <br>
        <b-list-group class="overflow-auto">
            <b-list-group-item v-for="component of group.components" :key="`component-${component.id}`" ref="ref-components" class="clickable d-flex align-items-center">
                <b-row>
                    <b-col sm="2" class="text-center">
                        {{component.localNo}} 
                    </b-col>
                    <b-col>
                        <b-row>
                            <span class="mr-auto nameDefault">
                                <b>{{component.name}}</b>
                            </span>
                        </b-row>
                        <b-row class="text-secondary nameAlt">
                            <b-col>
                                <span class="mr-auto">
                                    {{component.spName}}
                                </span>
                                <br>
                                <span class="mr-auto">
                                    {{component.chName}}
                                </span>
                            </b-col>
                        </b-row>
                        
                    </b-col>
                </b-row>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
export default {
    name: "ComponentList",
    props: ['group', 'localNoBase']
}
</script>
<style scoped>
.nameDefault {
    font-size: large;
}

.nameAlt {
    font-size: small;
}
</style>