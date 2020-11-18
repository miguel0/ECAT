<template>
	<div>
		<Navbar />
		<div id="content" class="mt-5">
			<h2>Subir usando un archivo</h2>
			<div>
				<p class="mt-3">Archivo de Excel a subir:</p>
				<b-form @submit="onSubmitFile">
					<b-form-file
						v-model="file"
						:state="Boolean(file)"
						placeholder="Selecciona un archivo o arrástralo aquí..."
						drop-placeholder="Drop file here..."
						accept=".xlsx"
						browse-text="Examinar"
						required
						style="min-width:500px;"
					></b-form-file>
					<div class="mt-3 mb-4">Archivo seleccionado: {{ file ? file.name : '' }}</div>
					<div id="btn_div">
						<b-button class="mr-5" href="javascript:history.back()" variant="danger">Cancelar</b-button>
						<b-button type="submit" variant="primary">Aceptar</b-button>
					</div>
				</b-form>
			</div>
		</div>

		<b-modal ref="confirmationModal" size="lg" :hide-footer="true" title="Confirmación de subida">
		<h1>
			¿Está seguro?
		</h1>
		
		<h3>
			Asegúrese de que los datos sean correctos.
		</h3>

		<div class="separate">
			<b-button class="mt-4" variant="secondary btn-lg" @click="cancelConfirmation()">Cancelar</b-button>
			<b-button class="mt-4" variant="primary btn-lg" @click="confirm()">Confirmar y subir</b-button>
		</div>
	</b-modal>

	</div>
</template>

<script>
import Navbar from '../components/Navbar';
import api from '../services/api/api';
const Excel = require('exceljs');

export default {
	name: "AddDataFile",
	data() {
		return {
			file: null
		}
	},
	components: {
			Navbar
	},
	methods: {
		onSubmitFile(evt) {
			evt.preventDefault();

			this.$refs.confirmationModal.show();
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
					v["spName"] = index.getCell('C3').value;
					v["otherName"] = index.getCell('D3').value;
					v["model"] = index.getCell('E3').value;
					v["type"] = index.getCell('F3').value;
					v["motorConfig"] = index.getCell('G3').value;
					v["motorPower"] = index.getCell('H3').value;
					v["transmission"] = index.getCell('I3').value;
					v["groups"] = [];

					// get group data
					let i = 6;
					let groupn = "";
					while((groupn = index.getCell('B' + (++i).toString()).value) != null) {
						let group = {};

						group["localNo"] = index.getCell('A' + i.toString()).value;
						group["name"] = groupn;
						group["spName"] = index.getCell('C' + i.toString()).value;
						group["chName"] = index.getCell('D' + i.toString()).value;
						group["otherName"] = index.getCell('E' + i.toString()).value;
						group["components"] = [];

						// get component data
						let ws = wb.getWorksheet(groupn);
						let j = 1;
						let grouphead = "";
						while((grouphead = ws.getCell('A' + (++j).toString()).value) != null) {
							let component = {};

							const localNo = grouphead.substring(0, grouphead.indexOf(" ")).toString();
							component["localNo"] = localNo.substring(localNo.lastIndexOf('.') + 1, localNo.length);
							component["chName"] = grouphead.substring(grouphead.indexOf(" ") + 1, grouphead.lastIndexOf("/"));
							component["name"] = grouphead.substring(grouphead.lastIndexOf("/") + 1, grouphead.length);
							component["spName"] = ws.getCell('G' + j.toString()).value;
							component["otherName"] = ws.getCell('H' + j.toString()).value;
							component["parts"] = [];

							// get part data
							j += 2;
							let localno = "";
							while((localno = ws.getCell('A' + (++j).toString()).value) != null) {
								let part = {};

								part["localNo"] = localno.toString();
								part["id"] = ws.getCell('B' + j.toString()).value;
								part["chName"] = ws.getCell('C' + j.toString()).value;
								part["name"] = ws.getCell('D' + j.toString()).value;
								part["localQty"] = ws.getCell('E' + j.toString()).value;
								part["remark"] = ws.getCell('F' + j.toString()).value;
								part["spName"] = ws.getCell('G' + j.toString()).value;
								part["otherName"] = ws.getCell('H' + j.toString()).value;
								part["replaceNo"] = ws.getCell('I' + j.toString()).value;

								component["parts"].push(part);
							}

							group["components"].push(component);
						}

						v["groups"].push(group);
					}
					
					this.sendToBack(v);
				}).catch((error)=> {
					this.sendToBack("readFile fail" + error);
				})
			};
			fileReader.readAsArrayBuffer(f);
		},
		async sendToBack(vehicle) {
			if (typeof vehicle === 'string' || vehicle instanceof String) {
				alert('Ocurrió un error al leer el archivo.')
			} else {
				api.vehiclesApi.addVehicle(vehicle['id'], vehicle)
				.then(res => {
					this.file = null;
					console.log(res);

					if(res === true) {
						console.log('yay');
					} else {
						alert("Ocurrió un error.");
					}
				})
				.catch(err => {
					console.log(err);
				});
			}
		},
		confirm: function() {
			this.readXlsx();
		},
		cancelConfirmation: function() {
			this.$refs.confirmationModal.hide();
		}
	}
}
</script>

<style scoped>
#content {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}
#btn_div {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.separate{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
</style>
