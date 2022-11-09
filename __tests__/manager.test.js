const Manager = require('../lib/Manager')

test('testing Manager', ()=>{
    let e = new Manager('Jared', 34, 'saldatepride@gmail.com')
    expect(e.getEmail()).toBe('saldatepride@gmail.com')
})