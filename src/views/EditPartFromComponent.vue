<template>
    <div>
        <Navbar />
        <div class="form-content p-5">
            <h3>Editando parte</h3>
            <br>
            <b-form @submit="onSubmit">
                <b-form-group label="Número de parte:">
                    <b-form-input v-model="partId" readonly></b-form-input>
                </b-form-group>

                <b-form-group label="Número de reemplazo:">
                    <b-form-input v-model="replaceNo"></b-form-input>
                </b-form-group>

                <b-form-group label="Nombre en inglés:">
                    <b-form-input v-model="name"></b-form-input>
                </b-form-group>

                <b-form-group label="Nombre en español:">
                    <b-form-input v-model="spName"></b-form-input>
                </b-form-group>

                <b-form-group label="Nombre en chino:">
                    <b-form-input v-model="chName"></b-form-input>
                </b-form-group>

                <b-form-group label="Otros nombres:">
                    <b-form-input v-model="otherName"></b-form-input>
                </b-form-group>

                <p class="mt-3">Imagen a subir:</p>
                <b-form-file
                    class="mb-2"
                    v-model="image"
                    :state="Boolean(image)"
                    placeholder="Selecciona un archivo o arrástralo aquí..."
                    accept=".jpeg, .jpg, .png"
                    browse-text="Examinar"
                    style="min-width:500px;"
                ></b-form-file>
                <b-button class="mb-4" @click="image = null; imageURL = '';">Borrar imagen</b-button>

                <b-form-group label="Remark:">
                    <b-form-input v-model="remark"></b-form-input>
                </b-form-group>

                <b-form-group label="Quantity:">
                    <b-form-input v-model="localQty"></b-form-input>
                </b-form-group>

                <div class="separate">
                    <b-button class="mr-5" href="javascript:history.back()" variant="danger">Cancelar</b-button>
                    <b-button type="submit" variant="primary">Aceptar</b-button>
                </div>
            </b-form>
        </div>

        <b-modal ref="confirmationModal" size="lg" :hide-footer="true" title="Confirmación de edición">
            <h1>
                ¿Está seguro?
            </h1>

            <h3>
                Los datos podrían no recuperarse tras realizar esta acción.
            </h3>

            <div class="separate">
                <b-button class="mt-4" variant="secondary btn-lg" @click="cancelConfirmation()">Cancelar</b-button>
                <b-button class="mt-4" variant="warning btn-lg" @click="confirm()">Confirmar y editar</b-button>
            </div>
        </b-modal>

    </div>
</template>

<script>
import Navbar from '../components/Navbar';
import api from '../services/api/api';
import imgHelper from '../imguploadhelpers';

export default {
    name: 'EditPartFromComponent',
    data() {
        return {
            partId: null,
            replaceNo: null,
            name: null,
            spName: null,
            chName: null,
            otherName: null,
            imageURL: null,
            remark: null,
            localQty: null,
            image: null
        }
    },
    components: {
        Navbar
    },
    created: function() {
        api.partsApi.getPart(this.$route.params.pid)
            .then(part => {
                this.partId = part.id ? part.id : '';
                this.replaceNo = part.replaceNo ? part.replaceNo : '';
                this.name = part.name ? part.name : '';
                this.spName = part.spName ? part.spName : '';
                this.chName = part.chName ? part.chName : '';
                this.otherName = part.otherName ? part.otherName : '';
                this.imageURL = part.imageURL ? part.imageURL : '';
            })
            .catch(err => {
                alert(err.message);
            })

        api.componentPartsApi.getComponentPart(this.$route.params.cpid)
            .then(componentPart => {
                this.remark = componentPart.remark ? componentPart.remark : '';
                this.localQty = componentPart.localQty ? componentPart.localQty : '';
            })
            .catch(err => {
                alert(err.message);
            })
    },
    methods: {
        onSubmit: function(evt) {
            evt.preventDefault();
            this.$refs.confirmationModal.show();
        },

        confirm: async function(){
            if(this.partId === this.replaceNo) {
                alert('El número de parte y el número de reemplazo no pueden ser el mismo.');
            } else {
                await this.edit()
            }
        },

        edit: async function () {
            if (this.image != null) {
                let folder = 'Parts/';
                this.imageURL = await imgHelper.uploadSinglePicture(folder, this.image);
                if (this.imageURL === '') {
                    alert('Error al subir imagen.');
                }
            }

            api.partsApi.editPart(this.partId, this.replaceNo, this.name, this.chName, this.spName, this.otherName, this.imageURL)
                .then(res => {
                    if(res === true) {
                        return api.componentPartsApi.editComponentPart(this.$route.params.cpid, this.remark, this.localQty);
                        
                    } else if(res.includes('value too large for column')) {
                        alert('Uno de los campos es muy largo, trate de modificarlo para que sea más corto.');
                    } else {
                        alert("Ocurrió un error.");
                    }
                })
                .then(res => {
                    if(res === true) {
                        window.history.back();
                    } else if(res.includes('value too large for column')) {
                        alert('Uno de los campos es muy largo, trate de modificarlo para que sea más corto.');
                    } else {
                        alert("Ocurrió un error.");
                    }
                })
                .catch(err => {
                    this.cancelConfirmation();
                    alert(err.message);
                });
        },

        cancelConfirmation: function(){
            this.$refs.confirmationModal.hide();
        },
    }
}
</script>

<style scoped>
.form-content {
    max-width: 600px;
    margin: auto;
}
.separate{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
</style>