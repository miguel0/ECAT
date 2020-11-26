<template>
	<div>
		<Navbar/>
		<b-container v-if='component' style="padding-top: 3%;">
			<b-button id="backBtn" size="sm" variant="secondary" href="javascript:history.back()">Atrás</b-button>
			<b-row>
				<b-col>
					<b-img @mouseover="blur=2" @mouseout="blur=0" id="img" :src='getImageUrl() fluid round></b-img>
				</b-col>
				<b-col v-bind:style="{ filter: 'blur(' + blur + 'px)' }">
					<h4><b>{{component.name}}</b></h4>
					<b-row class="text-secondary">
						<b-col>{{component.spName}} | {{component.chName}} | {{component.otherName}}</b-col>
					</b-row>
					<b-button v-if="isAdmin" size="sm" @click="editComponent(component.id)" variant="primary" class="m-1">
						<img src="../assets/img/bxs-edit.svg" />
					</b-button>
				</b-col>
			</b-row>
			<br>
			<b-row v-bind:style="{ filter: 'blur(' + blur + 'px)' }">
				<b-col>
					<PartList :parts='component.parts' :component_id="this.$route.params.cid"/>
				</b-col>
			</b-row>
			
		</b-container>
	</div>
</template>

<script>
import Navbar from '../components/Navbar';
import api from '../services/api/api';
import PartList from '../components/PartList';
import * as fb from '../firebase';

export default {
	name: "ATComponent",
	data() {
		return {
			component: null,
			isAdmin: false,
			blur: 0
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
		
		api.usersApi.getUser(fb.auth.currentUser.uid)
		.then(data => {
			if (data.role) {
				this.isAdmin = data.role === 'A' ? true : false;
			}
		})
		.catch(err => {
			console.log(err);
		});
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
		},
		getImageUrl() {
			return this.component.imageURL ? this.component.imageURL :
				'https://objectstorage.us-ashburn-1.oraclecloud.com/n/idh6hnyu8tqh/b/ECAT-OSB/o/placeholders%2Fcomponent_ph.png';
		}
	}
}
</script>

<style scoped>
.back {
	background-color: blueviolet;
}
#backBtn{
	margin-top: -4%;
}
#img {
    display: flex;
    flex-direction: row;
    transition: transform .2s;
    transform-origin: top left;
    z-index: 5;
    position: relative;
    max-height: 300px;
}
#img:hover {
	transform: scale(2.5);
    transform-origin: top left;
    z-index: 3;
    border: 4px solid black;
    border-radius: 5px;
}
</style>