# Type-commander - a programmable typing animation tool

I've made this as an alternative of [Typed.js](https://mattboldt.com/demos/typed-js/). I also tried couple of other ones but they also didn't meet my needs. This library is quite small and it does the same typing animation. Except that it offers full control on where the cursor is, how many characters are added or deleted and what is the delay between the different operations.

*Features*

* Full control on what and where is typed.
* Speed control
* Looping
* 3.5KB

*Drawbacks*

* No styling
* No multi-line text

## Installation

```
npm install type-commander
```

or directly use

[https://unpkg.com/type-commander](https://unpkg.com/type-commander)

## Usage

```html
<div id="content"></div>
```

```js
const tc = new TypeCommander('#content');

tc
  .delay(3000)
  .add('Hello world!').delay(2000)
  .moveTo(5).delay(500)
  .del('all').delay(300)
  .add('Bye bye').delay(2000)
  .del(4).delay(1000)
  .moveTo().delay(3000)
  .loop()
  .go();
```
