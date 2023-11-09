class InMemoryFleetRepository {
    constructor() {
        this.fleets = new Map(); // key: userId, value: Fleet instance
    }

    addFleet(fleet) {
        if (this.fleets.has(fleet.userId)) {
            throw new Error('Fleet already exists for this user.');
        }
        this.fleets.set(fleet.userId, fleet);
    }
}

module.exports = InMemoryFleetRepository;
