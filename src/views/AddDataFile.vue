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
						<b-button type="submit" variant="primary" style="min-width:100px">Subir</b-button>
					</div>
				</b-form>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from '../components/Navbar';
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

			this.readXlsx();

			this.file = null;
			this.type1 = null;
			console.log("added file");
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
#content {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}
#btn_div {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
