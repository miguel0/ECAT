<template>
	<div>
		<Navbar/>
		<div v-if="uploading">
			<LoadingSpinner class="m-5"/>
			<h3 style="text-align: center;">Este proceso puede tardar más de 10 minutos.<br>Por favor espere.</h3>
		</div>
		<div v-else>
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

			<ConfirmationModal
				mode="add"
				ref="modalC"
				@onConfirm="confirm()"
				@onCancel="cancelConfirmation()"
			/>
		</div>
	</div>
</template>

<script>
import Navbar from '../components/Navbar';
import api from '../services/api/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfirmationModal';

const Excel = require('exceljs');

export default {
	name: "AddDataFile",
	data() {
		return {
			file: null,
			uploading: false
		}
	},
	components: {
			Navbar,
			LoadingSpinner,
			ConfirmationModal
	},
	methods: {
		onSubmitFile(evt) {
			evt.preventDefault();

			this.$refs.modalC.showModal();
		},
		async readXlsx() {
			if (!this.file) {
				this.uploading = false;
				return;
			}
			this.cancelConfirmation();
			const f = this.file;
			const workbook = new Excel.Workbook();
			var fileReader = new FileReader();
			fileReader.onload = (e) => {
				const buffer = e.target.result;
				let errorMsg = 'Ocurrió un error leyendo el archivo.';
				
				workbook.xlsx.load(buffer).then(async (wb)=> {
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
						group["localNo"] = group["localNo"].toString().trim()
						group["name"] = groupn;
						group["spName"] = index.getCell('C' + i.toString()).value;
						group["chName"] = index.getCell('D' + i.toString()).value;
						group["otherName"] = index.getCell('E' + i.toString()).value;
						group["components"] = [];

						// get component data
						let ws = wb.getWorksheet(group["localNo"] + " " + groupn);
						let j = 0;
						let grouphead = "";
						const compLimit = 100;
						for (;;) {
							let noMoreComps = true;
							for (let searchComp = j; searchComp < j + compLimit; searchComp++) {
								if (
									ws.getCell('A' + searchComp.toString()).value != null
									&& ws.getCell('A' + (searchComp + 1).toString()).value != null
								) {
									j = searchComp;
									grouphead = ws.getCell('A' + searchComp.toString()).value;
									grouphead = grouphead.toString().trim();
									noMoreComps = false;
									break;
								}
							}
							
							if (noMoreComps) {
								break;
							}

							errorMsg = 'Ocurrió un error leyendo el grupo: ' + groupn + ' en la fila ' + j.toString();
							let component = {};

							const localNo = grouphead.substring(0, grouphead.indexOf(" "));
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
								errorMsg = 'Ocurrió un error leyendo el grupo: ' + groupn + ' en la fila: ' + j.toString();
								let part = {};

								localno = localno.toString().trim();
								part["localNo"] = localno;
								part["id"] = ws.getCell('B' + j.toString()).value;
								part["chName"] = ws.getCell('C' + j.toString()).value;
								part["name"] = ws.getCell('D' + j.toString()).value;
								part["localQty"] = ws.getCell('E' + j.toString()).value;
								part["remark"] = ws.getCell('F' + j.toString()).value;
								part["spName"] = ws.getCell('G' + j.toString()).value;
								part["otherName"] = ws.getCell('H' + j.toString()).value;
								part["replaceNo"] = ws.getCell('I' + j.toString()).value;

								if (part["id"] === part["replaceNo"]) {
									this.$bvModal.msgBoxOk(`Ocurrió un error leyendo el grupo: ${groupn} en la fila: ${j.toString()}`, {centered: true});
									this.uploading = false;
									return;
								}

								component["parts"].push(part);

								if (ws.getCell('A' + (j+1).toString()).value === ws.getCell('B' + (j+1).toString()).value) {
									let newComp = true;
									for (let searchComp = ++j; searchComp < j + compLimit; searchComp++) {
										if (
											ws.getCell('A' + searchComp.toString()).value != null
											&& ws.getCell('A' + (searchComp + 1).toString()).value != null
										) {
											let newgrouphead = ws.getCell('A' + searchComp.toString()).value;
											newgrouphead = newgrouphead.toString().trim();
											if (newgrouphead === grouphead) {
												j = searchComp + 2;
												newComp = false;
											} else {
												j = searchComp - 1;
											}
											break;
										}
									}

									if (newComp) {
										break;
									}
								}
							}

							group["components"].push(component);
							j++;
						}

						v["groups"].push(group);
					}

					this.sendToBack(v);
				}).catch(()=> {
					alert(errorMsg);
					this.$bvModal.msgBoxOk(errorMsg, {centered: true});
					this.file = null;
					this.uploading = false;
				})
			};
			fileReader.readAsArrayBuffer(f);
		},
		async sendToBack(vehicle) {
			api.vehiclesApi.addVehicle(vehicle['id'], vehicle)
			.then(res => {
				this.uploading = false;
				this.file = null;

				if(res === true) {
					this.$bvModal.msgBoxOk('¡El vehículo se añadió correctamente!', {centered: true});
				} else {
					this.$bvModal.msgBoxOk(`Ocurrió el siguiente error: ${res}`, {centered: true});
				}
			})
			.catch(err => {
				this.$bvModal.msgBoxOk(err.message, {centered: true});
			});
		},
		confirm: function() {
			this.uploading = true;
			this.readXlsx();
		},
		cancelConfirmation: function() {
			this.$refs.modalC.hideModal();
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
