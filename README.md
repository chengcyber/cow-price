# Cow Price

> a elegant way to calculation product price according to some discount rules

# Install

```
npm install cow-price
```

# Usage

```javascript
import Cow from 'cow-price'

const originalPrice = 200
const discountRule = {
  category: 'percentage',
  condition: {
    perCount: 100,
    perDiscount: 90,
    maxDiscount: 10,
  },
}

const c = new Cow(originalPrice, discountRule)
const actualPrice = c.cost()

console.log(actualPrice) // 190
```

# Discount Rules

for now, two kinds of discount rule are supported

1. 'flat': every `perCount` of the original price has a `perDiscount`, the max discount amount is `maxDiscount`

```javascript
{
  category: 'flat',
  condition: {
    perCount: 100,
    perDiscount: 10,
    maxDiscount: 15,
  },
}
```

2. 'percentage': original price has a percentage `perDiscount` discount when price is over the `perCount`, the max discount amount is `maxDiscount`

```javascript
{
  category: 'percentage',
  condition: {
    perCount: 100,
    perDiscount: 90,
    maxDiscount: 100,
  },
}
```

# Dev in local

```
git clone git@github.com:kimochg/cow-price.git
cd cow-price
npm install
npm run watch
```

# Test

```
npm run test
```

# LICENSE

MIT © [Cheng Liu](https://github.com/kimochg)
