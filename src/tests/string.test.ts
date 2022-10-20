import {assert} from 'chai'
import * as _ from '..'
import { camel, snake, dash, pascal } from '../string'

describe('string module', () => {

  describe('camel function', () => {
    test('camal alias is available', () => {
      // NOTE: Remove in next major version
      assert.isFunction(_.camal)
    })
    test('returns correctly cased string', () => {
      const result = camel(
        'hello world'
      )
      assert.equal(result, 'helloWorld')
    })
    test('returns single word', () => {
      const result = camel(
        'hello'
      )
      assert.equal(result, 'hello')
    })
    test('returns empty string for empty input', () => {
      const result = camel(null as any)
      assert.equal(result, '')
    })
  })

  describe('camelCase function', () => {
    test('returns non alphanumerics with -space and capital', () => {
      const result = _.camel('Exobase Starter_flash AND-go')
      assert.equal(result, 'exobaseStarterFlashAndGo')
    })
  })

  describe('snake function', () => {
    test('returns correctly cased string', () => {
      const result = snake(
        'hello world'
      )
      assert.equal(result, 'hello_world')
    })
    test('must handle strings that are camelCase', () => {
      const result = snake(
        'helloWorld'
      )
      assert.equal(result, 'hello_world')
    })
    test('must handle strings that are dash', () => {
      const result = snake(
        'hello-world'
      )
      assert.equal(result, 'hello_world')
    })
    test('returns single word', () => {
      const result = snake(
        'hello'
      )
      assert.equal(result, 'hello')
    })
    test('returns empty string for empty input', () => {
      const result = snake(null as any)
      assert.equal(result, '')
    })
  })

  describe('snakeCase function', () => {
    test('returns non alphanumerics with _', () => {
      const result = _.snake('Exobase Starter_flash AND-go')
      assert.equal(result, 'exobase_starter_flash_and_go')
    })
  })

  describe('dash function', () => {
    test('returns correctly cased string', () => {
      const result = dash(
        'hello world'
      )
      assert.equal(result, 'hello-world')
    })
    test('returns single word', () => {
      const result = dash(
        'hello'
      )
      assert.equal(result, 'hello')
    })
    test('returns empty string for empty input', () => {
      const result = dash(null as any)
      assert.equal(result, '')
    })
    test('must handle strings that are camelCase', () => {
      const result = dash(
        'helloWorld'
      )
      assert.equal(result, 'hello-world')
    })
    test('must handle strings that are dash', () => {
      const result = dash(
        'hello-world'
      )
      assert.equal(result, 'hello-world')
    })
  })

  describe('dashCase function', () => {
    test('returns non alphanumerics with -', () => {
      const result = _.dash('Exobase Starter_flash AND-go')
      assert.equal(result, 'exobase-starter-flash-and-go')
    })
  })

  describe('template function', () => {
    test('replaces all occurrences', () => {

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

      const result = _.template(tmp, data)
      const expected = `
    Hello my name is ${data.name}. I am a ${data.type}.
    Not sure why I am ${data.reason}.

    Thank You - ${data.name}
  `

      assert.equal(result, expected)
    })

    test('replaces all occurrences given template', () => {

      const tmp = `Hello <name>.`
      const data = {
        name: 'Ray'
      }

      const result = _.template(tmp, data, /<(.+?)>/g)
      assert.equal(result, `Hello ${data.name}.`)
    })
  })

  describe('capitalize function', () => {
    test('handles null', () => {
      const result = _.capitalize(null as any)
      assert.equal(result, '')
    })
    test('converts hello as Hello', () => {
      const result = _.capitalize('hello')
      assert.equal(result, 'Hello')
    })
    test('converts hello Bob as Hello bob', () => {
      const result = _.capitalize('hello Bob')
      assert.equal(result, 'Hello bob')
    })
  })

  describe('PascalCase function', () => {
    test('returns non alphanumerics in PascalCase', () => {
      const result = _.pascal('Exobase Starter_flash AND-go')
      assert.equal(result, 'ExobaseStarterFlashAndGo')
    })
    test('returns single word', () => {
      const result = pascal(
        'hello'
      )
      assert.equal(result, 'Hello')
    })
    test('returns empty string for empty input', () => {
      const result = pascal(null as any)
      assert.equal(result, '')
    })
  })
})