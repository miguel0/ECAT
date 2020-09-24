<template>
	<div>
		<Navbar />

		<div id="detailed">
			<div class="detailed_part main_data">
				<div id="img">
					<b-img :src="image" fluid></b-img>
				</div>
				<div class="main_data_no_pic">
					<div class="data_hor">
						<b-form-group class="left" label="Tipo:">
							<b-form-input v-model="type" readonly></b-form-input>
						</b-form-group>

						<b-form-group class="left" label="Número de parte:">
							<b-form-input v-model="partno" readonly></b-form-input>
						</b-form-group>
						
						<b-form-group label="Existencias:">
							<b-form-input v-model="stock" readonly></b-form-input>
						</b-form-group>
					</div>

					<b-form-group label="Descripción:">
						<b-form-input v-model="desc" readonly></b-form-input>
					</b-form-group>

					<div class="data_hor">
						<b-form-group class="left lang" label="Inglés:">
							<b-form-input v-model="en" readonly></b-form-input>
						</b-form-group>

						<b-form-group class="lang" label="Chino:">
							<b-form-input v-model="cn" readonly></b-form-input>
						</b-form-group>
					</div>

					<b-form-group label="Otros nombres:">
						<b-form-input v-model="other" readonly></b-form-input>
					</b-form-group>
				</div>
			</div>

			<div class="detailed_part lists">
				<div class="my_list">
					<p>Unidades a las que pertenece:</p>
					<div class="list_no_title overflow-auto">
						<b-list-group>
							<b-list-group-item v-for="i in parents" :key="i">
								{{ i }}
							</b-list-group-item>
						</b-list-group>
					</div>
				</div>

				<div class="my_list">
					<p>Componentes que contiene:</p>
					<div class="list_no_title overflow-auto">
						<b-list-group>
							<b-list-group-item v-for="i in children" :key="i">
								{{ i }}
							</b-list-group-item>
						</b-list-group>
					</div>
				</div>
			</div>
			
			<div class="detailed_part buttons">
				<div class="btn_div">
					<b-button class="btn" variant="danger">Eliminar</b-button>
				</div>

				<div class="btn_div">
					<b-button class="btn" variant="primary">Editar</b-button>
				</div>
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
			desc: '',
			stock: '',
			partno: '',
			en: '',
			cn: '',
			other: '',
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
			this.desc = 'TRACTOR C7H';
			this.stock = '2';
			this.partno = '123-456';
			this.en = 'TRACTOR C7H';
			this.cn = '你好';
			this.other = tmp.substring(0, tmp.length - 2);
			this.parents = ['Otro tractor 1', 'Otro tractor 2'];
			this.children = ['Motor', 'Llantas', 'Cofre', 'Clutch', 'Ventana'];
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
	justify-content: center;
	padding-top: 1%;
}
.main_data {
	display: flex;
	flex-direction: row;
	margin-bottom: -3%;
}
.main_data_no_pic {
	display: flex;
	flex-direction: column;
	width: 40%;
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
	margin-top: 2%;
}
#img {
	padding-top: 5%;
	padding-right: 5%;
	height:400px;
	width:400px;
	overflow:hidden;
}
.my_list {
	width: 300px;
	padding-left: 0.5%;
	padding-right: 0.5%;
}
.btn_div {
	padding-left: 2%;
	padding-right: 2%;
}
.btn {
	min-width: 100px;
}
.left {
	margin-right: 5%;
}
.lang {
	width: 100%;
}
.list_no_title {
	max-height: 150px;
}
</style>