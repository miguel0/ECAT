import api from './services/api/api';
import { pushToOBS } from "./services/api/src/ObjectStorage";


const pullURL = process.env.ORCL_OBS_PULL;

export default {
    uploadPartsPictures: uploadPartsPictures,
    uploadVehiclesPictures: uploadVehiclesPictures
}

function isDuplicateName(imageName, processed) {
    for (let index; index < processed.length; index++) {
        let name = processed[index];
        if (imageName.includes(name)) {
            return true;
        }
    }
    return false;
}

/*
function uploadPartPicture() {

}

function uploadComponentPicture() {

}

function uploadVehiclePicture() {

}
*/
async function uploadPartsPictures(files) {
    let uploaded = [];
    let processed = [];
    for (let index = 0; index < files.length; index++) {
        let suffix = 'parts/';
        let file = files[index];
        let partName = file.name.split(".")[0];
        if (isDuplicateName(partName, processed)) {
            continue;
        }

        let resPart;
        api.partsApi.getPart(partName)
            .then(part => {
                if (part.id) {
                    resPart = part;
                    suffix += file.name;
                    return pushToOBS(suffix, file);
                }
                throw new Error(part);
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    let imageURL = pullURL + suffix;
                    console.log(imageURL)
                    return api.partsApi.editPart(resPart.id, resPart.replaceNo, resPart.name, resPart.chName, resPart.spName, resPart.otherName, imageURL)
                }
                throw new Error(response);
             })
            .then(response => {
                console.log(response);
                if (response === true) {
                    uploaded.push(partName);
                    console.log("Imagen actualizada.");
                }
            })
            .catch(err => {
                console.log(err);
            });
        processed.push(partName);
    }
    return uploaded;
}

function uploadVehiclesPictures() {

}