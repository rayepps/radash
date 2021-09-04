import chai from 'chai'

import * as str from '../string'

const { assert } = chai


test('template replaces all occurrences', () => {

  const tmp = `
    Hello my name is {{name}}. I am a {{type}}.
    Not sure why I am {{reason}}.

    Thank You - {{name}}
  `

  const data = {
    name: 'Ray',
    type: 'template',
    reason: 'so beautiful'
  }

  const result = str.template(tmp, data)
  const expected = `
    Hello my name is ${data.name}. I am a ${data.type}.
    Not sure why I am ${data.reason}.

    Thank You - ${data.name}
  `

  assert.equal(result, expected)

})
