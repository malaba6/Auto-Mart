import User from '../model/users';
import Validator from '../validation/validation';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const secret = process.env.JWT_SECRET;

const UserController = {
    /**
     *
     * Status code to return
     */
    status: 200,

    /**
     *
     * @param {object} data
     * @returns {object} user object and status code
     */
    async signup(data) {
        if ((data.firstName === undefined && data.firstName !== '') ||
            (data.lastName === undefined && data.lastName !== '') ||
            (data.email === undefined && data.email !== '') ||
            (data.password === undefined && data.password !== '')) {
            this.status = 400;
            return {
                status: this.status,
                error: 'firstName, lastName, email and password are required',
            };
        }
        if (Validator.isValidName(data.firstName) !== 'valid') {
            this.status = 422;
            return {
                status: this.status,
                error: Validator.isValidName(data.firstName),
            };
        }
        if (Validator.isValidName(data.lastName) !== 'valid') {
            this.status = 422;
            return {
                status: this.status,
                error: Validator.isValidName(data.lastName),
            };
        }
        if (Validator.isValidEmail(data.email) !== 'valid') {
            this.status = 422;
            return {
                status: this.status,
                error: Validator.isValidEmail(data.email),
            };
        }
        if (Validator.isValidPassword(data.password) !== 'valid') {
            this.status = 422;
            return {
                status: this.status,
                error: Validator.isValidPassword(data.password),
            };
        }
        if (data.address) {
            if (Validator.isValidAddress(data.address) !== 'valid') {
                this.status = 422;
                return {
                    status: this.status,
                    error: Validator.isValidAddress(data.address),
                };
            }
        }
        const user = await User.isExistingUser(data.email);
        if (user) {
            this.status = 409;
            return {
                status: 409,
                error: `Email ${data.email} already taken`,
            };
        }

        const signup = await User.signUp(data);

        const dataToken = {
            id: signup.id,
            firstName: signup.firstname,
            lastName: signup.lastname,
            email: signup.email,
            isAdmin: signup.isadmin,
        };

        const token = jwt.sign(dataToken, secret, {
            expiresIn: '24h', //expires in 24 Hrs
        })

        this.status = 201;
        const { id, firstname, lastname, email } = signup;
        return {
            status: this.status,
            data: {
                token: token,
                id: id,
                firstName: firstname,
                lastName: lastname,
                email: email
            }
        };
    },

    /**
     *
     * @param {data} object
     * @returns {object} user object
     */
    async login(data) {
        if ((data.email === undefined && data.email !== '') ||
            (data.password === undefined && data.password !== '')) {
            this.status = 400;
            return {
                status: this.status,
                error: 'email and password are required',
            };
        }
        if (Validator.isValidEmail(data.email) !== 'valid') {
            this.status = 422;
            return {
                status: this.status,
                error: Validator.isValidEmail(data.email),
            };
        }
        if (Validator.isValidPassword(data.password) !== 'valid') {
            this.status = 422;
            return {
                status: this.status,
                error: Validator.isValidPassword(data.password),
            };
        }

        const user = await User.login(data);
        if (!user) {
            this.status = 401;
            return {
                status: this.status,
                error: 'Email or password Incorrect'
            };
        }
        this.status = 200;

        const dataToken = {
            id: user.id,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            isAdmin: user.isadmin,
        };

        const token = jwt.sign(dataToken, secret, {
            expiresIn: '24h', //expires in 24 Hrs
        })

        const { id, firstname, lastname, email } = user;
        return {
            status: this.status,
            data: {
                token: token,
                id: id,
                firstName: firstname,
                lastName: lastname,
                email: email
            }
        };
    }

};

export default UserController;