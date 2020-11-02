<template>
<div>
	<Navbar />
	<b-container id='content' class='p-5'>
		<b-form-input class='mb-3' v-model='searchText' type='search' placeholder='Buscar...'></b-form-input>

		<div id='filters'>
			<b-form-group class='mr-2' label='Tipo'>
				<b-form-radio-group v-model='type' :options='typeOptions'></b-form-radio-group>
			</b-form-group>
			
			<b-form-group class='mr-4' label='Configuración del motor'>
				<b-form-select v-model='motorConfig' :options='motorConfigOptions'></b-form-select>
			</b-form-group>

			<b-form-group id='motor-form' class='mr-4' label='Poder del motor'>
				<div id='motor-power'>
					<b-form-group class='mr-1' label='Min'>
						<b-form-input v-model='motorPowerMin' type='number' :state='motorPowerState'></b-form-input>
					</b-form-group>
					<b-form-group label='Max'>
						<b-form-input v-model='motorPowerMax' type='number' :state='motorPowerState'></b-form-input>
					</b-form-group>
				</div>
			</b-form-group>

			<b-form-group label='Transmisión'>
				<b-form-select v-model='transmission' :options='transmissionOptions'></b-form-select>
			</b-form-group>
		</div>

		<h4>Se encontraron ({{trucksFound}}) vehículos</h4>

		<div id='search-results'>
			<b-card
				v-for='t in filter()'
				:key='t.id'
				class='search-card m-3'
				v-bind:img-src='t.imageURL'
				img-top
				@click='goToVehicle(t.id)'
				>
				<b-card-text>
					{{t.name}}
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
	name: 'TruckSearch',
	components: {
		Navbar
	},
	data() {
		return {
			allTrucks: [],
			trucksFound: 0,
			searchText: '',
			type: '',
			motorConfig: '',
			motorPowerMin: '0',
			motorPowerMax: '1000',
			transmission: '',
			typeOptions: [
				{ text: 'MT GAS', value: 'MT GAS' },
				{ text: 'MC DIESEL', value: 'MC DIESEL' },
				{ text: 'Cualquiera', value: '' }
			],
			motorConfigOptions: [	
				{ text: 'Cualquiera', value: '' },
				{ text: '4x2', value: '4x2' },
				{ text: '6x4', value: '6x4' }
			],
			transmissionOptions: [
				{ text: 'Cualquiera', value: '' },
				{ text: 'ZH', value: 'ZH' },
				{ text: 'HW', value: 'HW' },
				{ text: 'AL', value: 'AL' }
			],
		}
	},
	methods: {
		filter() {
			let trucks = [];
			for(let i = 0; i < this.allTrucks.length; i++) {
				const search = this.getSimpleString(this.searchText);
				if(
					(
						this.getSimpleString(this.allTrucks[i].name).includes(search) ||
						this.getSimpleString(this.allTrucks[i].spName).includes(search) ||
						this.getSimpleString(this.allTrucks[i].otherName).includes(search) ||
						this.getSimpleString(this.allTrucks[i].id).includes(search) ||
						this.getSimpleString(this.allTrucks[i].model).includes(search)
					) &&
					this.allTrucks[i].type.includes(this.type) &&
					this.allTrucks[i].motorConfig.includes(this.motorConfig) &&
					this.allTrucks[i].motorPower >= this.motorPowerMin &&
					this.allTrucks[i].motorPower <= this.motorPowerMax &&
					this.allTrucks[i].transmission.includes(this.transmission)
				) {
					trucks.push(this.allTrucks[i]);
				}
			}
			this.trucksFound = trucks.length;
			return trucks;
		},
		getSimpleString(str) {
			return !str ? '' : str.replaceAll('/', '')
				.replaceAll('.', '')
				.replaceAll('-', '')
				.replaceAll(' ', '')
				.toUpperCase();
		},
		goToVehicle(vehicleId) {
			window.location.href = `/vehicles/${vehicleId}`;
		}
	},
	computed: {
		motorPowerState() {
			let min = parseFloat(this.motorPowerMin);
			let max = parseFloat(this.motorPowerMax);
			return (min >= 0 && max >= 0) && (max >= min) ? null : false;
		}
	},
	created() {
		api.vehiclesApi.getVehicle('CYMS18010001')
		.then(vehicle => {
			vehicle.imageURL = 'https://lh3.googleusercontent.com/proxy/hr_WseNeJmg14dsuam2GwPHTZ90_0CM4GZJZ_q6rFbZsnVBKO5QK35BWFKSfSEVZqhRCqI4MoR7SyerJjtUxJNnWZTYmjSBjasbwBt1Ych9lcekYjjoIfm7ykTdIKC6IW54ovE-XOXzaZo2-B0QhpRKnjMCxdsDfyYAI';
			vehicle.motorConfig = '6x4';
			this.allTrucks.push(vehicle);
		})
	},
	mounted() {
		this.allTrucks.push(
			{
				id: 'buenas1',
				name: 'truck 01',
				spName: 'buenas--1',
				otherName: '',
				model: 'tE/st-1',
				type: 'MT GAS',
				motorConfig: '6x4',
				motorPower: 20,
				transmission: 'ZH',
				imageURL: 'https://lh3.googleusercontent.com/proxy/hr_WseNeJmg14dsuam2GwPHTZ90_0CM4GZJZ_q6rFbZsnVBKO5QK35BWFKSfSEVZqhRCqI4MoR7SyerJjtUxJNnWZTYmjSBjasbwBt1Ych9lcekYjjoIfm7ykTdIKC6IW54ovE-XOXzaZo2-B0QhpRKnjMCxdsDfyYAI'
			},
			{
				id: 'buenas2',
				name: 'truck 02',
				spName: 'buenas--2',
				otherName: '',
				model: 'tE/st-2',
				type: 'MT GAS',
				motorConfig: '6x4',
				motorPower: 200,
				transmission: 'AL',
				imageURL: 'https://lh3.googleusercontent.com/proxy/hr_WseNeJmg14dsuam2GwPHTZ90_0CM4GZJZ_q6rFbZsnVBKO5QK35BWFKSfSEVZqhRCqI4MoR7SyerJjtUxJNnWZTYmjSBjasbwBt1Ych9lcekYjjoIfm7ykTdIKC6IW54ovE-XOXzaZo2-B0QhpRKnjMCxdsDfyYAI'
			},
			{
				id: 'buenas3',
				name: 'truck 03',
				spName: 'buenas--3',
				otherName: '',
				model: 'tE/st-3',
				type: 'MC DIESEL',
				motorConfig: '4x2',
				motorPower: 15,
				transmission: 'ZH',
				imageURL: 'https://lh3.googleusercontent.com/proxy/hr_WseNeJmg14dsuam2GwPHTZ90_0CM4GZJZ_q6rFbZsnVBKO5QK35BWFKSfSEVZqhRCqI4MoR7SyerJjtUxJNnWZTYmjSBjasbwBt1Ych9lcekYjjoIfm7ykTdIKC6IW54ovE-XOXzaZo2-B0QhpRKnjMCxdsDfyYAI'
			},
			{
				id: 'buenas4',
				name: 'truck 04',
				spName: 'buenas--4',
				otherName: '',
				model: 'tE/st-4',
				type: 'MC DIESEL',
				motorConfig: '6x4',
				motorPower: 201,
				transmission: 'HW',
				imageURL: 'https://lh3.googleusercontent.com/proxy/hr_WseNeJmg14dsuam2GwPHTZ90_0CM4GZJZ_q6rFbZsnVBKO5QK35BWFKSfSEVZqhRCqI4MoR7SyerJjtUxJNnWZTYmjSBjasbwBt1Ych9lcekYjjoIfm7ykTdIKC6IW54ovE-XOXzaZo2-B0QhpRKnjMCxdsDfyYAI'
			},
			{
				id: 'buenas5',
				name: 'truck 05',
				spName: 'buenas--5',
				otherName: '',
				model: 'tE/st-5',
				type: 'MT GAS',
				motorConfig: '4x2',
				motorPower: 50,
				transmission: 'ZH',
				imageURL: 'https://lh3.googleusercontent.com/proxy/hr_WseNeJmg14dsuam2GwPHTZ90_0CM4GZJZ_q6rFbZsnVBKO5QK35BWFKSfSEVZqhRCqI4MoR7SyerJjtUxJNnWZTYmjSBjasbwBt1Ych9lcekYjjoIfm7ykTdIKC6IW54ovE-XOXzaZo2-B0QhpRKnjMCxdsDfyYAI'
			},
			{
				id: 'buenas6',
				name: 'truck 06',
				spName: 'buenas--6',
				otherName: '',
				model: 'tE/st-6',
				type: 'MT GAS',
				motorConfig: '6x4',
				motorPower: 1,
				transmission: 'AL',
				imageURL: 'https://lh3.googleusercontent.com/proxy/hr_WseNeJmg14dsuam2GwPHTZ90_0CM4GZJZ_q6rFbZsnVBKO5QK35BWFKSfSEVZqhRCqI4MoR7SyerJjtUxJNnWZTYmjSBjasbwBt1Ych9lcekYjjoIfm7ykTdIKC6IW54ovE-XOXzaZo2-B0QhpRKnjMCxdsDfyYAI'
			},
			{
				id: 'buenas7',
				name: 'truck 07',
				spName: 'buenas--7',
				otherName: '',
				model: 'tE/st-7',
				type: 'MC DIESEL',
				motorConfig: '4x2',
				motorPower: 90,
				transmission: 'HW',
				imageURL: 'https://lh3.googleusercontent.com/proxy/hr_WseNeJmg14dsuam2GwPHTZ90_0CM4GZJZ_q6rFbZsnVBKO5QK35BWFKSfSEVZqhRCqI4MoR7SyerJjtUxJNnWZTYmjSBjasbwBt1Ych9lcekYjjoIfm7ykTdIKC6IW54ovE-XOXzaZo2-B0QhpRKnjMCxdsDfyYAI'
			}
		);
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
#filters {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: space-around;
}
#motor-power {
	display: flex;
	flex-direction: row;
}
#motor-form {
	width: 10%;
	min-width: 200px;
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