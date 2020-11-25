<template>
    <b-container>
        <div v-if="part">
            <b-row v-bind:style="{ filter: 'blur(' + blur + 'px)' }">
                <b-col>
                    <div v-if="getName()">
                        <p class="title">{{getName()}}</p>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="7" md="6">
                    <div v-if="getId() || getReplaceNo()" v-bind:style="{ filter: 'blur(' + blur + 'px)' }">
                        <b-row>
                            <b-col v-if="getId()">
                                <small class="form-text text-muted">
                                    Número de parte
                                </small>
                                <p class="numbers"><b>{{getId()}}</b></p>
                            </b-col>
                            <b-col v-if="getReplaceNo()">
                                <small class="form-text text-muted">
                                    Número de reemplazo
                                </small>
                                <p class="numbers"><b>{{getReplaceNo()}}</b></p>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="6" v-if="getSpName()">
                                <small class="form-text text-muted">
                                    Nombre en español
                                </small>
                                <p class="numbers">{{getSpName()}}</p>
                            </b-col>
                            <b-col cols="6" v-if="getChName()">
                                <small class="form-text text-muted">
                                    Nombre en chino
                                </small>
                                <p class="numbers">{{getChName()}}</p>
                            </b-col>
                            <b-col cols="6" v-if="getOtherName()">
                                <small class="form-text text-muted">
                                    Nombre alterno
                                </small>
                                <p class="numbers">{{getOtherName()}}</p>
                            </b-col>
                        </b-row>
                    </div>
                    <div id="img" class="text-center">
                        <a v-bind:href="image" target="_blank"><b-img @mouseover="blur=2" @mouseout="blur=0" :src="image" fluid></b-img></a>
                    </div>
                </b-col>
                <b-col v-bind:style="{ filter: 'blur(' + blur + 'px)' }" cols="5" md="6">
                    <!--<p class="pl-5">Se encuentra en:</p>-->
                    <small class="text-muted">Se encuentra en:</small>
                    <br><br>
                    <div>
                        <div class="list_no_title overflow-auto">
                            <b-list-group>
                                <b-list-group-item v-for="vehicle in part.foundIn" :key="vehicle.id" @click='goToVehicle(vehicle.id)'>
                                    <div class="list-hor numbers"><p>{{ vehicle.name }}</p></div>
                                </b-list-group-item>
                            </b-list-group>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </div>
        <LoadingSpinner v-else/>
    </b-container>
    
</template>>

<script>
import api from '../services/api/api';
import LoadingSpinner from './LoadingSpinner';

export default {
    name: 'Part',
    props: ['id_part'],
    components: {
        LoadingSpinner
    },
    created() {
        api.partsApi.getPart(this.id_part).then(data => {
            this.part = data;
        });
    },
    data() {
		return {
            part: null,
            image: 'https://mobileimages.lowes.com/product/converted/008236/008236686920.jpg?size=pdhi',
            //image: 'https://lh3.googleusercontent.com/proxy/LuHpkLxSiscPEGIy83Jm_Q1UR9kBNwXI0DMDylAfUnFIMoYyfkoS2MZglpFp4Ef7FlViJQN6ytNuaCCitif94ploOJ8-r7z56wSa4liyx3HzOh5n1ro',
            //image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Screws.jpg/260px-Screws.jpg',
            children: null,
            blur: 0
		}
    },
    methods: {
        getName() {
            return this.part.name;
        },
        getSpName() {
            return this.part.spName;
        },
        getChName() {
            return this.part.chName;
        },
        getOtherName() {
            return this.part.otherName;
        },
        getId() {
            return this.part.id;
        },
        getReplaceNo() {
            return this.part.replaceNo;
        },
        getFoundIn(){
            return this.part.foundIn;
        },
        goToVehicle(vehicleId) {
            window.location.href = `/vehicles/${vehicleId}`;
        }
    }
}

</script>

<style scoped>
.ver {
	display: flex;
	flex-direction: row;
    align-items: center;
    justify-content: space-between;
	height: 100%;
    padding-left: 4%;
    padding-right: 4%;
}
.hor {
	display: flex;
	flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding-left: 0%;
    margin-bottom: 4%;
}
.hor-right {
	display: flex;
	flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
	max-height: 500px;
    padding-right: 0%;
    margin-bottom: 4%;
}
.title{
    font-size: xx-large;
    font-weight: bold;
    text-align: start;
    margin-right: 0%;
    word-wrap: break-word;
    max-width: 100%;
    /*margin-top: 3%;*/
    margin-bottom: 3%;
}
.partno{
    font-size: 20px;
    color:black;
    margin-top: 3%;
    margin-bottom: 3%;
}
.name{
    font-size: 20px;
    margin-right: 0%;
    margin-top: 3%;
    margin-bottom: 3%;
}
#img {
	width:70%;
    margin-top: 5%;
    margin-bottom: 5%;
    display: flex;
    flex-direction: row;
    transition: transform .2s;
    align-self: flex-start;
    transform-origin: bottom left;
    z-index: 3;
    position: relative;
}
#img:hover{
    transform: scale(2);
    transform-origin: bottom left;
    z-index: 3;
    border: 4px solid black;
    border-radius: 5px;
}
.my_list {
	width: 100%;
    padding-right: 0%;
    padding-left: 15%;
    padding-top: 5%;
	overflow: hidden;
	overflow-y: scroll;
}
.list_no_title {
	max-height: 50%;
}
.list-hor{
    display: flex;
    justify-content: space-between;
}
.right{
    text-align: end;
}
.overflow-auto {
	max-height: 400px;
}
.numbers {
    font-size: medium;
}
</style>