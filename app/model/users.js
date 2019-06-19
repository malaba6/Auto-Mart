import uuid from 'uuid';
import db from "../database/db";
import bcrypt from "bcryptjs";


class User {
    /**
     *
     * @param {object} data
     * @returns {object} the user
     */
    async signUp(data) {
        const text = `INSERT INTO
          users(id, firstname, lastname, email, password, address, isadmin)
          VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

        const password = bcrypt.hashSync(data.password, 8);

        const values = [
            uuid.v4(),
            data.firstName,
            data.lastName,
            data.email,
            password,
            data.address || "",
            false
        ];

        try {
            const result = await db.query(text, values);
            return result.rows[0];
        } catch (err) {
            return error;
        }
    }

    /**
     *
     * @params {object} data
     * @returns {object} the logged in user object
     */
    async login(data) {
        const user = await this.isExistingUser(data.email);
        if (user) {
            const isValidPass = bcrypt.compareSync(data.password, user.password);
            if (isValidPass) {
                return user;
            }
            return;
        }
    }

    /**
     *
     * @param {email} user email
     * @returns {boolean} user object
     */
    async isExistingUser(email) {
        const text = `SELECT * FROM users WHERE email = $1`;
        const values = [email];
        try {
            const result = await db.query(text, values);
            if (result) {
                return result.rows[0];
            }
            return;
        } catch (err) {
            return err;
        }
    }
}

export default new User();