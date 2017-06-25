module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Component = exports.DomRenderer = exports.StringRenderer = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _StringRenderer = __webpack_require__(2);

	Object.defineProperty(exports, 'StringRenderer', {
	  enumerable: true,
	  get: function get() {
	    return _StringRenderer.renderer;
	  }
	});

	var _DOMRenderer = __webpack_require__(6);

	Object.defineProperty(exports, 'DomRenderer', {
	  enumerable: true,
	  get: function get() {
	    return _DOMRenderer.renderer;
	  }
	});
	exports.bootstrap = bootstrap;

	var _Component2 = __webpack_require__(10);

	var _Component3 = _interopRequireDefault(_Component2);

	var _obj = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Component = exports.Component = _Component3.default;

	function createDefaultRootType(markup, state) {
	  var $Root = function (_Component) {
	    _inherits($Root, _Component);

	    function $Root() {
	      _classCallCheck(this, $Root);

	      return _possibleConstructorReturn(this, ($Root.__proto__ || Object.getPrototypeOf($Root)).apply(this, arguments));
	    }

	    _createClass($Root, [{
	      key: 'get',
	      value: function get(key) {

	        return state[key] || _get($Root.prototype.__proto__ || Object.getPrototypeOf($Root.prototype), 'get', this).call(this, key);
	      }
	    }]);

	    return $Root;
	  }(Component);

	  $Root.TEMPLATE = markup;
	  $Root.PROPS = (0, _obj.objMap)(state, function (val, key) {
	    return {};
	  });


	  return $Root;
	}

	function bootstrap(config) {
	  var renderer = config.renderer,
	      markup = config.markup,
	      _config$state = config.state,
	      state = _config$state === undefined ? {} : _config$state,
	      Root = config.Root,
	      _config$componentType = config.componentTypes,
	      componentTypes = _config$componentType === undefined ? [] : _config$componentType;


	  var $Root = Root || createDefaultRootType(markup, state);

	  Component.prototype.invalidate = function () {

	    return renderer(this.resolveTemplate(), this);
	  };

	  Component.registerType.apply(Component, [$Root].concat(_toConsumableArray(componentTypes)));

	  var root = new $Root(state);

	  root.$renderParams = config;

	  return function () {
	    return root.invalidate();
	  };
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderer = renderer;

	var _xml = __webpack_require__(3);

	function renderer(_ref, parent) {
	  var tag = _ref.tag,
	      component = _ref.component,
	      children = _ref.children,
	      attributes = _ref.attributes;
	  var acc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


	  if (component) {

	    var Ctor = component;

	    var c = new Ctor(attributes);

	    renderer(c.resolveTemplate(), c, acc);
	  } else {

	    var childrenResult = !children ? null : children.map(function (c) {
	      return renderer(c, parent);
	    });

	    acc.push((0, _xml.xmlStringify)({ tag: tag, attributes: attributes, children: childrenResult }));
	  }

	  return acc.join('');
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.xmlParse = exports.xmlStringify = exports.XmlNode = exports.Attributes = exports.decodeXmlEntities = exports.RE_ATTRS = exports.RE_TAG = exports.RE_XML_ENTITY = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-use-before-define: "off"*/


	exports.escapeXml = escapeXml;

	var _text2 = __webpack_require__(4);

	var _fn = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// let COUNTER = 0;

	var RE_XML_ENTITY = exports.RE_XML_ENTITY = /&#?[0-9a-z]{3,5};/g;

	var RE_TAG = exports.RE_TAG = /(<)(\/?)([a-z][a-z0-9\:\.\-]*)((?:\s+[a-z][a-z0-9\-]+(?:=(?:\w+|(?:['"]?[^>'"]*['"]?)))?)*)\s*(\/?)>/gi;

	var RE_ATTRS = exports.RE_ATTRS = /\s+([a-z][a-z0-9\-]+)(?:=(\w+|['"]?[^>"]*['"]?))?/gi;

	var SUBST_XML_ENTITY = {
	  amp: '&',
	  gt: '>',
	  lt: '<',
	  quot: '"',
	  nbsp: ' '
	};

	var FN_XML_ENTITY = function FN_XML_ENTITY(_s) {

	  var s = _s.substring(1, _s.length - 1);

	  return s[0] === '#' ? String.fromCharCode(+s.substring(1)) : SUBST_XML_ENTITY[s] || ' ';
	};

	var decodeXmlEntities = exports.decodeXmlEntities = function decodeXmlEntities() {
	  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  return s.replace(RE_XML_ENTITY, FN_XML_ENTITY);
	};

	var matchHtmlRegExp = /["'&<>]/g;

	function escapeXml(unsafe) {
	  return !unsafe ? '' : ('' + unsafe).replace(matchHtmlRegExp, function (m) {
	    switch (m.charCodeAt(0)) {
	      // "
	      case 34:
	        return '&quot;';
	      // &
	      case 38:
	        return '&amp;';
	      // '
	      case 39:
	        return '&#39;';
	      // <
	      case 60:
	        return '&lt;';
	      // >
	      case 62:
	        return '&gt;';

	      default:
	        return '';
	    }
	  });
	}

	var normalizeValue = function normalizeValue(_v) {
	  var v = _v;
	  if (v === null || v === Object.undefined) {
	    return true;
	  }
	  if (!v) {
	    return '';
	  }
	  if (v[0] === '"') {
	    v = v.slice(1, -1);
	  }
	  if (v === 'true') {
	    return true;
	  }
	  if (v === 'false') {
	    return false;
	  }

	  return decodeXmlEntities(v);
	};

	var Attributes = exports.Attributes = {

	  narrow: function narrow(attributes) {
	    return typeof attributes === 'string' ? Attributes.parse(attributes) : attributes;
	  },

	  parse: function parse(s) {
	    var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    if (!s) {
	      return null;
	    }
	    var found = false;
	    for (var e = RE_ATTRS.exec(s); e; e = RE_ATTRS.exec(s)) {
	      r[e[1]] = normalizeValue(e[2]);
	      found = true;
	    }
	    return found ? r : null;
	  },
	  stringify: function stringify(obj) {
	    return obj ? ' ' + Object.keys(obj).filter(function (k) {
	      return obj[k];
	    }).map(function (k) {
	      return k + '="' + obj[k] + '"';
	    }).join(' ') : '';
	  }
	};

	var XmlNode = exports.XmlNode = function () {
	  function XmlNode(tag, attributes, children) {
	    var _this = this;

	    _classCallCheck(this, XmlNode);

	    this.$key = 0;
	    this.tag = tag;
	    this.attributes = Attributes.narrow(attributes);
	    if (children && children.length) {
	      children.forEach(function (e) {
	        return _this.addChild(e);
	      });
	    }
	  }

	  _createClass(XmlNode, [{
	    key: 'getChild',
	    value: function getChild(index) {
	      return this.children && this.children[index];
	    }
	  }, {
	    key: 'addChild',
	    value: function addChild(elt) {

	      (this.children || (this.children = [])).push(elt);
	      elt.$key = this.children.length - 1;
	      return elt;
	    }
	  }, {
	    key: 'addText',
	    value: function addText(text, $key) {
	      return this.addChild(new XmlNode('#text', { text: text }));
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return xmlStringify(this);
	    }
	  }]);

	  return XmlNode;
	}();

	function _stringify(elt, tab) {
	  var _elt$tag = elt.tag,
	      tag = _elt$tag === undefined ? 'p' : _elt$tag,
	      attributes = elt.attributes,
	      children = elt.children;

	  if (tag === '#text') {
	    return '' + tab + (attributes.text || '');
	  }

	  var attrs = Attributes.stringify(attributes);
	  var ch = children && children.map(function (c) {
	    return typeof c === 'string' ? c : _stringify(c, '  ' + tab);
	  }).join('\n');

	  return tab + '<' + tag + attrs + (!ch ? '/>' : '>\n' + ch + '\n' + tab + '</' + tag + '>');
	}

	var xmlStringify = exports.xmlStringify = function xmlStringify(root) {
	  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  return _stringify(root, '');
	};

	var xmlTokenizer = (0, _fn.curry)(_text2.tokenizer, RE_TAG, function (stack, _ref, $key) {
	  var _ref2 = _slicedToArray(_ref, 6),
	      _text = _ref2[0],
	      isTag = _ref2[1],
	      isClosingTag = _ref2[2],
	      tag = _ref2[3],
	      attributes = _ref2[4],
	      isSingleTag = _ref2[5];

	  var top = stack[0];
	  // console.log(text, !!isTag, !!isClosingTag, !!isSingleTag, tag, attrs)

	  if (!isTag) {
	    var text = _text.trim();
	    if (text) {
	      top.addText(text, $key);
	    }
	    return;
	  }

	  if (isClosingTag) {
	    stack.shift();
	    return;
	  }

	  var elt = top.addChild(new XmlNode(tag, attributes));

	  if (!isSingleTag) {
	    stack.unshift(elt);
	  }
	});

	var xmlParse = exports.xmlParse = function xmlParse() {
	  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  return xmlTokenizer(s, [new XmlNode()])[0].getChild(0);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var RE_SIGN = exports.RE_SIGN = /([^a-zа-я0-9іўё])/gi;

	var tokenizer = exports.tokenizer = function tokenizer() {
	  var re = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : RE_SIGN;
	  var fx = arguments[1];
	  var s = arguments[2];
	  var ctx = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


	  var counter = 0,
	      lastIndex = 0,
	      text = void 0,
	      textE = [];

	  for (var e = re.exec(s); e; e = re.exec(s)) {

	    // preceding text
	    text = e.index && s.slice(lastIndex, e.index);
	    if (text) {
	      textE[0] = text;
	      fx(ctx, textE, counter++);
	    }

	    // matching
	    fx(ctx, e, counter++);

	    // up past index
	    lastIndex = re.lastIndex;
	  }

	  // tail text
	  text = s.slice(lastIndex);
	  if (text) {
	    textE[0] = text;
	    fx(ctx, textE, counter++);
	  }

	  return ctx;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fnVoid = fnVoid;
	exports.fnThis = fnThis;
	exports.fnThisProp = fnThisProp;
	exports.fnThrow = fnThrow;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/* eslint no-console: 0 */

	var undef = Object.undefined;

	var _curry = function _curry(fn, args0, lengthLimit) {

	  var fx = function fx(args) {
	    return args.length >= lengthLimit ? fn.apply(undefined, _toConsumableArray(args)) : _curry(fn, args, lengthLimit - args.length);
	  };

	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return fx([].concat(_toConsumableArray(args0), args));
	  };
	};

	var isFunction = exports.isFunction = function isFunction(f) {
	  return !!(f && f.constructor && f.call && f.apply);
	};

	var functionDisplayName = exports.functionDisplayName = function functionDisplayName(f) {
	  return f.displayName || (f.displayName = f.name || (/^function\s+([\w\$]+)\s*\(/.exec(f.toString()) || [])[1] || 'C');
	};
	var log = exports.log = function log() {
	  var _ref, _console;

	  (_console = console).log.apply(_console, arguments);return _ref = arguments.length - 1, arguments.length <= _ref ? undefined : arguments[_ref];
	};

	function fnVoid() {}
	function fnThis() {
	  return this;
	}
	function fnThisProp(key) {
	  return this[key];
	}
	function fnThrow(error) {
	  var ErrorType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Error;
	  throw new ErrorType(error);
	}

	var fnId = exports.fnId = function fnId(x) {
	  return x;
	};

	var fnNull = exports.fnNull = function fnNull(x) {
	  return null;
	};

	var fnTrue = exports.fnTrue = function fnTrue() {
	  return true;
	};

	var fnFalse = exports.fnFalse = function fnFalse() {
	  return false;
	};

	var compose = exports.compose = function compose() {
	  for (var _len2 = arguments.length, ff = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    ff[_key2] = arguments[_key2];
	  }

	  return function (x0) {
	    return ff.reduceRight(function (x, f) {
	      return f(x);
	    }, x0);
	  };
	};

	var swap = exports.swap = function swap(f) {
	  return function (a, b) {
	    return f(b, a);
	  };
	};

	var isSomething = exports.isSomething = function isSomething(a) {
	  return a !== undef && a !== null;
	};
	var someOrNull = exports.someOrNull = function someOrNull(a) {
	  return a === undef || a === null ? null : a;
	};

	var sum = exports.sum = function sum(a, b) {
	  return a + b;
	};
	var and = exports.and = function and(a, b) {
	  return a && b;
	};
	var or = exports.or = function or(a, b) {
	  return a || b;
	};

	var curry = exports.curry = function curry(f) {
	  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    args[_key3 - 1] = arguments[_key3];
	  }

	  return _curry(f, args, f.length);
	};

	var assert = exports.assert = function assert(b, error, errorType) {
	  return b || fnThrow(error, errorType);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderer = renderer;
	exports._renderer = _renderer;

	var _DOMRendererUtil = __webpack_require__(7);

	var _obj = __webpack_require__(8);

	var done = function done(c) {
	  (0, _obj.objForEach)(c.$sub, done);
	  c.onDone(c.element);
	  return null;
	};

	function renderer(meta, parent) {

	  (0, _obj.objForEach)(parent.$sub, function (c) {
	    return c.retained = false;
	  });

	  var element = _renderer(meta, parent);

	  parent.$sub = (0, _obj.objMap)(parent.$sub, function (c, key) {
	    return c.retained ? c : done(c);
	  });

	  return element;
	}

	function _renderer(meta, parent) {
	  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : parent.$renderParams;
	  var component = meta.component,
	      children = meta.children,
	      _meta$attributes = meta.attributes,
	      attributes = _meta$attributes === undefined ? {} : _meta$attributes,
	      $key = meta.$key;


	  var element = null;

	  if (component) {

	    var existing = parent.$sub && parent.$sub[$key];

	    var Ctor = component;

	    var c = existing || new Ctor(attributes);

	    (parent.$sub || (parent.$sub = {}))[$key] = c;

	    c.$renderParams = params;
	    c.retained = true;

	    if (existing) {

	      c.onInput(attributes);
	    } else {

	      c.element = _renderer(c.resolveTemplate(), c, params);
	    }

	    element = c.element;

	    if (!existing) {
	      c.onInit(element);
	    }
	  } else {

	    element = (0, _DOMRendererUtil.resolveDOMElement)(meta, params);

	    if (children) {

	      var lastChildElt = children.reduce(function (prevElt, meta2) {
	        return _renderer(meta2, parent, { parentElt: element, prevElt: prevElt });
	      }, null);

	      (0, _DOMRendererUtil.clearAfter)(element, lastChildElt);
	    }
	  }

	  return element;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.resolveDOMElement = resolveDOMElement;
	exports.createDOMElement = createDOMElement;
	exports.clearAfter = clearAfter;
	exports.applyDOMAttributes = applyDOMAttributes;

	var _obj = __webpack_require__(8);

	var _DomLibrary = __webpack_require__(9);

	function isMatched(e, _ref) {
	  var tag = _ref.tag,
	      $key = _ref.$key;


	  // console.log('isMatched', e.nodeName.toLowerCase(), tag.toLowerCase(), $key, e.$key);
	  return e.nodeName.toLowerCase() === tag.toLowerCase() && $key === e.$key;
	}

	function resolveDOMElement(meta, _ref2) {
	  var parentElt = _ref2.parentElt,
	      prevElt = _ref2.prevElt;


	  var placeholder = (prevElt ? prevElt.nextSibling : parentElt.firstChild) || null;

	  var c = placeholder && isMatched(placeholder, meta) ? placeholder : null;

	  if (!c) {

	    c = createDOMElement(meta, parentElt._namespaceURI);

	    (0, _DomLibrary.appendDOMElement)(c, parentElt, placeholder);
	  } else {

	    applyDOMAttributes(c, meta.attributes);

	    if (c !== placeholder) {

	      (0, _DomLibrary.appendDOMElement)(c, parentElt, placeholder);
	    }
	  }

	  return c;
	}

	function createDOMElement(meta, _namespace) {

	  var e = null;
	  if (meta.tag === '#text') {

	    e = document.createTextNode(meta.attributes.text);
	    e.$attributes = {};
	  } else {

	    e = (0, _DomLibrary.createDomElement)(meta.tag, _namespace);

	    e.$attributes = {};
	    applyDOMAttributes(e, meta.attributes);
	  }
	  e.$key = meta.$key;
	  return e;
	}

	function clearAfter(parent, _c) {

	  var c = _c ? _c.nextSibling : parent.firstChild;
	  while (c) {
	    var t = c;
	    c = c.nextSibling;
	    parent.removeChild(t);
	  }
	}

	function applyDOMAttributes(e, _attrs) {

	  if (_attrs) {
	    (function () {

	      var lastAttrs = e.$attributes;

	      if (e.nodeName === '#text') {
	        if (lastAttrs.text !== _attrs.text) {
	          e.textContent = _attrs.text;
	        }
	      } else {

	        (0, _obj.objForEach)(_attrs, function (value, key) {
	          if (value !== lastAttrs[key]) {
	            (0, _DomLibrary.setDOMAttribute)(e, key, value);
	          }
	        });
	      }

	      e.$attributes = _attrs;
	    })();
	  }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.undefOrNull = exports.isObject = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint no-cond-assign: "off" */
	/* eslint no-eq-null: "off" */

	exports.objId = objId;
	exports.intoMethod = intoMethod;
	exports.objForEach = objForEach;
	exports.objMap = objMap;
	exports.objToArray = objToArray;
	exports.objFromArray = objFromArray;
	exports.append = append;
	exports.objGet = objGet;
	exports.getter = getter;

	var _fn = __webpack_require__(5);

	var isObject = exports.isObject = function isObject(o) {
	  return o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
	};

	var undefOrNull = exports.undefOrNull = function undefOrNull(o) {
	  return o == null;
	};

	function objId(x) {

	  return x ? x.id : null;
	}

	function intoMethod(f) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return f.apply(this, [this].concat(args));
	  };
	}

	/**
	 * Maps by object keys.
	 * Nullable items excluded from result.
	 * @param x source object
	 * @param fn function to produce item
	 * @returns {Array} of mapped items
	 */
	function objForEach(x, fn) {

	  if (x && fn) {
	    Object.keys(x).forEach(function (key, index) {
	      return fn(x[key], key, index);
	    });
	  }

	  return x;
	}

	function objMap(x) {
	  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (value, key) {
	    return { value: value, key: key };
	  };


	  var result = {};

	  if (!x) {
	    return result;
	  }

	  Object.keys(x).forEach(function (key) {
	    var value = fn(x[key], key);

	    if (value != null) {
	      result[key] = value;
	    }
	  });

	  return result;
	}

	function objToArray(x) {
	  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (value, key) {
	    return { value: value, key: key };
	  };


	  var result = [];

	  if (!x) {
	    return result;
	  }

	  Object.keys(x).forEach(function (key) {
	    var value = fn(x[key], key);

	    if (value != null) {
	      result.push(value);
	    }
	  });

	  return result;
	}

	/*
	  [e,...] => { [fnKey(e)]: fnValue(e), ...}
	*/
	function objFromArray(arr) {
	  var fnKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _fn.fnId;
	  var fnValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _fn.fnId;


	  var result = {};

	  if (!arr) {
	    return result;
	  }
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var e = _step.value;

	      var key = fnKey(e);
	      var value = fnValue(e);
	      if (!undefOrNull(key) && !undefOrNull(value)) {
	        result[key] = value;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return result;
	}

	function append(a, b) {

	  if (a.concat) {
	    return a.concat(b);
	  }

	  return a + b;
	}

	function objGet(x, key) {

	  return x && key ? getter.call(x, key) : Object.undefined;
	}

	function getter(k) {

	  var r = this[k],
	      arr = void 0,
	      l = void 0;

	  if (r === arr && (l = (arr = k.split('.')).length) > 1) {

	    r = this[arr[0]];
	    for (var i = 1; i < l; r = r[arr[i++]]) {
	      if (!r) {
	        return Object.undefined;
	      }
	    }
	  }

	  return r;
	}
	// returns object evaluated from given `s`.
	Object.parse = function (s, ctx) {
	  for (var _len2 = arguments.length, opts = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	    opts[_key2 - 2] = arguments[_key2];
	  }

	  try {
	    return s && s.length && Function.call(Function, 'return ' + s).apply(ctx, opts) || null;
	  } catch (ex) {
	    throw new Error('internal: Can\'t parse: ' + ex.message + ' in ' + s.replace(/\s+/g, ' ').substring(0, 150));
	  }
	};

	// overrides methods with super.
	Object.mixin = function (target, fn) {
	  for (var _len3 = arguments.length, params = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
	    params[_key3 - 2] = arguments[_key3];
	  }

	  var _super = {};
	  var mix = fn && fn.apply(null, [_super].concat(params)) || {};
	  Object.keys(mix).forEach(function (n) {
	    var f = target[n];
	    _super[n] = function (ctx) {
	      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	        args[_key4 - 1] = arguments[_key4];
	      }

	      return f && f.apply(ctx, args);
	    };
	    target[n] = mix[n];
	  });
	  return target;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.appendDOMElement = appendDOMElement;
	exports.createDomElement = createDomElement;
	exports.setDOMAttribute = setDOMAttribute;
	var w3 = 'http://www.w3.org/';
	var DOMNamespaces = exports.DOMNamespaces = {
	  html: w3 + '1999/xhtml',
	  mathml: w3 + '1998/Math/MathML',
	  svg: w3 + '2000/svg'
	};

	var flagAttrs = exports.flagAttrs = {
	  disabled: 'yes',
	  selected: 'true'
	};

	var instantAttrs = exports.instantAttrs = {
	  value: 1
	};

	var win = typeof window === 'undefined' ? {} : window;

	var addEventListener = exports.addEventListener = win.addEventListener ? function (e, eventName, listener) {
	  return e.addEventListener(eventName, listener, false);
	} : function (e, eventName, listener) {
	  return e.attachEvent('on' + eventName, listener);
	};

	function appendDOMElement(element, parentNode, nextSibling) {
	  if (nextSibling) {
	    parentNode.insertBefore(element, nextSibling);
	  } else {
	    parentNode.appendChild(element);
	  }
	}

	function createDomElement(tag, _namespace) {

	  var e = null;

	  var namespace = DOMNamespaces[tag] || _namespace;

	  if (namespace) {

	    e = document.createElementNS(namespace, tag);

	    e._namespaceURI = namespace;
	  } else {

	    e = document.createElement(tag);
	  }

	  return e;
	}

	function setDOMAttribute(e, k, value) {

	  if (typeof value === 'function') {

	    e.removeEventListener(k, e.$attributes[k]);
	    addEventListener(e, k, value);
	  } else if (flagAttrs[k]) {

	    e[k] = value ? true : null;
	  } else if (instantAttrs[k]) {

	    e[k] = value;
	  } else {

	    e.setAttribute(k, value);
	  }
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Template = __webpack_require__(11);

	var _Template2 = _interopRequireDefault(_Template);

	var _Property = __webpack_require__(12);

	var _Property2 = _interopRequireDefault(_Property);

	var _Component2 = __webpack_require__(13);

	var _Component3 = _interopRequireDefault(_Component2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * The base UI component.
	 */
	var UiComponent = function (_Component) {
	  _inherits(UiComponent, _Component);

	  function UiComponent() {
	    _classCallCheck(this, UiComponent);

	    return _possibleConstructorReturn(this, (UiComponent.__proto__ || Object.getPrototypeOf(UiComponent)).apply(this, arguments));
	  }

	  _createClass(UiComponent, [{
	    key: 'onInput',


	    // Lifetime hooks

	    value: function onInput(payload) {

	      this.assign(payload);
	    }

	    // Framework visualization

	  }, {
	    key: 'invalidate',
	    value: function invalidate() {

	      throw new Error('Not implemented.');
	    }
	  }, {
	    key: 'resolveTemplate',
	    value: function resolveTemplate() {

	      return _Template2.default.resolve(this);
	    }

	    // State

	  }, {
	    key: 'assign',
	    value: function assign(delta) {

	      if (_get(UiComponent.prototype.__proto__ || Object.getPrototypeOf(UiComponent.prototype), 'assign', this).call(this, delta) || 1) {

	        this.invalidate();
	      }
	    }

	    // Routines

	  }, {
	    key: 'updateOnClick',
	    value: function updateOnClick(ev) {

	      this.assign(_extends({}, ev.currentTarget.dataset));
	    }
	  }]);

	  return UiComponent;
	}(_Component3.default);

	UiComponent.registerType = function () {
	  for (var _len = arguments.length, ctors = Array(_len), _key = 0; _key < _len; _key++) {
	    ctors[_key] = arguments[_key];
	  }

	  return ctors.forEach(function (ctor) {
	    _Template2.default.install(ctor);
	    _Property2.default.install(ctor);
	  });
	};

	exports.default = UiComponent;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.compileTemplate = compileTemplate;

	var _fn = __webpack_require__(5);

	var _xml = __webpack_require__(3);

	var _obj = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	Object.jsx = function (tag, attributes) {
	  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    children[_key - 2] = arguments[_key];
	  }

	  return new _xml.XmlNode(tag, attributes, children.length ? children.map(function (e) {
	    return typeof e === 'string' ? new _xml.XmlNode('#text', { text: e }) : e;
	  }) : null);
	};

	var SPECIAL_TAGS = ['else', 'block', 'children'];

	var COMPONENTS_TYPES = new Map();

	function compileComponentType(elt) {
	  var tag = elt.tag;

	  if (typeof tag === 'string') {

	    var colonPos = tag.indexOf(':');
	    if (colonPos !== -1) {
	      (function () {
	        var key = tag.slice(colonPos + 1);
	        elt.resolveComponentType = function ($) {
	          var type = $.get(key);
	          return COMPONENTS_TYPES.get(type);
	        };
	      })();
	    } else if (tag[0] === tag[0].toUpperCase()) {
	      elt.resolveComponentType = function () {
	        return COMPONENTS_TYPES.get(tag);
	      };
	    }
	  } else {
	    elt.resolveComponentType = function () {
	      return tag;
	    };
	  }
	}

	function compileAttr(_p) {
	  var p = _p;

	  if (p[0] === ':') {
	    p = p.slice(1);
	    return function ($) {
	      return $.get(p);
	    };
	  }

	  if (p.indexOf('{{') !== -1) {
	    return function ($) {
	      return p.replace(/\{\{([a-zA-Z0-9\._$]+)\}\}/g, function (s, key) {
	        return $.get(key);
	      });
	    };
	  }

	  return function () {
	    return p;
	  };
	}

	function resolveChildren($, children, keyPrefix) {

	  var r = [];
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var c = _step.value;

	      var sub = resolveTemplate($, c, keyPrefix);
	      if (sub) {
	        if (Array.isArray(sub)) {
	          r.push.apply(r, _toConsumableArray(sub.filter(_fn.fnId)));
	        } else {
	          r.push(sub);
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return r;
	}

	function resolveTemplate($, elt) {
	  var keyPrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	  var tag = elt.tag,
	      attributes = elt.attributes,
	      children = elt.children,
	      $key = elt.$key,
	      forScopeId = elt.forScopeId,
	      forDataId = elt.forDataId,
	      ifConditionId = elt.ifConditionId,
	      ifElse = elt.ifElse,
	      resolve = elt.resolve,
	      resolveComponentType = elt.resolveComponentType;


	  if (resolve) {
	    return resolve.call(elt, $, $key);
	  }

	  if (ifConditionId && !$.get(ifConditionId)) {

	    return ifElse ? resolveTemplate($, ifElse) : null;
	  }

	  var component = resolveComponentType && resolveComponentType($);

	  $key = '' + keyPrefix + (component ? component.name : '') + $key;

	  if (forScopeId) {
	    var _ref;

	    var data = $.get(forDataId);
	    return !data ? null : (_ref = []).concat.apply(_ref, _toConsumableArray(data.map(function (d, index) {

	      $.memoize(forScopeId, d);

	      var $$key = $key + '$' + ((0, _fn.someOrNull)(d.key) || (0, _fn.someOrNull)(d.id) || index);

	      return resolveTemplate($, { tag: tag, attributes: attributes, children: children, $key: $$key });
	    })));
	  }

	  attributes = !attributes ? null : (0, _obj.objMap)(attributes, function (fn) {
	    return fn($);
	  });

	  children = !children ? null : resolveChildren($, children, $key + '.');

	  if (SPECIAL_TAGS.indexOf(tag) !== -1) {
	    return children;
	  }

	  return component ? { tag: tag, component: component, attributes: _extends({}, attributes, { transclude: children }), $key: $key } : { tag: tag, attributes: attributes, children: children, $key: $key };
	}

	function compileTemplate(elt) {
	  var tag = elt.tag,
	      attributes = elt.attributes,
	      children = elt.children;


	  if (tag === 'transclude') {
	    elt.resolve = function ($) {
	      return $.get('transclude');
	    };
	    return elt;
	  }

	  compileComponentType(elt);

	  if (attributes) {

	    elt.attributes = (0, _obj.objMap)(attributes, function (attr, k) {
	      if (k === 'each') {
	        var _attr$split = attr.split(' '),
	            _attr$split2 = _slicedToArray(_attr$split, 3),
	            scopeId = _attr$split2[0],
	            dataId = _attr$split2[2];

	        elt.forScopeId = scopeId;
	        elt.forDataId = dataId.slice(1);
	      } else if (k === 'if') {

	        elt.ifConditionId = attr.slice(1);
	        if (children) {
	          (function () {
	            var ifElse = children.find(function (e) {
	              return e.tag === 'else';
	            });
	            if (ifElse) {
	              elt.ifElse = compileTemplate(ifElse);
	              children = children.filter(function (e) {
	                return e !== ifElse;
	              });
	            }
	          })();
	        }
	      } else {

	        return compileAttr(attr);
	      }
	    });
	  }

	  if (children) {
	    children.forEach(compileTemplate);
	  }

	  return elt;
	}

	var Template = function () {
	  function Template(root) {
	    _classCallCheck(this, Template);

	    this.root = root;
	  }

	  _createClass(Template, [{
	    key: 'resolve',
	    value: function resolve($) {

	      return resolveTemplate($, this.root);
	    }
	  }]);

	  return Template;
	}();

	Template.resolve = function ($) {

	  return $.constructor.$TEMPLATE.resolve($, $.key);
	};

	Template.install = function (ctor) {

	  var text = ctor.TEMPLATE;

	  var root = compileTemplate(typeof text === 'string' ? (0, _xml.xmlParse)(text.trim()) : text);

	  (0, _fn.assert)(SPECIAL_TAGS.indexOf(root.tag) === -1, ctor.name + ': Root tag cannot be special tag');

	  var attrs = root.attributes;
	  if (attrs) {
	    (0, _fn.assert)(!('each' in attrs), ctor.name + ': Root tag cannot have \'each\' directive');
	    (0, _fn.assert)(!('if' in attrs), ctor.name + ': Root tag cannot have \'if\' directive');
	  }

	  ctor.$TEMPLATE = new Template(root);

	  COMPONENTS_TYPES.set(ctor.NAME || ctor.name, ctor);
	};

	exports.default = Template;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fn = __webpack_require__(5);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PropertyTypes = {};

	var props = function props($) {
	  return $.constructor.$PROPS;
	};

	/**
	 * A Property is a treatment on given key-value of a component state.
	 */

	var Property = function () {
	  _createClass(Property, null, [{
	    key: 'register',
	    value: function register(type) {
	      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : type.name.replace('Property', '').toLowerCase();


	      PropertyTypes[key] = type;
	    }
	  }, {
	    key: 'has',
	    value: function has($, key) {

	      return props($).has(key);
	    }
	  }, {
	    key: 'get',
	    value: function get($, key) {

	      var prop = props($).get(key);

	      return !prop ? Object.undefined : prop.get(key, $.state, $);
	    }
	  }, {
	    key: 'install',
	    value: function install(ctor) {
	      var _props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ctor['PROPS'] || {};

	      if (ctor.$PROPS) {
	        return;
	      }
	      ctor.$PROPS = new Map();
	      var keys = ctor.$PROP_KEYS = Object.keys(_props);

	      keys.forEach(function (key) {
	        var p = _props[key];
	        var prop = new (p.type && PropertyTypes[p.type] || Property)(key, p);
	        ctor.$PROPS.set(key, prop);

	        Object.defineProperty(ctor.prototype, key, {
	          get: function get() {
	            return prop.get(this, key);
	          },
	          set: function set(value) {

	            return this.set(key, value);
	          }
	        });
	      });
	    }
	  }, {
	    key: 'diff',
	    value: function diff($) {
	      var delta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	      var diff = { info: [], payload: {} };

	      props($).forEach(function (prop, key) {

	        var oldValue = $.state[key];
	        var _value = delta[key];

	        if (!prop.isReadOnly && typeof _value !== 'undefined') {

	          var value = prop.narrow(_value, $);

	          if (typeof value !== 'undefined' && !prop.isEqual(oldValue, value)) {

	            diff.info.push({ key: key, prop: prop, value: value, oldValue: oldValue });
	            diff.payload[key] = value;
	          }
	        }
	      });

	      return diff;
	    }
	  }, {
	    key: 'assign',
	    value: function assign($) {
	      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	      props($).forEach(function (prop, key) {

	        var value = payload[key];

	        if (!prop.isReadOnly && typeof value !== 'undefined') {
	          prop.set($, key, value);
	        }
	      });

	      return $;
	    }
	  }]);

	  function Property(key, options) {
	    _classCallCheck(this, Property);

	    this.key = key;

	    Object.assign(this, options);
	  }

	  _createClass(Property, [{
	    key: 'isEqual',
	    value: function isEqual(a, b) {

	      return a === b;
	    }
	  }, {
	    key: 'get',
	    value: function get($, key) {

	      var value = $.state[key];

	      return (0, _fn.someOrNull)(value) || this.default;
	    }
	  }, {
	    key: 'narrow',
	    value: function narrow(value, $) {

	      return value;
	    }
	  }, {
	    key: 'set',
	    value: function set($, key, value) {

	      $.state[key] = value;
	    }
	  }]);

	  return Property;
	}();

	Property.props = props;
	Property.STUB = new Property();
	exports.default = Property;

	var NumericProperty = function (_Property) {
	  _inherits(NumericProperty, _Property);

	  function NumericProperty() {
	    _classCallCheck(this, NumericProperty);

	    return _possibleConstructorReturn(this, (NumericProperty.__proto__ || Object.getPrototypeOf(NumericProperty)).apply(this, arguments));
	  }

	  _createClass(NumericProperty, [{
	    key: 'get',
	    value: function get($, key) {

	      var value = $.state[key];

	      return !(0, _fn.isSomething)(value) ? this.default || 0 : value;
	    }
	  }, {
	    key: 'narrow',
	    value: function narrow(value) {

	      return !(0, _fn.isSomething)(value) ? 0 : +value;
	    }
	  }]);

	  return NumericProperty;
	}(Property);

	Property.register(NumericProperty);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fn = __webpack_require__(5);

	var _obj = __webpack_require__(8);

	var _Entity2 = __webpack_require__(14);

	var _Entity3 = _interopRequireDefault(_Entity2);

	var _Property = __webpack_require__(12);

	var _Property2 = _interopRequireDefault(_Property);

	var _Application = __webpack_require__(16);

	var _Application2 = _interopRequireDefault(_Application);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-console: 0 */


	/**
	 * A Component is an Entity that
	 * 1) manages its state via properties and
	 * 2) intended to be a part of a whole system:
	 *    - life-cycle hooks to be invoked from container
	 *    - events aware
	 */
	var Component = function (_Entity) {
	  _inherits(Component, _Entity);

	  function Component(initialState, options) {
	    _classCallCheck(this, Component);

	    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, initialState));

	    Object.assign(_this, options);

	    _this.onCreate();
	    return _this;
	  }

	  ////////////////////////
	  // Events
	  ///////////////////////


	  _createClass(Component, [{
	    key: 'emitEvent',
	    value: function emitEvent(event) {

	      _Application2.default.emitEvent(event);
	    }

	    ////////////////////////
	    // Lifetime hooks
	    ///////////////////////

	  }, {
	    key: 'onCreate',
	    value: function onCreate() {}
	  }, {
	    key: 'onInit',
	    value: function onInit() {

	      _Property2.default.props(this).forEach(function (prop) {
	        return prop.init && prop.init();
	      });
	    }
	  }, {
	    key: 'onDone',
	    value: function onDone() {

	      _Property2.default.props(this).forEach(function (prop) {
	        return prop.done && prop.done();
	      });

	      this.isDone = true;
	    }
	  }, {
	    key: 'onError',
	    value: function onError(error) {

	      console.error(error);
	    }

	    ////////////////////////
	    // State
	    ///////////////////////

	  }, {
	    key: 'keys',
	    value: function keys() {

	      return this.constructor.$PROP_KEYS;
	    }
	  }, {
	    key: 'has',
	    value: function has(key) {

	      return _Property2.default.has(this, key);
	    }
	  }, {
	    key: 'getByKeys',
	    value: function getByKeys() {
	      var _this2 = this;

	      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.keys();


	      return keys.reduce(function (r, key) {
	        r[key] = _this2.get(key);return r;
	      }, {});
	    }
	  }, {
	    key: 'get',
	    value: function get(key) {

	      // memoized
	      var memoized = this.$ && _obj.getter.call(this.$, key);
	      if (memoized !== Object.undefined) {

	        return memoized;
	      }

	      // from properties or own member
	      var value = _obj.getter.call(this, key);
	      if (value !== Object.undefined) {

	        return !(0, _fn.isFunction)(value) ? value : this.memoize(key, value.bind(this));
	      }

	      // not found
	      return Object.undefined;
	    }
	  }, {
	    key: 'assign',
	    value: function assign(delta) {
	      var _Property$diff = _Property2.default.diff(this, delta),
	          info = _Property$diff.info,
	          payload = _Property$diff.payload;

	      if (info.length) {

	        _Property2.default.assign(this, payload);

	        this.callChangedHooks(info);

	        return info;
	      }

	      return false;
	    }

	    ////////////////////////
	    // Routines
	    ///////////////////////

	  }, {
	    key: 'memoize',
	    value: function memoize(key, value) {

	      (this.$ || (this.$ = {}))[key] = value;

	      return value;
	    }
	  }, {
	    key: 'callChangedHooks',
	    value: function callChangedHooks(info) {
	      var _this3 = this;

	      info.forEach(function (_ref) {
	        var key = _ref.key,
	            value = _ref.value,
	            oldValue = _ref.oldValue;


	        var hook = _this3.get(key + 'Changed');
	        if (hook) {

	          try {

	            hook.call(_this3, value, oldValue);
	          } catch (ex) {

	            _this3.onError(_extends({}, ex, { message: 'Error in ' + key + ' hook: ' + ex.message }));
	          }
	        }
	      });
	    }
	  }]);

	  return Component;
	}(_Entity3.default);

	exports.default = Component;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Identity2 = __webpack_require__(15);

	var _Identity3 = _interopRequireDefault(_Identity2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * An Entity is an Identity that bears a state, but has no specific behavior.
	 */
	var Entity = function (_Identity) {
	  _inherits(Entity, _Identity);

	  function Entity(initialState) {
	    _classCallCheck(this, Entity);

	    var _this = _possibleConstructorReturn(this, (Entity.__proto__ || Object.getPrototypeOf(Entity)).call(this));

	    Object.defineProperty(_this, 'state', { value: _extends({}, initialState) });
	    return _this;
	  }

	  _createClass(Entity, [{
	    key: 'keys',
	    value: function keys() {

	      return Object.keys(this.state);
	    }
	  }, {
	    key: 'has',
	    value: function has(key) {

	      return key in this.state;
	    }
	  }, {
	    key: 'get',
	    value: function get(key) {

	      return this.state[key];
	    }
	  }, {
	    key: 'set',
	    value: function set(key, value) {

	      return this.assign(_defineProperty({}, key, value));
	    }
	  }, {
	    key: 'assign',
	    value: function assign(delta) {

	      Object.assign(this.state, delta);

	      return this;
	    }
	  }, {
	    key: 'valueOf',
	    value: function valueOf() {

	      return this.state;
	    }
	  }, {
	    key: 'map',
	    value: function map(f) {

	      return this.constructor(f(this.valueOf()));
	    }
	  }, {
	    key: 'clone',
	    value: function clone(delta) {

	      return this.map(function (state) {
	        return _extends({}, state, delta);
	      });
	    }
	  }]);

	  return Entity;
	}(_Identity3.default);

	exports.default = Entity;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fn = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var lastId = 1;
	/**
	 * An Identity is something unique and can be distinguished from others.
	 */

	var Identity = function () {
	  function Identity() {
	    _classCallCheck(this, Identity);

	    Object.defineProperty(this, '_id', { value: Identity.nextId() });
	  }

	  _createClass(Identity, [{
	    key: 'isEquals',
	    value: function isEquals(x) {

	      return x && x._id === this._id;
	    }

	    /**
	     * Gets string representation of component.
	     */

	  }, {
	    key: 'toString',
	    value: function toString() {

	      return '' + this.constructor.name + this._id;
	    }
	  }, {
	    key: 'log',
	    value: function log() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _fn.log.apply(undefined, [this.toString()].concat(args));
	    }
	  }]);

	  return Identity;
	}();

	Identity.nextId = function () {
	  return lastId++;
	};

	exports.default = Identity;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint new-cap: 0 */


	var _fn = __webpack_require__(5);

	var _EventBus = __webpack_require__(17);

	/**
	 * A application is a singletone instance that
	 *  - consists from independent modules
	 *  - has life-cycle 'init' and 'done'
	 *  - enables unified event-driven interaction between modules
	 */
	var application = {
	  init: function init(modulesConfig) {

	    (0, _EventBus.apply)(application);

	    (0, _fn.assert)(Array.isArray(modulesConfig), 'Modules config has to be an array');

	    var modules = modulesConfig.map(function (cfg) {
	      return new cfg.type(_extends({ application: application }, cfg));
	    });

	    application.done = function () {
	      return Promise.all(modules.filter(function (m) {
	        return (0, _fn.isFunction)(m.done);
	      }).map(function (m) {
	        return m.done();
	      })).then(function () {
	        return application;
	      });
	    };

	    return Promise.all(modules.filter(function (m) {
	      return (0, _fn.isFunction)(m.init);
	    }).map(function (m) {
	      return m.init();
	    })).then(function () {
	      return application;
	    });
	  }
	};

	exports.default = application;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.apply = undefined;

	var _Memoize = __webpack_require__(18);

	var _Memoize2 = _interopRequireDefault(_Memoize);

	var _Observable = __webpack_require__(19);

	var _Observable2 = _interopRequireDefault(_Observable);

	var _fn = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var createRegistry = function createRegistry() {
	  return _Memoize2.default.create(function (id) {
	    return new _Observable2.default();
	  });
	};

	/**
	 * EventBus(Pub/Sub, EventChannel, event queue)
	 * Event types, N-to-N observers decoupled from subjects.
	 */
	var apply = exports.apply = function apply($) {
	  var registry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createRegistry();
	  return Object.assign($, {
	    subscribe: function subscribe(eventType, handler) {
	      var handlerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : handler.id;


	      (0, _fn.assert)((0, _fn.isFunction)(handler.handleEvent), 'handler.handleEvent is not a function');

	      var observer = function observer(event) {
	        return handler.handleEvent(event);
	      };

	      registry.get(eventType).addObserver(observer, handlerId);

	      return handlerId;
	    },
	    unsubscribe: function unsubscribe(handlerId) {

	      registry.forEach(function (o) {
	        return o.removeObserver(handlerId);
	      });
	    },
	    emitEvent: function emitEvent(event) {
	      // RunLoop.post
	      registry.get(event.type).notify(event);
	    }
	  });
	};

	var EventBus = function EventBus() {
	  _classCallCheck(this, EventBus);

	  apply(this);
	};

	exports.default = EventBus;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Memoize = function () {
	  _createClass(Memoize, null, [{
	    key: 'create',
	    value: function create(factory, keyFn, all) {

	      var m = new Memoize(factory, keyFn, all);

	      return function (x) {
	        return m.get(x);
	      };
	    }
	  }]);

	  function Memoize(factory) {
	    var keyFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
	      return x;
	    };
	    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Map();

	    _classCallCheck(this, Memoize);

	    this.factory = factory;
	    this.keyFn = keyFn;
	    Object.defineProperty(this, 'all', { value: value });
	  }

	  _createClass(Memoize, [{
	    key: 'remove',
	    value: function remove(x) {

	      var key = this.keyFn(x);

	      if (this.all.has(key)) {

	        this.all.delete(key);
	      }
	    }
	  }, {
	    key: 'forEach',
	    value: function forEach(fn) {

	      this.all.forEach(fn);
	    }
	  }, {
	    key: 'get',
	    value: function get(x) {

	      var key = this.keyFn(x);

	      if (!this.all.has(key)) {

	        var value = this.factory(x);
	        this.all.set(key, value);
	        return value;
	      }

	      return this.all.get(key);
	    }
	  }]);

	  return Memoize;
	}();

	exports.default = Memoize;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fn = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var COUNTER = 0;

	/**
	 * Observable keeps all observers by itself 1-to-N.
	 */

	var Observable = function () {
	  function Observable() {
	    _classCallCheck(this, Observable);

	    Object.defineProperty(this, '_observers', { value: new Map() });
	  }

	  _createClass(Observable, [{
	    key: 'addObserver',
	    value: function addObserver(o) {
	      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : COUNTER++;


	      (0, _fn.assert)((0, _fn.isFunction)(o), 'Observer is not a function');

	      this._observers.set(key, o);

	      return key;
	    }
	  }, {
	    key: 'observeOnce',
	    value: function observeOnce(o) {
	      var _this = this;

	      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : COUNTER++;


	      return this.addObserver(key, function (event) {
	        return _this.removeObserver(key) && o(event);
	      });
	    }
	  }, {
	    key: 'removeObserver',
	    value: function removeObserver(key) {

	      this._observers.delete(key);
	    }
	  }, {
	    key: 'notify',
	    value: function notify() {
	      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


	      this._observers.forEach(function (o) {
	        return o(event);
	      });
	    }
	  }]);

	  return Observable;
	}();

	exports.default = Observable;

/***/ }
/******/ ]);