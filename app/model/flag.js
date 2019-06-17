import uuid from 'uuid';
// import Car from './cars';
import db from "../database/db";


class Flag {

    /**
     *
     * @param {object} data
     * @returns {object} flag object
     */
    async createFlag(data, owner) {
        const text = `INSERT INTO
          flags(id, ownerid, carid, reason, description)
          VALUES($1, $2, $3, $4, $5) RETURNING *`;

        const values = [
            uuid.v4(),
            owner.id,
            data.car_id,
            data.reason,
            data.description
        ];

        try {
            const result = await db.query(text, values);
            return result.rows[0];
        } catch (err) {
            return error;
        }
    }
}

export default new Flag();