<template>
    <div>
        <!--<h3><b>{{localNoBase}} {{group.name}}</b></h3>
        <b-row class="text-secondary">
            <b-col>{{group.spName}} | {{group.chName}} | {{group.otherName}}</b-col>
        </b-row>
        <br><br>-->
        <template v-if="hasComponents()">
            <h5>Componentes en <b><i>{{group.name}}</i></b></h5>
            <br>
            <b-list-group class="overflow-auto">
                <b-list-group-item v-for="component of group.components" :key="`component-${component.id}`" ref="ref-components" class="clickable d-flex align-items-center" @click='goToComponent(component.id)'>
                    <b-row class="text-break" style="width: 100%">
                        <b-col cols="1" class="text-center">
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
        </template>
        <template v-else>
            <br><br>
            <b-row class="text-center">
                <b-col>
                    <span class="text-secondary">
                        No hay componentes asociados a este grupo.
                    </span>
                </b-col>
            </b-row>
        </template>
    </div>
</template>

<script>
export default {
    name: "ComponentList",
    props: ['group', 'localNoBase'],
    methods: {
        goToComponent(componentId) {
            window.location.href = `/components/${componentId}`;
        },
        hasComponents() {
            return this.group.components.length > 0;
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
.overflow-auto {
	max-height: 300px;
}
</style>