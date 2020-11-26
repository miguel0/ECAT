<template>
    <div>
        <Navbar />
        <div id="content" class="mt-5">
            <h2>Agregar imágenes para:</h2>
            <template>
                <br>
                <b-row>
                    <b-col style="display:flex;">
                        <b-form-select v-model="selectedElement">
                            <b-form-select-option
                                v-for="element in elements"
                                :key="element.text"
                                :value="element.value"
                            >
                                {{element.text}}
                            </b-form-select-option>
                        </b-form-select>
                    </b-col>
                </b-row>
            </template>
            <div>
                <p class="mt-3">Imágenes a subir:</p>
                <b-form @submit="onSubmitFiles">
                    <b-form-file
                        v-model="files"
                        :state="Boolean(files)"
                        placeholder="Selecciona las imágenes o arrástralas aquí..."
                        drop-placeholder="Arroja las imágenes aquí..."
                        accept=".jpg, .jpeg, .png"
                        browse-text="Examinar"
                        multiple
                        required
                        style="min-width:500px;"
                    ></b-form-file>
                    <div class="mt-3 mb-4">
                        <div v-if="files">
                            <p>Se intentará agregar las siguientes imágenes a sus respectivas partes:</p>
                            <div v-if="files.length <= 5">
                                <div v-for="(file) in files" :key="file.name">
                                    {{ file.name }}
                                </div>
                            </div>
                            <div v-else>
                                <div>
                                    {{ files[0].name }} <br>
                                    {{ files[1].name }} <br>
                                    {{ files[2].name }} <br>
                                    {{ files[3].name }} <br>
                                    {{ files[4].name }} <br>
                                    Y otra(s) {{ files.length - 5 }}
                                </div>
                            </div>
                        </div>
                    </div>
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
                Asegúrese de que las imágenes sean las deseadas.
            </h3>

            <div class="separate">
                <b-button class="mt-4" variant="secondary btn-lg" @click="cancelConfirmation()">Cancelar</b-button>
                <b-button class="mt-4" variant="primary btn-lg" @click="confirm()">Confirmar y subir</b-button>
            </div>
        </b-modal>

        <b-modal
            ref="resultsModal"
            size="lg"
            :hide-footer="true"
            title="Resultados de subida"
        >
            <div v-if="uploaded">
                <h1>
                    Resultados:
                </h1>

                <div v-if="uploaded">
                    <h3>
                        Se lograron subir imágenes para las siguientes partes:
                    </h3>
                    <div v-if="uploaded.length > 0">
                        <div v-if="uploaded.length <= 5">
                            <div v-for="(partno) in uploaded" :key="partno">
                                {{ partno }}
                            </div>
                        </div>
                        <div v-else>
                            <div>
                                {{ uploaded[0] }} <br>
                                {{ uploaded[1] }} <br>
                                {{ uploaded[2] }} <br>
                                {{ uploaded[3] }} <br>
                                {{ uploaded[4] }} <br>
                                Y otra(s) {{ uploaded.length - 5 }}
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h4>Ninguna</h4>
                    </div>

                </div>

                <div class="onebtn">
                    <b-button class="mt-4" variant="primary" @click="finish()">Aceptar</b-button>
                </div>
            </div>
            <LoadingSpinner v-else/>
        </b-modal>
    </div>
</template>

<script>
import Navbar from "../components/Navbar";
import LoadingSpinner from '../components/LoadingSpinner';
import imgHelper from '../imguploadhelpers';

export default {
    name: "AddImages",
    data() {
        return {
            files: null,
            uploaded: null,
            selectedElement: 'part',
            elements: [
                { value: 'vehicle', text: 'Vehículo' },
                { value: 'part', text: 'Parte' }
            ]
        }
    },
    components: {
        Navbar,
        LoadingSpinner
    },
    methods: {
        onSubmitFiles(evt) {
            evt.preventDefault();
            this.$refs.confirmationModal.show();
        },
        cancelConfirmation: function(){
            this.$refs.confirmationModal.hide();
        },
        confirm: async function() {
            this.$refs.confirmationModal.hide();
            this.$refs.resultsModal.show();

            switch (this.selectedElement) {
                case "part":
                    this.uploaded = await imgHelper.uploadPartsPictures(this.files);
                    break;
                case "vehicle":
                    this.uploaded = await imgHelper.uploadVehiclesPictures(this.files);
                    break;
            }
        },
        finish: function() {
            this.$refs.resultsModal.hide();
            this.files = null;
            this.uploaded = null;
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

.onebtn{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}
</style>