<template>
    <div>
        <Navbar/>
        <b-container v-if='component' style="padding-top: 3%;">
            <b-row>
                <b-col>
                    <b-img src="../assets/img/test/component.png" fluid round></b-img>
                </b-col>
                <b-col>
                    <h4><b>{{component.name}}</b></h4>
                    <b-row class="text-secondary">
                        <b-col>{{component.spName}} | {{component.chName}} | {{component.otherName}}</b-col>
                    </b-row>
                    <b-button size="sm" @click="editComponent(component.id)" variant="primary" class="m-1">
                        <img src="../assets/img/bxs-edit.svg" />
                    </b-button>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col>
                    <PartList :parts='component.parts'/>
                </b-col>
            </b-row>
            
        </b-container>
    </div>
</template>

<script>
import Navbar from '../components/Navbar';
import api from '../services/api/api';
import PartList from '../components/PartList';

export default {
    name: "ATComponent",
    data() {
        return {
            component: null
        }
    },
    components: {
        Navbar,
        PartList
    },
    created: function() {
        
        api.componentsApi.getComponent(this.$route.params.cid)
        .then(component => {
            component.parts = this.setDefaults(component);
			this.component = component;
        })
        .catch(err => {
            console.log(err);
        })
    },
    methods: {
        setDefaults: function(component) {
            component.parts.forEach(p => {
                Object.keys(p).forEach(key => {
                    if(!p[key]) {
                        p[key] = '-'
                    }
                });
            });
            return component.parts;
        },

        editComponent(id) {
            location.href = '/editcomponent/' + id;
        }
    }
}
</script>

<style scoped>
.back {
    background-color: blueviolet;
}
</style>