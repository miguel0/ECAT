<template>
    <b-container>
        <div v-if="part">
            <b-row v-bind:style="{ filter: 'blur(' + blur + 'px)' }">
                <b-col>
                    <div v-if="getName()">
                        <p class="title">{{getName()}}</p>
                    </div>
                </b-col>
                <template v-if="isAdmin">
                    <b-button size="sm" @click="editPart()" variant="primary" class="m-3">
                        <img src="../assets/img/bxs-edit.svg" />
                    </b-button>
                </template>
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
                        <a
                            v-bind:href="getImageUrl()"
                            target="_blank">
                            <b-img @mouseover="blur=2" @mouseout="blur=0" :src="getImageUrl()" fluid></b-img>
                        </a>
                    </div>
                </b-col>
                <b-col v-bind:style="{ filter: 'blur(' + blur + 'px)' }" cols="5" md="6">
                    <template v-if="part.foundIn && part.foundIn.length > 0">
                        <small class="text-muted">Se encuentra en:</small>
                        <br><br>
                        <div>
                            <div class="list_no_title overflow-auto">
                                <b-list-group>
                                    <b-list-group-item
                                        v-for="vehicle in part.foundIn"
                                        :key="vehicle.id"
                                        @click='goToVehicle(vehicle.id)'
                                        class="pointer"
                                    >
                                        <div class="list-hor numbers"><p>{{ vehicle.name }}</p></div>
                                    </b-list-group-item>
                                </b-list-group>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <br><br><br>
                        <div class="text-center mt-5">
                            <span class="text-secondary">
                                Esta parte no se encuentra asociada a ningún vehículo.
                            </span>
                        </div>
                    </template>
                </b-col>
            </b-row>
        </div>
        <LoadingSpinner v-else/>
    </b-container>
    
</template>>

<script>
import api from '../services/api/api';
import LoadingSpinner from './LoadingSpinner';
import * as fb from "@/firebase";

export default {
    name: 'Part',
    props: ['id_part', 'from_component', 'cpid'],
    components: {
        LoadingSpinner
    },
    created() {
        api.partsApi.getPart(this.id_part).then(data => {
            this.part = data;
        });
        api.usersApi.getUser(fb.auth.currentUser.uid)
            .then(data => {
                if (data.role) {
                    this.isAdmin = data.role === 'A';
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    data() {
		return {
            isAdmin: false,
            part: null,
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
		},
		getImageUrl() {
			return this.part.imageURL ? this.part.imageURL :
				'https://objectstorage.us-ashburn-1.oraclecloud.com/n/idh6hnyu8tqh/b/ECAT-OSB/o/placeholders%2Fpart_ph.png';
		},
        editPart() {
            console.log(this.from_component, this.cpid)
            location.href = this.from_component ? '/editpartfromcomponent/' + this.cpid + "/" + this.part.id : '/editpart/' + this.part.id;
        },
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
.pointer {
    cursor: pointer;
}
</style>