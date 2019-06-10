import uuid from 'uuid';


class User {
  /**
     *
     * class constructor
     */
  constructor() {
    this.users = [{
      id: '7854ghtes-teyrrii',
      firstName: 'Eric',
      lastName: 'Malaba',
      address: 'Biryogo',
      email: 'eric@gmail.com',
      password: 'admin12',
      isAdmin: true,
    },
    {
      id: '7854ghtes-teyrrie',
      firstName: 'Rick',
      lastName: 'Oburu',
      address: 'Kampala',
      email: 'rick@gmail.com',
      password: 'rick123',
      isAdmin: false,
    },
    ];
  }

  /**
     *
     * @param {object} data
     * @returns {object} the user
     */
  signUp(data) {
    const newUser = {
      id: uuid.v4(),
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address || '',
      email: data.email,
      password: data.password,
      isAdmin: false,
    };
    this.users.push(newUser);

    return newUser;
  }

  /**
     *
     * @params {object} data
     * @returns {object} the logged in user object
     */
  login(data) {
    return this.users.find(user => user.email === data.email && user.password === data.password);
  }

  /**
     *
     * @param {email} user email
     * @returns {boolean} user object
     */
  isExistingUser(email) {
    return this.users.find(user => user.email === email);
  }
}

export default new User();
