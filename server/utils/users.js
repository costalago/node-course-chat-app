class Users {
    constructor () {
        this.users = [];
    }

    add(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    remove(id) {

        let user = this.get(id);
        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user
    }

    get(id){
        return this.users.filter((user) => user.id === id)[0];
    }

    getList(room) {
        let usersByRoom = this.users.filter((user) => user.room === room);
        let names = usersByRoom.map((user) => user.name);

        return names;
    }
}

module.exports = {Users};





// [{
//     id:
//     name:
//     room:
// }]


// let users = [];
//
// let addUser = (id, name, room) => {
//     users.push({
//
//     });
// };
//
// module.exports = {addUser};


// class Person {
//     constructor(name, age) {
//         console.log(name, age);
//         this.name = name;
//         this.age = age;
//     }
//
//     getUserDescription () {
//         return `${this.name} is ${this.age} years old`
//     }
// }
//
// let me = new Person('Mario', 38);
// console.log('this.name', me.name);
// console.log('this.age', me.age);
// console.log('this.getUserDescription', me.getUserDescription());
//
// let you = new Person('Nina', 37);
// console.log('this.name', you.name);
// console.log('this.age', you.age);
// console.log('this.getUserDescription', you.getUserDescription());
