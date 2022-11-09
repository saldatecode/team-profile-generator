const Employee = require('../lib/Employee')

test('testing Employee', ()=>{
    let e = new Employee('Jared', 34, 'saldatepride@gmail.com')
    expect(e.getRoll()).toBe('Employee')
})