<template>
	<div>
		<Navbar/>
		<b-container v-if='component' style="padding-top: 3%;">
			<b-row>
				<b-col>
					<b-img :src='getImageUrl()' fluid round></b-img>
				</b-col>
				<b-col>
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
import * as fb from '../firebase';

export default {
	name: "ATComponent",
	data() {
		return {
			component: null,
			isAdmin: false
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
			return this.component.imageUrl ? this.component.imageUrl :
				'https://i.pinimg.com/originals/c0/d0/5a/c0d05a83f59b341c9b26a1f56e224059.png';
		}
	}
}
</script>

<style scoped>
.back {
	background-color: blueviolet;
}
</style>