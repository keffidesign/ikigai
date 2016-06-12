webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var Application_1 = __webpack_require__(1);
	var index_1 = __webpack_require__(3);
	var index_ts_1 = __webpack_require__(5);
	__webpack_require__(6);
	var config = {
	    services: [
	        {
	            id: 'words',
	            source: index_1.default
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

	var Eventory = (function () {
	    function Eventory() {
	        this.hub = new Map();
	        console.log('constructor of Eventory', this.hub);
	    }
	    Eventory.prototype.on = function (key, cb) {
	        this.hub.set(key, cb);
	    };
	    Eventory.prototype.emit = function (key, payload, cb) {
	        this.hub.get(key)(payload, cb);
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
	var WordsService = (function (_super) {
	    __extends(WordsService, _super);
	    function WordsService() {
	        _super.apply(this, arguments);
	    }
	    WordsService.prototype.onWordsList = function (e) {
	        return [];
	    };
	    WordsService.prototype.onWordById = function (e) {
	        return {};
	    };
	    return WordsService;
	})(Service_ts_1.default);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = WordsService;


/***/ },

/***/ 4:
/***/ function(module, exports) {

	var Service = (function () {
	    function Service(app) {
	        var _this = this;
	        this._subscribeListeners = function () {
	            var methods = Object.keys(_this.constructor.prototype);
	            methods.map(function (m) {
	                if (~m.indexOf('on'))
	                    _this.app.subscribeListener(m, _this[m]);
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

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var browser_1 = __webpack_require__(7);
	var app_component_1 = __webpack_require__(229);
	browser_1.bootstrap(app_component_1.AppComponent);


/***/ },

/***/ 229:
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
	var core_1 = __webpack_require__(28);
	var button_component_1 = __webpack_require__(230);
	var title_component_1 = __webpack_require__(231);
	var AppComponent = (function () {
	    function AppComponent() {
	        this.word = {
	            translation: 'translation is here'
	        };
	    }
	    AppComponent = __decorate([
	        core_1.Component({
	            selector: 'my-app',
	            template: "\n        <div>\n            {{word.translation}}\n            <ui-title text=\"Tedious - \u0423\u0442\u043E\u043C\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439\"></ui-title>\n            <ui-button caption=\"I know this!\"></ui-button>\n            <ui-button caption=\"I've forgotten :(\"></ui-button>\n        </div>\n     ",
	            directives: [button_component_1.ButtonComponent, title_component_1.TitleComponent]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppComponent);
	    return AppComponent;
	})();
	exports.AppComponent = AppComponent;


/***/ },

/***/ 230:
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
	var core_1 = __webpack_require__(28);
	var ButtonComponent = (function () {
	    function ButtonComponent() {
	        this.caption = 'Submit!';
	    }
	    ButtonComponent = __decorate([
	        core_1.Component({
	            selector: 'ui-button',
	            template: "\n        <button>{{caption}}</button>\n   ",
	            inputs: ['caption']
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ButtonComponent);
	    return ButtonComponent;
	})();
	exports.ButtonComponent = ButtonComponent;


/***/ },

/***/ 231:
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
	var core_1 = __webpack_require__(28);
	var TitleComponent = (function () {
	    function TitleComponent() {
	        this.text = '';
	    }
	    TitleComponent = __decorate([
	        core_1.Component({
	            selector: 'ui-title',
	            inputs: ['text']
	        }),
	        core_1.View({
	            template: "\n        <h1>{{text}}</h1>\n   "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], TitleComponent);
	    return TitleComponent;
	})();
	exports.TitleComponent = TitleComponent;


/***/ }

});
//# sourceMappingURL=main.map