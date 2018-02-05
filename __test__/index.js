const assert = require('assert')
const Cow = require('../src')

/* flat rule works */
;(function test1() {
  const expected = {
    value: 100,
    rules: [{
      category: 'flat',
      condition: {
        perCount: 50,
        perDiscount: 1,
        maxDiscount: 10,
      }
    }],
    cost: 98,
  }
  const c = new Cow(100, {
    category: 'flat',
    condition: {
      perCount: 50,
      perDiscount: 1,
      maxDiscount: 10,
    }
  })
  const actual = {
    value: c.getValue(),
    rules: c.getRules(),
    cost: c.cost(),
  }
  assert.deepEqual(actual, expected)
}())

/* flat rule reach maxDiscount */
;(function test2() {
  const expected = {
    value: 100,
    rules: [{
      category: 'flat',
      condition: {
        perCount: 50,
        perDiscount: 1,
        maxDiscount: 1,
      }
    }],
    cost: 99,
  }
  const c = new Cow(100, {
    category: 'flat',
    condition: {
      perCount: 50,
      perDiscount: 1,
      maxDiscount: 1,
    }
  })
  const actual = {
    value: c.getValue(),
    rules: c.getRules(),
    cost: c.cost(),
  }
  assert.deepEqual(actual, expected)
}())

/* percentage rule */
;(function test3() {
  const expected = {
    value: 100,
    rules: [{
      category: 'percentage',
      condition: {
        perCount: 80,
        perDiscount: 88,
        maxDiscount: 100,
      }
    }],
    cost: 88,
  }
  const c = new Cow(100, {
    category: 'percentage',
    condition: {
      perCount: 80,
      perDiscount: 88,
      maxDiscount: 100,
    }
  })
  const actual = {
    value: c.getValue(),
    rules: c.getRules(),
    cost: c.cost(),
  }
  assert.deepEqual(actual, expected)
}())

/* percentage rule reach maxDiscount */
;(function test4() {
  const expected = {
    value: 100,
    rules: [{
      category: 'percentage',
      condition: {
        perCount: 80,
        perDiscount: 88,
        maxDiscount: 10,
      }
    }],
    cost: 90,
  }
  const c = new Cow(100, {
    category: 'percentage',
    condition: {
      perCount: 80,
      perDiscount: 88,
      maxDiscount: 10,
    }
  })
  const actual = {
    value: c.getValue(),
    rules: c.getRules(),
    cost: c.cost(),
  }
  assert.deepEqual(actual, expected)
}())

/* compose rules */
;(function test5() {
  const expected1 = {
    value: 100,
    rules: [{
      category: 'flat',
      condition: {
        perCount: 50,
        perDiscount: 5,
        maxDiscount: 8,
      }
    }],
    cost: 92,
  }
  const c = new Cow()
  c.setValue(100)
  c.setRule({
    category: 'flat',
    condition: {
      perCount: 50,
      perDiscount: 5,
      maxDiscount: 8,
    }
  })
  const actual1 = {
    value: c.getValue(),
    rules: c.getRules(),
    cost: c.cost(),
  }
  assert.deepEqual(actual1, expected1)

  const expected2 = {
    value: 100,
    rules: [{
      category: 'flat',
      condition: {
        perCount: 50,
        perDiscount: 5,
        maxDiscount: 8,
      }
    }, {
      category: 'flat',
      condition: {
        perCount: 50,
        perDiscount: 5,
        maxDiscount: 3,
      }
    }],
    cost: 89,
  }
  c.addRule({
    category: 'flat',
    condition: {
      perCount: 50,
      perDiscount: 5,
      maxDiscount: 3,
    }
  })
  const actual2 = {
    value: c.getValue(),
    rules: c.getRules(),
    cost: c.cost(),
  }
  assert.deepEqual(actual2, expected2)

  const expected3 = {
    value: 100,
    rules: [{
      category: 'percentage',
      condition: {
        perCount: 100,
        perDiscount: 78,
        maxDiscount: 100,
      }
    }],
    cost: 78,
  }
  c.setRule([{
    category: 'percentage',
    condition: {
      perCount: 100,
      perDiscount: 78,
      maxDiscount: 100,
    }
  }])
  const actual3 = {
    value: c.getValue(),
    rules: c.getRules(),
    cost: c.cost(),
  }
  assert.deepEqual(actual3, expected3)
}())

console.info('=== test successfully ===')