class Fleet {
    constructor(fleetId, userId) {
        this.fleetId = fleetId;
        this.userId = userId;
        this.vehicles = new Set(); // Set to store unique vehicles of plateNumber, value: Vehicle instance
    }

    registerVehicle(vehicle) {
        this.vehicles.add(vehicle.plateNumber);
    }


}

module.exports = Fleet;
