class ParkVehicleHandler {
    constructor() {
    }

    handle(command) {
        const {vehicle, location} = command;
        return vehicle.updateLocation(vehicle, location);
    }
}

module.exports = ParkVehicleHandler;
