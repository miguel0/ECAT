<template>
<div>
	<Navbar />
	<b-container id='content' class='p-5'>
		<b-form id="search" @submit="filter">
			<b-form-input class='mb-3' v-model='searchText' type='search' placeholder='Buscar...'></b-form-input>
			<b-button class="mb-2" type="submit" variant="primary" style="min-width: 200px;">Buscar</b-button>	
		</b-form>
		
		<div v-if="hasLoaded">
			<h4>Se encontraron ({{partsFound}}) partes</h4>
			<div id='search-results'>
				<b-card
					v-for='p in filtered'
					:key='p.id'
					class='search-card m-3'
					v-bind:img-src='getImageUrl(p)'
					img-top
					@click='goToPart(p.id)'
					>
					<b-card-text>
						{{p.name}}
					</b-card-text>
				</b-card>
			</div>
		</div>
		<LoadingSpinner v-else/>
	</b-container>

	<PartModal 
		ref="modalP"
		:id_part="selectedPart"
        :from_component="false"
	/>

</div>
</template>

<script>
import Navbar from '../components/Navbar';
import PartModal from '../components/PartModal';
import api from '../services/api/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default {
	name: 'PartSearch',
	components: {
		Navbar,
		PartModal,
		LoadingSpinner
	},
	data() {
		return {
			allParts: [],
			filtered: [],
			partsFound: 0,
			searchText: '',
			selectedPart: null,
			hasLoaded: false
		}
	},
	methods: {
		filter(evt) {
            evt.preventDefault();
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
			this.filtered = parts;
		},
		getSimpleString(str) {
			return !str ? '' : str.replaceAll('/', '')
				.replaceAll('.', '')
				.replaceAll('-', '')
				.replaceAll(' ', '')
				.toUpperCase();
		},
		goToPart(partId) {
			this.selectedPart = partId;
			this.$refs.modalP.showModal();
		},
		getImageUrl(part) {
			return part.imageURL ? part.imageURL :
				'https://objectstorage.us-ashburn-1.oraclecloud.com/n/idh6hnyu8tqh/b/ECAT-OSB/o/placeholders%2Fpart_ph.png';
		}
	},
	created() {
		api.partsApi.getAllParts()
		.then(parts => {

			this.allParts = parts;
			this.filtered = parts;
			this.partsFound = parts.length;
			this.hasLoaded = true;
		})
		.catch(err => {
			alert(err.message);
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
#search {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
#search-results {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
}
.search-card {
    cursor: pointer;
	max-width: 30%;
	min-width: 30%;
}
</style>