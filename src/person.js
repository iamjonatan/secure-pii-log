module.exports = class Person {

    constructor(id, firstname, lastname, email, phone, address) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

    toString() {
        return this.id + '';
    }
}
