const blacklist = ['firstname', 'lastname', 'email', 'phone'];
const phoneRegex = /^\d{10}$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const info = (key, value) => {
    console.info(JSON.stringify(filter(key, value)));
};

const error = (key, value) => {
    console.error(JSON.stringify(filter(key, value)));
};

const filter = (key, value) => {
    if(blacklist.includes(key) || phoneRegex.test(value) || emailRegex.test(value)) {
        return {key: key, value: '<removed>'};
    }
    return { key, value: value ? value.toString() : value };
}

module.exports = {
    info, error
}
