// using employee constructor
const Employee = require('../lib/Employee')

//create employee object
test('creates an employee object', () => {
    const employee = new Employee('Jared', 31, 'saldatepride@gmail.com')

    expect(employee.name).toEqual(expect.any(String));
    
});

