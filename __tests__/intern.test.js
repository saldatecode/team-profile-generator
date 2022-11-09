const Intern = require('../lib/Intern')

test('testing Intern', ()=>{
    let e = new Intern('Jared', 34, 'saldatepride@gmail.com')
    expect(e.getId()).toBe(34)
})