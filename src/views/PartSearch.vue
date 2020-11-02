<template>
<div>
	<Navbar />
	<b-container id='content' class='p-5'>
		<b-form-input class='mb-3' v-model='searchText' type='search' placeholder='Buscar...'></b-form-input>

		<h4>Se encontraron ({{partsFound}}) partes</h4>

		<div id='search-results'>
			<b-card
				v-for='p in filter()'
				:key='p.id'
				class='search-card m-3'
				v-bind:img-src='p.imageURL'
				img-top
				@click='goToPart(p.id)'
				>
				<b-card-text>
					{{p.name}}
				</b-card-text>
			</b-card>
		</div>
	</b-container>
</div>
</template>

<script>
import Navbar from '../components/Navbar';
import api from '../services/api/api';

export default {
	name: 'PartSearch',
	components: {
		Navbar
	},
	data() {
		return {
			allParts: [],
			partsFound: 0,
			searchText: '',
		}
	},
	methods: {
		filter() {
			let parts = [];
			for(let i = 0; i < this.allParts.length; i++) {
				const search = this.getSimpleString(this.searchText);
				if(
					this.getSimpleString(this.allParts[i].id).includes(search) ||
					this.getSimpleString(this.allParts[i].replaceNo).includes(search) ||
					this.getSimpleString(this.allParts[i].name).includes(search) ||
					this.getSimpleString(this.allParts[i].chName).includes(search) ||
					this.getSimpleString(this.allParts[i].spName).includes(search) ||
					this.getSimpleString(this.allParts[i].otherName).includes(search)
				) {
					parts.push(this.allParts[i]);
				}
			}
			this.partsFound = parts.length;
			return parts;
		},
		getSimpleString(str) {
			return !str ? '' : str.replaceAll('/', '')
				.replaceAll('.', '')
				.replaceAll('-', '')
				.replaceAll(' ', '')
				.toUpperCase();
		},
		goToPart(partId) {
			// TODO: open part modal
			console.log(partId);
		}
	},
	created() {
		api.partsApi.getAllParts()
		.then(parts => {
			for(let i = 0; i < parts.length; i++) {
				parts[i].imageURL = !parts[i].imageURL ? 'https://images.ffx.co.uk/tools/FORPOZI3525S.JPG' : parts[i].imageURL;
				this.allParts.push(parts[i]);
			}
		});
	}
}
</script>

<style scoped>
#content {
	width: 85%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
#search-results {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
}
.search-card {
	max-width: 30%;
	min-width: 180px;
}
</style>