webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var Application_1 = __webpack_require__(1);
	var index_1 = __webpack_require__(3);
	var index_2 = __webpack_require__(11);
	var index_ts_1 = __webpack_require__(12);
	__webpack_require__(13);
	var config = {
	    services: [
	        {
	            id: 'utils',
	            source: index_1.default
	        },
	        {
	            id: 'words',
	            source: index_2.default,
	            baseUrl: 'https://script.google.com/macros/s/AKfycbxvQqYa_KgG0fQqxA6utQ1XSmBgoHKZhJsi7gyx5fgwJ3NKqupi/exec'
	        },
	        {
	            id: 'gateway',
	            source: index_ts_1.default
	        }
	    ]
	};
	var App = new Application_1.default(config);
	App.init();


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	var Eventory_ts_1 = __webpack_require__(2);
	var Application = (function () {
	    function Application(config) {
	        this.services = [];
	        this.EventHub = new Eventory_ts_1.default();
	        this.config = config;
	    }
	    Application.prototype.init = function () {
	        var _this = this;
	        this.config.services.map(function (c) { return _this.services.push(new c.source(_this)); });
	        this._initServices(this.services);
	    };
	    Application.prototype._initServices = function (services) {
	        services.map(function (c) { return c.init(); });
	    };
	    Application.prototype.subscribeListener = function (key, cb) {
	        console.log('subscribeListener', key, cb);
	        this.EventHub.on(key, cb);
	    };
	    Application.prototype.emit = function (key, payload, cb) {
	        this.EventHub.emit(key, payload, cb);
	    };
	    return Application;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Application;


/***/ },

/***/ 2:
/***/ function(module, exports) {

	var hub = new Map();
	var Eventory = (function () {
	    function Eventory() {
	    }
	    Eventory.prototype.on = function (key, cb) {
	        hub.set(key, cb);
	    };
	    Eventory.prototype.emit = function (key, payload, cb) {
	        if (!cb) {
	            cb = payload;
	            payload = null;
	        }
	        var path = key.split('://');
	        var handler = hub.get("on" + String.capitalize(path[0]) + String.capitalize(path[1]));
	        if (!handler)
	            throw new Error("No handler for: " + key);
	        handler(payload, cb);
	    };
	    return Eventory;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Eventory;


/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Service_ts_1 = __webpack_require__(4);
	var capitalize = __webpack_require__(9);
	var shuffleArray = __webpack_require__(10);
	String.capitalize = capitalize;
	Array.shuffle = shuffleArray;
	var UtilsService = (function (_super) {
	    __extends(UtilsService, _super);
	    function UtilsService() {
	        _super.apply(this, arguments);
	    }
	    return UtilsService;
	})(Service_ts_1.default);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = UtilsService;


/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	var remote_1 = __webpack_require__(5);
	var Service = (function () {
	    function Service(app) {
	        var _this = this;
	        this._subscribeListeners = function () {
	            var methods = Object.keys(_this.constructor.prototype);
	            methods.map(function (m) {
	                if (~m.indexOf('on'))
	                    _this.app.subscribeListener(m, _this[m].bind(_this));
	            });
	        };
	        this.app = app;
	        this.id = this.constructor.name;
	    }
	    Service.prototype.init = function () {
	        this._subscribeListeners();
	        this.log('inited');
	    };
	    Service.prototype.log = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        console.log.apply(console, [this.id + ":"].concat(args));
	    };
	    Service.prototype.remote = function (url, cb) {
	        remote_1.default(url, cb);
	    };
	    Service.prototype.emit = function (key, payload, cb) {
	        this.app.emit(key, payload, cb);
	        this.log(key + ":emitted");
	    };
	    return Service;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Service;


/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	var superagent = __webpack_require__(6);
	function default_1(url, cb) {
	    var req = superagent['get'](url);
	    req.set('Accept', 'application/json');
	    req.end(function (err, result) { return adaptResponse(err, result, cb); });
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var adaptResponse = function (err, _a, cb) {
	    var body = _a.body;
	    err = err || body.error;
	    err ? cb(err) : cb(null, body.result);
	};


/***/ },

/***/ 9:
/***/ function(module, exports) {

	
	module.exports = capitalize
	
	function capitalize(string){
	  string = string || ''
	  string = string.trim()
	
	  if (string[0]) {
	    string = string[0].toUpperCase() + string.substr(1).toLowerCase()
	  }
	
	  return string
	}


/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Service_ts_1 = __webpack_require__(4);
	var data = [
	    {
	        word: 'Tedious',
	        translation: 'Утомительный'
	    },
	    {
	        word: 'Attitude',
	        translation: 'Отношение'
	    }
	];
	var adaptWithMode = function (data, mode) {
	    console.log('adaptWithMode', data, mode);
	    return mode === 'russian' ? data.map(function (d) { return ({ word: d.translation, translation: d.word }); }) : data;
	};
	var WordsService = (function (_super) {
	    __extends(WordsService, _super);
	    function WordsService() {
	        _super.apply(this, arguments);
	    }
	    WordsService.prototype.onWordsList = function (_a, cb) {
	        var _b = _a.mode, mode = _b === void 0 ? 'english' : _b;
	        var url = 'https://script.google.com/macros/s/AKfycbxvQqYa_KgG0fQqxA6utQ1XSmBgoHKZhJsi7gyx5fgwJ3NKqupi/exec';
	        var query = '?sheet=current';
	        this.remote(url + query, function (err, result) { return err ? cb(err) : cb(undefined, adaptWithMode(result, mode)); });
	    };
	    WordsService.prototype.onWordById = function (e) {
	        return {};
	    };
	    WordsService.prototype.onWordsKnow = function (e) {
	        return {};
	    };
	    WordsService.prototype.onWordsNext = function (payload, cb) {
	        setTimeout(function () { return cb(null, data[0]); }, 1000);
	    };
	    return WordsService;
	})(Service_ts_1.default);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = WordsService;


/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Service_ts_1 = __webpack_require__(4);
	var GatewayService = (function (_super) {
	    __extends(GatewayService, _super);
	    function GatewayService() {
	        _super.apply(this, arguments);
	    }
	    GatewayService.prototype.onGatewayAny = function () { };
	    return GatewayService;
	})(Service_ts_1.default);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = GatewayService;


/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	var browser_1 = __webpack_require__(14);
	var app_component_1 = __webpack_require__(236);
	browser_1.bootstrap(app_component_1.AppComponent);


/***/ },

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(35);
	var word_component_1 = __webpack_require__(237);
	var base_component_1 = __webpack_require__(240);
	var title_component_1 = __webpack_require__(238);
	var dropdown_component_1 = __webpack_require__(241);
	var AppComponent = (function (_super) {
	    __extends(AppComponent, _super);
	    function AppComponent() {
	        _super.call(this);
	        this.index = 0;
	        this.languages = [
	            {
	                id: 'english',
	                name: 'English'
	            },
	            {
	                id: 'russian',
	                name: 'Russian'
	            }
	        ];
	        this.loadWords();
	    }
	    AppComponent.prototype.loadWords = function (mode) {
	        var _this = this;
	        console.log('loadWords', mode);
	        this.emit('words://list', { mode: mode }, function (err, result) {
	            _this.words = Array.shuffle(result);
	            _this.next();
	        });
	    };
	    AppComponent.prototype.next = function () {
	        this.index = this.words.indexOf(this.word) + 1;
	        this.word = this.words[this.index];
	    };
	    AppComponent = __decorate([
	        core_1.Component({
	            selector: 'my-app',
	            template: "\n            <div *ngIf=\"word\">\n                <ui-dropdown [data]=\"languages\" (onValueChanged)=\"loadWords($event)\"></ui-dropdown>\n                <ui-title *ngIf=\"words\" text=\"{{index + 1}}/{{words.length}}\"></ui-title>\n                <c-word [data]=\"word\" (next)=\"next()\"></c-word>\n            </div>\n            <div *ngIf=\"!word\">There are no words left. Reload the page.</div>\n     ",
	            directives: [word_component_1.WordComponent, title_component_1.TitleComponent, dropdown_component_1.DropdownComponent]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppComponent);
	    return AppComponent;
	})(base_component_1.BaseComponent);
	exports.AppComponent = AppComponent;


/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(35);
	var title_component_1 = __webpack_require__(238);
	var button_component_1 = __webpack_require__(239);
	var WordComponent = (function () {
	    function WordComponent() {
	        this.next = new core_1.EventEmitter();
	        this.showTranslation = false;
	    }
	    WordComponent.prototype.onKnowButton = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        this.showTranslation = false;
	        this.next._next();
	    };
	    WordComponent.prototype.onForgottenButton = function () {
	        this.showTranslation = true;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], WordComponent.prototype, "data", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], WordComponent.prototype, "next", void 0);
	    WordComponent = __decorate([
	        core_1.Component({ selector: 'c-word' }),
	        core_1.View({
	            template: "\n        <ui-title [text]=\"data.word\"></ui-title>\n        <ui-title *ngIf=\"showTranslation\" [text]=\"data.translation\"></ui-title>\n        <ui-button (click)=\"onKnowButton($event)\" caption=\"Know\"></ui-button>\n        <ui-button (click)=\"onForgottenButton($event)\" caption=\"Forgotten\"></ui-button>\n    ",
	            directives: [title_component_1.TitleComponent, button_component_1.ButtonComponent]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], WordComponent);
	    return WordComponent;
	})();
	exports.WordComponent = WordComponent;


/***/ },

/***/ 238:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(35);
	var TitleComponent = (function () {
	    function TitleComponent() {
	        this.text = '';
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], TitleComponent.prototype, "text", void 0);
	    TitleComponent = __decorate([
	        core_1.Component({
	            selector: 'ui-title'
	        }),
	        core_1.View({
	            template: "<h1>{{text}}</h1>"
	        }), 
	        __metadata('design:paramtypes', [])
	    ], TitleComponent);
	    return TitleComponent;
	})();
	exports.TitleComponent = TitleComponent;


/***/ },

/***/ 239:
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(35);
	var base_component_1 = __webpack_require__(240);
	var ButtonComponent = (function (_super) {
	    __extends(ButtonComponent, _super);
	    function ButtonComponent() {
	        _super.apply(this, arguments);
	        this.caption = 'Submit!';
	    }
	    ButtonComponent.prototype.clickHandler = function (e) {
	        this.emit("words://know");
	    };
	    ButtonComponent = __decorate([
	        core_1.Component({
	            selector: 'ui-button',
	            inputs: ['caption']
	        }),
	        core_1.View({
	            template: "<button>{{caption}}</button>"
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ButtonComponent);
	    return ButtonComponent;
	})(base_component_1.BaseComponent);
	exports.ButtonComponent = ButtonComponent;


/***/ },

/***/ 240:
/***/ function(module, exports, __webpack_require__) {

	var Eventory_1 = __webpack_require__(2);
	var BaseComponent = (function () {
	    function BaseComponent() {
	        this.EventHub = new Eventory_1.default();
	    }
	    BaseComponent.prototype.emit = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        console.log('BaseComponent', args);
	        (_a = this.EventHub).emit.apply(_a, args);
	        var _a;
	    };
	    return BaseComponent;
	})();
	exports.BaseComponent = BaseComponent;


/***/ },

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(35);
	var DropdownComponent = (function () {
	    function DropdownComponent() {
	        this.onValueChanged = new core_1.EventEmitter();
	    }
	    DropdownComponent.prototype.onChangeHandler = function (ev) {
	        console.log('onChangeHandler', ev);
	        this.onValueChanged._next(ev.target.value);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], DropdownComponent.prototype, "data", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], DropdownComponent.prototype, "onValueChanged", void 0);
	    DropdownComponent = __decorate([
	        core_1.Component({
	            selector: 'ui-dropdown'
	        }),
	        core_1.View({
	            template: "\n        <select\n            (change)=\"onChangeHandler($event)\"\n        >\n            <option *ngFor=\"#d of data\" value=\"{{d.id}}\">{{d.name}}</option>\n        </select>\n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], DropdownComponent);
	    return DropdownComponent;
	})();
	exports.DropdownComponent = DropdownComponent;


/***/ }

});
//# sourceMappingURL=main.map