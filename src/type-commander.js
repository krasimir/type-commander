(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
      module.exports = factory();
  } else {
    root.TypeCommander = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  const css = (el, styles) => {
    el.setAttribute('style', Object.keys(styles).reduce((result, prop) => {
      result += prop + ':' + styles[prop] + ';';
      return result;
    }, ''));
  }
  const f = (func, delay) => (delay ? setTimeout(func, delay) : func());
  const clone  = obj => JSON.parse(JSON.stringify(obj));

  return function TypeCommander(selector, initialText) {
    const el = document.querySelector(selector);
    const text = document.createElement('span');
    const invisibleText = document.createElement('span');
    const cursor = document.createElement('span');
    const cursorStyles = (left = 0, height = 0) => {
      return {
        top: 0,
        left: left + 'px',
        position: 'absolute',
        display: 'block',
        width: '3px',
        height: height + 'px',
        background: '#000',
        opacity: 1,
        transition: 'opacity 200ms ease-out',
        '-webkit-transition': 'opacity 200ms ease-out'
      }
    };
    const api = {
      text: (initialText = initialText ? initialText : el.innerText),
      cPosition: 0,
      deleteSpeed: 100,
      addSpeed: 100,
      cursorBlinkingSpeed: 400
    };
    let ops = [], opsCopy, onFinish;

    const setText = newStr => {
      text.innerHTML = newStr.replace(/ /g, '&nbsp;');
      invisibleText.innerHTML = newStr === '' ? '&nbsp;' : newStr.replace(/ /g, '&nbsp;');
      api.text = newStr;
    }
    const movePosition = position => {
      position = typeof position !== 'undefined' ? position : api.text.length;
      let str = api.text.substr(0, position).replace(/ /g, '&nbsp;');
      invisibleText.innerHTML = str === '' ? '&nbsp' : str;
      api.cPosition = position;
      css(
        cursor, 
        cursorStyles(str === '' ? 0 : invisibleText.offsetWidth, invisibleText.offsetHeight)
      );
    };
    const deleteChar = (done, speed) => {
      f(() => {
        setText(api.text.slice(0, api.cPosition - 1) + api.text.slice(api.cPosition));
        movePosition(api.cPosition - 1);
        done();
      }, speed || api.deleteSpeed);
    }
    const addChar = (char, done, speed) => {
      f(() => {
        setText(api.text.substr(0, api.cPosition) + char + api.text.substr(api.cPosition));
        movePosition(api.cPosition + 1);
        done();
      }, speed || api.addSpeed);
    }
    const process = op => {
      switch(op.type) {
        case 'moveTo':
          movePosition(op.position);
          f(() => api.go(), 1);
        break;
        case 'delete':
          if (op.numChars === 'all') { op.numChars = api.text.length; }
          if (op.numChars === 0 || typeof op.numChars === 'undefined' || api.cPosition === 0) {
            api.go(); break;
          }
          deleteChar(() => {
            if (op.numChars > 0) {
              process({ type: 'delete', numChars: op.numChars - 1, speed: op.speed });
            } else {
              api.go();
            }
          }, op.speed);
        break;
        case 'add':
          if (op.str.length === 0) { api.go(); break; }
          addChar(op.str.substr(0, 1), () => {
            process({ type: 'add', str: op.str.substr(1), speed: op.speed });
          }, op.speed);
        break;
        case 'delay':
          f(() => api.go(), op.time);
        break;
      }
    }
    
    if (!el) {
      throw new Error('Can not find an element behind ' + selector + ' selector');
    }
  
    el.innerHTML = '';
    el.appendChild(text);
    el.appendChild(invisibleText);
    el.appendChild(cursor);

    css(el, { position: 'relative' });
    css(invisibleText, { position: 'absolute', top: 0, left: 0, opacity: 0, 'font-family': 'inherit' });
    css(text, { 'font-family': 'inherit' });
    setInterval(() => {
      cursor.style.opacity = cursor.style.opacity === '1' ? 0 : 1;
      cursor.style.height = invisibleText.offsetHeight;
    }, api.cursorBlinkingSpeed);
    
    setTimeout(() => {
      setText(api.text);
      movePosition(api.text.length);
    }, 1);
    
    api.delay = time => {
      ops.push({ type: 'delay', time });
      return api;
    }
    api.add = (str, speed) => {
      ops.push({ type: 'add', str, speed });
      return api;
    }
    api.moveTo = position => {
      ops.push({ type: 'moveTo', position });
      return api;
    }
    api.del = (numChars, speed) => {
      ops.push({ type: 'delete', numChars, speed });
      return api;
    }
    api.go = (onFinishCallback) => {
      if (onFinishCallback) {
        onFinish = onFinishCallback;
      }
      if (ops.length === 0) {
        if (onFinish) onFinish();
        if (opsCopy) {
          ops = clone(opsCopy);
          setText(initialText);
          movePosition();
          api.go();
        }
      } else {
        process(ops.shift());
      }
    }
    api.loop = () => {
      opsCopy = clone(ops);
      return api;
    }
    
    return api;
  }
}));
