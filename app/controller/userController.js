import User from '../model/users';
import Validator from '../validation/validation';


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
    signup(data) {
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
        if (User.isExistingUser(data.email)) {
            this.status = 409;
            return {
                status: 409,
                error: `Email ${data.email} already taken`,
            };
        }

        const user = User.signUp(data);
        this.status = 201;
        return {
            status: this.status,
            data: user,
        };
    },

    /**
     *
     * @param {data} object
     * @returns {object} user object
     */
    login(data) {
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

        const user = User.login(data);
        if (!user) {
            this.status = 401;
            return {
                status: this.status,
                error: 'Email or password Incorrect',
            };
        }
        this.status = 200;
        return {
            status: this.status,
            data: user,
        };
    },

};

export default UserController;