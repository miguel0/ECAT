<template>
	<div>
		<Navbar />
		<b-container id="table" class="bv-example-row" fluid>
			<b-row>
				<b-col class="add_option" id="file">
					<div class="my_form cont">
						<h2>Subir con archivo</h2>
						<div id="file_add" class="cont">
							<p>Archivo de Excel a subir:</p>
							<b-form @submit="onSubmitFile">
								<b-form-file
									v-model="file"
									:state="Boolean(file)"
									placeholder="Selecciona un archivo o arrástralo aquí..."
									drop-placeholder="Drop file here..."
									accept=".xlsx"
									browse-text="Examinar"
									required
								></b-form-file>
								<div class="mt-3">Archivo seleccionado: {{ file ? file.name : '' }}</div>

								<b-form-group id="type" label="Tipo:">
									<b-form-select
										v-model="type1"
										:options="types"
										required
									></b-form-select>
								</b-form-group>

								<b-button class="my_submit" type="submit" variant="primary">Subir</b-button>
							</b-form>
						</div>
					</div>
				</b-col>
				<b-col class="add_option" id="manual">
					<div class="my_form cont cont">
						<h2>Subir manualmente</h2>
						<div id="manual_add">
							<b-form @submit="onSubmitManual">
								<b-form-group class="manual_input" label="Nombre del elemento:">
									<b-form-input
										v-model="name"
										required
										placeholder="Nombre"
									></b-form-input>
								</b-form-group>

								<b-form-group class="manual_input" label="ID del elemento:">
									<b-form-input
										v-model="id"
										required
										placeholder="ID"
									></b-form-input>
								</b-form-group>

								<b-form-group id="type" label="Tipo:">
									<b-form-select
										v-model="type2"
										:options="types"
										required
									></b-form-select>
								</b-form-group>

								<b-button class="my_submit" type="submit" variant="primary">Subir</b-button>
							</b-form>
						</div>
					</div>
				</b-col>
			</b-row>
		</b-container>

		<b-modal id="modal" ok-only>
			<p class="my-4">AGREGADO</p>
		</b-modal>
	</div>
</template>

<script>
import Navbar from '../components/Navbar';
const Excel = require('exceljs');

export default {
	name: "AddData",
	data() {
		return {
			file: null,
			type1: null,
			name: "",
			id: "",
			type2: null,
			types: [{ text: 'Selecciona uno', value: null }, 'Unidad', 'Grupo', 'Componente', 'Parte'],
		}
	},
	components: {
			Navbar
	},
	methods: {
		onSubmitFile(evt) {
			evt.preventDefault();

			this.readXlsx();

			this.file = null;
			this.type1 = null;
			this.$bvModal.show("modal");
		},
		onSubmitManual(evt) {
			evt.preventDefault();
			console.log("name: " + this.name + " id: " + this.id + " type " + this.type1);
			this.name = "";
			this.id = "";
			this.type2 = null;
			this.$bvModal.show("modal");
		},
		async readXlsx() {
			if (!this.file) {
				return;
			}
			const f = this.file;
			const workbook = new Excel.Workbook();
			var fileReader = new FileReader();
			fileReader.onload = (e) => {
				const buffer = e.target.result;
				workbook.xlsx.load(buffer).then(async (wb)=> {
					console.log("readFile success");
					const index = wb.getWorksheet('Indice');
					
					// get vehicle data
					let v = {};

					v["name"] = index.getCell('A3').value;
					v["id"] = index.getCell('B3').value;
					v["sp"] = index.getCell('C3').value;
					v["other"] = index.getCell('D3').value;
					v["model"] = index.getCell('E3').value;
					v["type"] = index.getCell('F3').value;
					v["motor"] = index.getCell('G3').value;
					v["motorp"] = index.getCell('H3').value;
					v["trans"] = index.getCell('I3').value;
					v["groups"] = [];

					// get group data
					let i = 6;
					let groupn = "";
					while((groupn = index.getCell('B' + (++i).toString()).value) != null) {
						let group = {};

						group["localno"] = index.getCell('A' + i.toString()).value;
						group["name"] = groupn;
						group["sp"] = index.getCell('C' + i.toString()).value;
						group["ch"] = index.getCell('D' + i.toString()).value;
						group["other"] = index.getCell('E' + i.toString()).value;
						group["components"] = [];

						// get component data
						let ws = wb.getWorksheet(groupn);
						let j = 1;
						let grouphead = "";
						while((grouphead = ws.getCell('A' + (++j).toString()).value) != null) {
							let component = {};

							component["localno"] = grouphead.substring(0, grouphead.indexOf(" "));
							component["ch"] = grouphead.substring(grouphead.indexOf(" ") + 1, grouphead.lastIndexOf("/"));
							component["name"] = grouphead.substring(grouphead.lastIndexOf("/") + 1, grouphead.length);
							component["sp"] = ws.getCell('G' + j.toString()).value;
							component["other"] = ws.getCell('H' + j.toString()).value;
							component["parts"] = [];

							// get part data
							j += 2;
							let localno = "";
							while((localno = ws.getCell('A' + (++j).toString()).value) != null) {
								let part = {};

								part["localno"] = localno;
								part["partno"] = ws.getCell('B' + j.toString()).value;
								part["ch"] = ws.getCell('C' + j.toString()).value;
								part["name"] = ws.getCell('D' + j.toString()).value;
								part["qty"] = ws.getCell('E' + j.toString()).value;
								part["remark"] = ws.getCell('F' + j.toString()).value;
								part["sp"] = ws.getCell('G' + j.toString()).value;
								part["other"] = ws.getCell('H' + j.toString()).value;

								component["parts"].push(part);
							}

							group["components"].push(component);
						}

						v["groups"].push(group);
					}
					
					console.log(JSON.stringify(v));
				}).catch((error)=> {
					console.log("readFile fail", error);
				})
			};
			fileReader.readAsArrayBuffer(f);
		}
	}
}
</script>

<style scoped>
#table {
	padding-top: 5%;
	padding-left: 15%;
	padding-right: 15%;
}
#manual {
	border-left: solid thin lightgray;
}
.my_form {
	padding-top: 5%;
	padding-left: 5%;
	padding-bottom: 10%;
}
#file_add {
	padding-top: 10%;
}
#type {
	margin-top: 7%;
	width: 35%;
}
.my_submit {
	min-width: 130px;
	margin-top: 5%;
	position: absolute;
	bottom: 5%;
}
#manual_add {
	padding-top: 10%;
}
.manual_input {
	margin-top: 1.8%;
}
.cont {
	height: 100%;
}
.manual_input {
	max-width: 400px;
}
#type {
	margin-bottom: 50px;
}
</style>
