class Location {
    constructor(latitude, longitude, altitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude || 0; // Default altitude to 0 if not provided
    }

}

module.exports = Location;
