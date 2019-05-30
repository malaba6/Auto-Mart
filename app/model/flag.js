import uuid from "uuid";
import Car from "./cars";


class Flag {
    /**
     * 
     * class constructor
     */
    constructor() {
        this.flags = [{
            id: uuid.v4(),
            car_id: "b8aa4d11-baa4-4d6a",
            reason: "Wierd price",
            description: "The price is twice the normal price"
        }]
    }

    /**
     * 
     * @param {object} data
     * @returns {object} flag object
     */
    createFlag(data) {
        const newFlag = {
            id: uuid.v4(),
            car_id: data.car_id,
            reason: data.reason,
            description: data.description
        }
        this.flags.push(newFlag);
        return newFlag;
    }
}

export default new Flag();