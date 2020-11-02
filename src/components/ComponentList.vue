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
            <b-list-group-item v-for="component of group.components" :key="`component-${component.id}`" ref="ref-components" class="clickable d-flex align-items-center" @click='goToComponent(component.id)'>
                <b-row class="text-break" style="width: 100%">
                    <b-col cols="2" class="text-center">
                        <span>{{component.localNo}}</span>
                    </b-col>
                    <b-col>
                        <b-row class="nameDefault" no-gutters>
                            <b-col>
                                <span>{{component.name}}</span>
                            </b-col>
                        </b-row>
                        <b-row class="text-secondary nameAlt" >
                            <b-col>
                                <template v-if="component.spName">
                                    <span>
                                        {{component.spName}}
                                    </span>
                                    <br>
                                </template>
                                <span v-if="component.chName">
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
    props: ['group', 'localNoBase'],
    methods: {
        goToComponent(componentId) {
            window.location.href = `/components/${componentId}`;
        }
    }
}
</script>
<style scoped>
.nameDefault {
    font-size: large;
}

.nameAlt {
    font-size: small;
}
.index {
    float: left;
    background: #aafed6;
}
.names {
    display: flex;
}
</style>