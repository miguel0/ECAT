<template>
	<div id="page">
		<Navbar/>
		
		<b-card-group id="search-buttons" deck class="p-3">
			
			<div class="search-btn">
				<b-card 
				img-alt="Card image" 
				class="text-center position-relative p-2"
				img-top
				@click="goToVehicle()">
					<b-card-img 
					:src="truckSearchLogo">
					</b-card-img>

					<b-card-text>
					Búsqueda por Vehículos
					</b-card-text>
				</b-card>
			</div>

			<div class="search-btn">
				<b-card 
				id="individual-search"
				img-alt="Card image" 
				class="text-center position-relative p-2"
				img-top
				@click="goToPart()">
					<b-card-img 
					:src="partSearchLogo">
					</b-card-img>

					<b-card-text>
					Búsqueda por Partes
					</b-card-text>
				</b-card>
			</div>
		</b-card-group>
	</div>
	
</template>

<script>
	import Navbar from '../components/Navbar';

	export default {
		name: 'Home',
		components: {
			Navbar
		},
		data() {
			return {
				isAdmin: false,
                truckSearchLogo: 'https://objectstorage.us-ashburn-1.oraclecloud.com/n/idh6hnyu8tqh/b/ECAT-OSB/o/assets%2Fvehicle-default.png',
                partSearchLogo: 'https://objectstorage.us-ashburn-1.oraclecloud.com/n/idh6hnyu8tqh/b/ECAT-OSB/o/assets%2Findividual-parts-default.png'
			}
		},
		methods:{
			goToVehicle(){
				location.href = "/trucksearch";
			},
			goToPart(){
				location.href = "/partsearch";
			}
		}
	}
</script>

<style scoped>

	#search-buttons {
		display: flex;
		max-width: 800px;
		width: 75%;
		height: 75%;
		margin: auto;
		align-items: center;
		justify-content: center;
		
	}

	#page {
		height: 80vh;
	}

	.search-btn {
		cursor: pointer;
		width: 50%;
		
	}

</style>