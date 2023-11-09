// steps/register_park_vehicle_steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert').strict;
const Fleet = require('../../src/Domain/Entities/Fleet');
const Vehicle = require('../../src/Domain/Entities/Vehicle');
const FleetRepository = require('../../src/Infra/Repositories/InMemoryFleetRepository');
const RegisterVehicleHandler = require('../../src/App/Handlers/RegisterVehicleHandler');
const ParkVehicleHandler = require("../../src/App/Handlers/ParkVehicleHandler");
const Location = require('../../src/Domain/Entities/Location');

let registerVehicleHandler, fleetId, fleet, vehicle, fleetOutput, registrationError, otherUserFleet;
let parkVehicleHandler, location, parkedVehicle, parkedLocation, parkError;
let plateNumber = 'ABC123';
let fleetRepository = new FleetRepository();


///////////// scenario 1

Given('my fleet', function () {
    fleet = new Fleet('fleet1', 'user1');
});

Given('a vehicle', function () {
    vehicle = new Vehicle(plateNumber);
});

///////////// scenario 3

Given('the fleet of another user', function () {
    // create the other user's fleet
    otherUserFleet = new Fleet('fleet2', 'user2');
    fleetRepository.addFleet(otherUserFleet);
});

Given('this vehicle has been registered into the other user\'s fleet', function () {
    // Register the vehicle into the other user's fleet
    otherUserFleet.registerVehicle(vehicle);
});

When('I register this vehicle into my fleet', function () {
    registerVehicleHandler = new RegisterVehicleHandler(fleetRepository);
    fleetOutput = registerVehicleHandler.handle({ fleet: fleet, vehicle: vehicle });
});

Then('this vehicle should be part of my vehicle fleet', function () {
    assert(fleetOutput.vehicles.has(vehicle.plateNumber));
});

///////////// scenario 2

Given('I have registered this vehicle into my fleet', function () {
    // Assume the registration of the vehicle into the fleet
    fleet.registerVehicle(vehicle);
});

When('I try to register this vehicle into my fleet', function () {
    registerVehicleHandler = new RegisterVehicleHandler(fleetRepository);
    try {
        registerVehicleHandler.handle({ fleet: fleetOutput, vehicle: vehicle });
    } catch (error) {
        registrationError = error.message;
    }
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
    assert.strictEqual(registrationError, 'Vehicle already registered');
});


/////// park vehicle steps


Given('a location', function () {
    location = new Location(40.7128, -74.0060);
});

When('I park my vehicle at this location', function () {
    // vehicle.updateLocation(vehicle, location);
    // parkVehicleHandler = new ParkVehicleHandler(fleetRepository);
    // parkedLocation = parkVehicleHandler.handle({ fleet, vehicle, location });
    parkVehicleHandler = new ParkVehicleHandler(fleetRepository);
    try {
        parkedLocation = parkVehicleHandler.handle({ fleet, vehicle, location });
    } catch (error) {
        registrationError = error.message;
    }
});

Then('the known location of my vehicle should verify this location', function () {
    assert.deepEqual(parkedLocation, location);
});

/////////// scenario 2

Given('my vehicle has been parked into this location', function () {
    // park the vehicle at the location
    parkedVehicle = vehicle.updateLocation(vehicle, location);
});

When('I try to park my vehicle at this location', function () {
    // Try to park the vehicle at the same location again
    parkVehicleHandler = new ParkVehicleHandler(fleetRepository);
    try {
        parkedLocation = parkVehicleHandler.handle({ fleet, vehicle, location });
    } catch (error) {
        parkError = error.message;
    }
});

Then('I should be informed that my vehicle is already parked at this location', function () {
    // Check if the result indicates that the vehicle is already parked at the location
    assert.strictEqual(parkError, 'Vehicle is already parked at this location');
});