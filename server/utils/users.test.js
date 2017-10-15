const expect = require('expect');
let {Users} = require('./users');

describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mario',
            room: 'Fans'
        }, {
            id: '2',
            name: 'Nina',
            room: 'Fans2'
        },{
            id: '3',
            name: 'Morgan',
            room: 'Fans'
        }];
    });

    it('should add new User', () => {

        let users = new Users();

        let user = {
            id: '123',
            name: 'Mario',
            room: 'Fans'
        };

        let resUser = users.add(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {

        let userId = '1';
        let user = users.remove(userId);

        expect(user.id).toEqual(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {

        let userId = '99';
        let user = users.remove(userId);

        expect(user).toNotExist();
    });

    it('should find a user', () => {

        let userId = '2';
        let user = users.get(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {

        let userId = '99';
        let user = users.get(userId);

        expect(user).toNotExist();
    });


    it('should get the list of users', () => {
        let userList = users.getList('Fans2');
        expect(userList).toEqual('Nina');
    });
});