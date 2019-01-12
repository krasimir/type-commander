# Type-commander - a programmable typing animation tool  <!-- omit in toc -->

I've made this as an alternative of [Typed.js](https://mattboldt.com/demos/typed-js/). I also tried couple of other ones but they also didn't meet my needs. This library is quite small and it does the same typing animation. Except that it offers full control on where the cursor is, how many characters are added or deleted and what is the delay between the different operations.

![preview](./preview.gif)

[Demo https://poet.codes/e/QMX5eZWJ1S7](https://poet.codes/e/QMX5eZWJ1S7#code.js)

*Pros*

* Full control on what and where is typed.
* Speed control
* Looping
* 3.5KB
* Dependency-free

*Cons*

* No styling
* No multi-line text

---

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [`TypeCommander(<selector>, <initial text>)`](#typecommanderselector-initial-text)
  - [`.delay(<time>)`](#delaytime)
  - [`.add(<text>, <speed>)`](#addtext-speed)
  - [`.del(<num of chars>, <speed>)`](#delnum-of-chars-speed)
  - [`.moveTo(<position>)`](#movetoposition)
  - [`.loop()`](#loop)
  - [`.go()`](#go)

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
const tc = TypeCommander('#content');

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

The result is the gif above.

## API

### `TypeCommander(<selector>, <initial text>)`

|               | type          | description  |
| ------------- |:-------------:| -----|
| selector      | `<string>`    | Valid DOM selector. |
| initial text  | `<string>`    | (optional) The initial text of the field. |
| returns       | `<object>`    | Type commander instance. |

### `.delay(<time>)`

|               | type          | description  |
| ------------- |:-------------:| -----|
| time      | `<number>`    | A time in milliseconds to delay before the next action. |
| initial text  | `<string>`    | (optional) the initial text of the field |
| returns       | `<object>`    | Type commander instance |

### `.add(<text>, <speed>)`

|               | type          | description  |
| ------------- |:-------------:| -----|
| text      | `<string>`    | The text to be added at the current position of the cursor. |
| speed  | `<number>`    | Time in milliseconds. The speed of typing. |
| returns       | `<object>`    | Type commander instance |

### `.del(<num of chars>, <speed>)`

|               | type          | description  |
| ------------- |:-------------:| -----|
| num of chars      | `<number>`    | The number of characters to be removed. |
| speed  | `<number>`    | Time in milliseconds. The speed of deleting. |
| returns       | `<object>`    | Type commander instance |

### `.moveTo(<position>)`

|               | type          | description  |
| ------------- |:-------------:| -----|
| position      | `<number>`    | A position in the text where the cursor will be moved to. |
| returns       | `<object>`    | Type commander instance |

### `.loop()`

It makes the animation looping.

|               | type          | description  |
| ------------- |:-------------:| -----|
| returns       | `<object>`    | Type commander instance |

### `.go()`

Runs the animation.

|               | type          | description  |
| ------------- |:-------------:| -----|
| returns       | `<object>`    | Type commander instance |