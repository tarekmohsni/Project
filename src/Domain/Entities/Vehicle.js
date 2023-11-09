const r = require("ramda");

class Vehicle {
    constructor(plateNumber) {
        this.plateNumber = plateNumber;
        this.vehicleLocations = new Map();

    }

    updateLocation(vehicle, location) {
        // check if a vehicle is parked at the specified location
        if (this.vehicleLocations.has(vehicle.plateNumber) && r.equals(this.vehicleLocations.get(vehicle.plateNumber), location)) {
            throw new Error('Vehicle is already parked at this location');
        }
        this.vehicleLocations.set(vehicle.plateNumber, location);
        return  location;
    }


}

module.exports = Vehicle;
