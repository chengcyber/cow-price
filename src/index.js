class Cow {

  constructor(orgPrice, rules) {
    this.op = parseFloat(orgPrice, 10)
    if (!rules) {
      this.rules = []
    } else if (Array.isArray(rules)) {
      this.rules = rules
    } else {
      this.rules = [rules]
    }
  }

  setValue(price) {
    this.op = parseFloat(price, 10)
  }

  getValue() {
    return this.op
  }

  addRule(rule) {
    this.rules.push(rule)
  }

  getRules() {
    return this.rules
  }

  setRule(rules) {
    if (Array.isArray(rules)) {
      this.rules = rules
    } else {
      this.rules = [rules]
    }
  }

  cost() {
    this.finalPrice = this.rules.reduce(
      (acc, rule) =>
        Cow.calculate(acc, rule)
    , this.op)
    return this.finalPrice
  }

  static calculate(price, rule) {
    const {
      condition: {
        perCount,
        perDiscount,
        maxDiscount,
      },
    } = rule
    switch(rule.category) {
      case 'flat':
        const flatDiscount = ~~(price / perCount) * perDiscount
        if (flatDiscount > maxDiscount) {
          return Cow.guard(price - maxDiscount)
        }
        return Cow.guard(price - flatDiscount)
      case 'percentage':
        if (price < perCount) {
          return Cow.guard(price)
        }
        const percentageDiscount = price - price * perDiscount / 100
        if (percentageDiscount > maxDiscount) {
          return Cow.guard(price - maxDiscount)
        }
        return Cow.guard(price - percentageDiscount)
      default:
        return Cow.guard(price)
    }
  }

  static guard(price) {
    if (typeof price !== 'number' ||
      price < 0 ||
      price !== price) {
      return 0
    }
    return price
  }

}

Cow.default = Cow
module.exports = Cow
