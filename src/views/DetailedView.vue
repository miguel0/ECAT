<template>
	<div>
		<Navbar />

		<div id="detailed">
			<div class="detailed_part main_data">
				<b-img :src="image" style="max-width: 300px;"></b-img>
				<div class="main_data_no_pic">
					<b-form-group label="Tipo:">
						<b-form-input v-model="type" readonly></b-form-input>
					</b-form-group>

					<div class="data_hor">
						<b-form-group label="Nombre:">
							<b-form-input v-model="name" readonly></b-form-input>
						</b-form-group>

						<b-form-group label="Existencias:">
							<b-form-input v-model="stock" readonly></b-form-input>
						</b-form-group>
					</div>

					<b-form-group label="Número de parte:">
						<b-form-input v-model="partno" readonly></b-form-input>
					</b-form-group>

					<div class="data_hor">
						<b-form-group label="Inglés:">
							<b-form-input v-model="en" readonly></b-form-input>
						</b-form-group>

						<b-form-group label="Chino:">
							<b-form-input v-model="cn" readonly></b-form-input>
						</b-form-group>
					</div>
				</div>
			</div>

			<div class="detailed_part">
				<b-form-group label="Otros nombres:">
					<b-form-input v-model="other" readonly></b-form-input>
				</b-form-group>
			</div>

			<div class="detailed_part">
				<b-form-group label="Descripción:">
					<b-form-input v-model="desc" readonly></b-form-input>
				</b-form-group>
			</div>

			<div class="detailed_part lists">
				<b-list-group>
					<b-list-group-item v-for="i in parents" :key="i">
						{{ i }}
					</b-list-group-item>
				</b-list-group>

				<b-list-group>
					<b-list-group-item v-for="i in children" :key="i">
						{{ i }}
					</b-list-group-item>
				</b-list-group>
			</div>
			
			<div class="detailed_part buttons">
				<b-button variant="primary">Editar</b-button>
				<b-button variant="danger">Eliminar</b-button>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from '../components/Navbar';

export default {
	name: 'DetailedView',
	components: {
		Navbar
	},
	methods: {
		otherNameStr() {
			
		}
	},
	data() {
		return {
			image: '',
			type: '',
			name: '',
			stock: '',
			partno: '',
			en: '',
			cn: '',
			other: '',
			desc: '',
			parents: [],
			children: []
		}
	},
	mounted: function() {
		this.$nextTick(function () {
			let otherarr = ['CYMS18010001-C7H', 'OTRO NOMBRE'];
			let tmp = '';

			for (let i = 0; i < otherarr.length; i++) {
				tmp += otherarr[i] + ", "
			}

			this.image = 'https://cdn.shopify.com/s/files/1/1520/5960/articles/most-badass-best-bigfoot-4x4-videos-ever_1024x1024.jpg?v=1521569389';
			this.type = 'Unidad';
			this.name = 'TRACTOR C7H';
			this.stock = '2';
			this.partno = '123-456';
			this.en = 'TRACTOR C7H';
			this.cn = '你好';
			this.other = tmp.substring(0, tmp.length - 2);
			this.desc = 'Un tractor.';
			this.parents = ['Otro tractor 1', 'Otro tractor 2', 'Otro tractor 3'];
			this.children = ['Motor', 'Llantas', 'Cofre'];
		});
	}
}
</script>

<style scoped>
#detailed {
	display: flex;
	flex-direction: column;
}
.detailed_part {
	width: 100%;
}
.main_data {
	display: flex;
	flex-direction: row;
}
.main_data_no_pic {
	display: flex;
	flex-direction: column;
}
.data_hor {
	display: flex;
	flex-direction: row;
}
.lists {
	display: flex;
	flex-direction: row;
}
.buttons {
	display: flex;
	flex-direction: row;
}
</style>