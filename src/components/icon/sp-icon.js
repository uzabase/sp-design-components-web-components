"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpIcon = void 0;
var decorators_js_1 = require("lit/decorators.js");
var src_1 = require("@ub-design/components-web-components/src/");
var icons_1 = require("./icons");
// @ts-ignore
var icon_css_inline_1 = require("./icon.css?inline");
var styles = new CSSStyleSheet();
styles.replaceSync(icon_css_inline_1.default);
var SpIcon = exports.SpIcon = function () {
    var _classDecorators = [(0, decorators_js_1.customElement)("sp-icon")];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _set_color_decorators;
    var _svg_decorators;
    var _svg_initializers = [];
    var SpIcon = _classThis = /** @class */ (function (_super) {
        __extends(SpIcon_1, _super);
        function SpIcon_1() {
            var _this = _super.call(this) || this;
            _this._color = (__runInitializers(_this, _instanceExtraInitializers), void 0);
            _this.paths = icons_1.speedaIcons;
            _this.svg = __runInitializers(_this, _svg_initializers, void 0);
            _this.color = _this.color || "black";
            return _this;
        }
        Object.defineProperty(SpIcon_1.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (val) {
                var _this = this;
                this._color = val || "black";
                setTimeout(function () {
                    _this.svg.classList.add("color__" + val);
                });
            },
            enumerable: false,
            configurable: true
        });
        return SpIcon_1;
    }(src_1.UbIcon));
    __setFunctionName(_classThis, "SpIcon");
    (function () {
        _set_color_decorators = [(0, decorators_js_1.property)({ type: String })];
        _svg_decorators = [(0, decorators_js_1.query)("svg")];
        __esDecorate(_classThis, null, _set_color_decorators, { kind: "setter", name: "color", static: false, private: false, access: { has: function (obj) { return "color" in obj; }, set: function (obj, value) { obj.color = value; } } }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _svg_decorators, { kind: "field", name: "svg", static: false, private: false, access: { has: function (obj) { return "svg" in obj; }, get: function (obj) { return obj.svg; }, set: function (obj, value) { obj.svg = value; } } }, _svg_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        SpIcon = _classThis = _classDescriptor.value;
    })();
    _classThis.styles = __spreadArray(__spreadArray([], src_1.UbIcon.styles, true), [styles], false);
    (function () {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SpIcon = _classThis;
}();
