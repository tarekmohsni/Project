const r = require('ramda');

class RegisterVehicleHandler {
    constructor() {
    }

     handle(command) {
        const { fleet, vehicle } = command;
        // check if vehicle exist in the fleet
        if ( r.findIndex(r.equals(vehicle.plateNumber), Array.from(fleet.vehicles)) !== -1) {
            throw new Error('Vehicle already registered');
        }
        // add vehicle to fleet
        fleet.registerVehicle(vehicle);
        return fleet;
    }

}

module.exports = RegisterVehicleHandler;
