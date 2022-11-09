const Engineer = require('../lib/Engineer')

test('testing Engineer', ()=>{
    let e = new Engineer('Jared', 34, 'saldatepride@gmail.com')
    expect(e.getName()).toBe('Jared')
})