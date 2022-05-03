import { assert } from 'chai'
import _ from '..'


describe('array module', () => {

  describe('group function', () => {
    test('groups by provided attribute', () => {
      const list = [
        { group: 'a', word: 'hello' },
        { group: 'b', word: 'bye' },
        { group: 'a', word: 'oh' },
        { group: 'b', word: 'hey' },
        { group: 'c', word: 'ok' }
      ]
      const groups = _.group(list, x => x.group)
      assert.equal(groups.a.length, 2)
      assert.equal(groups.b.length, 2)
      assert.equal(groups.c.length, 1)
      assert.equal(groups.c[0].word, 'ok')
    })
  })

  describe('boil function', () => {
    test('compares and keeps item based on condition', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 }
      ]
      const result = _.boil(list, (a, b) => a.score > b.score ? a : b)
      assert.equal(result.game, 'e')
      assert.equal(result.score, 500)
    })
    test('does not fail when provided array is empty', () => {
      const result = _.boil([], () => true)
      assert.isNull(result)
    })
    test('does not fail when provided array is null', () => {
      const result = _.boil(null, () => true)
      assert.isNull(result)
    })
    test('does not fail when provided array is funky shaped', () => {
      const result = _.boil({} as any, () => true)
      assert.isNull(result)
    })
  })

  describe('sum function', () => {
    test('adds list of number correctly', () => {
      const list = [5, 5, 10, 2]
      const result = _.sum(list)
      assert.equal(result, 22)
    })
    test('adds list of objects correctly using getter fn', () => {
      const list = [
        { value: 5 }, 
        { value: 5 }, 
        { value: 10 }, 
        { value: 2 }
      ]
      const result = _.sum(list, x => x.value)
      assert.equal(result, 22)
    })
    test('gracefully handles null input list', () => {
      const result = _.sum(null)
      assert.equal(result, 0)
    })
  })

  describe('first function', () => {
    test('returns first item in list', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.first(list)
      assert.equal(result.game, 'a')
      assert.equal(result.score, 100)
    })
    test('returns default value without error when list is empty', () => {
      const list = [] as string[]
      const result = _.first(list, 'yolo')
      assert.equal(result, 'yolo')
    })
    test('gracefully handles null input list', () => {
      const result = _.first(null)
      assert.equal(result, null)
    })
  })

  describe('last function', () => {
    test('returns last item in list', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.last(list)
      assert.equal(result.game, 'b')
      assert.equal(result.score, 200)
    })
    test('returns default value without error when list is empty', () => {
      const list = [] as string[]
      const result = _.last(list, 'yolo')
      assert.equal(result, 'yolo')
    })
    test('gracefully handles null input list', () => {
      const result = _.last(null)
      assert.equal(result, null)
    })
  })

  describe('sort function', () => {
    test('uses getter', () => {
      const list = [
        { index: 2 }, 
        { index: 0 }, 
        { index: 1 }
      ]
      const result = _.sort(list, i => i.index)
      assert.equal(result[0].index, 0)
      assert.equal(result[1].index, 1)
      assert.equal(result[2].index, 2)

    })
    test('uses descending order', () => {
      const list = [
        { index: 2 }, 
        { index: 0 }, 
        { index: 1 }
      ]
      const result = _.sort(list, i => i.index, true)
      assert.equal(result[0].index, 2)
      assert.equal(result[1].index, 1)
      assert.equal(result[2].index, 0)
    })
    test('gracefully handles null input list', () => {
      const result = _.sort(null as any as number[], x => x)
      assert.deepEqual(result, [])
    })
  })

  describe('remove function', () => {
    test('returns empty list for null input list', () => {
      const result = _.remove(null, () => false)
      assert.deepEqual(result, [])
    })
    test('returns the list with the item removed', () => {
      const result = _.remove(['a', 'b', 'c'], (item) => item === 'b')
      assert.deepEqual(result, ['a', 'c'])
    })
    test('returns the list unchanged for no match', () => {
      const result = _.remove(['a', 'b', 'c'], (item) => item === 'xx')
      assert.deepEqual(result, ['a', 'b', 'c'])
    })
  })

  describe('replace function', () => {
    test('returns empty list for null input list', () => {
      const result = _.replace(null, 'x', () => false)
      assert.deepEqual(result, [])
    })
    test('returns the list for a null new item', () => {
      const result = _.replace(['a'], null, () => false)
      assert.deepEqual(result, ['a'])
    })
    test('returns copy of list with replaced item', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.replace(list, { game: 'x', score: 800 }, (item) => item.game === 'a')
      assert.equal(result[0].game, 'x')
      assert.equal(list[1].game, 'b')
    })
    test('returns copy of list without changing', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.replace(list, { game: 'x', score: 800 }, (item) => item.game === 'XX')
      assert.equal(result[0].game, 'a')
      assert.equal(list[1].game, 'b')
    })
  })

  describe('dict function', () => {
    test('returns correct map of values', () => {
      const list = [
        { id: 'a', word: 'hello' },
        { id: 'b', word: 'bye' },
        { id: 'c', word: 'oh' },
        { id: 'd', word: 'hey' },
        { id: 'e', word: 'ok' }
      ]
      const result = _.dict(list, x => x.id, x => x)
      assert.equal(result.a.word, 'hello')
      assert.equal(result.b.word, 'bye')
    })
    test('does not fail on empty input list', () => {
      const list = []
      const result = _.dict(list, x => x.id, x => x)
      assert.deepEqual(result, {})
    })
  })

  describe('select function', () => {
    test('returns mapped and filtered values', () => {
      const list = [
        { group: 'a', word: 'hello' },
        { group: 'b', word: 'bye' },
        { group: 'a', word: 'oh' },
        { group: 'b', word: 'hey' },
        { group: 'c', word: 'ok' }
      ]
      const result = _.select(list, x => x.word, x => x.group === 'a')
      assert.deepEqual(result, ['hello', 'oh'])
    })
    test('does not fail on empty input list', () => {
      const list = []
      const result = _.select(list, x => x.word, x => x.group === 'a')
      assert.deepEqual(result, [])
    })
  })

  describe('max function', () => {
    test('returns the max value from list of number', () => {
      const list = [5, 5, 10, 2]
      const result = _.max(list)
      assert.equal(result, 10)
    })
    test('returns the max value from list of objects', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 }
      ]
      const result = _.max(list, x => x.score)
      assert.equal(result.game, 'e')
      assert.equal(result.score, 500)
    })
  })

  describe('min function', () => {
    test('returns the min value from list of number', () => {
      const list = [5, 5, 10, 2]
      const result = _.min(list)
      assert.equal(result, 2)
    })
    test('returns the min value from list of objects', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 }
      ]
      const result = _.min(list, x => x.score)
      assert.equal(result.game, 'a')
      assert.equal(result.score, 100)
    })
  })

  describe('cluster function', () => {
    test('returns an array of arrays', () => {
      const list = [1,1,   1,1,   1,1,   1,1]
      const result = _.cluster(list)
      const [a, b, c] = result
      assert.deepEqual(a, [1, 1])
      assert.deepEqual(b, [1, 1])
      assert.deepEqual(c, [1, 1])
    })
    test('returns remainder in final cluster', () => {
      const list = [1, 1, 1,    1, 1, 1,    1, 1, 1,    2, 2]
      const result = _.cluster(list, 3)
      const [a, b, c, d] = result
      assert.deepEqual(a, [1, 1, 1])
      assert.deepEqual(b, [1, 1, 1])
      assert.deepEqual(c, [1, 1, 1])
      assert.deepEqual(d, [2, 2])
    })
  })

  describe('unique function', () => {
    test('correctly removed duplicate items', () => {
      const list = [1, 1, 2]
      const result = _.unique(list)
      assert.deepEqual(result, [1, 2])
    })
    test('uses key fn to correctly remove duplicate items', () => {
      const list = [
        { id: 'a', word: 'hello' },
        { id: 'a', word: 'hello' },
        { id: 'b', word: 'oh' },
        { id: 'b', word: 'oh' },
        { id: 'c', word: 'yolo' }
      ]
      const result = _.unique(list, x => x.id)
      const [a, b, c] = result
      assert.equal(a.id, 'a')
      assert.equal(a.word, 'hello')
      assert.equal(b.id, 'b')
      assert.equal(b.word, 'oh')
      assert.equal(c.id, 'c')
      assert.equal(c.word, 'yolo')
    })
  })

  describe('shuffle function', () => {
    test('returns list with same number of items', () => {
      const list = [1, 2, 3, 4, 5]
      const result = _.shuffle(list)
      assert.equal(list.length, result.length)
    })
    test('returns list with same value', () => {
      const list = [1, 2, 3, 4, 5]
      const totalBefore = _.sum(list)
      const result = _.shuffle(list)
      const totalAfter = _.sum(result)
      assert.equal(totalBefore, totalAfter)
    })
    test('returns copy of list without mutatuing input', () => {
      const list = [1, 2, 3, 4, 5]
      const result = _.shuffle(list)
      assert.notEqual(list, result)
      assert.deepEqual(list, [1, 2, 3, 4, 5])
    })
  })

  describe('draw function', () => {
    test('returns a string from the list', () => {
      const letters = 'abcde'
      const result = _.draw(letters.split(''))
      assert.include(letters, result)
    })
    test('returns a item from the list', () => {
      const list = [
        { id: 'a', word: 'hello' },
        { id: 'b', word: 'oh' },
        { id: 'c', word: 'yolo' }
      ]
      const result = _.draw(list)
      assert.include('abc', result.id)
    })
    test('returns null given empty input', () => {
      const list = []
      const result = _.draw(list)
      assert.isNull(result)
    })
  })

  describe('range function', () => {
    test('creates correct list', () => {
      const r = _.range(0, 4)
      const total = [...r].reduce((a, b) => a + b)
      assert.equal(total, 10)
      assert.equal(r[0], 0)
      assert.equal(r[4], 4)
    })
    test('creates correct list with step', () => {
      const r = _.range(0, 10, 2)
      const total = [...r].reduce((a, b) => a + b)
      assert.equal(total, 30)
      assert.equal(r[0], 0)
      assert.equal(r[4], 8)
      assert.equal(r[5], 10)
    })
  })

  describe('flat function', () => {
    test('returns all items in all arrays', () => {
      const lists = [['a', 'b'], ['c', 'd'], ['e']]
      const result = _.flat(lists)
      assert.deepEqual(result, ['a', 'b', 'c', 'd', 'e'])
      assert.equal(result[0], 'a')
      assert.equal(result[4], 'e')
    })
  })

  describe('intersects function', () => {
    test('returns true if list a & b have items in common', () => {
      const listA = ['a', 'b']
      const listB = [1, 2, 'b', 'x']
      const result = _.intersects(listA, listB)
      assert.isTrue(result)
    })
    test('returns false if list a & b have no items in common', () => {
      const listA = ['a', 'b', 'c']
      const listB = ['x', 'y']
      const result = _.intersects(listA, listB)
      assert.isFalse(result)
    })
    test('returns false without failing if either list is null', () => {
      assert.isFalse(_.intersects(null, []))
      assert.isFalse(_.intersects([], null))
    })
  })

  describe('fork function', () => {
    test('returns two empty arrays for null input', () => {
      const [a, b] = _.fork(null, x => !!x)
      assert.deepEqual(a, [])
      assert.deepEqual(b, [])
    })
    test('returns two empty arrays for one empty array input', () => {
      const [a, b] = _.fork([], x => !!x)
      assert.deepEqual(a, [])
      assert.deepEqual(b, [])
    })
    test('returns correctly forked list', () => {
      const input = [
        { name: 'ray', group: 'X' },
        { name: 'sara', group: 'X' },
        { name: 'bo', group: 'Y' },
        { name: 'mary', group: 'Y' },
      ]
      const [xs, ys] = _.fork(input, x => x.group === 'X')
      assert.lengthOf(xs, 2)
      assert.lengthOf(ys, 2)
      const [r, s] = xs
      assert.equal(r.name, 'ray')
      assert.equal(s.name, 'sara')
      const [b, m] = ys
      assert.equal(b.name, 'bo')
      assert.equal(m.name, 'mary')
    })
  })
  
  describe('zip function', () => {
    test('returns empty array for two null inputs', () => {
      const result = _.zip(null, null, x => '')
      assert.deepEqual(result, [])
    })
    test('returns an empty array for two empty array inputs', () => {
      const result = _.zip([], [], x => '')
      assert.deepEqual(result, [])
    })
    test('returns root for a null other input', () => {
      const result = _.zip([], null, x => '')
      assert.deepEqual(result, [])
    })
    test('returns empty array for a null root input', () => {
      const result = _.zip(null, [], x => '')
      assert.deepEqual(result, [])
    })
    test('returns root for a null matcher input', () => {
      const result = _.zip(['a'], [], null)
      assert.deepEqual(result, ['a'])
    })
    test('returns correctly zipped lists', () => {
      const inputA = [
        { name: 'ray', group: 'X' },
        { name: 'sara', group: 'X' },
        { name: 'bo', group: 'Y' },
        { name: 'mary', group: 'Y' },
      ]
      const inputB = [
        { name: 'ray', group: 'XXX'},
        { name: 'mary', group: 'YYY'},
      ]
      const result = _.zip(inputA, inputB, x => x.name)
      assert.equal(result[0].group, 'XXX')
      assert.equal(result[1].group, 'X')
      assert.equal(result[2].group, 'Y')
      assert.equal(result[3].group, 'YYY')
    })
  })

  describe('replaceOrAppend', () => {
    const letters = ['a', 'b', 'c', 'd', 'e']
    const lettersXA = ['XA', 'b', 'c', 'd', 'e']
    const lettersXC = ['a', 'b', 'XC', 'd', 'e']
    const lettersXE = ['a', 'b', 'c', 'd', 'XE']
    const lettersXX = ['a', 'b', 'c', 'd', 'e', 'XX']
    test('returns empty empty array for two null inputs', () => {
      const result = _.replaceOrAppend(null, null, (x) => false)
      assert.deepEqual(result, [])
    })
    test('returns array with new item for null list input', () => {
      const result = _.replaceOrAppend(null, 'a', (x) => false)
      assert.deepEqual(result, ['a'])
    })
    test('returns list for null new item input', () => {
      const result = _.replaceOrAppend(['a'], null, (x) => false)
      assert.deepEqual(result, ['a'])
    })
    test('returns list with item replacing match', () => {
      const result = _.replaceOrAppend(letters, 'XA', (x) => x === 'a')
      assert.deepEqual(result, lettersXA)
    })
    test('returns list with item replacing match in middle', () => {
      const result = _.replaceOrAppend(letters, 'XC', (x) => x === 'c')
      assert.deepEqual(result, lettersXC)
    })
    test('returns list with item replacing match at end', () => {
      const result = _.replaceOrAppend(letters, 'XE', (x) => x === 'e')
      assert.deepEqual(result, lettersXE)
    })
    test('returns list with item appended', () => {
      const result = _.replaceOrAppend(letters, 'XX', (x) => x === 'x')
      assert.deepEqual(result, lettersXX)
    })
  })

})