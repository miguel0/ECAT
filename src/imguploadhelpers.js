import api from './services/api/api';
import { pushToOBS } from "./services/api/src/ObjectStorage";


const pullURL = process.env.VUE_APP_ORCL_OBS_PULL;

export default {
    uploadPartsPictures: uploadPartsPictures,
    uploadVehiclesPictures: uploadVehiclesPictures,
    uploadPartPicture: uploadPartPicture,
    uploadComponentPicture: uploadComponentPicture,
    uploadVehiclePicture: uploadVehiclePicture
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

function uploadPartPicture(file) {
    let suffix = 'parts/';
    let partName = file.name.split(".")[0];

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
                return api.partsApi.editPart(
                    resPart.id,
                    resPart.replaceNo,
                    resPart.name,
                    resPart.chName,
                    resPart.spName,
                    resPart.otherName,
                    imageURL
                )
            }
            throw new Error(response);
        })
        .then(response => {
            console.log(response);
            if (response === true) {
                console.log("Imagen actualizada.");
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function uploadComponentPicture(file) {
    let suffix = 'components/';
    let componentName = file.name.split(".")[0];

    let resComponent;
    api.componentsApi.getComponent(componentName)
        .then(component => {
            if (component.id) {
                resComponent = component;
                suffix += file.name;
                return pushToOBS(suffix, file);
            }
            throw new Error(component);
        })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                let imageURL = pullURL + suffix;
                console.log(imageURL)
                return api.componentsApi.editComponent(
                    resComponent.id,
                    resComponent.name,
                    resComponent.chName,
                    resComponent.spName,
                    resComponent.otherName,
                    resComponent.imageURL,
                    imageURL
                )
            }
            throw new Error(response);
        })
        .then(response => {
            console.log(response);
            if (response === true) {
                console.log("Imagen actualizada.");
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function uploadVehiclePicture(file) {
    let suffix = 'vehicles/';
    let vehicleName = file.name.split(".")[0];

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
            console.log(response);
            if (response.status === 200) {
                let imageURL = pullURL + suffix;
                console.log(imageURL)
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
            console.log(response);
            if (response === true) {
                console.log("Imagen actualizada.");
            }
        })
        .catch(err => {
            console.log(err);
        });
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
                console.log(response);
                if (response.status === 200) {
                    let imageURL = pullURL + suffix;
                    console.log(imageURL)
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
                console.log(response);
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