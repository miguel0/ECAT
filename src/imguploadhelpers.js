import api from './services/api/api';
import { pushToOBS } from "./services/api/src/ObjectStorage";


const pullURL = 'https://objectstorage.us-ashburn-1.oraclecloud.com/n/idh6hnyu8tqh/b/ECAT-OSB/o/';

export default {
    uploadPartsPictures: uploadPartsPictures,
    uploadVehiclesPictures: uploadVehiclesPictures,
    uploadSinglePicture: uploadSinglePicture
}

function isDuplicateName(imageName, processed) {
    for (let index = 0; index < processed.length; index++) {
        let name = processed[index];
        if (imageName.includes(name)) {
            return true;
        }
    }
    return false;
}

async function uploadSinglePicture(folder, file) {
    let suffix = folder + file.name;
    let imageURL = '';
    await pushToOBS(suffix, file)
        .then(response => {
            if (response.status === 200) {
                imageURL = pullURL + suffix;
            } else {
                throw new Error(response);
            }
        })
        .catch(err => {
            console.log(err);
        })
    return imageURL;
}

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
        await api.partsApi.getPart(partName)
            .then(part => {
                if (part.id) {
                    resPart = part;
                    suffix += file.name;
                    return pushToOBS(suffix, file);
                }
                throw new Error(part);
            })
            .then((response) => {
                if (response.status === 200) {
                    let imageURL = pullURL + suffix;
                    return api.partsApi.editPart(
                        resPart.id,
                        resPart.replaceNo,
                        resPart.name, resPart.chName,
                        resPart.spName,
                        resPart.otherName,
                        imageURL
                    )
                }
                throw new Error(response);
             })
            .then(response => {
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

function uploadVehiclesPictures(files) {
    let uploaded = [];
    let processed = [];
    for (let index = 0; index < files.length; index++) {
        let suffix = 'vehicles/';
        let file = files[index];
        let vehicleName = file.name.split(".")[0];
        if (isDuplicateName(vehicleName, processed)) {
            continue;
        }

        let resVehicle;
        api.vehiclesApi.getVehicle(vehicleName)
            .then(vehicle => {
                if (vehicle.id) {
                    resVehicle = vehicle;
                    suffix += file.name;
                    return pushToOBS(suffix, file);
                }
                throw new Error(vehicle);
            })
            .then((response) => {
                if (response.status === 200) {
                    let imageURL = pullURL + suffix;
                    return api.vehiclesApi.editVehicle(
                        resVehicle.id,
                        resVehicle.name,
                        resVehicle.spName,
                        resVehicle.otherName,
                        resVehicle.model,
                        resVehicle.type,
                        resVehicle.motorConfig,
                        resVehicle.motorPower,
                        resVehicle.transmission,
                        imageURL
                    )
                }
                throw new Error(response);
            })
            .then(response => {
                if (response === true) {
                    uploaded.push(vehicleName);
                    console.log("Imagen actualizada.");
                }
            })
            .catch(err => {
                console.log(err);
            });
        processed.push(vehicleName);
    }
    return uploaded;
}