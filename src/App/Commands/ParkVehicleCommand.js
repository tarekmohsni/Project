class ParkVehicleCommand {
    constructor(fleetId, plateNumber, location) {
        this.fleetId = fleetId;
        this.plateNumber = plateNumber;
        this.location = location;
    }
}

module.exports = ParkVehicleCommand;
