import {
  __commonJS,
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-3OV72XIM.js";

// node_modules/konva/lib/Global.js
var require_Global = __commonJS({
  "node_modules/konva/lib/Global.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports._registerNode = exports.Konva = exports.glob = void 0;
    var PI_OVER_180 = Math.PI / 180;
    function detectBrowser() {
      return typeof window !== "undefined" && ({}.toString.call(window) === "[object Window]" || {}.toString.call(window) === "[object global]");
    }
    exports.glob = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" ? self : {};
    exports.Konva = {
      _global: exports.glob,
      version: "9.3.20",
      isBrowser: detectBrowser(),
      isUnminified: /param/.test(function(param) {
      }.toString()),
      dblClickWindow: 400,
      getAngle(angle) {
        return exports.Konva.angleDeg ? angle * PI_OVER_180 : angle;
      },
      enableTrace: false,
      pointerEventsEnabled: true,
      autoDrawEnabled: true,
      hitOnDragEnabled: false,
      capturePointerEventsEnabled: false,
      _mouseListenClick: false,
      _touchListenClick: false,
      _pointerListenClick: false,
      _mouseInDblClickWindow: false,
      _touchInDblClickWindow: false,
      _pointerInDblClickWindow: false,
      _mouseDblClickPointerId: null,
      _touchDblClickPointerId: null,
      _pointerDblClickPointerId: null,
      _fixTextRendering: false,
      pixelRatio: typeof window !== "undefined" && window.devicePixelRatio || 1,
      dragDistance: 3,
      angleDeg: true,
      showWarnings: true,
      dragButtons: [0, 1],
      isDragging() {
        return exports.Konva["DD"].isDragging;
      },
      isTransforming() {
        var _a;
        return (_a = exports.Konva["Transformer"]) === null || _a === void 0 ? void 0 : _a.isTransforming();
      },
      isDragReady() {
        return !!exports.Konva["DD"].node;
      },
      releaseCanvasOnDestroy: true,
      document: exports.glob.document,
      _injectGlobal(Konva) {
        exports.glob.Konva = Konva;
      }
    };
    var _registerNode = (NodeClass) => {
      exports.Konva[NodeClass.prototype.getClassName()] = NodeClass;
    };
    exports._registerNode = _registerNode;
    exports.Konva._injectGlobal(exports.Konva);
  }
});

// node_modules/konva/lib/Util.js
var require_Util = __commonJS({
  "node_modules/konva/lib/Util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Util = exports.Transform = void 0;
    var Global_1 = require_Global();
    var Transform = class _Transform {
      constructor(m = [1, 0, 0, 1, 0, 0]) {
        this.dirty = false;
        this.m = m && m.slice() || [1, 0, 0, 1, 0, 0];
      }
      reset() {
        this.m[0] = 1;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 1;
        this.m[4] = 0;
        this.m[5] = 0;
      }
      copy() {
        return new _Transform(this.m);
      }
      copyInto(tr) {
        tr.m[0] = this.m[0];
        tr.m[1] = this.m[1];
        tr.m[2] = this.m[2];
        tr.m[3] = this.m[3];
        tr.m[4] = this.m[4];
        tr.m[5] = this.m[5];
      }
      point(point) {
        const m = this.m;
        return {
          x: m[0] * point.x + m[2] * point.y + m[4],
          y: m[1] * point.x + m[3] * point.y + m[5]
        };
      }
      translate(x, y) {
        this.m[4] += this.m[0] * x + this.m[2] * y;
        this.m[5] += this.m[1] * x + this.m[3] * y;
        return this;
      }
      scale(sx, sy) {
        this.m[0] *= sx;
        this.m[1] *= sx;
        this.m[2] *= sy;
        this.m[3] *= sy;
        return this;
      }
      rotate(rad) {
        const c = Math.cos(rad);
        const s = Math.sin(rad);
        const m11 = this.m[0] * c + this.m[2] * s;
        const m12 = this.m[1] * c + this.m[3] * s;
        const m21 = this.m[0] * -s + this.m[2] * c;
        const m22 = this.m[1] * -s + this.m[3] * c;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
      }
      getTranslation() {
        return {
          x: this.m[4],
          y: this.m[5]
        };
      }
      skew(sx, sy) {
        const m11 = this.m[0] + this.m[2] * sy;
        const m12 = this.m[1] + this.m[3] * sy;
        const m21 = this.m[2] + this.m[0] * sx;
        const m22 = this.m[3] + this.m[1] * sx;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
      }
      multiply(matrix) {
        const m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
        const m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];
        const m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
        const m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];
        const dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
        const dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        this.m[4] = dx;
        this.m[5] = dy;
        return this;
      }
      invert() {
        const d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
        const m0 = this.m[3] * d;
        const m1 = -this.m[1] * d;
        const m2 = -this.m[2] * d;
        const m3 = this.m[0] * d;
        const m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
        const m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
        this.m[0] = m0;
        this.m[1] = m1;
        this.m[2] = m2;
        this.m[3] = m3;
        this.m[4] = m4;
        this.m[5] = m5;
        return this;
      }
      getMatrix() {
        return this.m;
      }
      decompose() {
        const a = this.m[0];
        const b = this.m[1];
        const c = this.m[2];
        const d = this.m[3];
        const e = this.m[4];
        const f = this.m[5];
        const delta = a * d - b * c;
        const result = {
          x: e,
          y: f,
          rotation: 0,
          scaleX: 0,
          scaleY: 0,
          skewX: 0,
          skewY: 0
        };
        if (a != 0 || b != 0) {
          const r = Math.sqrt(a * a + b * b);
          result.rotation = b > 0 ? Math.acos(a / r) : -Math.acos(a / r);
          result.scaleX = r;
          result.scaleY = delta / r;
          result.skewX = (a * c + b * d) / delta;
          result.skewY = 0;
        } else if (c != 0 || d != 0) {
          const s = Math.sqrt(c * c + d * d);
          result.rotation = Math.PI / 2 - (d > 0 ? Math.acos(-c / s) : -Math.acos(c / s));
          result.scaleX = delta / s;
          result.scaleY = s;
          result.skewX = 0;
          result.skewY = (a * c + b * d) / delta;
        } else {
        }
        result.rotation = exports.Util._getRotation(result.rotation);
        return result;
      }
    };
    exports.Transform = Transform;
    var OBJECT_ARRAY = "[object Array]";
    var OBJECT_NUMBER = "[object Number]";
    var OBJECT_STRING = "[object String]";
    var OBJECT_BOOLEAN = "[object Boolean]";
    var PI_OVER_DEG180 = Math.PI / 180;
    var DEG180_OVER_PI = 180 / Math.PI;
    var HASH = "#";
    var EMPTY_STRING = "";
    var ZERO = "0";
    var KONVA_WARNING = "Konva warning: ";
    var KONVA_ERROR = "Konva error: ";
    var RGB_PAREN = "rgb(";
    var COLORS = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 132, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 255, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 203],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [119, 128, 144],
      slategrey: [119, 128, 144],
      snow: [255, 255, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      transparent: [255, 255, 255, 0],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 5]
    };
    var RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
    var animQueue = [];
    var req = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame || function(f) {
      setTimeout(f, 60);
    };
    exports.Util = {
      _isElement(obj) {
        return !!(obj && obj.nodeType == 1);
      },
      _isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
      },
      _isPlainObject(obj) {
        return !!obj && obj.constructor === Object;
      },
      _isArray(obj) {
        return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
      },
      _isNumber(obj) {
        return Object.prototype.toString.call(obj) === OBJECT_NUMBER && !isNaN(obj) && isFinite(obj);
      },
      _isString(obj) {
        return Object.prototype.toString.call(obj) === OBJECT_STRING;
      },
      _isBoolean(obj) {
        return Object.prototype.toString.call(obj) === OBJECT_BOOLEAN;
      },
      isObject(val) {
        return val instanceof Object;
      },
      isValidSelector(selector) {
        if (typeof selector !== "string") {
          return false;
        }
        const firstChar = selector[0];
        return firstChar === "#" || firstChar === "." || firstChar === firstChar.toUpperCase();
      },
      _sign(number) {
        if (number === 0) {
          return 1;
        }
        if (number > 0) {
          return 1;
        } else {
          return -1;
        }
      },
      requestAnimFrame(callback) {
        animQueue.push(callback);
        if (animQueue.length === 1) {
          req(function() {
            const queue = animQueue;
            animQueue = [];
            queue.forEach(function(cb) {
              cb();
            });
          });
        }
      },
      createCanvasElement() {
        const canvas = document.createElement("canvas");
        try {
          canvas.style = canvas.style || {};
        } catch (e) {
        }
        return canvas;
      },
      createImageElement() {
        return document.createElement("img");
      },
      _isInDocument(el) {
        while (el = el.parentNode) {
          if (el == document) {
            return true;
          }
        }
        return false;
      },
      _urlToImage(url, callback) {
        const imageObj = exports.Util.createImageElement();
        imageObj.onload = function() {
          callback(imageObj);
        };
        imageObj.src = url;
      },
      _rgbToHex(r, g, b) {
        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      },
      _hexToRgb(hex) {
        hex = hex.replace(HASH, EMPTY_STRING);
        const bigint = parseInt(hex, 16);
        return {
          r: bigint >> 16 & 255,
          g: bigint >> 8 & 255,
          b: bigint & 255
        };
      },
      getRandomColor() {
        let randColor = (Math.random() * 16777215 << 0).toString(16);
        while (randColor.length < 6) {
          randColor = ZERO + randColor;
        }
        return HASH + randColor;
      },
      getRGB(color) {
        let rgb;
        if (color in COLORS) {
          rgb = COLORS[color];
          return {
            r: rgb[0],
            g: rgb[1],
            b: rgb[2]
          };
        } else if (color[0] === HASH) {
          return this._hexToRgb(color.substring(1));
        } else if (color.substr(0, 4) === RGB_PAREN) {
          rgb = RGB_REGEX.exec(color.replace(/ /g, ""));
          return {
            r: parseInt(rgb[1], 10),
            g: parseInt(rgb[2], 10),
            b: parseInt(rgb[3], 10)
          };
        } else {
          return {
            r: 0,
            g: 0,
            b: 0
          };
        }
      },
      colorToRGBA(str) {
        str = str || "black";
        return exports.Util._namedColorToRBA(str) || exports.Util._hex3ColorToRGBA(str) || exports.Util._hex4ColorToRGBA(str) || exports.Util._hex6ColorToRGBA(str) || exports.Util._hex8ColorToRGBA(str) || exports.Util._rgbColorToRGBA(str) || exports.Util._rgbaColorToRGBA(str) || exports.Util._hslColorToRGBA(str);
      },
      _namedColorToRBA(str) {
        const c = COLORS[str.toLowerCase()];
        if (!c) {
          return null;
        }
        return {
          r: c[0],
          g: c[1],
          b: c[2],
          a: 1
        };
      },
      _rgbColorToRGBA(str) {
        if (str.indexOf("rgb(") === 0) {
          str = str.match(/rgb\(([^)]+)\)/)[1];
          const parts = str.split(/ *, */).map(Number);
          return {
            r: parts[0],
            g: parts[1],
            b: parts[2],
            a: 1
          };
        }
      },
      _rgbaColorToRGBA(str) {
        if (str.indexOf("rgba(") === 0) {
          str = str.match(/rgba\(([^)]+)\)/)[1];
          const parts = str.split(/ *, */).map((n, index) => {
            if (n.slice(-1) === "%") {
              return index === 3 ? parseInt(n) / 100 : parseInt(n) / 100 * 255;
            }
            return Number(n);
          });
          return {
            r: parts[0],
            g: parts[1],
            b: parts[2],
            a: parts[3]
          };
        }
      },
      _hex8ColorToRGBA(str) {
        if (str[0] === "#" && str.length === 9) {
          return {
            r: parseInt(str.slice(1, 3), 16),
            g: parseInt(str.slice(3, 5), 16),
            b: parseInt(str.slice(5, 7), 16),
            a: parseInt(str.slice(7, 9), 16) / 255
          };
        }
      },
      _hex6ColorToRGBA(str) {
        if (str[0] === "#" && str.length === 7) {
          return {
            r: parseInt(str.slice(1, 3), 16),
            g: parseInt(str.slice(3, 5), 16),
            b: parseInt(str.slice(5, 7), 16),
            a: 1
          };
        }
      },
      _hex4ColorToRGBA(str) {
        if (str[0] === "#" && str.length === 5) {
          return {
            r: parseInt(str[1] + str[1], 16),
            g: parseInt(str[2] + str[2], 16),
            b: parseInt(str[3] + str[3], 16),
            a: parseInt(str[4] + str[4], 16) / 255
          };
        }
      },
      _hex3ColorToRGBA(str) {
        if (str[0] === "#" && str.length === 4) {
          return {
            r: parseInt(str[1] + str[1], 16),
            g: parseInt(str[2] + str[2], 16),
            b: parseInt(str[3] + str[3], 16),
            a: 1
          };
        }
      },
      _hslColorToRGBA(str) {
        if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(str)) {
          const [_, ...hsl] = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(str);
          const h = Number(hsl[0]) / 360;
          const s = Number(hsl[1]) / 100;
          const l = Number(hsl[2]) / 100;
          let t2;
          let t3;
          let val;
          if (s === 0) {
            val = l * 255;
            return {
              r: Math.round(val),
              g: Math.round(val),
              b: Math.round(val),
              a: 1
            };
          }
          if (l < 0.5) {
            t2 = l * (1 + s);
          } else {
            t2 = l + s - l * s;
          }
          const t1 = 2 * l - t2;
          const rgb = [0, 0, 0];
          for (let i = 0; i < 3; i++) {
            t3 = h + 1 / 3 * -(i - 1);
            if (t3 < 0) {
              t3++;
            }
            if (t3 > 1) {
              t3--;
            }
            if (6 * t3 < 1) {
              val = t1 + (t2 - t1) * 6 * t3;
            } else if (2 * t3 < 1) {
              val = t2;
            } else if (3 * t3 < 2) {
              val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
            } else {
              val = t1;
            }
            rgb[i] = val * 255;
          }
          return {
            r: Math.round(rgb[0]),
            g: Math.round(rgb[1]),
            b: Math.round(rgb[2]),
            a: 1
          };
        }
      },
      haveIntersection(r1, r2) {
        return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
      },
      cloneObject(obj) {
        const retObj = {};
        for (const key in obj) {
          if (this._isPlainObject(obj[key])) {
            retObj[key] = this.cloneObject(obj[key]);
          } else if (this._isArray(obj[key])) {
            retObj[key] = this.cloneArray(obj[key]);
          } else {
            retObj[key] = obj[key];
          }
        }
        return retObj;
      },
      cloneArray(arr) {
        return arr.slice(0);
      },
      degToRad(deg) {
        return deg * PI_OVER_DEG180;
      },
      radToDeg(rad) {
        return rad * DEG180_OVER_PI;
      },
      _degToRad(deg) {
        exports.Util.warn("Util._degToRad is removed. Please use public Util.degToRad instead.");
        return exports.Util.degToRad(deg);
      },
      _radToDeg(rad) {
        exports.Util.warn("Util._radToDeg is removed. Please use public Util.radToDeg instead.");
        return exports.Util.radToDeg(rad);
      },
      _getRotation(radians) {
        return Global_1.Konva.angleDeg ? exports.Util.radToDeg(radians) : radians;
      },
      _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      throw(str) {
        throw new Error(KONVA_ERROR + str);
      },
      error(str) {
        console.error(KONVA_ERROR + str);
      },
      warn(str) {
        if (!Global_1.Konva.showWarnings) {
          return;
        }
        console.warn(KONVA_WARNING + str);
      },
      each(obj, func) {
        for (const key in obj) {
          func(key, obj[key]);
        }
      },
      _inRange(val, left, right) {
        return left <= val && val < right;
      },
      _getProjectionToSegment(x1, y1, x2, y2, x3, y3) {
        let x, y, dist;
        const pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
        if (pd2 == 0) {
          x = x1;
          y = y1;
          dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
        } else {
          const u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
          if (u < 0) {
            x = x1;
            y = y1;
            dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
          } else if (u > 1) {
            x = x2;
            y = y2;
            dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
          } else {
            x = x1 + u * (x2 - x1);
            y = y1 + u * (y2 - y1);
            dist = (x - x3) * (x - x3) + (y - y3) * (y - y3);
          }
        }
        return [x, y, dist];
      },
      _getProjectionToLine(pt, line, isClosed) {
        const pc = exports.Util.cloneObject(pt);
        let dist = Number.MAX_VALUE;
        line.forEach(function(p1, i) {
          if (!isClosed && i === line.length - 1) {
            return;
          }
          const p2 = line[(i + 1) % line.length];
          const proj = exports.Util._getProjectionToSegment(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y);
          const px = proj[0], py = proj[1], pdist = proj[2];
          if (pdist < dist) {
            pc.x = px;
            pc.y = py;
            dist = pdist;
          }
        });
        return pc;
      },
      _prepareArrayForTween(startArray, endArray, isClosed) {
        const start = [], end = [];
        if (startArray.length > endArray.length) {
          const temp = endArray;
          endArray = startArray;
          startArray = temp;
        }
        for (let n = 0; n < startArray.length; n += 2) {
          start.push({
            x: startArray[n],
            y: startArray[n + 1]
          });
        }
        for (let n = 0; n < endArray.length; n += 2) {
          end.push({
            x: endArray[n],
            y: endArray[n + 1]
          });
        }
        const newStart = [];
        end.forEach(function(point) {
          const pr = exports.Util._getProjectionToLine(point, start, isClosed);
          newStart.push(pr.x);
          newStart.push(pr.y);
        });
        return newStart;
      },
      _prepareToStringify(obj) {
        let desc;
        obj.visitedByCircularReferenceRemoval = true;
        for (const key in obj) {
          if (!(obj.hasOwnProperty(key) && obj[key] && typeof obj[key] == "object")) {
            continue;
          }
          desc = Object.getOwnPropertyDescriptor(obj, key);
          if (obj[key].visitedByCircularReferenceRemoval || exports.Util._isElement(obj[key])) {
            if (desc.configurable) {
              delete obj[key];
            } else {
              return null;
            }
          } else if (exports.Util._prepareToStringify(obj[key]) === null) {
            if (desc.configurable) {
              delete obj[key];
            } else {
              return null;
            }
          }
        }
        delete obj.visitedByCircularReferenceRemoval;
        return obj;
      },
      _assign(target, source) {
        for (const key in source) {
          target[key] = source[key];
        }
        return target;
      },
      _getFirstPointerId(evt) {
        if (!evt.touches) {
          return evt.pointerId || 999;
        } else {
          return evt.changedTouches[0].identifier;
        }
      },
      releaseCanvas(...canvases) {
        if (!Global_1.Konva.releaseCanvasOnDestroy) return;
        canvases.forEach((c) => {
          c.width = 0;
          c.height = 0;
        });
      },
      drawRoundedRectPath(context, width, height, cornerRadius) {
        let topLeft = 0;
        let topRight = 0;
        let bottomLeft = 0;
        let bottomRight = 0;
        if (typeof cornerRadius === "number") {
          topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius, width / 2, height / 2);
        } else {
          topLeft = Math.min(cornerRadius[0] || 0, width / 2, height / 2);
          topRight = Math.min(cornerRadius[1] || 0, width / 2, height / 2);
          bottomRight = Math.min(cornerRadius[2] || 0, width / 2, height / 2);
          bottomLeft = Math.min(cornerRadius[3] || 0, width / 2, height / 2);
        }
        context.moveTo(topLeft, 0);
        context.lineTo(width - topRight, 0);
        context.arc(width - topRight, topRight, topRight, Math.PI * 3 / 2, 0, false);
        context.lineTo(width, height - bottomRight);
        context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
        context.lineTo(bottomLeft, height);
        context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
        context.lineTo(0, topLeft);
        context.arc(topLeft, topLeft, topLeft, Math.PI, Math.PI * 3 / 2, false);
      }
    };
  }
});

// node_modules/konva/lib/Validators.js
var require_Validators = __commonJS({
  "node_modules/konva/lib/Validators.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RGBComponent = RGBComponent;
    exports.alphaComponent = alphaComponent;
    exports.getNumberValidator = getNumberValidator;
    exports.getNumberOrArrayOfNumbersValidator = getNumberOrArrayOfNumbersValidator;
    exports.getNumberOrAutoValidator = getNumberOrAutoValidator;
    exports.getStringValidator = getStringValidator;
    exports.getStringOrGradientValidator = getStringOrGradientValidator;
    exports.getFunctionValidator = getFunctionValidator;
    exports.getNumberArrayValidator = getNumberArrayValidator;
    exports.getBooleanValidator = getBooleanValidator;
    exports.getComponentValidator = getComponentValidator;
    var Global_1 = require_Global();
    var Util_1 = require_Util();
    function _formatValue(val) {
      if (Util_1.Util._isString(val)) {
        return '"' + val + '"';
      }
      if (Object.prototype.toString.call(val) === "[object Number]") {
        return val;
      }
      if (Util_1.Util._isBoolean(val)) {
        return val;
      }
      return Object.prototype.toString.call(val);
    }
    function RGBComponent(val) {
      if (val > 255) {
        return 255;
      } else if (val < 0) {
        return 0;
      }
      return Math.round(val);
    }
    function alphaComponent(val) {
      if (val > 1) {
        return 1;
      } else if (val < 1e-4) {
        return 1e-4;
      }
      return val;
    }
    function getNumberValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          if (!Util_1.Util._isNumber(val)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number.');
          }
          return val;
        };
      }
    }
    function getNumberOrArrayOfNumbersValidator(noOfElements) {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          let isNumber = Util_1.Util._isNumber(val);
          let isValidArray = Util_1.Util._isArray(val) && val.length == noOfElements;
          if (!isNumber && !isValidArray) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number or Array<number>(' + noOfElements + ")");
          }
          return val;
        };
      }
    }
    function getNumberOrAutoValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          var isNumber = Util_1.Util._isNumber(val);
          var isAuto = val === "auto";
          if (!(isNumber || isAuto)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number or "auto".');
          }
          return val;
        };
      }
    }
    function getStringValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          if (!Util_1.Util._isString(val)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a string.');
          }
          return val;
        };
      }
    }
    function getStringOrGradientValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          const isString = Util_1.Util._isString(val);
          const isGradient = Object.prototype.toString.call(val) === "[object CanvasGradient]" || val && val["addColorStop"];
          if (!(isString || isGradient)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a string or a native gradient.');
          }
          return val;
        };
      }
    }
    function getFunctionValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          if (!Util_1.Util._isFunction(val)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a function.');
          }
          return val;
        };
      }
    }
    function getNumberArrayValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          const TypedArray = Int8Array ? Object.getPrototypeOf(Int8Array) : null;
          if (TypedArray && val instanceof TypedArray) {
            return val;
          }
          if (!Util_1.Util._isArray(val)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a array of numbers.');
          } else {
            val.forEach(function(item) {
              if (!Util_1.Util._isNumber(item)) {
                Util_1.Util.warn('"' + attr + '" attribute has non numeric element ' + item + ". Make sure that all elements are numbers.");
              }
            });
          }
          return val;
        };
      }
    }
    function getBooleanValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          var isBool = val === true || val === false;
          if (!isBool) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a boolean.');
          }
          return val;
        };
      }
    }
    function getComponentValidator(components) {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          if (val === void 0 || val === null) {
            return val;
          }
          if (!Util_1.Util.isObject(val)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be an object with properties ' + components);
          }
          return val;
        };
      }
    }
  }
});

// node_modules/konva/lib/Factory.js
var require_Factory = __commonJS({
  "node_modules/konva/lib/Factory.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Factory = void 0;
    var Util_1 = require_Util();
    var Validators_1 = require_Validators();
    var GET = "get";
    var SET = "set";
    exports.Factory = {
      addGetterSetter(constructor, attr, def, validator, after) {
        exports.Factory.addGetter(constructor, attr, def);
        exports.Factory.addSetter(constructor, attr, validator, after);
        exports.Factory.addOverloadedGetterSetter(constructor, attr);
      },
      addGetter(constructor, attr, def) {
        var method = GET + Util_1.Util._capitalize(attr);
        constructor.prototype[method] = constructor.prototype[method] || function() {
          const val = this.attrs[attr];
          return val === void 0 ? def : val;
        };
      },
      addSetter(constructor, attr, validator, after) {
        var method = SET + Util_1.Util._capitalize(attr);
        if (!constructor.prototype[method]) {
          exports.Factory.overWriteSetter(constructor, attr, validator, after);
        }
      },
      overWriteSetter(constructor, attr, validator, after) {
        var method = SET + Util_1.Util._capitalize(attr);
        constructor.prototype[method] = function(val) {
          if (validator && val !== void 0 && val !== null) {
            val = validator.call(this, val, attr);
          }
          this._setAttr(attr, val);
          if (after) {
            after.call(this);
          }
          return this;
        };
      },
      addComponentsGetterSetter(constructor, attr, components, validator, after) {
        const len = components.length, capitalize = Util_1.Util._capitalize, getter = GET + capitalize(attr), setter = SET + capitalize(attr);
        constructor.prototype[getter] = function() {
          const ret = {};
          for (let n = 0; n < len; n++) {
            const component = components[n];
            ret[component] = this.getAttr(attr + capitalize(component));
          }
          return ret;
        };
        const basicValidator = (0, Validators_1.getComponentValidator)(components);
        constructor.prototype[setter] = function(val) {
          const oldVal = this.attrs[attr];
          if (validator) {
            val = validator.call(this, val, attr);
          }
          if (basicValidator) {
            basicValidator.call(this, val, attr);
          }
          for (const key in val) {
            if (!val.hasOwnProperty(key)) {
              continue;
            }
            this._setAttr(attr + capitalize(key), val[key]);
          }
          if (!val) {
            components.forEach((component) => {
              this._setAttr(attr + capitalize(component), void 0);
            });
          }
          this._fireChangeEvent(attr, oldVal, val);
          if (after) {
            after.call(this);
          }
          return this;
        };
        exports.Factory.addOverloadedGetterSetter(constructor, attr);
      },
      addOverloadedGetterSetter(constructor, attr) {
        var capitalizedAttr = Util_1.Util._capitalize(attr), setter = SET + capitalizedAttr, getter = GET + capitalizedAttr;
        constructor.prototype[attr] = function() {
          if (arguments.length) {
            this[setter](arguments[0]);
            return this;
          }
          return this[getter]();
        };
      },
      addDeprecatedGetterSetter(constructor, attr, def, validator) {
        Util_1.Util.error("Adding deprecated " + attr);
        const method = GET + Util_1.Util._capitalize(attr);
        const message = attr + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
        constructor.prototype[method] = function() {
          Util_1.Util.error(message);
          const val = this.attrs[attr];
          return val === void 0 ? def : val;
        };
        exports.Factory.addSetter(constructor, attr, validator, function() {
          Util_1.Util.error(message);
        });
        exports.Factory.addOverloadedGetterSetter(constructor, attr);
      },
      backCompat(constructor, methods) {
        Util_1.Util.each(methods, function(oldMethodName, newMethodName) {
          const method = constructor.prototype[newMethodName];
          const oldGetter = GET + Util_1.Util._capitalize(oldMethodName);
          const oldSetter = SET + Util_1.Util._capitalize(oldMethodName);
          function deprecated() {
            method.apply(this, arguments);
            Util_1.Util.error('"' + oldMethodName + '" method is deprecated and will be removed soon. Use ""' + newMethodName + '" instead.');
          }
          constructor.prototype[oldMethodName] = deprecated;
          constructor.prototype[oldGetter] = deprecated;
          constructor.prototype[oldSetter] = deprecated;
        });
      },
      afterSetFilter() {
        this._filterUpToDate = false;
      }
    };
  }
});

// node_modules/konva/lib/Context.js
var require_Context = __commonJS({
  "node_modules/konva/lib/Context.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.HitContext = exports.SceneContext = exports.Context = void 0;
    var Util_1 = require_Util();
    var Global_1 = require_Global();
    function simplifyArray(arr) {
      const retArr = [], len = arr.length, util = Util_1.Util;
      for (let n = 0; n < len; n++) {
        let val = arr[n];
        if (util._isNumber(val)) {
          val = Math.round(val * 1e3) / 1e3;
        } else if (!util._isString(val)) {
          val = val + "";
        }
        retArr.push(val);
      }
      return retArr;
    }
    var COMMA = ",";
    var OPEN_PAREN = "(";
    var CLOSE_PAREN = ")";
    var OPEN_PAREN_BRACKET = "([";
    var CLOSE_BRACKET_PAREN = "])";
    var SEMICOLON = ";";
    var DOUBLE_PAREN = "()";
    var EQUALS = "=";
    var CONTEXT_METHODS = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createLinearGradient", "createPattern", "createRadialGradient", "drawImage", "ellipse", "fill", "fillText", "getImageData", "createImageData", "lineTo", "moveTo", "putImageData", "quadraticCurveTo", "rect", "roundRect", "restore", "rotate", "save", "scale", "setLineDash", "setTransform", "stroke", "strokeText", "transform", "translate"];
    var CONTEXT_PROPERTIES = ["fillStyle", "strokeStyle", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "letterSpacing", "lineCap", "lineDashOffset", "lineJoin", "lineWidth", "miterLimit", "direction", "font", "textAlign", "textBaseline", "globalAlpha", "globalCompositeOperation", "imageSmoothingEnabled"];
    var traceArrMax = 100;
    var Context = class {
      constructor(canvas) {
        this.canvas = canvas;
        if (Global_1.Konva.enableTrace) {
          this.traceArr = [];
          this._enableTrace();
        }
      }
      fillShape(shape) {
        if (shape.fillEnabled()) {
          this._fill(shape);
        }
      }
      _fill(shape) {
      }
      strokeShape(shape) {
        if (shape.hasStroke()) {
          this._stroke(shape);
        }
      }
      _stroke(shape) {
      }
      fillStrokeShape(shape) {
        if (shape.attrs.fillAfterStrokeEnabled) {
          this.strokeShape(shape);
          this.fillShape(shape);
        } else {
          this.fillShape(shape);
          this.strokeShape(shape);
        }
      }
      getTrace(relaxed, rounded) {
        let traceArr = this.traceArr, len = traceArr.length, str = "", n, trace, method, args;
        for (n = 0; n < len; n++) {
          trace = traceArr[n];
          method = trace.method;
          if (method) {
            args = trace.args;
            str += method;
            if (relaxed) {
              str += DOUBLE_PAREN;
            } else {
              if (Util_1.Util._isArray(args[0])) {
                str += OPEN_PAREN_BRACKET + args.join(COMMA) + CLOSE_BRACKET_PAREN;
              } else {
                if (rounded) {
                  args = args.map((a) => typeof a === "number" ? Math.floor(a) : a);
                }
                str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
              }
            }
          } else {
            str += trace.property;
            if (!relaxed) {
              str += EQUALS + trace.val;
            }
          }
          str += SEMICOLON;
        }
        return str;
      }
      clearTrace() {
        this.traceArr = [];
      }
      _trace(str) {
        let traceArr = this.traceArr, len;
        traceArr.push(str);
        len = traceArr.length;
        if (len >= traceArrMax) {
          traceArr.shift();
        }
      }
      reset() {
        const pixelRatio = this.getCanvas().getPixelRatio();
        this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
      }
      getCanvas() {
        return this.canvas;
      }
      clear(bounds) {
        const canvas = this.getCanvas();
        if (bounds) {
          this.clearRect(bounds.x || 0, bounds.y || 0, bounds.width || 0, bounds.height || 0);
        } else {
          this.clearRect(0, 0, canvas.getWidth() / canvas.pixelRatio, canvas.getHeight() / canvas.pixelRatio);
        }
      }
      _applyLineCap(shape) {
        const lineCap = shape.attrs.lineCap;
        if (lineCap) {
          this.setAttr("lineCap", lineCap);
        }
      }
      _applyOpacity(shape) {
        const absOpacity = shape.getAbsoluteOpacity();
        if (absOpacity !== 1) {
          this.setAttr("globalAlpha", absOpacity);
        }
      }
      _applyLineJoin(shape) {
        const lineJoin = shape.attrs.lineJoin;
        if (lineJoin) {
          this.setAttr("lineJoin", lineJoin);
        }
      }
      setAttr(attr, val) {
        this._context[attr] = val;
      }
      arc(x, y, radius, startAngle, endAngle, counterClockwise) {
        this._context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
      }
      arcTo(x1, y1, x2, y2, radius) {
        this._context.arcTo(x1, y1, x2, y2, radius);
      }
      beginPath() {
        this._context.beginPath();
      }
      bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        this._context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      }
      clearRect(x, y, width, height) {
        this._context.clearRect(x, y, width, height);
      }
      clip(...args) {
        this._context.clip.apply(this._context, args);
      }
      closePath() {
        this._context.closePath();
      }
      createImageData(width, height) {
        const a = arguments;
        if (a.length === 2) {
          return this._context.createImageData(width, height);
        } else if (a.length === 1) {
          return this._context.createImageData(width);
        }
      }
      createLinearGradient(x0, y0, x1, y1) {
        return this._context.createLinearGradient(x0, y0, x1, y1);
      }
      createPattern(image, repetition) {
        return this._context.createPattern(image, repetition);
      }
      createRadialGradient(x0, y0, r0, x1, y1, r1) {
        return this._context.createRadialGradient(x0, y0, r0, x1, y1, r1);
      }
      drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        const a = arguments, _context = this._context;
        if (a.length === 3) {
          _context.drawImage(image, sx, sy);
        } else if (a.length === 5) {
          _context.drawImage(image, sx, sy, sWidth, sHeight);
        } else if (a.length === 9) {
          _context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        }
      }
      ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) {
        this._context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise);
      }
      isPointInPath(x, y, path, fillRule) {
        if (path) {
          return this._context.isPointInPath(path, x, y, fillRule);
        }
        return this._context.isPointInPath(x, y, fillRule);
      }
      fill(...args) {
        this._context.fill.apply(this._context, args);
      }
      fillRect(x, y, width, height) {
        this._context.fillRect(x, y, width, height);
      }
      strokeRect(x, y, width, height) {
        this._context.strokeRect(x, y, width, height);
      }
      fillText(text, x, y, maxWidth) {
        if (maxWidth) {
          this._context.fillText(text, x, y, maxWidth);
        } else {
          this._context.fillText(text, x, y);
        }
      }
      measureText(text) {
        return this._context.measureText(text);
      }
      getImageData(sx, sy, sw, sh) {
        return this._context.getImageData(sx, sy, sw, sh);
      }
      lineTo(x, y) {
        this._context.lineTo(x, y);
      }
      moveTo(x, y) {
        this._context.moveTo(x, y);
      }
      rect(x, y, width, height) {
        this._context.rect(x, y, width, height);
      }
      roundRect(x, y, width, height, radii) {
        this._context.roundRect(x, y, width, height, radii);
      }
      putImageData(imageData, dx, dy) {
        this._context.putImageData(imageData, dx, dy);
      }
      quadraticCurveTo(cpx, cpy, x, y) {
        this._context.quadraticCurveTo(cpx, cpy, x, y);
      }
      restore() {
        this._context.restore();
      }
      rotate(angle) {
        this._context.rotate(angle);
      }
      save() {
        this._context.save();
      }
      scale(x, y) {
        this._context.scale(x, y);
      }
      setLineDash(segments) {
        if (this._context.setLineDash) {
          this._context.setLineDash(segments);
        } else if ("mozDash" in this._context) {
          this._context["mozDash"] = segments;
        } else if ("webkitLineDash" in this._context) {
          this._context["webkitLineDash"] = segments;
        }
      }
      getLineDash() {
        return this._context.getLineDash();
      }
      setTransform(a, b, c, d, e, f) {
        this._context.setTransform(a, b, c, d, e, f);
      }
      stroke(path2d) {
        if (path2d) {
          this._context.stroke(path2d);
        } else {
          this._context.stroke();
        }
      }
      strokeText(text, x, y, maxWidth) {
        this._context.strokeText(text, x, y, maxWidth);
      }
      transform(a, b, c, d, e, f) {
        this._context.transform(a, b, c, d, e, f);
      }
      translate(x, y) {
        this._context.translate(x, y);
      }
      _enableTrace() {
        let that = this, len = CONTEXT_METHODS.length, origSetter = this.setAttr, n, args;
        const func = function(methodName) {
          let origMethod = that[methodName], ret;
          that[methodName] = function() {
            args = simplifyArray(Array.prototype.slice.call(arguments, 0));
            ret = origMethod.apply(that, arguments);
            that._trace({
              method: methodName,
              args
            });
            return ret;
          };
        };
        for (n = 0; n < len; n++) {
          func(CONTEXT_METHODS[n]);
        }
        that.setAttr = function() {
          origSetter.apply(that, arguments);
          const prop = arguments[0];
          let val = arguments[1];
          if (prop === "shadowOffsetX" || prop === "shadowOffsetY" || prop === "shadowBlur") {
            val = val / this.canvas.getPixelRatio();
          }
          that._trace({
            property: prop,
            val
          });
        };
      }
      _applyGlobalCompositeOperation(node) {
        const op = node.attrs.globalCompositeOperation;
        const def = !op || op === "source-over";
        if (!def) {
          this.setAttr("globalCompositeOperation", op);
        }
      }
    };
    exports.Context = Context;
    CONTEXT_PROPERTIES.forEach(function(prop) {
      Object.defineProperty(Context.prototype, prop, {
        get() {
          return this._context[prop];
        },
        set(val) {
          this._context[prop] = val;
        }
      });
    });
    var SceneContext = class extends Context {
      constructor(canvas, {
        willReadFrequently = false
      } = {}) {
        super(canvas);
        this._context = canvas._canvas.getContext("2d", {
          willReadFrequently
        });
      }
      _fillColor(shape) {
        const fill = shape.fill();
        this.setAttr("fillStyle", fill);
        shape._fillFunc(this);
      }
      _fillPattern(shape) {
        this.setAttr("fillStyle", shape._getFillPattern());
        shape._fillFunc(this);
      }
      _fillLinearGradient(shape) {
        const grd = shape._getLinearGradient();
        if (grd) {
          this.setAttr("fillStyle", grd);
          shape._fillFunc(this);
        }
      }
      _fillRadialGradient(shape) {
        const grd = shape._getRadialGradient();
        if (grd) {
          this.setAttr("fillStyle", grd);
          shape._fillFunc(this);
        }
      }
      _fill(shape) {
        const hasColor = shape.fill(), fillPriority = shape.getFillPriority();
        if (hasColor && fillPriority === "color") {
          this._fillColor(shape);
          return;
        }
        const hasPattern = shape.getFillPatternImage();
        if (hasPattern && fillPriority === "pattern") {
          this._fillPattern(shape);
          return;
        }
        const hasLinearGradient = shape.getFillLinearGradientColorStops();
        if (hasLinearGradient && fillPriority === "linear-gradient") {
          this._fillLinearGradient(shape);
          return;
        }
        const hasRadialGradient = shape.getFillRadialGradientColorStops();
        if (hasRadialGradient && fillPriority === "radial-gradient") {
          this._fillRadialGradient(shape);
          return;
        }
        if (hasColor) {
          this._fillColor(shape);
        } else if (hasPattern) {
          this._fillPattern(shape);
        } else if (hasLinearGradient) {
          this._fillLinearGradient(shape);
        } else if (hasRadialGradient) {
          this._fillRadialGradient(shape);
        }
      }
      _strokeLinearGradient(shape) {
        const start = shape.getStrokeLinearGradientStartPoint(), end = shape.getStrokeLinearGradientEndPoint(), colorStops = shape.getStrokeLinearGradientColorStops(), grd = this.createLinearGradient(start.x, start.y, end.x, end.y);
        if (colorStops) {
          for (let n = 0; n < colorStops.length; n += 2) {
            grd.addColorStop(colorStops[n], colorStops[n + 1]);
          }
          this.setAttr("strokeStyle", grd);
        }
      }
      _stroke(shape) {
        const dash = shape.dash(), strokeScaleEnabled = shape.getStrokeScaleEnabled();
        if (shape.hasStroke()) {
          if (!strokeScaleEnabled) {
            this.save();
            const pixelRatio = this.getCanvas().getPixelRatio();
            this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          }
          this._applyLineCap(shape);
          if (dash && shape.dashEnabled()) {
            this.setLineDash(dash);
            this.setAttr("lineDashOffset", shape.dashOffset());
          }
          this.setAttr("lineWidth", shape.strokeWidth());
          if (!shape.getShadowForStrokeEnabled()) {
            this.setAttr("shadowColor", "rgba(0,0,0,0)");
          }
          const hasLinearGradient = shape.getStrokeLinearGradientColorStops();
          if (hasLinearGradient) {
            this._strokeLinearGradient(shape);
          } else {
            this.setAttr("strokeStyle", shape.stroke());
          }
          shape._strokeFunc(this);
          if (!strokeScaleEnabled) {
            this.restore();
          }
        }
      }
      _applyShadow(shape) {
        var _a, _b, _c;
        const color = (_a = shape.getShadowRGBA()) !== null && _a !== void 0 ? _a : "black", blur = (_b = shape.getShadowBlur()) !== null && _b !== void 0 ? _b : 5, offset = (_c = shape.getShadowOffset()) !== null && _c !== void 0 ? _c : {
          x: 0,
          y: 0
        }, scale = shape.getAbsoluteScale(), ratio = this.canvas.getPixelRatio(), scaleX = scale.x * ratio, scaleY = scale.y * ratio;
        this.setAttr("shadowColor", color);
        this.setAttr("shadowBlur", blur * Math.min(Math.abs(scaleX), Math.abs(scaleY)));
        this.setAttr("shadowOffsetX", offset.x * scaleX);
        this.setAttr("shadowOffsetY", offset.y * scaleY);
      }
    };
    exports.SceneContext = SceneContext;
    var HitContext = class extends Context {
      constructor(canvas) {
        super(canvas);
        this._context = canvas._canvas.getContext("2d", {
          willReadFrequently: true
        });
      }
      _fill(shape) {
        this.save();
        this.setAttr("fillStyle", shape.colorKey);
        shape._fillFuncHit(this);
        this.restore();
      }
      strokeShape(shape) {
        if (shape.hasHitStroke()) {
          this._stroke(shape);
        }
      }
      _stroke(shape) {
        if (shape.hasHitStroke()) {
          const strokeScaleEnabled = shape.getStrokeScaleEnabled();
          if (!strokeScaleEnabled) {
            this.save();
            const pixelRatio = this.getCanvas().getPixelRatio();
            this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          }
          this._applyLineCap(shape);
          const hitStrokeWidth = shape.hitStrokeWidth();
          const strokeWidth = hitStrokeWidth === "auto" ? shape.strokeWidth() : hitStrokeWidth;
          this.setAttr("lineWidth", strokeWidth);
          this.setAttr("strokeStyle", shape.colorKey);
          shape._strokeFuncHit(this);
          if (!strokeScaleEnabled) {
            this.restore();
          }
        }
      }
    };
    exports.HitContext = HitContext;
  }
});

// node_modules/konva/lib/Canvas.js
var require_Canvas = __commonJS({
  "node_modules/konva/lib/Canvas.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.HitCanvas = exports.SceneCanvas = exports.Canvas = void 0;
    var Util_1 = require_Util();
    var Context_1 = require_Context();
    var Global_1 = require_Global();
    var _pixelRatio;
    function getDevicePixelRatio() {
      if (_pixelRatio) {
        return _pixelRatio;
      }
      const canvas = Util_1.Util.createCanvasElement();
      const context = canvas.getContext("2d");
      _pixelRatio = function() {
        const devicePixelRatio = Global_1.Konva._global.devicePixelRatio || 1, backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
        return devicePixelRatio / backingStoreRatio;
      }();
      Util_1.Util.releaseCanvas(canvas);
      return _pixelRatio;
    }
    var Canvas = class {
      constructor(config) {
        this.pixelRatio = 1;
        this.width = 0;
        this.height = 0;
        this.isCache = false;
        const conf = config || {};
        const pixelRatio = conf.pixelRatio || Global_1.Konva.pixelRatio || getDevicePixelRatio();
        this.pixelRatio = pixelRatio;
        this._canvas = Util_1.Util.createCanvasElement();
        this._canvas.style.padding = "0";
        this._canvas.style.margin = "0";
        this._canvas.style.border = "0";
        this._canvas.style.background = "transparent";
        this._canvas.style.position = "absolute";
        this._canvas.style.top = "0";
        this._canvas.style.left = "0";
      }
      getContext() {
        return this.context;
      }
      getPixelRatio() {
        return this.pixelRatio;
      }
      setPixelRatio(pixelRatio) {
        const previousRatio = this.pixelRatio;
        this.pixelRatio = pixelRatio;
        this.setSize(this.getWidth() / previousRatio, this.getHeight() / previousRatio);
      }
      setWidth(width) {
        this.width = this._canvas.width = width * this.pixelRatio;
        this._canvas.style.width = width + "px";
        const pixelRatio = this.pixelRatio, _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);
      }
      setHeight(height) {
        this.height = this._canvas.height = height * this.pixelRatio;
        this._canvas.style.height = height + "px";
        const pixelRatio = this.pixelRatio, _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);
      }
      getWidth() {
        return this.width;
      }
      getHeight() {
        return this.height;
      }
      setSize(width, height) {
        this.setWidth(width || 0);
        this.setHeight(height || 0);
      }
      toDataURL(mimeType, quality) {
        try {
          return this._canvas.toDataURL(mimeType, quality);
        } catch (e) {
          try {
            return this._canvas.toDataURL();
          } catch (err) {
            Util_1.Util.error("Unable to get data URL. " + err.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html.");
            return "";
          }
        }
      }
    };
    exports.Canvas = Canvas;
    var SceneCanvas = class extends Canvas {
      constructor(config = {
        width: 0,
        height: 0,
        willReadFrequently: false
      }) {
        super(config);
        this.context = new Context_1.SceneContext(this, {
          willReadFrequently: config.willReadFrequently
        });
        this.setSize(config.width, config.height);
      }
    };
    exports.SceneCanvas = SceneCanvas;
    var HitCanvas = class extends Canvas {
      constructor(config = {
        width: 0,
        height: 0
      }) {
        super(config);
        this.hitCanvas = true;
        this.context = new Context_1.HitContext(this);
        this.setSize(config.width, config.height);
      }
    };
    exports.HitCanvas = HitCanvas;
  }
});

// node_modules/konva/lib/DragAndDrop.js
var require_DragAndDrop = __commonJS({
  "node_modules/konva/lib/DragAndDrop.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DD = void 0;
    var Global_1 = require_Global();
    var Util_1 = require_Util();
    exports.DD = {
      get isDragging() {
        let flag = false;
        exports.DD._dragElements.forEach((elem) => {
          if (elem.dragStatus === "dragging") {
            flag = true;
          }
        });
        return flag;
      },
      justDragged: false,
      get node() {
        let node;
        exports.DD._dragElements.forEach((elem) => {
          node = elem.node;
        });
        return node;
      },
      _dragElements: /* @__PURE__ */ new Map(),
      _drag(evt) {
        const nodesToFireEvents = [];
        exports.DD._dragElements.forEach((elem, key) => {
          const {
            node
          } = elem;
          const stage = node.getStage();
          stage.setPointersPositions(evt);
          if (elem.pointerId === void 0) {
            elem.pointerId = Util_1.Util._getFirstPointerId(evt);
          }
          const pos = stage._changedPointerPositions.find((pos2) => pos2.id === elem.pointerId);
          if (!pos) {
            return;
          }
          if (elem.dragStatus !== "dragging") {
            const dragDistance = node.dragDistance();
            const distance = Math.max(Math.abs(pos.x - elem.startPointerPos.x), Math.abs(pos.y - elem.startPointerPos.y));
            if (distance < dragDistance) {
              return;
            }
            node.startDrag({
              evt
            });
            if (!node.isDragging()) {
              return;
            }
          }
          node._setDragPosition(evt, elem);
          nodesToFireEvents.push(node);
        });
        nodesToFireEvents.forEach((node) => {
          node.fire("dragmove", {
            type: "dragmove",
            target: node,
            evt
          }, true);
        });
      },
      _endDragBefore(evt) {
        const drawNodes = [];
        exports.DD._dragElements.forEach((elem) => {
          const {
            node
          } = elem;
          const stage = node.getStage();
          if (evt) {
            stage.setPointersPositions(evt);
          }
          const pos = stage._changedPointerPositions.find((pos2) => pos2.id === elem.pointerId);
          if (!pos) {
            return;
          }
          if (elem.dragStatus === "dragging" || elem.dragStatus === "stopped") {
            exports.DD.justDragged = true;
            Global_1.Konva._mouseListenClick = false;
            Global_1.Konva._touchListenClick = false;
            Global_1.Konva._pointerListenClick = false;
            elem.dragStatus = "stopped";
          }
          const drawNode = elem.node.getLayer() || elem.node instanceof Global_1.Konva["Stage"] && elem.node;
          if (drawNode && drawNodes.indexOf(drawNode) === -1) {
            drawNodes.push(drawNode);
          }
        });
        drawNodes.forEach((drawNode) => {
          drawNode.draw();
        });
      },
      _endDragAfter(evt) {
        exports.DD._dragElements.forEach((elem, key) => {
          if (elem.dragStatus === "stopped") {
            elem.node.fire("dragend", {
              type: "dragend",
              target: elem.node,
              evt
            }, true);
          }
          if (elem.dragStatus !== "dragging") {
            exports.DD._dragElements.delete(key);
          }
        });
      }
    };
    if (Global_1.Konva.isBrowser) {
      window.addEventListener("mouseup", exports.DD._endDragBefore, true);
      window.addEventListener("touchend", exports.DD._endDragBefore, true);
      window.addEventListener("touchcancel", exports.DD._endDragBefore, true);
      window.addEventListener("mousemove", exports.DD._drag);
      window.addEventListener("touchmove", exports.DD._drag);
      window.addEventListener("mouseup", exports.DD._endDragAfter, false);
      window.addEventListener("touchend", exports.DD._endDragAfter, false);
      window.addEventListener("touchcancel", exports.DD._endDragAfter, false);
    }
  }
});

// node_modules/konva/lib/Node.js
var require_Node = __commonJS({
  "node_modules/konva/lib/Node.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Node = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Canvas_1 = require_Canvas();
    var Global_1 = require_Global();
    var DragAndDrop_1 = require_DragAndDrop();
    var Validators_1 = require_Validators();
    var ABSOLUTE_OPACITY = "absoluteOpacity";
    var ALL_LISTENERS = "allEventListeners";
    var ABSOLUTE_TRANSFORM = "absoluteTransform";
    var ABSOLUTE_SCALE = "absoluteScale";
    var CANVAS = "canvas";
    var CHANGE = "Change";
    var CHILDREN = "children";
    var KONVA = "konva";
    var LISTENING = "listening";
    var MOUSEENTER = "mouseenter";
    var MOUSELEAVE = "mouseleave";
    var SET = "set";
    var SHAPE = "Shape";
    var SPACE = " ";
    var STAGE = "stage";
    var TRANSFORM = "transform";
    var UPPER_STAGE = "Stage";
    var VISIBLE = "visible";
    var TRANSFORM_CHANGE_STR = ["xChange.konva", "yChange.konva", "scaleXChange.konva", "scaleYChange.konva", "skewXChange.konva", "skewYChange.konva", "rotationChange.konva", "offsetXChange.konva", "offsetYChange.konva", "transformsEnabledChange.konva"].join(SPACE);
    var idCounter = 1;
    var Node = class _Node {
      constructor(config) {
        this._id = idCounter++;
        this.eventListeners = {};
        this.attrs = {};
        this.index = 0;
        this._allEventListeners = null;
        this.parent = null;
        this._cache = /* @__PURE__ */ new Map();
        this._attachedDepsListeners = /* @__PURE__ */ new Map();
        this._lastPos = null;
        this._batchingTransformChange = false;
        this._needClearTransformCache = false;
        this._filterUpToDate = false;
        this._isUnderCache = false;
        this._dragEventId = null;
        this._shouldFireChangeEvents = false;
        this.setAttrs(config);
        this._shouldFireChangeEvents = true;
      }
      hasChildren() {
        return false;
      }
      _clearCache(attr) {
        if ((attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM) && this._cache.get(attr)) {
          this._cache.get(attr).dirty = true;
        } else if (attr) {
          this._cache.delete(attr);
        } else {
          this._cache.clear();
        }
      }
      _getCache(attr, privateGetter) {
        let cache = this._cache.get(attr);
        const isTransform = attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM;
        const invalid = cache === void 0 || isTransform && cache.dirty === true;
        if (invalid) {
          cache = privateGetter.call(this);
          this._cache.set(attr, cache);
        }
        return cache;
      }
      _calculate(name, deps, getter) {
        if (!this._attachedDepsListeners.get(name)) {
          const depsString = deps.map((dep) => dep + "Change.konva").join(SPACE);
          this.on(depsString, () => {
            this._clearCache(name);
          });
          this._attachedDepsListeners.set(name, true);
        }
        return this._getCache(name, getter);
      }
      _getCanvasCache() {
        return this._cache.get(CANVAS);
      }
      _clearSelfAndDescendantCache(attr) {
        this._clearCache(attr);
        if (attr === ABSOLUTE_TRANSFORM) {
          this.fire("absoluteTransformChange");
        }
      }
      clearCache() {
        if (this._cache.has(CANVAS)) {
          const {
            scene,
            filter,
            hit
          } = this._cache.get(CANVAS);
          Util_1.Util.releaseCanvas(scene, filter, hit);
          this._cache.delete(CANVAS);
        }
        this._clearSelfAndDescendantCache();
        this._requestDraw();
        return this;
      }
      cache(config) {
        const conf = config || {};
        let rect = {};
        if (conf.x === void 0 || conf.y === void 0 || conf.width === void 0 || conf.height === void 0) {
          rect = this.getClientRect({
            skipTransform: true,
            relativeTo: this.getParent() || void 0
          });
        }
        let width = Math.ceil(conf.width || rect.width), height = Math.ceil(conf.height || rect.height), pixelRatio = conf.pixelRatio, x = conf.x === void 0 ? Math.floor(rect.x) : conf.x, y = conf.y === void 0 ? Math.floor(rect.y) : conf.y, offset = conf.offset || 0, drawBorder = conf.drawBorder || false, hitCanvasPixelRatio = conf.hitCanvasPixelRatio || 1;
        if (!width || !height) {
          Util_1.Util.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.");
          return;
        }
        const extraPaddingX = Math.abs(Math.round(rect.x) - x) > 0.5 ? 1 : 0;
        const extraPaddingY = Math.abs(Math.round(rect.y) - y) > 0.5 ? 1 : 0;
        width += offset * 2 + extraPaddingX;
        height += offset * 2 + extraPaddingY;
        x -= offset;
        y -= offset;
        const cachedSceneCanvas = new Canvas_1.SceneCanvas({
          pixelRatio,
          width,
          height
        }), cachedFilterCanvas = new Canvas_1.SceneCanvas({
          pixelRatio,
          width: 0,
          height: 0,
          willReadFrequently: true
        }), cachedHitCanvas = new Canvas_1.HitCanvas({
          pixelRatio: hitCanvasPixelRatio,
          width,
          height
        }), sceneContext = cachedSceneCanvas.getContext(), hitContext = cachedHitCanvas.getContext();
        cachedHitCanvas.isCache = true;
        cachedSceneCanvas.isCache = true;
        this._cache.delete(CANVAS);
        this._filterUpToDate = false;
        if (conf.imageSmoothingEnabled === false) {
          cachedSceneCanvas.getContext()._context.imageSmoothingEnabled = false;
          cachedFilterCanvas.getContext()._context.imageSmoothingEnabled = false;
        }
        sceneContext.save();
        hitContext.save();
        sceneContext.translate(-x, -y);
        hitContext.translate(-x, -y);
        this._isUnderCache = true;
        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
        this.drawScene(cachedSceneCanvas, this);
        this.drawHit(cachedHitCanvas, this);
        this._isUnderCache = false;
        sceneContext.restore();
        hitContext.restore();
        if (drawBorder) {
          sceneContext.save();
          sceneContext.beginPath();
          sceneContext.rect(0, 0, width, height);
          sceneContext.closePath();
          sceneContext.setAttr("strokeStyle", "red");
          sceneContext.setAttr("lineWidth", 5);
          sceneContext.stroke();
          sceneContext.restore();
        }
        this._cache.set(CANVAS, {
          scene: cachedSceneCanvas,
          filter: cachedFilterCanvas,
          hit: cachedHitCanvas,
          x,
          y
        });
        this._requestDraw();
        return this;
      }
      isCached() {
        return this._cache.has(CANVAS);
      }
      getClientRect(config) {
        throw new Error('abstract "getClientRect" method call');
      }
      _transformedRect(rect, top) {
        const points = [{
          x: rect.x,
          y: rect.y
        }, {
          x: rect.x + rect.width,
          y: rect.y
        }, {
          x: rect.x + rect.width,
          y: rect.y + rect.height
        }, {
          x: rect.x,
          y: rect.y + rect.height
        }];
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        const trans = this.getAbsoluteTransform(top);
        points.forEach(function(point) {
          const transformed = trans.point(point);
          if (minX === void 0) {
            minX = maxX = transformed.x;
            minY = maxY = transformed.y;
          }
          minX = Math.min(minX, transformed.x);
          minY = Math.min(minY, transformed.y);
          maxX = Math.max(maxX, transformed.x);
          maxY = Math.max(maxY, transformed.y);
        });
        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      }
      _drawCachedSceneCanvas(context) {
        context.save();
        context._applyOpacity(this);
        context._applyGlobalCompositeOperation(this);
        const canvasCache = this._getCanvasCache();
        context.translate(canvasCache.x, canvasCache.y);
        const cacheCanvas = this._getCachedSceneCanvas();
        const ratio = cacheCanvas.pixelRatio;
        context.drawImage(cacheCanvas._canvas, 0, 0, cacheCanvas.width / ratio, cacheCanvas.height / ratio);
        context.restore();
      }
      _drawCachedHitCanvas(context) {
        const canvasCache = this._getCanvasCache(), hitCanvas = canvasCache.hit;
        context.save();
        context.translate(canvasCache.x, canvasCache.y);
        context.drawImage(hitCanvas._canvas, 0, 0, hitCanvas.width / hitCanvas.pixelRatio, hitCanvas.height / hitCanvas.pixelRatio);
        context.restore();
      }
      _getCachedSceneCanvas() {
        let filters = this.filters(), cachedCanvas = this._getCanvasCache(), sceneCanvas = cachedCanvas.scene, filterCanvas = cachedCanvas.filter, filterContext = filterCanvas.getContext(), len, imageData, n, filter;
        if (filters) {
          if (!this._filterUpToDate) {
            const ratio = sceneCanvas.pixelRatio;
            filterCanvas.setSize(sceneCanvas.width / sceneCanvas.pixelRatio, sceneCanvas.height / sceneCanvas.pixelRatio);
            try {
              len = filters.length;
              filterContext.clear();
              filterContext.drawImage(sceneCanvas._canvas, 0, 0, sceneCanvas.getWidth() / ratio, sceneCanvas.getHeight() / ratio);
              imageData = filterContext.getImageData(0, 0, filterCanvas.getWidth(), filterCanvas.getHeight());
              for (n = 0; n < len; n++) {
                filter = filters[n];
                if (typeof filter !== "function") {
                  Util_1.Util.error("Filter should be type of function, but got " + typeof filter + " instead. Please check correct filters");
                  continue;
                }
                filter.call(this, imageData);
                filterContext.putImageData(imageData, 0, 0);
              }
            } catch (e) {
              Util_1.Util.error("Unable to apply filter. " + e.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.");
            }
            this._filterUpToDate = true;
          }
          return filterCanvas;
        }
        return sceneCanvas;
      }
      on(evtStr, handler) {
        this._cache && this._cache.delete(ALL_LISTENERS);
        if (arguments.length === 3) {
          return this._delegate.apply(this, arguments);
        }
        let events = evtStr.split(SPACE), len = events.length, n, event, parts, baseEvent, name;
        for (n = 0; n < len; n++) {
          event = events[n];
          parts = event.split(".");
          baseEvent = parts[0];
          name = parts[1] || "";
          if (!this.eventListeners[baseEvent]) {
            this.eventListeners[baseEvent] = [];
          }
          this.eventListeners[baseEvent].push({
            name,
            handler
          });
        }
        return this;
      }
      off(evtStr, callback) {
        let events = (evtStr || "").split(SPACE), len = events.length, n, t, event, parts, baseEvent, name;
        this._cache && this._cache.delete(ALL_LISTENERS);
        if (!evtStr) {
          for (t in this.eventListeners) {
            this._off(t);
          }
        }
        for (n = 0; n < len; n++) {
          event = events[n];
          parts = event.split(".");
          baseEvent = parts[0];
          name = parts[1];
          if (baseEvent) {
            if (this.eventListeners[baseEvent]) {
              this._off(baseEvent, name, callback);
            }
          } else {
            for (t in this.eventListeners) {
              this._off(t, name, callback);
            }
          }
        }
        return this;
      }
      dispatchEvent(evt) {
        const e = {
          target: this,
          type: evt.type,
          evt
        };
        this.fire(evt.type, e);
        return this;
      }
      addEventListener(type, handler) {
        this.on(type, function(evt) {
          handler.call(this, evt.evt);
        });
        return this;
      }
      removeEventListener(type) {
        this.off(type);
        return this;
      }
      _delegate(event, selector, handler) {
        const stopNode = this;
        this.on(event, function(evt) {
          const targets = evt.target.findAncestors(selector, true, stopNode);
          for (let i = 0; i < targets.length; i++) {
            evt = Util_1.Util.cloneObject(evt);
            evt.currentTarget = targets[i];
            handler.call(targets[i], evt);
          }
        });
      }
      remove() {
        if (this.isDragging()) {
          this.stopDrag();
        }
        DragAndDrop_1.DD._dragElements.delete(this._id);
        this._remove();
        return this;
      }
      _clearCaches() {
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
        this._clearSelfAndDescendantCache(STAGE);
        this._clearSelfAndDescendantCache(VISIBLE);
        this._clearSelfAndDescendantCache(LISTENING);
      }
      _remove() {
        this._clearCaches();
        const parent = this.getParent();
        if (parent && parent.children) {
          parent.children.splice(this.index, 1);
          parent._setChildrenIndices();
          this.parent = null;
        }
      }
      destroy() {
        this.remove();
        this.clearCache();
        return this;
      }
      getAttr(attr) {
        const method = "get" + Util_1.Util._capitalize(attr);
        if (Util_1.Util._isFunction(this[method])) {
          return this[method]();
        }
        return this.attrs[attr];
      }
      getAncestors() {
        let parent = this.getParent(), ancestors = [];
        while (parent) {
          ancestors.push(parent);
          parent = parent.getParent();
        }
        return ancestors;
      }
      getAttrs() {
        return this.attrs || {};
      }
      setAttrs(config) {
        this._batchTransformChanges(() => {
          let key, method;
          if (!config) {
            return this;
          }
          for (key in config) {
            if (key === CHILDREN) {
              continue;
            }
            method = SET + Util_1.Util._capitalize(key);
            if (Util_1.Util._isFunction(this[method])) {
              this[method](config[key]);
            } else {
              this._setAttr(key, config[key]);
            }
          }
        });
        return this;
      }
      isListening() {
        return this._getCache(LISTENING, this._isListening);
      }
      _isListening(relativeTo) {
        const listening = this.listening();
        if (!listening) {
          return false;
        }
        const parent = this.getParent();
        if (parent && parent !== relativeTo && this !== relativeTo) {
          return parent._isListening(relativeTo);
        } else {
          return true;
        }
      }
      isVisible() {
        return this._getCache(VISIBLE, this._isVisible);
      }
      _isVisible(relativeTo) {
        const visible = this.visible();
        if (!visible) {
          return false;
        }
        const parent = this.getParent();
        if (parent && parent !== relativeTo && this !== relativeTo) {
          return parent._isVisible(relativeTo);
        } else {
          return true;
        }
      }
      shouldDrawHit(top, skipDragCheck = false) {
        if (top) {
          return this._isVisible(top) && this._isListening(top);
        }
        const layer = this.getLayer();
        let layerUnderDrag = false;
        DragAndDrop_1.DD._dragElements.forEach((elem) => {
          if (elem.dragStatus !== "dragging") {
            return;
          } else if (elem.node.nodeType === "Stage") {
            layerUnderDrag = true;
          } else if (elem.node.getLayer() === layer) {
            layerUnderDrag = true;
          }
        });
        const dragSkip = !skipDragCheck && !Global_1.Konva.hitOnDragEnabled && (layerUnderDrag || Global_1.Konva.isTransforming());
        return this.isListening() && this.isVisible() && !dragSkip;
      }
      show() {
        this.visible(true);
        return this;
      }
      hide() {
        this.visible(false);
        return this;
      }
      getZIndex() {
        return this.index || 0;
      }
      getAbsoluteZIndex() {
        let depth = this.getDepth(), that = this, index = 0, nodes, len, n, child;
        function addChildren(children) {
          nodes = [];
          len = children.length;
          for (n = 0; n < len; n++) {
            child = children[n];
            index++;
            if (child.nodeType !== SHAPE) {
              nodes = nodes.concat(child.getChildren().slice());
            }
            if (child._id === that._id) {
              n = len;
            }
          }
          if (nodes.length > 0 && nodes[0].getDepth() <= depth) {
            addChildren(nodes);
          }
        }
        const stage = this.getStage();
        if (that.nodeType !== UPPER_STAGE && stage) {
          addChildren(stage.getChildren());
        }
        return index;
      }
      getDepth() {
        let depth = 0, parent = this.parent;
        while (parent) {
          depth++;
          parent = parent.parent;
        }
        return depth;
      }
      _batchTransformChanges(func) {
        this._batchingTransformChange = true;
        func();
        this._batchingTransformChange = false;
        if (this._needClearTransformCache) {
          this._clearCache(TRANSFORM);
          this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        }
        this._needClearTransformCache = false;
      }
      setPosition(pos) {
        this._batchTransformChanges(() => {
          this.x(pos.x);
          this.y(pos.y);
        });
        return this;
      }
      getPosition() {
        return {
          x: this.x(),
          y: this.y()
        };
      }
      getRelativePointerPosition() {
        const stage = this.getStage();
        if (!stage) {
          return null;
        }
        const pos = stage.getPointerPosition();
        if (!pos) {
          return null;
        }
        const transform = this.getAbsoluteTransform().copy();
        transform.invert();
        return transform.point(pos);
      }
      getAbsolutePosition(top) {
        let haveCachedParent = false;
        let parent = this.parent;
        while (parent) {
          if (parent.isCached()) {
            haveCachedParent = true;
            break;
          }
          parent = parent.parent;
        }
        if (haveCachedParent && !top) {
          top = true;
        }
        const absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(), absoluteTransform = new Util_1.Transform(), offset = this.offset();
        absoluteTransform.m = absoluteMatrix.slice();
        absoluteTransform.translate(offset.x, offset.y);
        return absoluteTransform.getTranslation();
      }
      setAbsolutePosition(pos) {
        const _a = this._clearTransform(), {
          x,
          y
        } = _a, origTrans = __objRest(_a, [
          "x",
          "y"
        ]);
        this.attrs.x = x;
        this.attrs.y = y;
        this._clearCache(TRANSFORM);
        const it = this._getAbsoluteTransform().copy();
        it.invert();
        it.translate(pos.x, pos.y);
        pos = {
          x: this.attrs.x + it.getTranslation().x,
          y: this.attrs.y + it.getTranslation().y
        };
        this._setTransform(origTrans);
        this.setPosition({
          x: pos.x,
          y: pos.y
        });
        this._clearCache(TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        return this;
      }
      _setTransform(trans) {
        let key;
        for (key in trans) {
          this.attrs[key] = trans[key];
        }
      }
      _clearTransform() {
        const trans = {
          x: this.x(),
          y: this.y(),
          rotation: this.rotation(),
          scaleX: this.scaleX(),
          scaleY: this.scaleY(),
          offsetX: this.offsetX(),
          offsetY: this.offsetY(),
          skewX: this.skewX(),
          skewY: this.skewY()
        };
        this.attrs.x = 0;
        this.attrs.y = 0;
        this.attrs.rotation = 0;
        this.attrs.scaleX = 1;
        this.attrs.scaleY = 1;
        this.attrs.offsetX = 0;
        this.attrs.offsetY = 0;
        this.attrs.skewX = 0;
        this.attrs.skewY = 0;
        return trans;
      }
      move(change) {
        let changeX = change.x, changeY = change.y, x = this.x(), y = this.y();
        if (changeX !== void 0) {
          x += changeX;
        }
        if (changeY !== void 0) {
          y += changeY;
        }
        this.setPosition({
          x,
          y
        });
        return this;
      }
      _eachAncestorReverse(func, top) {
        let family = [], parent = this.getParent(), len, n;
        if (top && top._id === this._id) {
          return;
        }
        family.unshift(this);
        while (parent && (!top || parent._id !== top._id)) {
          family.unshift(parent);
          parent = parent.parent;
        }
        len = family.length;
        for (n = 0; n < len; n++) {
          func(family[n]);
        }
      }
      rotate(theta) {
        this.rotation(this.rotation() + theta);
        return this;
      }
      moveToTop() {
        if (!this.parent) {
          Util_1.Util.warn("Node has no parent. moveToTop function is ignored.");
          return false;
        }
        const index = this.index, len = this.parent.getChildren().length;
        if (index < len - 1) {
          this.parent.children.splice(index, 1);
          this.parent.children.push(this);
          this.parent._setChildrenIndices();
          return true;
        }
        return false;
      }
      moveUp() {
        if (!this.parent) {
          Util_1.Util.warn("Node has no parent. moveUp function is ignored.");
          return false;
        }
        const index = this.index, len = this.parent.getChildren().length;
        if (index < len - 1) {
          this.parent.children.splice(index, 1);
          this.parent.children.splice(index + 1, 0, this);
          this.parent._setChildrenIndices();
          return true;
        }
        return false;
      }
      moveDown() {
        if (!this.parent) {
          Util_1.Util.warn("Node has no parent. moveDown function is ignored.");
          return false;
        }
        const index = this.index;
        if (index > 0) {
          this.parent.children.splice(index, 1);
          this.parent.children.splice(index - 1, 0, this);
          this.parent._setChildrenIndices();
          return true;
        }
        return false;
      }
      moveToBottom() {
        if (!this.parent) {
          Util_1.Util.warn("Node has no parent. moveToBottom function is ignored.");
          return false;
        }
        const index = this.index;
        if (index > 0) {
          this.parent.children.splice(index, 1);
          this.parent.children.unshift(this);
          this.parent._setChildrenIndices();
          return true;
        }
        return false;
      }
      setZIndex(zIndex) {
        if (!this.parent) {
          Util_1.Util.warn("Node has no parent. zIndex parameter is ignored.");
          return this;
        }
        if (zIndex < 0 || zIndex >= this.parent.children.length) {
          Util_1.Util.warn("Unexpected value " + zIndex + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
        }
        const index = this.index;
        this.parent.children.splice(index, 1);
        this.parent.children.splice(zIndex, 0, this);
        this.parent._setChildrenIndices();
        return this;
      }
      getAbsoluteOpacity() {
        return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
      }
      _getAbsoluteOpacity() {
        let absOpacity = this.opacity();
        const parent = this.getParent();
        if (parent && !parent._isUnderCache) {
          absOpacity *= parent.getAbsoluteOpacity();
        }
        return absOpacity;
      }
      moveTo(newContainer) {
        if (this.getParent() !== newContainer) {
          this._remove();
          newContainer.add(this);
        }
        return this;
      }
      toObject() {
        let attrs = this.getAttrs(), key, val, getter, defaultValue, nonPlainObject;
        const obj = {
          attrs: {},
          className: this.getClassName()
        };
        for (key in attrs) {
          val = attrs[key];
          nonPlainObject = Util_1.Util.isObject(val) && !Util_1.Util._isPlainObject(val) && !Util_1.Util._isArray(val);
          if (nonPlainObject) {
            continue;
          }
          getter = typeof this[key] === "function" && this[key];
          delete attrs[key];
          defaultValue = getter ? getter.call(this) : null;
          attrs[key] = val;
          if (defaultValue !== val) {
            obj.attrs[key] = val;
          }
        }
        return Util_1.Util._prepareToStringify(obj);
      }
      toJSON() {
        return JSON.stringify(this.toObject());
      }
      getParent() {
        return this.parent;
      }
      findAncestors(selector, includeSelf, stopNode) {
        const res = [];
        if (includeSelf && this._isMatch(selector)) {
          res.push(this);
        }
        let ancestor = this.parent;
        while (ancestor) {
          if (ancestor === stopNode) {
            return res;
          }
          if (ancestor._isMatch(selector)) {
            res.push(ancestor);
          }
          ancestor = ancestor.parent;
        }
        return res;
      }
      isAncestorOf(node) {
        return false;
      }
      findAncestor(selector, includeSelf, stopNode) {
        return this.findAncestors(selector, includeSelf, stopNode)[0];
      }
      _isMatch(selector) {
        if (!selector) {
          return false;
        }
        if (typeof selector === "function") {
          return selector(this);
        }
        let selectorArr = selector.replace(/ /g, "").split(","), len = selectorArr.length, n, sel;
        for (n = 0; n < len; n++) {
          sel = selectorArr[n];
          if (!Util_1.Util.isValidSelector(sel)) {
            Util_1.Util.warn('Selector "' + sel + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".');
            Util_1.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".');
            Util_1.Util.warn("Konva is awesome, right?");
          }
          if (sel.charAt(0) === "#") {
            if (this.id() === sel.slice(1)) {
              return true;
            }
          } else if (sel.charAt(0) === ".") {
            if (this.hasName(sel.slice(1))) {
              return true;
            }
          } else if (this.className === sel || this.nodeType === sel) {
            return true;
          }
        }
        return false;
      }
      getLayer() {
        const parent = this.getParent();
        return parent ? parent.getLayer() : null;
      }
      getStage() {
        return this._getCache(STAGE, this._getStage);
      }
      _getStage() {
        const parent = this.getParent();
        if (parent) {
          return parent.getStage();
        } else {
          return null;
        }
      }
      fire(eventType, evt = {}, bubble) {
        evt.target = evt.target || this;
        if (bubble) {
          this._fireAndBubble(eventType, evt);
        } else {
          this._fire(eventType, evt);
        }
        return this;
      }
      getAbsoluteTransform(top) {
        if (top) {
          return this._getAbsoluteTransform(top);
        } else {
          return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
        }
      }
      _getAbsoluteTransform(top) {
        let at;
        if (top) {
          at = new Util_1.Transform();
          this._eachAncestorReverse(function(node) {
            const transformsEnabled = node.transformsEnabled();
            if (transformsEnabled === "all") {
              at.multiply(node.getTransform());
            } else if (transformsEnabled === "position") {
              at.translate(node.x() - node.offsetX(), node.y() - node.offsetY());
            }
          }, top);
          return at;
        } else {
          at = this._cache.get(ABSOLUTE_TRANSFORM) || new Util_1.Transform();
          if (this.parent) {
            this.parent.getAbsoluteTransform().copyInto(at);
          } else {
            at.reset();
          }
          const transformsEnabled = this.transformsEnabled();
          if (transformsEnabled === "all") {
            at.multiply(this.getTransform());
          } else if (transformsEnabled === "position") {
            const x = this.attrs.x || 0;
            const y = this.attrs.y || 0;
            const offsetX = this.attrs.offsetX || 0;
            const offsetY = this.attrs.offsetY || 0;
            at.translate(x - offsetX, y - offsetY);
          }
          at.dirty = false;
          return at;
        }
      }
      getAbsoluteScale(top) {
        let parent = this;
        while (parent) {
          if (parent._isUnderCache) {
            top = parent;
          }
          parent = parent.getParent();
        }
        const transform = this.getAbsoluteTransform(top);
        const attrs = transform.decompose();
        return {
          x: attrs.scaleX,
          y: attrs.scaleY
        };
      }
      getAbsoluteRotation() {
        return this.getAbsoluteTransform().decompose().rotation;
      }
      getTransform() {
        return this._getCache(TRANSFORM, this._getTransform);
      }
      _getTransform() {
        var _a, _b;
        const m = this._cache.get(TRANSFORM) || new Util_1.Transform();
        m.reset();
        const x = this.x(), y = this.y(), rotation = Global_1.Konva.getAngle(this.rotation()), scaleX = (_a = this.attrs.scaleX) !== null && _a !== void 0 ? _a : 1, scaleY = (_b = this.attrs.scaleY) !== null && _b !== void 0 ? _b : 1, skewX = this.attrs.skewX || 0, skewY = this.attrs.skewY || 0, offsetX = this.attrs.offsetX || 0, offsetY = this.attrs.offsetY || 0;
        if (x !== 0 || y !== 0) {
          m.translate(x, y);
        }
        if (rotation !== 0) {
          m.rotate(rotation);
        }
        if (skewX !== 0 || skewY !== 0) {
          m.skew(skewX, skewY);
        }
        if (scaleX !== 1 || scaleY !== 1) {
          m.scale(scaleX, scaleY);
        }
        if (offsetX !== 0 || offsetY !== 0) {
          m.translate(-1 * offsetX, -1 * offsetY);
        }
        m.dirty = false;
        return m;
      }
      clone(obj) {
        let attrs = Util_1.Util.cloneObject(this.attrs), key, allListeners, len, n, listener;
        for (key in obj) {
          attrs[key] = obj[key];
        }
        const node = new this.constructor(attrs);
        for (key in this.eventListeners) {
          allListeners = this.eventListeners[key];
          len = allListeners.length;
          for (n = 0; n < len; n++) {
            listener = allListeners[n];
            if (listener.name.indexOf(KONVA) < 0) {
              if (!node.eventListeners[key]) {
                node.eventListeners[key] = [];
              }
              node.eventListeners[key].push(listener);
            }
          }
        }
        return node;
      }
      _toKonvaCanvas(config) {
        config = config || {};
        const box = this.getClientRect();
        const stage = this.getStage(), x = config.x !== void 0 ? config.x : Math.floor(box.x), y = config.y !== void 0 ? config.y : Math.floor(box.y), pixelRatio = config.pixelRatio || 1, canvas = new Canvas_1.SceneCanvas({
          width: config.width || Math.ceil(box.width) || (stage ? stage.width() : 0),
          height: config.height || Math.ceil(box.height) || (stage ? stage.height() : 0),
          pixelRatio
        }), context = canvas.getContext();
        const bufferCanvas = new Canvas_1.SceneCanvas({
          width: canvas.width / canvas.pixelRatio + Math.abs(x),
          height: canvas.height / canvas.pixelRatio + Math.abs(y),
          pixelRatio: canvas.pixelRatio
        });
        if (config.imageSmoothingEnabled === false) {
          context._context.imageSmoothingEnabled = false;
        }
        context.save();
        if (x || y) {
          context.translate(-1 * x, -1 * y);
        }
        this.drawScene(canvas, void 0, bufferCanvas);
        context.restore();
        return canvas;
      }
      toCanvas(config) {
        return this._toKonvaCanvas(config)._canvas;
      }
      toDataURL(config) {
        config = config || {};
        const mimeType = config.mimeType || null, quality = config.quality || null;
        const url = this._toKonvaCanvas(config).toDataURL(mimeType, quality);
        if (config.callback) {
          config.callback(url);
        }
        return url;
      }
      toImage(config) {
        return new Promise((resolve, reject) => {
          try {
            const callback = config === null || config === void 0 ? void 0 : config.callback;
            if (callback) delete config.callback;
            Util_1.Util._urlToImage(this.toDataURL(config), function(img) {
              resolve(img);
              callback === null || callback === void 0 ? void 0 : callback(img);
            });
          } catch (err) {
            reject(err);
          }
        });
      }
      toBlob(config) {
        return new Promise((resolve, reject) => {
          try {
            const callback = config === null || config === void 0 ? void 0 : config.callback;
            if (callback) delete config.callback;
            this.toCanvas(config).toBlob((blob) => {
              resolve(blob);
              callback === null || callback === void 0 ? void 0 : callback(blob);
            }, config === null || config === void 0 ? void 0 : config.mimeType, config === null || config === void 0 ? void 0 : config.quality);
          } catch (err) {
            reject(err);
          }
        });
      }
      setSize(size) {
        this.width(size.width);
        this.height(size.height);
        return this;
      }
      getSize() {
        return {
          width: this.width(),
          height: this.height()
        };
      }
      getClassName() {
        return this.className || this.nodeType;
      }
      getType() {
        return this.nodeType;
      }
      getDragDistance() {
        if (this.attrs.dragDistance !== void 0) {
          return this.attrs.dragDistance;
        } else if (this.parent) {
          return this.parent.getDragDistance();
        } else {
          return Global_1.Konva.dragDistance;
        }
      }
      _off(type, name, callback) {
        let evtListeners = this.eventListeners[type], i, evtName, handler;
        for (i = 0; i < evtListeners.length; i++) {
          evtName = evtListeners[i].name;
          handler = evtListeners[i].handler;
          if ((evtName !== "konva" || name === "konva") && (!name || evtName === name) && (!callback || callback === handler)) {
            evtListeners.splice(i, 1);
            if (evtListeners.length === 0) {
              delete this.eventListeners[type];
              break;
            }
            i--;
          }
        }
      }
      _fireChangeEvent(attr, oldVal, newVal) {
        this._fire(attr + CHANGE, {
          oldVal,
          newVal
        });
      }
      addName(name) {
        if (!this.hasName(name)) {
          const oldName = this.name();
          const newName = oldName ? oldName + " " + name : name;
          this.name(newName);
        }
        return this;
      }
      hasName(name) {
        if (!name) {
          return false;
        }
        const fullName = this.name();
        if (!fullName) {
          return false;
        }
        const names = (fullName || "").split(/\s/g);
        return names.indexOf(name) !== -1;
      }
      removeName(name) {
        const names = (this.name() || "").split(/\s/g);
        const index = names.indexOf(name);
        if (index !== -1) {
          names.splice(index, 1);
          this.name(names.join(" "));
        }
        return this;
      }
      setAttr(attr, val) {
        const func = this[SET + Util_1.Util._capitalize(attr)];
        if (Util_1.Util._isFunction(func)) {
          func.call(this, val);
        } else {
          this._setAttr(attr, val);
        }
        return this;
      }
      _requestDraw() {
        if (Global_1.Konva.autoDrawEnabled) {
          const drawNode = this.getLayer() || this.getStage();
          drawNode === null || drawNode === void 0 ? void 0 : drawNode.batchDraw();
        }
      }
      _setAttr(key, val) {
        const oldVal = this.attrs[key];
        if (oldVal === val && !Util_1.Util.isObject(val)) {
          return;
        }
        if (val === void 0 || val === null) {
          delete this.attrs[key];
        } else {
          this.attrs[key] = val;
        }
        if (this._shouldFireChangeEvents) {
          this._fireChangeEvent(key, oldVal, val);
        }
        this._requestDraw();
      }
      _setComponentAttr(key, component, val) {
        let oldVal;
        if (val !== void 0) {
          oldVal = this.attrs[key];
          if (!oldVal) {
            this.attrs[key] = this.getAttr(key);
          }
          this.attrs[key][component] = val;
          this._fireChangeEvent(key, oldVal, val);
        }
      }
      _fireAndBubble(eventType, evt, compareShape) {
        if (evt && this.nodeType === SHAPE) {
          evt.target = this;
        }
        const shouldStop = (eventType === MOUSEENTER || eventType === MOUSELEAVE) && (compareShape && (this === compareShape || this.isAncestorOf && this.isAncestorOf(compareShape)) || this.nodeType === "Stage" && !compareShape);
        if (!shouldStop) {
          this._fire(eventType, evt);
          const stopBubble = (eventType === MOUSEENTER || eventType === MOUSELEAVE) && compareShape && compareShape.isAncestorOf && compareShape.isAncestorOf(this) && !compareShape.isAncestorOf(this.parent);
          if ((evt && !evt.cancelBubble || !evt) && this.parent && this.parent.isListening() && !stopBubble) {
            if (compareShape && compareShape.parent) {
              this._fireAndBubble.call(this.parent, eventType, evt, compareShape);
            } else {
              this._fireAndBubble.call(this.parent, eventType, evt);
            }
          }
        }
      }
      _getProtoListeners(eventType) {
        var _a, _b, _c;
        const allListeners = (_a = this._cache.get(ALL_LISTENERS)) !== null && _a !== void 0 ? _a : {};
        let events = allListeners === null || allListeners === void 0 ? void 0 : allListeners[eventType];
        if (events === void 0) {
          events = [];
          let obj = Object.getPrototypeOf(this);
          while (obj) {
            const hierarchyEvents = (_c = (_b = obj.eventListeners) === null || _b === void 0 ? void 0 : _b[eventType]) !== null && _c !== void 0 ? _c : [];
            events.push(...hierarchyEvents);
            obj = Object.getPrototypeOf(obj);
          }
          allListeners[eventType] = events;
          this._cache.set(ALL_LISTENERS, allListeners);
        }
        return events;
      }
      _fire(eventType, evt) {
        evt = evt || {};
        evt.currentTarget = this;
        evt.type = eventType;
        const topListeners = this._getProtoListeners(eventType);
        if (topListeners) {
          for (var i = 0; i < topListeners.length; i++) {
            topListeners[i].handler.call(this, evt);
          }
        }
        const selfListeners = this.eventListeners[eventType];
        if (selfListeners) {
          for (var i = 0; i < selfListeners.length; i++) {
            selfListeners[i].handler.call(this, evt);
          }
        }
      }
      draw() {
        this.drawScene();
        this.drawHit();
        return this;
      }
      _createDragElement(evt) {
        const pointerId = evt ? evt.pointerId : void 0;
        const stage = this.getStage();
        const ap = this.getAbsolutePosition();
        if (!stage) {
          return;
        }
        const pos = stage._getPointerById(pointerId) || stage._changedPointerPositions[0] || ap;
        DragAndDrop_1.DD._dragElements.set(this._id, {
          node: this,
          startPointerPos: pos,
          offset: {
            x: pos.x - ap.x,
            y: pos.y - ap.y
          },
          dragStatus: "ready",
          pointerId
        });
      }
      startDrag(evt, bubbleEvent = true) {
        if (!DragAndDrop_1.DD._dragElements.has(this._id)) {
          this._createDragElement(evt);
        }
        const elem = DragAndDrop_1.DD._dragElements.get(this._id);
        elem.dragStatus = "dragging";
        this.fire("dragstart", {
          type: "dragstart",
          target: this,
          evt: evt && evt.evt
        }, bubbleEvent);
      }
      _setDragPosition(evt, elem) {
        const pos = this.getStage()._getPointerById(elem.pointerId);
        if (!pos) {
          return;
        }
        let newNodePos = {
          x: pos.x - elem.offset.x,
          y: pos.y - elem.offset.y
        };
        const dbf = this.dragBoundFunc();
        if (dbf !== void 0) {
          const bounded = dbf.call(this, newNodePos, evt);
          if (!bounded) {
            Util_1.Util.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.");
          } else {
            newNodePos = bounded;
          }
        }
        if (!this._lastPos || this._lastPos.x !== newNodePos.x || this._lastPos.y !== newNodePos.y) {
          this.setAbsolutePosition(newNodePos);
          this._requestDraw();
        }
        this._lastPos = newNodePos;
      }
      stopDrag(evt) {
        const elem = DragAndDrop_1.DD._dragElements.get(this._id);
        if (elem) {
          elem.dragStatus = "stopped";
        }
        DragAndDrop_1.DD._endDragBefore(evt);
        DragAndDrop_1.DD._endDragAfter(evt);
      }
      setDraggable(draggable) {
        this._setAttr("draggable", draggable);
        this._dragChange();
      }
      isDragging() {
        const elem = DragAndDrop_1.DD._dragElements.get(this._id);
        return elem ? elem.dragStatus === "dragging" : false;
      }
      _listenDrag() {
        this._dragCleanup();
        this.on("mousedown.konva touchstart.konva", function(evt) {
          const shouldCheckButton = evt.evt["button"] !== void 0;
          const canDrag = !shouldCheckButton || Global_1.Konva.dragButtons.indexOf(evt.evt["button"]) >= 0;
          if (!canDrag) {
            return;
          }
          if (this.isDragging()) {
            return;
          }
          let hasDraggingChild = false;
          DragAndDrop_1.DD._dragElements.forEach((elem) => {
            if (this.isAncestorOf(elem.node)) {
              hasDraggingChild = true;
            }
          });
          if (!hasDraggingChild) {
            this._createDragElement(evt);
          }
        });
      }
      _dragChange() {
        if (this.attrs.draggable) {
          this._listenDrag();
        } else {
          this._dragCleanup();
          const stage = this.getStage();
          if (!stage) {
            return;
          }
          const dragElement = DragAndDrop_1.DD._dragElements.get(this._id);
          const isDragging = dragElement && dragElement.dragStatus === "dragging";
          const isReady = dragElement && dragElement.dragStatus === "ready";
          if (isDragging) {
            this.stopDrag();
          } else if (isReady) {
            DragAndDrop_1.DD._dragElements.delete(this._id);
          }
        }
      }
      _dragCleanup() {
        this.off("mousedown.konva");
        this.off("touchstart.konva");
      }
      isClientRectOnScreen(margin = {
        x: 0,
        y: 0
      }) {
        const stage = this.getStage();
        if (!stage) {
          return false;
        }
        const screenRect = {
          x: -margin.x,
          y: -margin.y,
          width: stage.width() + 2 * margin.x,
          height: stage.height() + 2 * margin.y
        };
        return Util_1.Util.haveIntersection(screenRect, this.getClientRect());
      }
      static create(data, container) {
        if (Util_1.Util._isString(data)) {
          data = JSON.parse(data);
        }
        return this._createNode(data, container);
      }
      static _createNode(obj, container) {
        let className = _Node.prototype.getClassName.call(obj), children = obj.children, no, len, n;
        if (container) {
          obj.attrs.container = container;
        }
        if (!Global_1.Konva[className]) {
          Util_1.Util.warn('Can not find a node with class name "' + className + '". Fallback to "Shape".');
          className = "Shape";
        }
        const Class = Global_1.Konva[className];
        no = new Class(obj.attrs);
        if (children) {
          len = children.length;
          for (n = 0; n < len; n++) {
            no.add(_Node._createNode(children[n]));
          }
        }
        return no;
      }
    };
    exports.Node = Node;
    Node.prototype.nodeType = "Node";
    Node.prototype._attrsAffectingSize = [];
    Node.prototype.eventListeners = {};
    Node.prototype.on.call(Node.prototype, TRANSFORM_CHANGE_STR, function() {
      if (this._batchingTransformChange) {
        this._needClearTransformCache = true;
        return;
      }
      this._clearCache(TRANSFORM);
      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
    });
    Node.prototype.on.call(Node.prototype, "visibleChange.konva", function() {
      this._clearSelfAndDescendantCache(VISIBLE);
    });
    Node.prototype.on.call(Node.prototype, "listeningChange.konva", function() {
      this._clearSelfAndDescendantCache(LISTENING);
    });
    Node.prototype.on.call(Node.prototype, "opacityChange.konva", function() {
      this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
    });
    var addGetterSetter = Factory_1.Factory.addGetterSetter;
    addGetterSetter(Node, "zIndex");
    addGetterSetter(Node, "absolutePosition");
    addGetterSetter(Node, "position");
    addGetterSetter(Node, "x", 0, (0, Validators_1.getNumberValidator)());
    addGetterSetter(Node, "y", 0, (0, Validators_1.getNumberValidator)());
    addGetterSetter(Node, "globalCompositeOperation", "source-over", (0, Validators_1.getStringValidator)());
    addGetterSetter(Node, "opacity", 1, (0, Validators_1.getNumberValidator)());
    addGetterSetter(Node, "name", "", (0, Validators_1.getStringValidator)());
    addGetterSetter(Node, "id", "", (0, Validators_1.getStringValidator)());
    addGetterSetter(Node, "rotation", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addComponentsGetterSetter(Node, "scale", ["x", "y"]);
    addGetterSetter(Node, "scaleX", 1, (0, Validators_1.getNumberValidator)());
    addGetterSetter(Node, "scaleY", 1, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addComponentsGetterSetter(Node, "skew", ["x", "y"]);
    addGetterSetter(Node, "skewX", 0, (0, Validators_1.getNumberValidator)());
    addGetterSetter(Node, "skewY", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addComponentsGetterSetter(Node, "offset", ["x", "y"]);
    addGetterSetter(Node, "offsetX", 0, (0, Validators_1.getNumberValidator)());
    addGetterSetter(Node, "offsetY", 0, (0, Validators_1.getNumberValidator)());
    addGetterSetter(Node, "dragDistance", void 0, (0, Validators_1.getNumberValidator)());
    addGetterSetter(Node, "width", 0, (0, Validators_1.getNumberValidator)());
    addGetterSetter(Node, "height", 0, (0, Validators_1.getNumberValidator)());
    addGetterSetter(Node, "listening", true, (0, Validators_1.getBooleanValidator)());
    addGetterSetter(Node, "preventDefault", true, (0, Validators_1.getBooleanValidator)());
    addGetterSetter(Node, "filters", void 0, function(val) {
      this._filterUpToDate = false;
      return val;
    });
    addGetterSetter(Node, "visible", true, (0, Validators_1.getBooleanValidator)());
    addGetterSetter(Node, "transformsEnabled", "all", (0, Validators_1.getStringValidator)());
    addGetterSetter(Node, "size");
    addGetterSetter(Node, "dragBoundFunc");
    addGetterSetter(Node, "draggable", false, (0, Validators_1.getBooleanValidator)());
    Factory_1.Factory.backCompat(Node, {
      rotateDeg: "rotate",
      setRotationDeg: "setRotation",
      getRotationDeg: "getRotation"
    });
  }
});

// node_modules/konva/lib/Container.js
var require_Container = __commonJS({
  "node_modules/konva/lib/Container.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Container = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Container = class extends Node_1.Node {
      constructor() {
        super(...arguments);
        this.children = [];
      }
      getChildren(filterFunc) {
        if (!filterFunc) {
          return this.children || [];
        }
        const children = this.children || [];
        const results = [];
        children.forEach(function(child) {
          if (filterFunc(child)) {
            results.push(child);
          }
        });
        return results;
      }
      hasChildren() {
        return this.getChildren().length > 0;
      }
      removeChildren() {
        this.getChildren().forEach((child) => {
          child.parent = null;
          child.index = 0;
          child.remove();
        });
        this.children = [];
        this._requestDraw();
        return this;
      }
      destroyChildren() {
        this.getChildren().forEach((child) => {
          child.parent = null;
          child.index = 0;
          child.destroy();
        });
        this.children = [];
        this._requestDraw();
        return this;
      }
      add(...children) {
        if (children.length === 0) {
          return this;
        }
        if (children.length > 1) {
          for (let i = 0; i < children.length; i++) {
            this.add(children[i]);
          }
          return this;
        }
        const child = children[0];
        if (child.getParent()) {
          child.moveTo(this);
          return this;
        }
        this._validateAdd(child);
        child.index = this.getChildren().length;
        child.parent = this;
        child._clearCaches();
        this.getChildren().push(child);
        this._fire("add", {
          child
        });
        this._requestDraw();
        return this;
      }
      destroy() {
        if (this.hasChildren()) {
          this.destroyChildren();
        }
        super.destroy();
        return this;
      }
      find(selector) {
        return this._generalFind(selector, false);
      }
      findOne(selector) {
        const result = this._generalFind(selector, true);
        return result.length > 0 ? result[0] : void 0;
      }
      _generalFind(selector, findOne) {
        const retArr = [];
        this._descendants((node) => {
          const valid = node._isMatch(selector);
          if (valid) {
            retArr.push(node);
          }
          if (valid && findOne) {
            return true;
          }
          return false;
        });
        return retArr;
      }
      _descendants(fn) {
        let shouldStop = false;
        const children = this.getChildren();
        for (const child of children) {
          shouldStop = fn(child);
          if (shouldStop) {
            return true;
          }
          if (!child.hasChildren()) {
            continue;
          }
          shouldStop = child._descendants(fn);
          if (shouldStop) {
            return true;
          }
        }
        return false;
      }
      toObject() {
        const obj = Node_1.Node.prototype.toObject.call(this);
        obj.children = [];
        this.getChildren().forEach((child) => {
          obj.children.push(child.toObject());
        });
        return obj;
      }
      isAncestorOf(node) {
        let parent = node.getParent();
        while (parent) {
          if (parent._id === this._id) {
            return true;
          }
          parent = parent.getParent();
        }
        return false;
      }
      clone(obj) {
        const node = Node_1.Node.prototype.clone.call(this, obj);
        this.getChildren().forEach(function(no) {
          node.add(no.clone());
        });
        return node;
      }
      getAllIntersections(pos) {
        const arr = [];
        this.find("Shape").forEach((shape) => {
          if (shape.isVisible() && shape.intersects(pos)) {
            arr.push(shape);
          }
        });
        return arr;
      }
      _clearSelfAndDescendantCache(attr) {
        var _a;
        super._clearSelfAndDescendantCache(attr);
        if (this.isCached()) {
          return;
        }
        (_a = this.children) === null || _a === void 0 ? void 0 : _a.forEach(function(node) {
          node._clearSelfAndDescendantCache(attr);
        });
      }
      _setChildrenIndices() {
        var _a;
        (_a = this.children) === null || _a === void 0 ? void 0 : _a.forEach(function(child, n) {
          child.index = n;
        });
        this._requestDraw();
      }
      drawScene(can, top, bufferCanvas) {
        const layer = this.getLayer(), canvas = can || layer && layer.getCanvas(), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;
        const caching = canvas && canvas.isCache;
        if (!this.isVisible() && !caching) {
          return this;
        }
        if (cachedSceneCanvas) {
          context.save();
          const m = this.getAbsoluteTransform(top).getMatrix();
          context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
          this._drawCachedSceneCanvas(context);
          context.restore();
        } else {
          this._drawChildren("drawScene", canvas, top, bufferCanvas);
        }
        return this;
      }
      drawHit(can, top) {
        if (!this.shouldDrawHit(top)) {
          return this;
        }
        const layer = this.getLayer(), canvas = can || layer && layer.hitCanvas, context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
        if (cachedHitCanvas) {
          context.save();
          const m = this.getAbsoluteTransform(top).getMatrix();
          context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
          this._drawCachedHitCanvas(context);
          context.restore();
        } else {
          this._drawChildren("drawHit", canvas, top);
        }
        return this;
      }
      _drawChildren(drawMethod, canvas, top, bufferCanvas) {
        var _a;
        const context = canvas && canvas.getContext(), clipWidth = this.clipWidth(), clipHeight = this.clipHeight(), clipFunc = this.clipFunc(), hasClip = typeof clipWidth === "number" && typeof clipHeight === "number" || clipFunc;
        const selfCache = top === this;
        if (hasClip) {
          context.save();
          const transform = this.getAbsoluteTransform(top);
          let m = transform.getMatrix();
          context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
          context.beginPath();
          let clipArgs;
          if (clipFunc) {
            clipArgs = clipFunc.call(this, context, this);
          } else {
            const clipX = this.clipX();
            const clipY = this.clipY();
            context.rect(clipX || 0, clipY || 0, clipWidth, clipHeight);
          }
          context.clip.apply(context, clipArgs);
          m = transform.copy().invert().getMatrix();
          context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        }
        const hasComposition = !selfCache && this.globalCompositeOperation() !== "source-over" && drawMethod === "drawScene";
        if (hasComposition) {
          context.save();
          context._applyGlobalCompositeOperation(this);
        }
        (_a = this.children) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
          child[drawMethod](canvas, top, bufferCanvas);
        });
        if (hasComposition) {
          context.restore();
        }
        if (hasClip) {
          context.restore();
        }
      }
      getClientRect(config = {}) {
        var _a;
        const skipTransform = config.skipTransform;
        const relativeTo = config.relativeTo;
        let minX, minY, maxX, maxY;
        let selfRect = {
          x: Infinity,
          y: Infinity,
          width: 0,
          height: 0
        };
        const that = this;
        (_a = this.children) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
          if (!child.visible()) {
            return;
          }
          const rect = child.getClientRect({
            relativeTo: that,
            skipShadow: config.skipShadow,
            skipStroke: config.skipStroke
          });
          if (rect.width === 0 && rect.height === 0) {
            return;
          }
          if (minX === void 0) {
            minX = rect.x;
            minY = rect.y;
            maxX = rect.x + rect.width;
            maxY = rect.y + rect.height;
          } else {
            minX = Math.min(minX, rect.x);
            minY = Math.min(minY, rect.y);
            maxX = Math.max(maxX, rect.x + rect.width);
            maxY = Math.max(maxY, rect.y + rect.height);
          }
        });
        const shapes = this.find("Shape");
        let hasVisible = false;
        for (let i = 0; i < shapes.length; i++) {
          const shape = shapes[i];
          if (shape._isVisible(this)) {
            hasVisible = true;
            break;
          }
        }
        if (hasVisible && minX !== void 0) {
          selfRect = {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
          };
        } else {
          selfRect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
        if (!skipTransform) {
          return this._transformedRect(selfRect, relativeTo);
        }
        return selfRect;
      }
    };
    exports.Container = Container;
    Factory_1.Factory.addComponentsGetterSetter(Container, "clip", ["x", "y", "width", "height"]);
    Factory_1.Factory.addGetterSetter(Container, "clipX", void 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Container, "clipY", void 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Container, "clipWidth", void 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Container, "clipHeight", void 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Container, "clipFunc");
  }
});

// node_modules/konva/lib/PointerEvents.js
var require_PointerEvents = __commonJS({
  "node_modules/konva/lib/PointerEvents.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getCapturedShape = getCapturedShape;
    exports.createEvent = createEvent;
    exports.hasPointerCapture = hasPointerCapture;
    exports.setPointerCapture = setPointerCapture;
    exports.releaseCapture = releaseCapture;
    var Global_1 = require_Global();
    var Captures = /* @__PURE__ */ new Map();
    var SUPPORT_POINTER_EVENTS = Global_1.Konva._global["PointerEvent"] !== void 0;
    function getCapturedShape(pointerId) {
      return Captures.get(pointerId);
    }
    function createEvent(evt) {
      return {
        evt,
        pointerId: evt.pointerId
      };
    }
    function hasPointerCapture(pointerId, shape) {
      return Captures.get(pointerId) === shape;
    }
    function setPointerCapture(pointerId, shape) {
      releaseCapture(pointerId);
      const stage = shape.getStage();
      if (!stage) return;
      Captures.set(pointerId, shape);
      if (SUPPORT_POINTER_EVENTS) {
        shape._fire("gotpointercapture", createEvent(new PointerEvent("gotpointercapture")));
      }
    }
    function releaseCapture(pointerId, target) {
      const shape = Captures.get(pointerId);
      if (!shape) return;
      const stage = shape.getStage();
      if (stage && stage.content) {
      }
      Captures.delete(pointerId);
      if (SUPPORT_POINTER_EVENTS) {
        shape._fire("lostpointercapture", createEvent(new PointerEvent("lostpointercapture")));
      }
    }
  }
});

// node_modules/konva/lib/Stage.js
var require_Stage = __commonJS({
  "node_modules/konva/lib/Stage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Stage = exports.stages = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Container_1 = require_Container();
    var Global_1 = require_Global();
    var Canvas_1 = require_Canvas();
    var DragAndDrop_1 = require_DragAndDrop();
    var Global_2 = require_Global();
    var PointerEvents = require_PointerEvents();
    var STAGE = "Stage";
    var STRING = "string";
    var PX = "px";
    var MOUSEOUT = "mouseout";
    var MOUSELEAVE = "mouseleave";
    var MOUSEOVER = "mouseover";
    var MOUSEENTER = "mouseenter";
    var MOUSEMOVE = "mousemove";
    var MOUSEDOWN = "mousedown";
    var MOUSEUP = "mouseup";
    var POINTERMOVE = "pointermove";
    var POINTERDOWN = "pointerdown";
    var POINTERUP = "pointerup";
    var POINTERCANCEL = "pointercancel";
    var LOSTPOINTERCAPTURE = "lostpointercapture";
    var POINTEROUT = "pointerout";
    var POINTERLEAVE = "pointerleave";
    var POINTEROVER = "pointerover";
    var POINTERENTER = "pointerenter";
    var CONTEXTMENU = "contextmenu";
    var TOUCHSTART = "touchstart";
    var TOUCHEND = "touchend";
    var TOUCHMOVE = "touchmove";
    var TOUCHCANCEL = "touchcancel";
    var WHEEL = "wheel";
    var MAX_LAYERS_NUMBER = 5;
    var EVENTS = [[MOUSEENTER, "_pointerenter"], [MOUSEDOWN, "_pointerdown"], [MOUSEMOVE, "_pointermove"], [MOUSEUP, "_pointerup"], [MOUSELEAVE, "_pointerleave"], [TOUCHSTART, "_pointerdown"], [TOUCHMOVE, "_pointermove"], [TOUCHEND, "_pointerup"], [TOUCHCANCEL, "_pointercancel"], [MOUSEOVER, "_pointerover"], [WHEEL, "_wheel"], [CONTEXTMENU, "_contextmenu"], [POINTERDOWN, "_pointerdown"], [POINTERMOVE, "_pointermove"], [POINTERUP, "_pointerup"], [POINTERCANCEL, "_pointercancel"], [LOSTPOINTERCAPTURE, "_lostpointercapture"]];
    var EVENTS_MAP = {
      mouse: {
        [POINTEROUT]: MOUSEOUT,
        [POINTERLEAVE]: MOUSELEAVE,
        [POINTEROVER]: MOUSEOVER,
        [POINTERENTER]: MOUSEENTER,
        [POINTERMOVE]: MOUSEMOVE,
        [POINTERDOWN]: MOUSEDOWN,
        [POINTERUP]: MOUSEUP,
        [POINTERCANCEL]: "mousecancel",
        pointerclick: "click",
        pointerdblclick: "dblclick"
      },
      touch: {
        [POINTEROUT]: "touchout",
        [POINTERLEAVE]: "touchleave",
        [POINTEROVER]: "touchover",
        [POINTERENTER]: "touchenter",
        [POINTERMOVE]: TOUCHMOVE,
        [POINTERDOWN]: TOUCHSTART,
        [POINTERUP]: TOUCHEND,
        [POINTERCANCEL]: TOUCHCANCEL,
        pointerclick: "tap",
        pointerdblclick: "dbltap"
      },
      pointer: {
        [POINTEROUT]: POINTEROUT,
        [POINTERLEAVE]: POINTERLEAVE,
        [POINTEROVER]: POINTEROVER,
        [POINTERENTER]: POINTERENTER,
        [POINTERMOVE]: POINTERMOVE,
        [POINTERDOWN]: POINTERDOWN,
        [POINTERUP]: POINTERUP,
        [POINTERCANCEL]: POINTERCANCEL,
        pointerclick: "pointerclick",
        pointerdblclick: "pointerdblclick"
      }
    };
    var getEventType = (type) => {
      if (type.indexOf("pointer") >= 0) {
        return "pointer";
      }
      if (type.indexOf("touch") >= 0) {
        return "touch";
      }
      return "mouse";
    };
    var getEventsMap = (eventType) => {
      const type = getEventType(eventType);
      if (type === "pointer") {
        return Global_1.Konva.pointerEventsEnabled && EVENTS_MAP.pointer;
      }
      if (type === "touch") {
        return EVENTS_MAP.touch;
      }
      if (type === "mouse") {
        return EVENTS_MAP.mouse;
      }
    };
    function checkNoClip(attrs = {}) {
      if (attrs.clipFunc || attrs.clipWidth || attrs.clipHeight) {
        Util_1.Util.warn("Stage does not support clipping. Please use clip for Layers or Groups.");
      }
      return attrs;
    }
    var NO_POINTERS_MESSAGE = `Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);`;
    exports.stages = [];
    var Stage = class extends Container_1.Container {
      constructor(config) {
        super(checkNoClip(config));
        this._pointerPositions = [];
        this._changedPointerPositions = [];
        this._buildDOM();
        this._bindContentEvents();
        exports.stages.push(this);
        this.on("widthChange.konva heightChange.konva", this._resizeDOM);
        this.on("visibleChange.konva", this._checkVisibility);
        this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", () => {
          checkNoClip(this.attrs);
        });
        this._checkVisibility();
      }
      _validateAdd(child) {
        const isLayer = child.getType() === "Layer";
        const isFastLayer = child.getType() === "FastLayer";
        const valid = isLayer || isFastLayer;
        if (!valid) {
          Util_1.Util.throw("You may only add layers to the stage.");
        }
      }
      _checkVisibility() {
        if (!this.content) {
          return;
        }
        const style = this.visible() ? "" : "none";
        this.content.style.display = style;
      }
      setContainer(container) {
        if (typeof container === STRING) {
          if (container.charAt(0) === ".") {
            const className = container.slice(1);
            container = document.getElementsByClassName(className)[0];
          } else {
            var id;
            if (container.charAt(0) !== "#") {
              id = container;
            } else {
              id = container.slice(1);
            }
            container = document.getElementById(id);
          }
          if (!container) {
            throw "Can not find container in document with id " + id;
          }
        }
        this._setAttr("container", container);
        if (this.content) {
          if (this.content.parentElement) {
            this.content.parentElement.removeChild(this.content);
          }
          container.appendChild(this.content);
        }
        return this;
      }
      shouldDrawHit() {
        return true;
      }
      clear() {
        const layers = this.children, len = layers.length;
        for (let n = 0; n < len; n++) {
          layers[n].clear();
        }
        return this;
      }
      clone(obj) {
        if (!obj) {
          obj = {};
        }
        obj.container = typeof document !== "undefined" && document.createElement("div");
        return Container_1.Container.prototype.clone.call(this, obj);
      }
      destroy() {
        super.destroy();
        const content = this.content;
        if (content && Util_1.Util._isInDocument(content)) {
          this.container().removeChild(content);
        }
        const index = exports.stages.indexOf(this);
        if (index > -1) {
          exports.stages.splice(index, 1);
        }
        Util_1.Util.releaseCanvas(this.bufferCanvas._canvas, this.bufferHitCanvas._canvas);
        return this;
      }
      getPointerPosition() {
        const pos = this._pointerPositions[0] || this._changedPointerPositions[0];
        if (!pos) {
          Util_1.Util.warn(NO_POINTERS_MESSAGE);
          return null;
        }
        return {
          x: pos.x,
          y: pos.y
        };
      }
      _getPointerById(id) {
        return this._pointerPositions.find((p) => p.id === id);
      }
      getPointersPositions() {
        return this._pointerPositions;
      }
      getStage() {
        return this;
      }
      getContent() {
        return this.content;
      }
      _toKonvaCanvas(config) {
        config = config || {};
        config.x = config.x || 0;
        config.y = config.y || 0;
        config.width = config.width || this.width();
        config.height = config.height || this.height();
        const canvas = new Canvas_1.SceneCanvas({
          width: config.width,
          height: config.height,
          pixelRatio: config.pixelRatio || 1
        });
        const _context = canvas.getContext()._context;
        const layers = this.children;
        if (config.x || config.y) {
          _context.translate(-1 * config.x, -1 * config.y);
        }
        layers.forEach(function(layer) {
          if (!layer.isVisible()) {
            return;
          }
          const layerCanvas = layer._toKonvaCanvas(config);
          _context.drawImage(layerCanvas._canvas, config.x, config.y, layerCanvas.getWidth() / layerCanvas.getPixelRatio(), layerCanvas.getHeight() / layerCanvas.getPixelRatio());
        });
        return canvas;
      }
      getIntersection(pos) {
        if (!pos) {
          return null;
        }
        const layers = this.children, len = layers.length, end = len - 1;
        for (let n = end; n >= 0; n--) {
          const shape = layers[n].getIntersection(pos);
          if (shape) {
            return shape;
          }
        }
        return null;
      }
      _resizeDOM() {
        const width = this.width();
        const height = this.height();
        if (this.content) {
          this.content.style.width = width + PX;
          this.content.style.height = height + PX;
        }
        this.bufferCanvas.setSize(width, height);
        this.bufferHitCanvas.setSize(width, height);
        this.children.forEach((layer) => {
          layer.setSize({
            width,
            height
          });
          layer.draw();
        });
      }
      add(layer, ...rest) {
        if (arguments.length > 1) {
          for (let i = 0; i < arguments.length; i++) {
            this.add(arguments[i]);
          }
          return this;
        }
        super.add(layer);
        const length = this.children.length;
        if (length > MAX_LAYERS_NUMBER) {
          Util_1.Util.warn("The stage has " + length + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group.");
        }
        layer.setSize({
          width: this.width(),
          height: this.height()
        });
        layer.draw();
        if (Global_1.Konva.isBrowser) {
          this.content.appendChild(layer.canvas._canvas);
        }
        return this;
      }
      getParent() {
        return null;
      }
      getLayer() {
        return null;
      }
      hasPointerCapture(pointerId) {
        return PointerEvents.hasPointerCapture(pointerId, this);
      }
      setPointerCapture(pointerId) {
        PointerEvents.setPointerCapture(pointerId, this);
      }
      releaseCapture(pointerId) {
        PointerEvents.releaseCapture(pointerId, this);
      }
      getLayers() {
        return this.children;
      }
      _bindContentEvents() {
        if (!Global_1.Konva.isBrowser) {
          return;
        }
        EVENTS.forEach(([event, methodName]) => {
          this.content.addEventListener(event, (evt) => {
            this[methodName](evt);
          }, {
            passive: false
          });
        });
      }
      _pointerenter(evt) {
        this.setPointersPositions(evt);
        const events = getEventsMap(evt.type);
        if (events) {
          this._fire(events.pointerenter, {
            evt,
            target: this,
            currentTarget: this
          });
        }
      }
      _pointerover(evt) {
        this.setPointersPositions(evt);
        const events = getEventsMap(evt.type);
        if (events) {
          this._fire(events.pointerover, {
            evt,
            target: this,
            currentTarget: this
          });
        }
      }
      _getTargetShape(evenType) {
        let shape = this[evenType + "targetShape"];
        if (shape && !shape.getStage()) {
          shape = null;
        }
        return shape;
      }
      _pointerleave(evt) {
        const events = getEventsMap(evt.type);
        const eventType = getEventType(evt.type);
        if (!events) {
          return;
        }
        this.setPointersPositions(evt);
        const targetShape = this._getTargetShape(eventType);
        const eventsEnabled = !(Global_1.Konva.isDragging() || Global_1.Konva.isTransforming()) || Global_1.Konva.hitOnDragEnabled;
        if (targetShape && eventsEnabled) {
          targetShape._fireAndBubble(events.pointerout, {
            evt
          });
          targetShape._fireAndBubble(events.pointerleave, {
            evt
          });
          this._fire(events.pointerleave, {
            evt,
            target: this,
            currentTarget: this
          });
          this[eventType + "targetShape"] = null;
        } else if (eventsEnabled) {
          this._fire(events.pointerleave, {
            evt,
            target: this,
            currentTarget: this
          });
          this._fire(events.pointerout, {
            evt,
            target: this,
            currentTarget: this
          });
        }
        this.pointerPos = null;
        this._pointerPositions = [];
      }
      _pointerdown(evt) {
        const events = getEventsMap(evt.type);
        const eventType = getEventType(evt.type);
        if (!events) {
          return;
        }
        this.setPointersPositions(evt);
        let triggeredOnShape = false;
        this._changedPointerPositions.forEach((pos) => {
          const shape = this.getIntersection(pos);
          DragAndDrop_1.DD.justDragged = false;
          Global_1.Konva["_" + eventType + "ListenClick"] = true;
          if (!shape || !shape.isListening()) {
            this[eventType + "ClickStartShape"] = void 0;
            return;
          }
          if (Global_1.Konva.capturePointerEventsEnabled) {
            shape.setPointerCapture(pos.id);
          }
          this[eventType + "ClickStartShape"] = shape;
          shape._fireAndBubble(events.pointerdown, {
            evt,
            pointerId: pos.id
          });
          triggeredOnShape = true;
          const isTouch = evt.type.indexOf("touch") >= 0;
          if (shape.preventDefault() && evt.cancelable && isTouch) {
            evt.preventDefault();
          }
        });
        if (!triggeredOnShape) {
          this._fire(events.pointerdown, {
            evt,
            target: this,
            currentTarget: this,
            pointerId: this._pointerPositions[0].id
          });
        }
      }
      _pointermove(evt) {
        const events = getEventsMap(evt.type);
        const eventType = getEventType(evt.type);
        if (!events) {
          return;
        }
        if (Global_1.Konva.isDragging() && DragAndDrop_1.DD.node.preventDefault() && evt.cancelable) {
          evt.preventDefault();
        }
        this.setPointersPositions(evt);
        const eventsEnabled = !(Global_1.Konva.isDragging() || Global_1.Konva.isTransforming()) || Global_1.Konva.hitOnDragEnabled;
        if (!eventsEnabled) {
          return;
        }
        const processedShapesIds = {};
        let triggeredOnShape = false;
        const targetShape = this._getTargetShape(eventType);
        this._changedPointerPositions.forEach((pos) => {
          const shape = PointerEvents.getCapturedShape(pos.id) || this.getIntersection(pos);
          const pointerId = pos.id;
          const event = {
            evt,
            pointerId
          };
          const differentTarget = targetShape !== shape;
          if (differentTarget && targetShape) {
            targetShape._fireAndBubble(events.pointerout, __spreadValues({}, event), shape);
            targetShape._fireAndBubble(events.pointerleave, __spreadValues({}, event), shape);
          }
          if (shape) {
            if (processedShapesIds[shape._id]) {
              return;
            }
            processedShapesIds[shape._id] = true;
          }
          if (shape && shape.isListening()) {
            triggeredOnShape = true;
            if (differentTarget) {
              shape._fireAndBubble(events.pointerover, __spreadValues({}, event), targetShape);
              shape._fireAndBubble(events.pointerenter, __spreadValues({}, event), targetShape);
              this[eventType + "targetShape"] = shape;
            }
            shape._fireAndBubble(events.pointermove, __spreadValues({}, event));
          } else {
            if (targetShape) {
              this._fire(events.pointerover, {
                evt,
                target: this,
                currentTarget: this,
                pointerId
              });
              this[eventType + "targetShape"] = null;
            }
          }
        });
        if (!triggeredOnShape) {
          this._fire(events.pointermove, {
            evt,
            target: this,
            currentTarget: this,
            pointerId: this._changedPointerPositions[0].id
          });
        }
      }
      _pointerup(evt) {
        const events = getEventsMap(evt.type);
        const eventType = getEventType(evt.type);
        if (!events) {
          return;
        }
        this.setPointersPositions(evt);
        const clickStartShape = this[eventType + "ClickStartShape"];
        const clickEndShape = this[eventType + "ClickEndShape"];
        const processedShapesIds = {};
        let triggeredOnShape = false;
        this._changedPointerPositions.forEach((pos) => {
          const shape = PointerEvents.getCapturedShape(pos.id) || this.getIntersection(pos);
          if (shape) {
            shape.releaseCapture(pos.id);
            if (processedShapesIds[shape._id]) {
              return;
            }
            processedShapesIds[shape._id] = true;
          }
          const pointerId = pos.id;
          const event = {
            evt,
            pointerId
          };
          let fireDblClick = false;
          if (Global_1.Konva["_" + eventType + "InDblClickWindow"]) {
            fireDblClick = true;
            clearTimeout(this[eventType + "DblTimeout"]);
          } else if (!DragAndDrop_1.DD.justDragged) {
            Global_1.Konva["_" + eventType + "InDblClickWindow"] = true;
            clearTimeout(this[eventType + "DblTimeout"]);
          }
          this[eventType + "DblTimeout"] = setTimeout(function() {
            Global_1.Konva["_" + eventType + "InDblClickWindow"] = false;
          }, Global_1.Konva.dblClickWindow);
          if (shape && shape.isListening()) {
            triggeredOnShape = true;
            this[eventType + "ClickEndShape"] = shape;
            shape._fireAndBubble(events.pointerup, __spreadValues({}, event));
            if (Global_1.Konva["_" + eventType + "ListenClick"] && clickStartShape && clickStartShape === shape) {
              shape._fireAndBubble(events.pointerclick, __spreadValues({}, event));
              if (fireDblClick && clickEndShape && clickEndShape === shape) {
                shape._fireAndBubble(events.pointerdblclick, __spreadValues({}, event));
              }
            }
          } else {
            this[eventType + "ClickEndShape"] = null;
            if (Global_1.Konva["_" + eventType + "ListenClick"]) {
              this._fire(events.pointerclick, {
                evt,
                target: this,
                currentTarget: this,
                pointerId
              });
            }
            if (fireDblClick) {
              this._fire(events.pointerdblclick, {
                evt,
                target: this,
                currentTarget: this,
                pointerId
              });
            }
          }
        });
        if (!triggeredOnShape) {
          this._fire(events.pointerup, {
            evt,
            target: this,
            currentTarget: this,
            pointerId: this._changedPointerPositions[0].id
          });
        }
        Global_1.Konva["_" + eventType + "ListenClick"] = false;
        if (evt.cancelable && eventType !== "touch" && eventType !== "pointer") {
          evt.preventDefault();
        }
      }
      _contextmenu(evt) {
        this.setPointersPositions(evt);
        const shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
          shape._fireAndBubble(CONTEXTMENU, {
            evt
          });
        } else {
          this._fire(CONTEXTMENU, {
            evt,
            target: this,
            currentTarget: this
          });
        }
      }
      _wheel(evt) {
        this.setPointersPositions(evt);
        const shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
          shape._fireAndBubble(WHEEL, {
            evt
          });
        } else {
          this._fire(WHEEL, {
            evt,
            target: this,
            currentTarget: this
          });
        }
      }
      _pointercancel(evt) {
        this.setPointersPositions(evt);
        const shape = PointerEvents.getCapturedShape(evt.pointerId) || this.getIntersection(this.getPointerPosition());
        if (shape) {
          shape._fireAndBubble(POINTERUP, PointerEvents.createEvent(evt));
        }
        PointerEvents.releaseCapture(evt.pointerId);
      }
      _lostpointercapture(evt) {
        PointerEvents.releaseCapture(evt.pointerId);
      }
      setPointersPositions(evt) {
        const contentPosition = this._getContentPosition();
        let x = null, y = null;
        evt = evt ? evt : window.event;
        if (evt.touches !== void 0) {
          this._pointerPositions = [];
          this._changedPointerPositions = [];
          Array.prototype.forEach.call(evt.touches, (touch) => {
            this._pointerPositions.push({
              id: touch.identifier,
              x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
              y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
            });
          });
          Array.prototype.forEach.call(evt.changedTouches || evt.touches, (touch) => {
            this._changedPointerPositions.push({
              id: touch.identifier,
              x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
              y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
            });
          });
        } else {
          x = (evt.clientX - contentPosition.left) / contentPosition.scaleX;
          y = (evt.clientY - contentPosition.top) / contentPosition.scaleY;
          this.pointerPos = {
            x,
            y
          };
          this._pointerPositions = [{
            x,
            y,
            id: Util_1.Util._getFirstPointerId(evt)
          }];
          this._changedPointerPositions = [{
            x,
            y,
            id: Util_1.Util._getFirstPointerId(evt)
          }];
        }
      }
      _setPointerPosition(evt) {
        Util_1.Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.');
        this.setPointersPositions(evt);
      }
      _getContentPosition() {
        if (!this.content || !this.content.getBoundingClientRect) {
          return {
            top: 0,
            left: 0,
            scaleX: 1,
            scaleY: 1
          };
        }
        const rect = this.content.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          scaleX: rect.width / this.content.clientWidth || 1,
          scaleY: rect.height / this.content.clientHeight || 1
        };
      }
      _buildDOM() {
        this.bufferCanvas = new Canvas_1.SceneCanvas({
          width: this.width(),
          height: this.height()
        });
        this.bufferHitCanvas = new Canvas_1.HitCanvas({
          pixelRatio: 1,
          width: this.width(),
          height: this.height()
        });
        if (!Global_1.Konva.isBrowser) {
          return;
        }
        const container = this.container();
        if (!container) {
          throw "Stage has no container. A container is required.";
        }
        container.innerHTML = "";
        this.content = document.createElement("div");
        this.content.style.position = "relative";
        this.content.style.userSelect = "none";
        this.content.className = "konvajs-content";
        this.content.setAttribute("role", "presentation");
        container.appendChild(this.content);
        this._resizeDOM();
      }
      cache() {
        Util_1.Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.");
        return this;
      }
      clearCache() {
        return this;
      }
      batchDraw() {
        this.getChildren().forEach(function(layer) {
          layer.batchDraw();
        });
        return this;
      }
    };
    exports.Stage = Stage;
    Stage.prototype.nodeType = STAGE;
    (0, Global_2._registerNode)(Stage);
    Factory_1.Factory.addGetterSetter(Stage, "container");
    if (Global_1.Konva.isBrowser) {
      document.addEventListener("visibilitychange", () => {
        exports.stages.forEach((stage) => {
          stage.batchDraw();
        });
      });
    }
  }
});

// node_modules/konva/lib/Shape.js
var require_Shape = __commonJS({
  "node_modules/konva/lib/Shape.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Shape = exports.shapes = void 0;
    var Global_1 = require_Global();
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Global_2 = require_Global();
    var PointerEvents = require_PointerEvents();
    var HAS_SHADOW = "hasShadow";
    var SHADOW_RGBA = "shadowRGBA";
    var patternImage = "patternImage";
    var linearGradient = "linearGradient";
    var radialGradient = "radialGradient";
    var dummyContext;
    function getDummyContext() {
      if (dummyContext) {
        return dummyContext;
      }
      dummyContext = Util_1.Util.createCanvasElement().getContext("2d");
      return dummyContext;
    }
    exports.shapes = {};
    function _fillFunc(context) {
      const fillRule = this.attrs.fillRule;
      if (fillRule) {
        context.fill(fillRule);
      } else {
        context.fill();
      }
    }
    function _strokeFunc(context) {
      context.stroke();
    }
    function _fillFuncHit(context) {
      const fillRule = this.attrs.fillRule;
      if (fillRule) {
        context.fill(fillRule);
      } else {
        context.fill();
      }
    }
    function _strokeFuncHit(context) {
      context.stroke();
    }
    function _clearHasShadowCache() {
      this._clearCache(HAS_SHADOW);
    }
    function _clearGetShadowRGBACache() {
      this._clearCache(SHADOW_RGBA);
    }
    function _clearFillPatternCache() {
      this._clearCache(patternImage);
    }
    function _clearLinearGradientCache() {
      this._clearCache(linearGradient);
    }
    function _clearRadialGradientCache() {
      this._clearCache(radialGradient);
    }
    var Shape = class extends Node_1.Node {
      constructor(config) {
        super(config);
        let key;
        while (true) {
          key = Util_1.Util.getRandomColor();
          if (key && !(key in exports.shapes)) {
            break;
          }
        }
        this.colorKey = key;
        exports.shapes[key] = this;
      }
      getContext() {
        Util_1.Util.warn("shape.getContext() method is deprecated. Please do not use it.");
        return this.getLayer().getContext();
      }
      getCanvas() {
        Util_1.Util.warn("shape.getCanvas() method is deprecated. Please do not use it.");
        return this.getLayer().getCanvas();
      }
      getSceneFunc() {
        return this.attrs.sceneFunc || this["_sceneFunc"];
      }
      getHitFunc() {
        return this.attrs.hitFunc || this["_hitFunc"];
      }
      hasShadow() {
        return this._getCache(HAS_SHADOW, this._hasShadow);
      }
      _hasShadow() {
        return this.shadowEnabled() && this.shadowOpacity() !== 0 && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY());
      }
      _getFillPattern() {
        return this._getCache(patternImage, this.__getFillPattern);
      }
      __getFillPattern() {
        if (this.fillPatternImage()) {
          const ctx = getDummyContext();
          const pattern = ctx.createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat");
          if (pattern && pattern.setTransform) {
            const tr = new Util_1.Transform();
            tr.translate(this.fillPatternX(), this.fillPatternY());
            tr.rotate(Global_1.Konva.getAngle(this.fillPatternRotation()));
            tr.scale(this.fillPatternScaleX(), this.fillPatternScaleY());
            tr.translate(-1 * this.fillPatternOffsetX(), -1 * this.fillPatternOffsetY());
            const m = tr.getMatrix();
            const matrix = typeof DOMMatrix === "undefined" ? {
              a: m[0],
              b: m[1],
              c: m[2],
              d: m[3],
              e: m[4],
              f: m[5]
            } : new DOMMatrix(m);
            pattern.setTransform(matrix);
          }
          return pattern;
        }
      }
      _getLinearGradient() {
        return this._getCache(linearGradient, this.__getLinearGradient);
      }
      __getLinearGradient() {
        const colorStops = this.fillLinearGradientColorStops();
        if (colorStops) {
          const ctx = getDummyContext();
          const start = this.fillLinearGradientStartPoint();
          const end = this.fillLinearGradientEndPoint();
          const grd = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
          for (let n = 0; n < colorStops.length; n += 2) {
            grd.addColorStop(colorStops[n], colorStops[n + 1]);
          }
          return grd;
        }
      }
      _getRadialGradient() {
        return this._getCache(radialGradient, this.__getRadialGradient);
      }
      __getRadialGradient() {
        const colorStops = this.fillRadialGradientColorStops();
        if (colorStops) {
          const ctx = getDummyContext();
          const start = this.fillRadialGradientStartPoint();
          const end = this.fillRadialGradientEndPoint();
          const grd = ctx.createRadialGradient(start.x, start.y, this.fillRadialGradientStartRadius(), end.x, end.y, this.fillRadialGradientEndRadius());
          for (let n = 0; n < colorStops.length; n += 2) {
            grd.addColorStop(colorStops[n], colorStops[n + 1]);
          }
          return grd;
        }
      }
      getShadowRGBA() {
        return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
      }
      _getShadowRGBA() {
        if (!this.hasShadow()) {
          return;
        }
        const rgba = Util_1.Util.colorToRGBA(this.shadowColor());
        if (rgba) {
          return "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a * (this.shadowOpacity() || 1) + ")";
        }
      }
      hasFill() {
        return this._calculate("hasFill", ["fillEnabled", "fill", "fillPatternImage", "fillLinearGradientColorStops", "fillRadialGradientColorStops"], () => {
          return this.fillEnabled() && !!(this.fill() || this.fillPatternImage() || this.fillLinearGradientColorStops() || this.fillRadialGradientColorStops());
        });
      }
      hasStroke() {
        return this._calculate("hasStroke", ["strokeEnabled", "strokeWidth", "stroke", "strokeLinearGradientColorStops"], () => {
          return this.strokeEnabled() && this.strokeWidth() && !!(this.stroke() || this.strokeLinearGradientColorStops());
        });
      }
      hasHitStroke() {
        const width = this.hitStrokeWidth();
        if (width === "auto") {
          return this.hasStroke();
        }
        return this.strokeEnabled() && !!width;
      }
      intersects(point) {
        const stage = this.getStage();
        if (!stage) {
          return false;
        }
        const bufferHitCanvas = stage.bufferHitCanvas;
        bufferHitCanvas.getContext().clear();
        this.drawHit(bufferHitCanvas, void 0, true);
        const p = bufferHitCanvas.context.getImageData(Math.round(point.x), Math.round(point.y), 1, 1).data;
        return p[3] > 0;
      }
      destroy() {
        Node_1.Node.prototype.destroy.call(this);
        delete exports.shapes[this.colorKey];
        delete this.colorKey;
        return this;
      }
      _useBufferCanvas(forceFill) {
        var _a;
        const perfectDrawEnabled = (_a = this.attrs.perfectDrawEnabled) !== null && _a !== void 0 ? _a : true;
        if (!perfectDrawEnabled) {
          return false;
        }
        const hasFill = forceFill || this.hasFill();
        const hasStroke = this.hasStroke();
        const isTransparent = this.getAbsoluteOpacity() !== 1;
        if (hasFill && hasStroke && isTransparent) {
          return true;
        }
        const hasShadow = this.hasShadow();
        const strokeForShadow = this.shadowForStrokeEnabled();
        if (hasFill && hasStroke && hasShadow && strokeForShadow) {
          return true;
        }
        return false;
      }
      setStrokeHitEnabled(val) {
        Util_1.Util.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead.");
        if (val) {
          this.hitStrokeWidth("auto");
        } else {
          this.hitStrokeWidth(0);
        }
      }
      getStrokeHitEnabled() {
        if (this.hitStrokeWidth() === 0) {
          return false;
        } else {
          return true;
        }
      }
      getSelfRect() {
        const size = this.size();
        return {
          x: this._centroid ? -size.width / 2 : 0,
          y: this._centroid ? -size.height / 2 : 0,
          width: size.width,
          height: size.height
        };
      }
      getClientRect(config = {}) {
        let hasCachedParent = false;
        let parent = this.getParent();
        while (parent) {
          if (parent.isCached()) {
            hasCachedParent = true;
            break;
          }
          parent = parent.getParent();
        }
        const skipTransform = config.skipTransform;
        const relativeTo = config.relativeTo || hasCachedParent && this.getStage() || void 0;
        const fillRect = this.getSelfRect();
        const applyStroke = !config.skipStroke && this.hasStroke();
        const strokeWidth = applyStroke && this.strokeWidth() || 0;
        const fillAndStrokeWidth = fillRect.width + strokeWidth;
        const fillAndStrokeHeight = fillRect.height + strokeWidth;
        const applyShadow = !config.skipShadow && this.hasShadow();
        const shadowOffsetX = applyShadow ? this.shadowOffsetX() : 0;
        const shadowOffsetY = applyShadow ? this.shadowOffsetY() : 0;
        const preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
        const preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);
        const blurRadius = applyShadow && this.shadowBlur() || 0;
        const width = preWidth + blurRadius * 2;
        const height = preHeight + blurRadius * 2;
        const rect = {
          width,
          height,
          x: -(strokeWidth / 2 + blurRadius) + Math.min(shadowOffsetX, 0) + fillRect.x,
          y: -(strokeWidth / 2 + blurRadius) + Math.min(shadowOffsetY, 0) + fillRect.y
        };
        if (!skipTransform) {
          return this._transformedRect(rect, relativeTo);
        }
        return rect;
      }
      drawScene(can, top, bufferCanvas) {
        const layer = this.getLayer();
        let canvas = can || layer.getCanvas(), context = canvas.getContext(), cachedCanvas = this._getCanvasCache(), drawFunc = this.getSceneFunc(), hasShadow = this.hasShadow(), stage, bufferContext;
        const skipBuffer = canvas.isCache;
        const cachingSelf = top === this;
        if (!this.isVisible() && !cachingSelf) {
          return this;
        }
        if (cachedCanvas) {
          context.save();
          const m = this.getAbsoluteTransform(top).getMatrix();
          context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
          this._drawCachedSceneCanvas(context);
          context.restore();
          return this;
        }
        if (!drawFunc) {
          return this;
        }
        context.save();
        if (this._useBufferCanvas() && !skipBuffer) {
          stage = this.getStage();
          const bc = bufferCanvas || stage.bufferCanvas;
          bufferContext = bc.getContext();
          bufferContext.clear();
          bufferContext.save();
          bufferContext._applyLineJoin(this);
          var o = this.getAbsoluteTransform(top).getMatrix();
          bufferContext.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
          drawFunc.call(this, bufferContext, this);
          bufferContext.restore();
          const ratio = bc.pixelRatio;
          if (hasShadow) {
            context._applyShadow(this);
          }
          context._applyOpacity(this);
          context._applyGlobalCompositeOperation(this);
          context.drawImage(bc._canvas, 0, 0, bc.width / ratio, bc.height / ratio);
        } else {
          context._applyLineJoin(this);
          if (!cachingSelf) {
            var o = this.getAbsoluteTransform(top).getMatrix();
            context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
            context._applyOpacity(this);
            context._applyGlobalCompositeOperation(this);
          }
          if (hasShadow) {
            context._applyShadow(this);
          }
          drawFunc.call(this, context, this);
        }
        context.restore();
        return this;
      }
      drawHit(can, top, skipDragCheck = false) {
        if (!this.shouldDrawHit(top, skipDragCheck)) {
          return this;
        }
        const layer = this.getLayer(), canvas = can || layer.hitCanvas, context = canvas && canvas.getContext(), drawFunc = this.hitFunc() || this.sceneFunc(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
        if (!this.colorKey) {
          Util_1.Util.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()");
        }
        if (cachedHitCanvas) {
          context.save();
          const m = this.getAbsoluteTransform(top).getMatrix();
          context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
          this._drawCachedHitCanvas(context);
          context.restore();
          return this;
        }
        if (!drawFunc) {
          return this;
        }
        context.save();
        context._applyLineJoin(this);
        const selfCache = this === top;
        if (!selfCache) {
          const o = this.getAbsoluteTransform(top).getMatrix();
          context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
        }
        drawFunc.call(this, context, this);
        context.restore();
        return this;
      }
      drawHitFromCache(alphaThreshold = 0) {
        const cachedCanvas = this._getCanvasCache(), sceneCanvas = this._getCachedSceneCanvas(), hitCanvas = cachedCanvas.hit, hitContext = hitCanvas.getContext(), hitWidth = hitCanvas.getWidth(), hitHeight = hitCanvas.getHeight();
        hitContext.clear();
        hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);
        try {
          const hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
          const hitData = hitImageData.data;
          const len = hitData.length;
          const rgbColorKey = Util_1.Util._hexToRgb(this.colorKey);
          for (let i = 0; i < len; i += 4) {
            const alpha = hitData[i + 3];
            if (alpha > alphaThreshold) {
              hitData[i] = rgbColorKey.r;
              hitData[i + 1] = rgbColorKey.g;
              hitData[i + 2] = rgbColorKey.b;
              hitData[i + 3] = 255;
            } else {
              hitData[i + 3] = 0;
            }
          }
          hitContext.putImageData(hitImageData, 0, 0);
        } catch (e) {
          Util_1.Util.error("Unable to draw hit graph from cached scene canvas. " + e.message);
        }
        return this;
      }
      hasPointerCapture(pointerId) {
        return PointerEvents.hasPointerCapture(pointerId, this);
      }
      setPointerCapture(pointerId) {
        PointerEvents.setPointerCapture(pointerId, this);
      }
      releaseCapture(pointerId) {
        PointerEvents.releaseCapture(pointerId, this);
      }
    };
    exports.Shape = Shape;
    Shape.prototype._fillFunc = _fillFunc;
    Shape.prototype._strokeFunc = _strokeFunc;
    Shape.prototype._fillFuncHit = _fillFuncHit;
    Shape.prototype._strokeFuncHit = _strokeFuncHit;
    Shape.prototype._centroid = false;
    Shape.prototype.nodeType = "Shape";
    (0, Global_2._registerNode)(Shape);
    Shape.prototype.eventListeners = {};
    Shape.prototype.on.call(Shape.prototype, "shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", _clearHasShadowCache);
    Shape.prototype.on.call(Shape.prototype, "shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", _clearGetShadowRGBACache);
    Shape.prototype.on.call(Shape.prototype, "fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva", _clearFillPatternCache);
    Shape.prototype.on.call(Shape.prototype, "fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", _clearLinearGradientCache);
    Shape.prototype.on.call(Shape.prototype, "fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", _clearRadialGradientCache);
    Factory_1.Factory.addGetterSetter(Shape, "stroke", void 0, (0, Validators_1.getStringOrGradientValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "strokeWidth", 2, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "fillAfterStrokeEnabled", false);
    Factory_1.Factory.addGetterSetter(Shape, "hitStrokeWidth", "auto", (0, Validators_1.getNumberOrAutoValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "strokeHitEnabled", true, (0, Validators_1.getBooleanValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "perfectDrawEnabled", true, (0, Validators_1.getBooleanValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "shadowForStrokeEnabled", true, (0, Validators_1.getBooleanValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "lineJoin");
    Factory_1.Factory.addGetterSetter(Shape, "lineCap");
    Factory_1.Factory.addGetterSetter(Shape, "sceneFunc");
    Factory_1.Factory.addGetterSetter(Shape, "hitFunc");
    Factory_1.Factory.addGetterSetter(Shape, "dash");
    Factory_1.Factory.addGetterSetter(Shape, "dashOffset", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "shadowColor", void 0, (0, Validators_1.getStringValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "shadowBlur", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "shadowOpacity", 1, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addComponentsGetterSetter(Shape, "shadowOffset", ["x", "y"]);
    Factory_1.Factory.addGetterSetter(Shape, "shadowOffsetX", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "shadowOffsetY", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternImage");
    Factory_1.Factory.addGetterSetter(Shape, "fill", void 0, (0, Validators_1.getStringOrGradientValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternX", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternY", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientColorStops");
    Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientColorStops");
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientStartRadius", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientEndRadius", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientColorStops");
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternRepeat", "repeat");
    Factory_1.Factory.addGetterSetter(Shape, "fillEnabled", true);
    Factory_1.Factory.addGetterSetter(Shape, "strokeEnabled", true);
    Factory_1.Factory.addGetterSetter(Shape, "shadowEnabled", true);
    Factory_1.Factory.addGetterSetter(Shape, "dashEnabled", true);
    Factory_1.Factory.addGetterSetter(Shape, "strokeScaleEnabled", true);
    Factory_1.Factory.addGetterSetter(Shape, "fillPriority", "color");
    Factory_1.Factory.addComponentsGetterSetter(Shape, "fillPatternOffset", ["x", "y"]);
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternOffsetX", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternOffsetY", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addComponentsGetterSetter(Shape, "fillPatternScale", ["x", "y"]);
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternScaleX", 1, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternScaleY", 1, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addComponentsGetterSetter(Shape, "fillLinearGradientStartPoint", ["x", "y"]);
    Factory_1.Factory.addComponentsGetterSetter(Shape, "strokeLinearGradientStartPoint", ["x", "y"]);
    Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientStartPointX", 0);
    Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientStartPointX", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientStartPointY", 0);
    Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientStartPointY", 0);
    Factory_1.Factory.addComponentsGetterSetter(Shape, "fillLinearGradientEndPoint", ["x", "y"]);
    Factory_1.Factory.addComponentsGetterSetter(Shape, "strokeLinearGradientEndPoint", ["x", "y"]);
    Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientEndPointX", 0);
    Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientEndPointX", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientEndPointY", 0);
    Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientEndPointY", 0);
    Factory_1.Factory.addComponentsGetterSetter(Shape, "fillRadialGradientStartPoint", ["x", "y"]);
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientStartPointX", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientStartPointY", 0);
    Factory_1.Factory.addComponentsGetterSetter(Shape, "fillRadialGradientEndPoint", ["x", "y"]);
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientEndPointX", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientEndPointY", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternRotation", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillRule", void 0, (0, Validators_1.getStringValidator)());
    Factory_1.Factory.backCompat(Shape, {
      dashArray: "dash",
      getDashArray: "getDash",
      setDashArray: "getDash",
      drawFunc: "sceneFunc",
      getDrawFunc: "getSceneFunc",
      setDrawFunc: "setSceneFunc",
      drawHitFunc: "hitFunc",
      getDrawHitFunc: "getHitFunc",
      setDrawHitFunc: "setHitFunc"
    });
  }
});

// node_modules/konva/lib/Layer.js
var require_Layer = __commonJS({
  "node_modules/konva/lib/Layer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Layer = void 0;
    var Util_1 = require_Util();
    var Container_1 = require_Container();
    var Node_1 = require_Node();
    var Factory_1 = require_Factory();
    var Canvas_1 = require_Canvas();
    var Validators_1 = require_Validators();
    var Shape_1 = require_Shape();
    var Global_1 = require_Global();
    var HASH = "#";
    var BEFORE_DRAW = "beforeDraw";
    var DRAW = "draw";
    var INTERSECTION_OFFSETS = [{
      x: 0,
      y: 0
    }, {
      x: -1,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: 1,
      y: 1
    }, {
      x: -1,
      y: 1
    }];
    var INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;
    var Layer = class extends Container_1.Container {
      constructor(config) {
        super(config);
        this.canvas = new Canvas_1.SceneCanvas();
        this.hitCanvas = new Canvas_1.HitCanvas({
          pixelRatio: 1
        });
        this._waitingForDraw = false;
        this.on("visibleChange.konva", this._checkVisibility);
        this._checkVisibility();
        this.on("imageSmoothingEnabledChange.konva", this._setSmoothEnabled);
        this._setSmoothEnabled();
      }
      createPNGStream() {
        const c = this.canvas._canvas;
        return c.createPNGStream();
      }
      getCanvas() {
        return this.canvas;
      }
      getNativeCanvasElement() {
        return this.canvas._canvas;
      }
      getHitCanvas() {
        return this.hitCanvas;
      }
      getContext() {
        return this.getCanvas().getContext();
      }
      clear(bounds) {
        this.getContext().clear(bounds);
        this.getHitCanvas().getContext().clear(bounds);
        return this;
      }
      setZIndex(index) {
        super.setZIndex(index);
        const stage = this.getStage();
        if (stage && stage.content) {
          stage.content.removeChild(this.getNativeCanvasElement());
          if (index < stage.children.length - 1) {
            stage.content.insertBefore(this.getNativeCanvasElement(), stage.children[index + 1].getCanvas()._canvas);
          } else {
            stage.content.appendChild(this.getNativeCanvasElement());
          }
        }
        return this;
      }
      moveToTop() {
        Node_1.Node.prototype.moveToTop.call(this);
        const stage = this.getStage();
        if (stage && stage.content) {
          stage.content.removeChild(this.getNativeCanvasElement());
          stage.content.appendChild(this.getNativeCanvasElement());
        }
        return true;
      }
      moveUp() {
        const moved = Node_1.Node.prototype.moveUp.call(this);
        if (!moved) {
          return false;
        }
        const stage = this.getStage();
        if (!stage || !stage.content) {
          return false;
        }
        stage.content.removeChild(this.getNativeCanvasElement());
        if (this.index < stage.children.length - 1) {
          stage.content.insertBefore(this.getNativeCanvasElement(), stage.children[this.index + 1].getCanvas()._canvas);
        } else {
          stage.content.appendChild(this.getNativeCanvasElement());
        }
        return true;
      }
      moveDown() {
        if (Node_1.Node.prototype.moveDown.call(this)) {
          const stage = this.getStage();
          if (stage) {
            const children = stage.children;
            if (stage.content) {
              stage.content.removeChild(this.getNativeCanvasElement());
              stage.content.insertBefore(this.getNativeCanvasElement(), children[this.index + 1].getCanvas()._canvas);
            }
          }
          return true;
        }
        return false;
      }
      moveToBottom() {
        if (Node_1.Node.prototype.moveToBottom.call(this)) {
          const stage = this.getStage();
          if (stage) {
            const children = stage.children;
            if (stage.content) {
              stage.content.removeChild(this.getNativeCanvasElement());
              stage.content.insertBefore(this.getNativeCanvasElement(), children[1].getCanvas()._canvas);
            }
          }
          return true;
        }
        return false;
      }
      getLayer() {
        return this;
      }
      remove() {
        const _canvas = this.getNativeCanvasElement();
        Node_1.Node.prototype.remove.call(this);
        if (_canvas && _canvas.parentNode && Util_1.Util._isInDocument(_canvas)) {
          _canvas.parentNode.removeChild(_canvas);
        }
        return this;
      }
      getStage() {
        return this.parent;
      }
      setSize({
        width,
        height
      }) {
        this.canvas.setSize(width, height);
        this.hitCanvas.setSize(width, height);
        this._setSmoothEnabled();
        return this;
      }
      _validateAdd(child) {
        const type = child.getType();
        if (type !== "Group" && type !== "Shape") {
          Util_1.Util.throw("You may only add groups and shapes to a layer.");
        }
      }
      _toKonvaCanvas(config) {
        config = config || {};
        config.width = config.width || this.getWidth();
        config.height = config.height || this.getHeight();
        config.x = config.x !== void 0 ? config.x : this.x();
        config.y = config.y !== void 0 ? config.y : this.y();
        return Node_1.Node.prototype._toKonvaCanvas.call(this, config);
      }
      _checkVisibility() {
        const visible = this.visible();
        if (visible) {
          this.canvas._canvas.style.display = "block";
        } else {
          this.canvas._canvas.style.display = "none";
        }
      }
      _setSmoothEnabled() {
        this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled();
      }
      getWidth() {
        if (this.parent) {
          return this.parent.width();
        }
      }
      setWidth() {
        Util_1.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
      }
      getHeight() {
        if (this.parent) {
          return this.parent.height();
        }
      }
      setHeight() {
        Util_1.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
      }
      batchDraw() {
        if (!this._waitingForDraw) {
          this._waitingForDraw = true;
          Util_1.Util.requestAnimFrame(() => {
            this.draw();
            this._waitingForDraw = false;
          });
        }
        return this;
      }
      getIntersection(pos) {
        if (!this.isListening() || !this.isVisible()) {
          return null;
        }
        let spiralSearchDistance = 1;
        let continueSearch = false;
        while (true) {
          for (let i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
            const intersectionOffset = INTERSECTION_OFFSETS[i];
            const obj = this._getIntersection({
              x: pos.x + intersectionOffset.x * spiralSearchDistance,
              y: pos.y + intersectionOffset.y * spiralSearchDistance
            });
            const shape = obj.shape;
            if (shape) {
              return shape;
            }
            continueSearch = !!obj.antialiased;
            if (!obj.antialiased) {
              break;
            }
          }
          if (continueSearch) {
            spiralSearchDistance += 1;
          } else {
            return null;
          }
        }
      }
      _getIntersection(pos) {
        const ratio = this.hitCanvas.pixelRatio;
        const p = this.hitCanvas.context.getImageData(Math.round(pos.x * ratio), Math.round(pos.y * ratio), 1, 1).data;
        const p3 = p[3];
        if (p3 === 255) {
          const colorKey = Util_1.Util._rgbToHex(p[0], p[1], p[2]);
          const shape = Shape_1.shapes[HASH + colorKey];
          if (shape) {
            return {
              shape
            };
          }
          return {
            antialiased: true
          };
        } else if (p3 > 0) {
          return {
            antialiased: true
          };
        }
        return {};
      }
      drawScene(can, top) {
        const layer = this.getLayer(), canvas = can || layer && layer.getCanvas();
        this._fire(BEFORE_DRAW, {
          node: this
        });
        if (this.clearBeforeDraw()) {
          canvas.getContext().clear();
        }
        Container_1.Container.prototype.drawScene.call(this, canvas, top);
        this._fire(DRAW, {
          node: this
        });
        return this;
      }
      drawHit(can, top) {
        const layer = this.getLayer(), canvas = can || layer && layer.hitCanvas;
        if (layer && layer.clearBeforeDraw()) {
          layer.getHitCanvas().getContext().clear();
        }
        Container_1.Container.prototype.drawHit.call(this, canvas, top);
        return this;
      }
      enableHitGraph() {
        this.hitGraphEnabled(true);
        return this;
      }
      disableHitGraph() {
        this.hitGraphEnabled(false);
        return this;
      }
      setHitGraphEnabled(val) {
        Util_1.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead.");
        this.listening(val);
      }
      getHitGraphEnabled(val) {
        Util_1.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead.");
        return this.listening();
      }
      toggleHitCanvas() {
        if (!this.parent || !this.parent["content"]) {
          return;
        }
        const parent = this.parent;
        const added = !!this.hitCanvas._canvas.parentNode;
        if (added) {
          parent.content.removeChild(this.hitCanvas._canvas);
        } else {
          parent.content.appendChild(this.hitCanvas._canvas);
        }
      }
      destroy() {
        Util_1.Util.releaseCanvas(this.getNativeCanvasElement(), this.getHitCanvas()._canvas);
        return super.destroy();
      }
    };
    exports.Layer = Layer;
    Layer.prototype.nodeType = "Layer";
    (0, Global_1._registerNode)(Layer);
    Factory_1.Factory.addGetterSetter(Layer, "imageSmoothingEnabled", true);
    Factory_1.Factory.addGetterSetter(Layer, "clearBeforeDraw", true);
    Factory_1.Factory.addGetterSetter(Layer, "hitGraphEnabled", true, (0, Validators_1.getBooleanValidator)());
  }
});

// node_modules/konva/lib/FastLayer.js
var require_FastLayer = __commonJS({
  "node_modules/konva/lib/FastLayer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.FastLayer = void 0;
    var Util_1 = require_Util();
    var Layer_1 = require_Layer();
    var Global_1 = require_Global();
    var FastLayer = class extends Layer_1.Layer {
      constructor(attrs) {
        super(attrs);
        this.listening(false);
        Util_1.Util.warn('Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.');
      }
    };
    exports.FastLayer = FastLayer;
    FastLayer.prototype.nodeType = "FastLayer";
    (0, Global_1._registerNode)(FastLayer);
  }
});

// node_modules/konva/lib/Group.js
var require_Group = __commonJS({
  "node_modules/konva/lib/Group.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Group = void 0;
    var Util_1 = require_Util();
    var Container_1 = require_Container();
    var Global_1 = require_Global();
    var Group = class extends Container_1.Container {
      _validateAdd(child) {
        const type = child.getType();
        if (type !== "Group" && type !== "Shape") {
          Util_1.Util.throw("You may only add groups and shapes to groups.");
        }
      }
    };
    exports.Group = Group;
    Group.prototype.nodeType = "Group";
    (0, Global_1._registerNode)(Group);
  }
});

// node_modules/konva/lib/Animation.js
var require_Animation = __commonJS({
  "node_modules/konva/lib/Animation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Animation = void 0;
    var Global_1 = require_Global();
    var Util_1 = require_Util();
    var now = function() {
      if (Global_1.glob.performance && Global_1.glob.performance.now) {
        return function() {
          return Global_1.glob.performance.now();
        };
      }
      return function() {
        return (/* @__PURE__ */ new Date()).getTime();
      };
    }();
    var Animation = class _Animation {
      constructor(func, layers) {
        this.id = _Animation.animIdCounter++;
        this.frame = {
          time: 0,
          timeDiff: 0,
          lastTime: now(),
          frameRate: 0
        };
        this.func = func;
        this.setLayers(layers);
      }
      setLayers(layers) {
        let lays = [];
        if (layers) {
          lays = Array.isArray(layers) ? layers : [layers];
        }
        this.layers = lays;
        return this;
      }
      getLayers() {
        return this.layers;
      }
      addLayer(layer) {
        const layers = this.layers;
        const len = layers.length;
        for (let n = 0; n < len; n++) {
          if (layers[n]._id === layer._id) {
            return false;
          }
        }
        this.layers.push(layer);
        return true;
      }
      isRunning() {
        const a = _Animation;
        const animations = a.animations;
        const len = animations.length;
        for (let n = 0; n < len; n++) {
          if (animations[n].id === this.id) {
            return true;
          }
        }
        return false;
      }
      start() {
        this.stop();
        this.frame.timeDiff = 0;
        this.frame.lastTime = now();
        _Animation._addAnimation(this);
        return this;
      }
      stop() {
        _Animation._removeAnimation(this);
        return this;
      }
      _updateFrameObject(time) {
        this.frame.timeDiff = time - this.frame.lastTime;
        this.frame.lastTime = time;
        this.frame.time += this.frame.timeDiff;
        this.frame.frameRate = 1e3 / this.frame.timeDiff;
      }
      static _addAnimation(anim) {
        this.animations.push(anim);
        this._handleAnimation();
      }
      static _removeAnimation(anim) {
        const id = anim.id;
        const animations = this.animations;
        const len = animations.length;
        for (let n = 0; n < len; n++) {
          if (animations[n].id === id) {
            this.animations.splice(n, 1);
            break;
          }
        }
      }
      static _runFrames() {
        const layerHash = {};
        const animations = this.animations;
        for (let n = 0; n < animations.length; n++) {
          const anim = animations[n];
          const layers = anim.layers;
          const func = anim.func;
          anim._updateFrameObject(now());
          const layersLen = layers.length;
          let needRedraw;
          if (func) {
            needRedraw = func.call(anim, anim.frame) !== false;
          } else {
            needRedraw = true;
          }
          if (!needRedraw) {
            continue;
          }
          for (let i = 0; i < layersLen; i++) {
            const layer = layers[i];
            if (layer._id !== void 0) {
              layerHash[layer._id] = layer;
            }
          }
        }
        for (const key in layerHash) {
          if (!layerHash.hasOwnProperty(key)) {
            continue;
          }
          layerHash[key].batchDraw();
        }
      }
      static _animationLoop() {
        const Anim = _Animation;
        if (Anim.animations.length) {
          Anim._runFrames();
          Util_1.Util.requestAnimFrame(Anim._animationLoop);
        } else {
          Anim.animRunning = false;
        }
      }
      static _handleAnimation() {
        if (!this.animRunning) {
          this.animRunning = true;
          Util_1.Util.requestAnimFrame(this._animationLoop);
        }
      }
    };
    exports.Animation = Animation;
    Animation.animations = [];
    Animation.animIdCounter = 0;
    Animation.animRunning = false;
  }
});

// node_modules/konva/lib/Tween.js
var require_Tween = __commonJS({
  "node_modules/konva/lib/Tween.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Easings = exports.Tween = void 0;
    var Util_1 = require_Util();
    var Animation_1 = require_Animation();
    var Node_1 = require_Node();
    var Global_1 = require_Global();
    var blacklist = {
      node: 1,
      duration: 1,
      easing: 1,
      onFinish: 1,
      yoyo: 1
    };
    var PAUSED = 1;
    var PLAYING = 2;
    var REVERSING = 3;
    var colorAttrs = ["fill", "stroke", "shadowColor"];
    var idCounter = 0;
    var TweenEngine = class {
      constructor(prop, propFunc, func, begin, finish, duration, yoyo) {
        this.prop = prop;
        this.propFunc = propFunc;
        this.begin = begin;
        this._pos = begin;
        this.duration = duration;
        this._change = 0;
        this.prevPos = 0;
        this.yoyo = yoyo;
        this._time = 0;
        this._position = 0;
        this._startTime = 0;
        this._finish = 0;
        this.func = func;
        this._change = finish - this.begin;
        this.pause();
      }
      fire(str) {
        const handler = this[str];
        if (handler) {
          handler();
        }
      }
      setTime(t) {
        if (t > this.duration) {
          if (this.yoyo) {
            this._time = this.duration;
            this.reverse();
          } else {
            this.finish();
          }
        } else if (t < 0) {
          if (this.yoyo) {
            this._time = 0;
            this.play();
          } else {
            this.reset();
          }
        } else {
          this._time = t;
          this.update();
        }
      }
      getTime() {
        return this._time;
      }
      setPosition(p) {
        this.prevPos = this._pos;
        this.propFunc(p);
        this._pos = p;
      }
      getPosition(t) {
        if (t === void 0) {
          t = this._time;
        }
        return this.func(t, this.begin, this._change, this.duration);
      }
      play() {
        this.state = PLAYING;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire("onPlay");
      }
      reverse() {
        this.state = REVERSING;
        this._time = this.duration - this._time;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire("onReverse");
      }
      seek(t) {
        this.pause();
        this._time = t;
        this.update();
        this.fire("onSeek");
      }
      reset() {
        this.pause();
        this._time = 0;
        this.update();
        this.fire("onReset");
      }
      finish() {
        this.pause();
        this._time = this.duration;
        this.update();
        this.fire("onFinish");
      }
      update() {
        this.setPosition(this.getPosition(this._time));
        this.fire("onUpdate");
      }
      onEnterFrame() {
        const t = this.getTimer() - this._startTime;
        if (this.state === PLAYING) {
          this.setTime(t);
        } else if (this.state === REVERSING) {
          this.setTime(this.duration - t);
        }
      }
      pause() {
        this.state = PAUSED;
        this.fire("onPause");
      }
      getTimer() {
        return (/* @__PURE__ */ new Date()).getTime();
      }
    };
    var Tween = class _Tween {
      constructor(config) {
        const that = this, node = config.node, nodeId = node._id, easing = config.easing || exports.Easings.Linear, yoyo = !!config.yoyo;
        let duration, key;
        if (typeof config.duration === "undefined") {
          duration = 0.3;
        } else if (config.duration === 0) {
          duration = 1e-3;
        } else {
          duration = config.duration;
        }
        this.node = node;
        this._id = idCounter++;
        const layers = node.getLayer() || (node instanceof Global_1.Konva["Stage"] ? node.getLayers() : null);
        if (!layers) {
          Util_1.Util.error("Tween constructor have `node` that is not in a layer. Please add node into layer first.");
        }
        this.anim = new Animation_1.Animation(function() {
          that.tween.onEnterFrame();
        }, layers);
        this.tween = new TweenEngine(key, function(i) {
          that._tweenFunc(i);
        }, easing, 0, 1, duration * 1e3, yoyo);
        this._addListeners();
        if (!_Tween.attrs[nodeId]) {
          _Tween.attrs[nodeId] = {};
        }
        if (!_Tween.attrs[nodeId][this._id]) {
          _Tween.attrs[nodeId][this._id] = {};
        }
        if (!_Tween.tweens[nodeId]) {
          _Tween.tweens[nodeId] = {};
        }
        for (key in config) {
          if (blacklist[key] === void 0) {
            this._addAttr(key, config[key]);
          }
        }
        this.reset();
        this.onFinish = config.onFinish;
        this.onReset = config.onReset;
        this.onUpdate = config.onUpdate;
      }
      _addAttr(key, end) {
        const node = this.node, nodeId = node._id;
        let diff, len, trueEnd, trueStart, endRGBA;
        const tweenId = _Tween.tweens[nodeId][key];
        if (tweenId) {
          delete _Tween.attrs[nodeId][tweenId][key];
        }
        let start = node.getAttr(key);
        if (Util_1.Util._isArray(end)) {
          diff = [];
          len = Math.max(end.length, start.length);
          if (key === "points" && end.length !== start.length) {
            if (end.length > start.length) {
              trueStart = start;
              start = Util_1.Util._prepareArrayForTween(start, end, node.closed());
            } else {
              trueEnd = end;
              end = Util_1.Util._prepareArrayForTween(end, start, node.closed());
            }
          }
          if (key.indexOf("fill") === 0) {
            for (let n = 0; n < len; n++) {
              if (n % 2 === 0) {
                diff.push(end[n] - start[n]);
              } else {
                const startRGBA = Util_1.Util.colorToRGBA(start[n]);
                endRGBA = Util_1.Util.colorToRGBA(end[n]);
                start[n] = startRGBA;
                diff.push({
                  r: endRGBA.r - startRGBA.r,
                  g: endRGBA.g - startRGBA.g,
                  b: endRGBA.b - startRGBA.b,
                  a: endRGBA.a - startRGBA.a
                });
              }
            }
          } else {
            for (let n = 0; n < len; n++) {
              diff.push(end[n] - start[n]);
            }
          }
        } else if (colorAttrs.indexOf(key) !== -1) {
          start = Util_1.Util.colorToRGBA(start);
          endRGBA = Util_1.Util.colorToRGBA(end);
          diff = {
            r: endRGBA.r - start.r,
            g: endRGBA.g - start.g,
            b: endRGBA.b - start.b,
            a: endRGBA.a - start.a
          };
        } else {
          diff = end - start;
        }
        _Tween.attrs[nodeId][this._id][key] = {
          start,
          diff,
          end,
          trueEnd,
          trueStart
        };
        _Tween.tweens[nodeId][key] = this._id;
      }
      _tweenFunc(i) {
        const node = this.node, attrs = _Tween.attrs[node._id][this._id];
        let key, attr, start, diff, newVal, n, len, end;
        for (key in attrs) {
          attr = attrs[key];
          start = attr.start;
          diff = attr.diff;
          end = attr.end;
          if (Util_1.Util._isArray(start)) {
            newVal = [];
            len = Math.max(start.length, end.length);
            if (key.indexOf("fill") === 0) {
              for (n = 0; n < len; n++) {
                if (n % 2 === 0) {
                  newVal.push((start[n] || 0) + diff[n] * i);
                } else {
                  newVal.push("rgba(" + Math.round(start[n].r + diff[n].r * i) + "," + Math.round(start[n].g + diff[n].g * i) + "," + Math.round(start[n].b + diff[n].b * i) + "," + (start[n].a + diff[n].a * i) + ")");
                }
              }
            } else {
              for (n = 0; n < len; n++) {
                newVal.push((start[n] || 0) + diff[n] * i);
              }
            }
          } else if (colorAttrs.indexOf(key) !== -1) {
            newVal = "rgba(" + Math.round(start.r + diff.r * i) + "," + Math.round(start.g + diff.g * i) + "," + Math.round(start.b + diff.b * i) + "," + (start.a + diff.a * i) + ")";
          } else {
            newVal = start + diff * i;
          }
          node.setAttr(key, newVal);
        }
      }
      _addListeners() {
        this.tween.onPlay = () => {
          this.anim.start();
        };
        this.tween.onReverse = () => {
          this.anim.start();
        };
        this.tween.onPause = () => {
          this.anim.stop();
        };
        this.tween.onFinish = () => {
          const node = this.node;
          const attrs = _Tween.attrs[node._id][this._id];
          if (attrs.points && attrs.points.trueEnd) {
            node.setAttr("points", attrs.points.trueEnd);
          }
          if (this.onFinish) {
            this.onFinish.call(this);
          }
        };
        this.tween.onReset = () => {
          const node = this.node;
          const attrs = _Tween.attrs[node._id][this._id];
          if (attrs.points && attrs.points.trueStart) {
            node.points(attrs.points.trueStart);
          }
          if (this.onReset) {
            this.onReset();
          }
        };
        this.tween.onUpdate = () => {
          if (this.onUpdate) {
            this.onUpdate.call(this);
          }
        };
      }
      play() {
        this.tween.play();
        return this;
      }
      reverse() {
        this.tween.reverse();
        return this;
      }
      reset() {
        this.tween.reset();
        return this;
      }
      seek(t) {
        this.tween.seek(t * 1e3);
        return this;
      }
      pause() {
        this.tween.pause();
        return this;
      }
      finish() {
        this.tween.finish();
        return this;
      }
      destroy() {
        const nodeId = this.node._id, thisId = this._id, attrs = _Tween.tweens[nodeId];
        this.pause();
        for (const key in attrs) {
          delete _Tween.tweens[nodeId][key];
        }
        delete _Tween.attrs[nodeId][thisId];
      }
    };
    exports.Tween = Tween;
    Tween.attrs = {};
    Tween.tweens = {};
    Node_1.Node.prototype.to = function(params) {
      const onFinish = params.onFinish;
      params.node = this;
      params.onFinish = function() {
        this.destroy();
        if (onFinish) {
          onFinish();
        }
      };
      const tween = new Tween(params);
      tween.play();
    };
    exports.Easings = {
      BackEaseIn(t, b, c, d) {
        const s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
      BackEaseOut(t, b, c, d) {
        const s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      },
      BackEaseInOut(t, b, c, d) {
        let s = 1.70158;
        if ((t /= d / 2) < 1) {
          return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
      },
      ElasticEaseIn(t, b, c, d, a, p) {
        let s = 0;
        if (t === 0) {
          return b;
        }
        if ((t /= d) === 1) {
          return b + c;
        }
        if (!p) {
          p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      },
      ElasticEaseOut(t, b, c, d, a, p) {
        let s = 0;
        if (t === 0) {
          return b;
        }
        if ((t /= d) === 1) {
          return b + c;
        }
        if (!p) {
          p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
      },
      ElasticEaseInOut(t, b, c, d, a, p) {
        let s = 0;
        if (t === 0) {
          return b;
        }
        if ((t /= d / 2) === 2) {
          return b + c;
        }
        if (!p) {
          p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
          return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
      },
      BounceEaseOut(t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
          return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
          return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        } else if (t < 2.5 / 2.75) {
          return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        } else {
          return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
      },
      BounceEaseIn(t, b, c, d) {
        return c - exports.Easings.BounceEaseOut(d - t, 0, c, d) + b;
      },
      BounceEaseInOut(t, b, c, d) {
        if (t < d / 2) {
          return exports.Easings.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
        } else {
          return exports.Easings.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
      },
      EaseIn(t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      EaseOut(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      EaseInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) {
          return c / 2 * t * t + b;
        }
        return -c / 2 * (--t * (t - 2) - 1) + b;
      },
      StrongEaseIn(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
      },
      StrongEaseOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      StrongEaseInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) {
          return c / 2 * t * t * t * t * t + b;
        }
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      },
      Linear(t, b, c, d) {
        return c * t / d + b;
      }
    };
  }
});

// node_modules/konva/lib/_CoreInternals.js
var require_CoreInternals = __commonJS({
  "node_modules/konva/lib/_CoreInternals.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Konva = void 0;
    var Global_1 = require_Global();
    var Util_1 = require_Util();
    var Node_1 = require_Node();
    var Container_1 = require_Container();
    var Stage_1 = require_Stage();
    var Layer_1 = require_Layer();
    var FastLayer_1 = require_FastLayer();
    var Group_1 = require_Group();
    var DragAndDrop_1 = require_DragAndDrop();
    var Shape_1 = require_Shape();
    var Animation_1 = require_Animation();
    var Tween_1 = require_Tween();
    var Context_1 = require_Context();
    var Canvas_1 = require_Canvas();
    exports.Konva = Util_1.Util._assign(Global_1.Konva, {
      Util: Util_1.Util,
      Transform: Util_1.Transform,
      Node: Node_1.Node,
      Container: Container_1.Container,
      Stage: Stage_1.Stage,
      stages: Stage_1.stages,
      Layer: Layer_1.Layer,
      FastLayer: FastLayer_1.FastLayer,
      Group: Group_1.Group,
      DD: DragAndDrop_1.DD,
      Shape: Shape_1.Shape,
      shapes: Shape_1.shapes,
      Animation: Animation_1.Animation,
      Tween: Tween_1.Tween,
      Easings: Tween_1.Easings,
      Context: Context_1.Context,
      Canvas: Canvas_1.Canvas
    });
    exports.default = exports.Konva;
  }
});

// node_modules/konva/lib/shapes/Arc.js
var require_Arc = __commonJS({
  "node_modules/konva/lib/shapes/Arc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Arc = void 0;
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Global_1 = require_Global();
    var Validators_1 = require_Validators();
    var Global_2 = require_Global();
    var Arc = class extends Shape_1.Shape {
      _sceneFunc(context) {
        const angle = Global_1.Konva.getAngle(this.angle()), clockwise = this.clockwise();
        context.beginPath();
        context.arc(0, 0, this.outerRadius(), 0, angle, clockwise);
        context.arc(0, 0, this.innerRadius(), angle, 0, !clockwise);
        context.closePath();
        context.fillStrokeShape(this);
      }
      getWidth() {
        return this.outerRadius() * 2;
      }
      getHeight() {
        return this.outerRadius() * 2;
      }
      setWidth(width) {
        this.outerRadius(width / 2);
      }
      setHeight(height) {
        this.outerRadius(height / 2);
      }
      getSelfRect() {
        const innerRadius = this.innerRadius();
        const outerRadius = this.outerRadius();
        const clockwise = this.clockwise();
        const angle = Global_1.Konva.getAngle(clockwise ? 360 - this.angle() : this.angle());
        const boundLeftRatio = Math.cos(Math.min(angle, Math.PI));
        const boundRightRatio = 1;
        const boundTopRatio = Math.sin(Math.min(Math.max(Math.PI, angle), 3 * Math.PI / 2));
        const boundBottomRatio = Math.sin(Math.min(angle, Math.PI / 2));
        const boundLeft = boundLeftRatio * (boundLeftRatio > 0 ? innerRadius : outerRadius);
        const boundRight = boundRightRatio * (boundRightRatio > 0 ? outerRadius : innerRadius);
        const boundTop = boundTopRatio * (boundTopRatio > 0 ? innerRadius : outerRadius);
        const boundBottom = boundBottomRatio * (boundBottomRatio > 0 ? outerRadius : innerRadius);
        return {
          x: boundLeft,
          y: clockwise ? -1 * boundBottom : boundTop,
          width: boundRight - boundLeft,
          height: boundBottom - boundTop
        };
      }
    };
    exports.Arc = Arc;
    Arc.prototype._centroid = true;
    Arc.prototype.className = "Arc";
    Arc.prototype._attrsAffectingSize = ["innerRadius", "outerRadius", "angle", "clockwise"];
    (0, Global_2._registerNode)(Arc);
    Factory_1.Factory.addGetterSetter(Arc, "innerRadius", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Arc, "outerRadius", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Arc, "angle", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Arc, "clockwise", false, (0, Validators_1.getBooleanValidator)());
  }
});

// node_modules/konva/lib/shapes/Line.js
var require_Line = __commonJS({
  "node_modules/konva/lib/shapes/Line.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Line = void 0;
    var Factory_1 = require_Factory();
    var Global_1 = require_Global();
    var Shape_1 = require_Shape();
    var Validators_1 = require_Validators();
    function getControlPoints(x0, y0, x1, y1, x2, y2, t) {
      const d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)), d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), fa = t * d01 / (d01 + d12), fb = t * d12 / (d01 + d12), p1x = x1 - fa * (x2 - x0), p1y = y1 - fa * (y2 - y0), p2x = x1 + fb * (x2 - x0), p2y = y1 + fb * (y2 - y0);
      return [p1x, p1y, p2x, p2y];
    }
    function expandPoints(p, tension) {
      const len = p.length, allPoints = [];
      for (let n = 2; n < len - 2; n += 2) {
        const cp = getControlPoints(p[n - 2], p[n - 1], p[n], p[n + 1], p[n + 2], p[n + 3], tension);
        if (isNaN(cp[0])) {
          continue;
        }
        allPoints.push(cp[0]);
        allPoints.push(cp[1]);
        allPoints.push(p[n]);
        allPoints.push(p[n + 1]);
        allPoints.push(cp[2]);
        allPoints.push(cp[3]);
      }
      return allPoints;
    }
    var Line = class extends Shape_1.Shape {
      constructor(config) {
        super(config);
        this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() {
          this._clearCache("tensionPoints");
        });
      }
      _sceneFunc(context) {
        let points = this.points(), length = points.length, tension = this.tension(), closed = this.closed(), bezier = this.bezier(), tp, len, n;
        if (!length) {
          return;
        }
        context.beginPath();
        context.moveTo(points[0], points[1]);
        if (tension !== 0 && length > 4) {
          tp = this.getTensionPoints();
          len = tp.length;
          n = closed ? 0 : 4;
          if (!closed) {
            context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
          }
          while (n < len - 2) {
            context.bezierCurveTo(tp[n++], tp[n++], tp[n++], tp[n++], tp[n++], tp[n++]);
          }
          if (!closed) {
            context.quadraticCurveTo(tp[len - 2], tp[len - 1], points[length - 2], points[length - 1]);
          }
        } else if (bezier) {
          n = 2;
          while (n < length) {
            context.bezierCurveTo(points[n++], points[n++], points[n++], points[n++], points[n++], points[n++]);
          }
        } else {
          for (n = 2; n < length; n += 2) {
            context.lineTo(points[n], points[n + 1]);
          }
        }
        if (closed) {
          context.closePath();
          context.fillStrokeShape(this);
        } else {
          context.strokeShape(this);
        }
      }
      getTensionPoints() {
        return this._getCache("tensionPoints", this._getTensionPoints);
      }
      _getTensionPoints() {
        if (this.closed()) {
          return this._getTensionPointsClosed();
        } else {
          return expandPoints(this.points(), this.tension());
        }
      }
      _getTensionPointsClosed() {
        const p = this.points(), len = p.length, tension = this.tension(), firstControlPoints = getControlPoints(p[len - 2], p[len - 1], p[0], p[1], p[2], p[3], tension), lastControlPoints = getControlPoints(p[len - 4], p[len - 3], p[len - 2], p[len - 1], p[0], p[1], tension), middle = expandPoints(p, tension), tp = [firstControlPoints[2], firstControlPoints[3]].concat(middle).concat([lastControlPoints[0], lastControlPoints[1], p[len - 2], p[len - 1], lastControlPoints[2], lastControlPoints[3], firstControlPoints[0], firstControlPoints[1], p[0], p[1]]);
        return tp;
      }
      getWidth() {
        return this.getSelfRect().width;
      }
      getHeight() {
        return this.getSelfRect().height;
      }
      getSelfRect() {
        let points = this.points();
        if (points.length < 4) {
          return {
            x: points[0] || 0,
            y: points[1] || 0,
            width: 0,
            height: 0
          };
        }
        if (this.tension() !== 0) {
          points = [points[0], points[1], ...this._getTensionPoints(), points[points.length - 2], points[points.length - 1]];
        } else {
          points = this.points();
        }
        let minX = points[0];
        let maxX = points[0];
        let minY = points[1];
        let maxY = points[1];
        let x, y;
        for (let i = 0; i < points.length / 2; i++) {
          x = points[i * 2];
          y = points[i * 2 + 1];
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      }
    };
    exports.Line = Line;
    Line.prototype.className = "Line";
    Line.prototype._attrsAffectingSize = ["points", "bezier", "tension"];
    (0, Global_1._registerNode)(Line);
    Factory_1.Factory.addGetterSetter(Line, "closed", false);
    Factory_1.Factory.addGetterSetter(Line, "bezier", false);
    Factory_1.Factory.addGetterSetter(Line, "tension", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Line, "points", [], (0, Validators_1.getNumberArrayValidator)());
  }
});

// node_modules/konva/lib/BezierFunctions.js
var require_BezierFunctions = __commonJS({
  "node_modules/konva/lib/BezierFunctions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.t2length = exports.getQuadraticArcLength = exports.getCubicArcLength = exports.binomialCoefficients = exports.cValues = exports.tValues = void 0;
    exports.tValues = [[], [], [-0.5773502691896257, 0.5773502691896257], [0, -0.7745966692414834, 0.7745966692414834], [-0.33998104358485626, 0.33998104358485626, -0.8611363115940526, 0.8611363115940526], [0, -0.5384693101056831, 0.5384693101056831, -0.906179845938664, 0.906179845938664], [0.6612093864662645, -0.6612093864662645, -0.2386191860831969, 0.2386191860831969, -0.932469514203152, 0.932469514203152], [0, 0.4058451513773972, -0.4058451513773972, -0.7415311855993945, 0.7415311855993945, -0.9491079123427585, 0.9491079123427585], [-0.1834346424956498, 0.1834346424956498, -0.525532409916329, 0.525532409916329, -0.7966664774136267, 0.7966664774136267, -0.9602898564975363, 0.9602898564975363], [0, -0.8360311073266358, 0.8360311073266358, -0.9681602395076261, 0.9681602395076261, -0.3242534234038089, 0.3242534234038089, -0.6133714327005904, 0.6133714327005904], [-0.14887433898163122, 0.14887433898163122, -0.4333953941292472, 0.4333953941292472, -0.6794095682990244, 0.6794095682990244, -0.8650633666889845, 0.8650633666889845, -0.9739065285171717, 0.9739065285171717], [0, -0.26954315595234496, 0.26954315595234496, -0.5190961292068118, 0.5190961292068118, -0.7301520055740494, 0.7301520055740494, -0.8870625997680953, 0.8870625997680953, -0.978228658146057, 0.978228658146057], [-0.1252334085114689, 0.1252334085114689, -0.3678314989981802, 0.3678314989981802, -0.5873179542866175, 0.5873179542866175, -0.7699026741943047, 0.7699026741943047, -0.9041172563704749, 0.9041172563704749, -0.9815606342467192, 0.9815606342467192], [0, -0.2304583159551348, 0.2304583159551348, -0.44849275103644687, 0.44849275103644687, -0.6423493394403402, 0.6423493394403402, -0.8015780907333099, 0.8015780907333099, -0.9175983992229779, 0.9175983992229779, -0.9841830547185881, 0.9841830547185881], [-0.10805494870734367, 0.10805494870734367, -0.31911236892788974, 0.31911236892788974, -0.5152486363581541, 0.5152486363581541, -0.6872929048116855, 0.6872929048116855, -0.827201315069765, 0.827201315069765, -0.9284348836635735, 0.9284348836635735, -0.9862838086968123, 0.9862838086968123], [0, -0.20119409399743451, 0.20119409399743451, -0.3941513470775634, 0.3941513470775634, -0.5709721726085388, 0.5709721726085388, -0.7244177313601701, 0.7244177313601701, -0.8482065834104272, 0.8482065834104272, -0.937273392400706, 0.937273392400706, -0.9879925180204854, 0.9879925180204854], [-0.09501250983763744, 0.09501250983763744, -0.2816035507792589, 0.2816035507792589, -0.45801677765722737, 0.45801677765722737, -0.6178762444026438, 0.6178762444026438, -0.755404408355003, 0.755404408355003, -0.8656312023878318, 0.8656312023878318, -0.9445750230732326, 0.9445750230732326, -0.9894009349916499, 0.9894009349916499], [0, -0.17848418149584785, 0.17848418149584785, -0.3512317634538763, 0.3512317634538763, -0.5126905370864769, 0.5126905370864769, -0.6576711592166907, 0.6576711592166907, -0.7815140038968014, 0.7815140038968014, -0.8802391537269859, 0.8802391537269859, -0.9506755217687678, 0.9506755217687678, -0.9905754753144174, 0.9905754753144174], [-0.0847750130417353, 0.0847750130417353, -0.2518862256915055, 0.2518862256915055, -0.41175116146284263, 0.41175116146284263, -0.5597708310739475, 0.5597708310739475, -0.6916870430603532, 0.6916870430603532, -0.8037049589725231, 0.8037049589725231, -0.8926024664975557, 0.8926024664975557, -0.9558239495713977, 0.9558239495713977, -0.9915651684209309, 0.9915651684209309], [0, -0.16035864564022537, 0.16035864564022537, -0.31656409996362983, 0.31656409996362983, -0.46457074137596094, 0.46457074137596094, -0.600545304661681, 0.600545304661681, -0.7209661773352294, 0.7209661773352294, -0.8227146565371428, 0.8227146565371428, -0.9031559036148179, 0.9031559036148179, -0.96020815213483, 0.96020815213483, -0.9924068438435844, 0.9924068438435844], [-0.07652652113349734, 0.07652652113349734, -0.22778585114164507, 0.22778585114164507, -0.37370608871541955, 0.37370608871541955, -0.5108670019508271, 0.5108670019508271, -0.636053680726515, 0.636053680726515, -0.7463319064601508, 0.7463319064601508, -0.8391169718222188, 0.8391169718222188, -0.912234428251326, 0.912234428251326, -0.9639719272779138, 0.9639719272779138, -0.9931285991850949, 0.9931285991850949], [0, -0.1455618541608951, 0.1455618541608951, -0.2880213168024011, 0.2880213168024011, -0.4243421202074388, 0.4243421202074388, -0.5516188358872198, 0.5516188358872198, -0.6671388041974123, 0.6671388041974123, -0.7684399634756779, 0.7684399634756779, -0.8533633645833173, 0.8533633645833173, -0.9200993341504008, 0.9200993341504008, -0.9672268385663063, 0.9672268385663063, -0.9937521706203895, 0.9937521706203895], [-0.06973927331972223, 0.06973927331972223, -0.20786042668822127, 0.20786042668822127, -0.34193582089208424, 0.34193582089208424, -0.469355837986757, 0.469355837986757, -0.5876404035069116, 0.5876404035069116, -0.6944872631866827, 0.6944872631866827, -0.7878168059792081, 0.7878168059792081, -0.8658125777203002, 0.8658125777203002, -0.926956772187174, 0.926956772187174, -0.9700604978354287, 0.9700604978354287, -0.9942945854823992, 0.9942945854823992], [0, -0.1332568242984661, 0.1332568242984661, -0.26413568097034495, 0.26413568097034495, -0.3903010380302908, 0.3903010380302908, -0.5095014778460075, 0.5095014778460075, -0.6196098757636461, 0.6196098757636461, -0.7186613631319502, 0.7186613631319502, -0.8048884016188399, 0.8048884016188399, -0.8767523582704416, 0.8767523582704416, -0.9329710868260161, 0.9329710868260161, -0.9725424712181152, 0.9725424712181152, -0.9947693349975522, 0.9947693349975522], [-0.06405689286260563, 0.06405689286260563, -0.1911188674736163, 0.1911188674736163, -0.3150426796961634, 0.3150426796961634, -0.4337935076260451, 0.4337935076260451, -0.5454214713888396, 0.5454214713888396, -0.6480936519369755, 0.6480936519369755, -0.7401241915785544, 0.7401241915785544, -0.820001985973903, 0.820001985973903, -0.8864155270044011, 0.8864155270044011, -0.9382745520027328, 0.9382745520027328, -0.9747285559713095, 0.9747285559713095, -0.9951872199970213, 0.9951872199970213]];
    exports.cValues = [[], [], [1, 1], [0.8888888888888888, 0.5555555555555556, 0.5555555555555556], [0.6521451548625461, 0.6521451548625461, 0.34785484513745385, 0.34785484513745385], [0.5688888888888889, 0.47862867049936647, 0.47862867049936647, 0.23692688505618908, 0.23692688505618908], [0.3607615730481386, 0.3607615730481386, 0.46791393457269104, 0.46791393457269104, 0.17132449237917036, 0.17132449237917036], [0.4179591836734694, 0.3818300505051189, 0.3818300505051189, 0.27970539148927664, 0.27970539148927664, 0.1294849661688697, 0.1294849661688697], [0.362683783378362, 0.362683783378362, 0.31370664587788727, 0.31370664587788727, 0.22238103445337448, 0.22238103445337448, 0.10122853629037626, 0.10122853629037626], [0.3302393550012598, 0.1806481606948574, 0.1806481606948574, 0.08127438836157441, 0.08127438836157441, 0.31234707704000286, 0.31234707704000286, 0.26061069640293544, 0.26061069640293544], [0.29552422471475287, 0.29552422471475287, 0.26926671930999635, 0.26926671930999635, 0.21908636251598204, 0.21908636251598204, 0.1494513491505806, 0.1494513491505806, 0.06667134430868814, 0.06667134430868814], [0.2729250867779006, 0.26280454451024665, 0.26280454451024665, 0.23319376459199048, 0.23319376459199048, 0.18629021092773426, 0.18629021092773426, 0.1255803694649046, 0.1255803694649046, 0.05566856711617366, 0.05566856711617366], [0.24914704581340277, 0.24914704581340277, 0.2334925365383548, 0.2334925365383548, 0.20316742672306592, 0.20316742672306592, 0.16007832854334622, 0.16007832854334622, 0.10693932599531843, 0.10693932599531843, 0.04717533638651183, 0.04717533638651183], [0.2325515532308739, 0.22628318026289723, 0.22628318026289723, 0.2078160475368885, 0.2078160475368885, 0.17814598076194574, 0.17814598076194574, 0.13887351021978725, 0.13887351021978725, 0.09212149983772845, 0.09212149983772845, 0.04048400476531588, 0.04048400476531588], [0.2152638534631578, 0.2152638534631578, 0.2051984637212956, 0.2051984637212956, 0.18553839747793782, 0.18553839747793782, 0.15720316715819355, 0.15720316715819355, 0.12151857068790319, 0.12151857068790319, 0.08015808715976021, 0.08015808715976021, 0.03511946033175186, 0.03511946033175186], [0.2025782419255613, 0.19843148532711158, 0.19843148532711158, 0.1861610000155622, 0.1861610000155622, 0.16626920581699392, 0.16626920581699392, 0.13957067792615432, 0.13957067792615432, 0.10715922046717194, 0.10715922046717194, 0.07036604748810812, 0.07036604748810812, 0.03075324199611727, 0.03075324199611727], [0.1894506104550685, 0.1894506104550685, 0.18260341504492358, 0.18260341504492358, 0.16915651939500254, 0.16915651939500254, 0.14959598881657674, 0.14959598881657674, 0.12462897125553388, 0.12462897125553388, 0.09515851168249279, 0.09515851168249279, 0.062253523938647894, 0.062253523938647894, 0.027152459411754096, 0.027152459411754096], [0.17944647035620653, 0.17656270536699264, 0.17656270536699264, 0.16800410215645004, 0.16800410215645004, 0.15404576107681028, 0.15404576107681028, 0.13513636846852548, 0.13513636846852548, 0.11188384719340397, 0.11188384719340397, 0.08503614831717918, 0.08503614831717918, 0.0554595293739872, 0.0554595293739872, 0.02414830286854793, 0.02414830286854793], [0.1691423829631436, 0.1691423829631436, 0.16427648374583273, 0.16427648374583273, 0.15468467512626524, 0.15468467512626524, 0.14064291467065065, 0.14064291467065065, 0.12255520671147846, 0.12255520671147846, 0.10094204410628717, 0.10094204410628717, 0.07642573025488905, 0.07642573025488905, 0.0497145488949698, 0.0497145488949698, 0.02161601352648331, 0.02161601352648331], [0.1610544498487837, 0.15896884339395434, 0.15896884339395434, 0.15276604206585967, 0.15276604206585967, 0.1426067021736066, 0.1426067021736066, 0.12875396253933621, 0.12875396253933621, 0.11156664554733399, 0.11156664554733399, 0.09149002162245, 0.09149002162245, 0.06904454273764123, 0.06904454273764123, 0.0448142267656996, 0.0448142267656996, 0.019461788229726478, 0.019461788229726478], [0.15275338713072584, 0.15275338713072584, 0.14917298647260374, 0.14917298647260374, 0.14209610931838204, 0.14209610931838204, 0.13168863844917664, 0.13168863844917664, 0.11819453196151841, 0.11819453196151841, 0.10193011981724044, 0.10193011981724044, 0.08327674157670475, 0.08327674157670475, 0.06267204833410907, 0.06267204833410907, 0.04060142980038694, 0.04060142980038694, 0.017614007139152118, 0.017614007139152118], [0.14608113364969041, 0.14452440398997005, 0.14452440398997005, 0.13988739479107315, 0.13988739479107315, 0.13226893863333747, 0.13226893863333747, 0.12183141605372853, 0.12183141605372853, 0.10879729916714838, 0.10879729916714838, 0.09344442345603386, 0.09344442345603386, 0.0761001136283793, 0.0761001136283793, 0.057134425426857205, 0.057134425426857205, 0.036953789770852494, 0.036953789770852494, 0.016017228257774335, 0.016017228257774335], [0.13925187285563198, 0.13925187285563198, 0.13654149834601517, 0.13654149834601517, 0.13117350478706238, 0.13117350478706238, 0.12325237681051242, 0.12325237681051242, 0.11293229608053922, 0.11293229608053922, 0.10041414444288096, 0.10041414444288096, 0.08594160621706773, 0.08594160621706773, 0.06979646842452049, 0.06979646842452049, 0.052293335152683286, 0.052293335152683286, 0.03377490158481415, 0.03377490158481415, 0.0146279952982722, 0.0146279952982722], [0.13365457218610619, 0.1324620394046966, 0.1324620394046966, 0.12890572218808216, 0.12890572218808216, 0.12304908430672953, 0.12304908430672953, 0.11499664022241136, 0.11499664022241136, 0.10489209146454141, 0.10489209146454141, 0.09291576606003515, 0.09291576606003515, 0.07928141177671895, 0.07928141177671895, 0.06423242140852585, 0.06423242140852585, 0.04803767173108467, 0.04803767173108467, 0.030988005856979445, 0.030988005856979445, 0.013411859487141771, 0.013411859487141771], [0.12793819534675216, 0.12793819534675216, 0.1258374563468283, 0.1258374563468283, 0.12167047292780339, 0.12167047292780339, 0.1155056680537256, 0.1155056680537256, 0.10744427011596563, 0.10744427011596563, 0.09761865210411388, 0.09761865210411388, 0.08619016153195327, 0.08619016153195327, 0.0733464814110803, 0.0733464814110803, 0.05929858491543678, 0.05929858491543678, 0.04427743881741981, 0.04427743881741981, 0.028531388628933663, 0.028531388628933663, 0.0123412297999872, 0.0123412297999872]];
    exports.binomialCoefficients = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]];
    var getCubicArcLength = (xs, ys, t) => {
      let sum;
      let correctedT;
      const n = 20;
      const z = t / 2;
      sum = 0;
      for (let i = 0; i < n; i++) {
        correctedT = z * exports.tValues[n][i] + z;
        sum += exports.cValues[n][i] * BFunc(xs, ys, correctedT);
      }
      return z * sum;
    };
    exports.getCubicArcLength = getCubicArcLength;
    var getQuadraticArcLength = (xs, ys, t) => {
      if (t === void 0) {
        t = 1;
      }
      const ax = xs[0] - 2 * xs[1] + xs[2];
      const ay = ys[0] - 2 * ys[1] + ys[2];
      const bx = 2 * xs[1] - 2 * xs[0];
      const by = 2 * ys[1] - 2 * ys[0];
      const A = 4 * (ax * ax + ay * ay);
      const B = 4 * (ax * bx + ay * by);
      const C = bx * bx + by * by;
      if (A === 0) {
        return t * Math.sqrt(Math.pow(xs[2] - xs[0], 2) + Math.pow(ys[2] - ys[0], 2));
      }
      const b = B / (2 * A);
      const c = C / A;
      const u = t + b;
      const k = c - b * b;
      const uuk = u * u + k > 0 ? Math.sqrt(u * u + k) : 0;
      const bbk = b * b + k > 0 ? Math.sqrt(b * b + k) : 0;
      const term = b + Math.sqrt(b * b + k) !== 0 ? k * Math.log(Math.abs((u + uuk) / (b + bbk))) : 0;
      return Math.sqrt(A) / 2 * (u * uuk - b * bbk + term);
    };
    exports.getQuadraticArcLength = getQuadraticArcLength;
    function BFunc(xs, ys, t) {
      const xbase = getDerivative(1, t, xs);
      const ybase = getDerivative(1, t, ys);
      const combined = xbase * xbase + ybase * ybase;
      return Math.sqrt(combined);
    }
    var getDerivative = (derivative, t, vs) => {
      const n = vs.length - 1;
      let _vs;
      let value;
      if (n === 0) {
        return 0;
      }
      if (derivative === 0) {
        value = 0;
        for (let k = 0; k <= n; k++) {
          value += exports.binomialCoefficients[n][k] * Math.pow(1 - t, n - k) * Math.pow(t, k) * vs[k];
        }
        return value;
      } else {
        _vs = new Array(n);
        for (let k = 0; k < n; k++) {
          _vs[k] = n * (vs[k + 1] - vs[k]);
        }
        return getDerivative(derivative - 1, t, _vs);
      }
    };
    var t2length = (length, totalLength, func) => {
      let error = 1;
      let t = length / totalLength;
      let step = (length - func(t)) / totalLength;
      let numIterations = 0;
      while (error > 1e-3) {
        const increasedTLength = func(t + step);
        const increasedTError = Math.abs(length - increasedTLength) / totalLength;
        if (increasedTError < error) {
          error = increasedTError;
          t += step;
        } else {
          const decreasedTLength = func(t - step);
          const decreasedTError = Math.abs(length - decreasedTLength) / totalLength;
          if (decreasedTError < error) {
            error = decreasedTError;
            t -= step;
          } else {
            step /= 2;
          }
        }
        numIterations++;
        if (numIterations > 500) {
          break;
        }
      }
      return t;
    };
    exports.t2length = t2length;
  }
});

// node_modules/konva/lib/shapes/Path.js
var require_Path = __commonJS({
  "node_modules/konva/lib/shapes/Path.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Path = void 0;
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Global_1 = require_Global();
    var BezierFunctions_1 = require_BezierFunctions();
    var Path = class _Path extends Shape_1.Shape {
      constructor(config) {
        super(config);
        this.dataArray = [];
        this.pathLength = 0;
        this._readDataAttribute();
        this.on("dataChange.konva", function() {
          this._readDataAttribute();
        });
      }
      _readDataAttribute() {
        this.dataArray = _Path.parsePathData(this.data());
        this.pathLength = _Path.getPathLength(this.dataArray);
      }
      _sceneFunc(context) {
        const ca = this.dataArray;
        context.beginPath();
        let isClosed = false;
        for (let n = 0; n < ca.length; n++) {
          const c = ca[n].command;
          const p = ca[n].points;
          switch (c) {
            case "L":
              context.lineTo(p[0], p[1]);
              break;
            case "M":
              context.moveTo(p[0], p[1]);
              break;
            case "C":
              context.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
              break;
            case "Q":
              context.quadraticCurveTo(p[0], p[1], p[2], p[3]);
              break;
            case "A":
              var cx = p[0], cy = p[1], rx = p[2], ry = p[3], theta = p[4], dTheta = p[5], psi = p[6], fs = p[7];
              var r = rx > ry ? rx : ry;
              var scaleX = rx > ry ? 1 : rx / ry;
              var scaleY = rx > ry ? ry / rx : 1;
              context.translate(cx, cy);
              context.rotate(psi);
              context.scale(scaleX, scaleY);
              context.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
              context.scale(1 / scaleX, 1 / scaleY);
              context.rotate(-psi);
              context.translate(-cx, -cy);
              break;
            case "z":
              isClosed = true;
              context.closePath();
              break;
          }
        }
        if (!isClosed && !this.hasFill()) {
          context.strokeShape(this);
        } else {
          context.fillStrokeShape(this);
        }
      }
      getSelfRect() {
        let points = [];
        this.dataArray.forEach(function(data) {
          if (data.command === "A") {
            const start = data.points[4];
            const dTheta = data.points[5];
            const end = data.points[4] + dTheta;
            let inc = Math.PI / 180;
            if (Math.abs(start - end) < inc) {
              inc = Math.abs(start - end);
            }
            if (dTheta < 0) {
              for (let t = start - inc; t > end; t -= inc) {
                const point = _Path.getPointOnEllipticalArc(data.points[0], data.points[1], data.points[2], data.points[3], t, 0);
                points.push(point.x, point.y);
              }
            } else {
              for (let t = start + inc; t < end; t += inc) {
                const point = _Path.getPointOnEllipticalArc(data.points[0], data.points[1], data.points[2], data.points[3], t, 0);
                points.push(point.x, point.y);
              }
            }
          } else if (data.command === "C") {
            for (let t = 0; t <= 1; t += 0.01) {
              const point = _Path.getPointOnCubicBezier(t, data.start.x, data.start.y, data.points[0], data.points[1], data.points[2], data.points[3], data.points[4], data.points[5]);
              points.push(point.x, point.y);
            }
          } else {
            points = points.concat(data.points);
          }
        });
        let minX = points[0];
        let maxX = points[0];
        let minY = points[1];
        let maxY = points[1];
        let x, y;
        for (let i = 0; i < points.length / 2; i++) {
          x = points[i * 2];
          y = points[i * 2 + 1];
          if (!isNaN(x)) {
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
          }
          if (!isNaN(y)) {
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
          }
        }
        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      }
      getLength() {
        return this.pathLength;
      }
      getPointAtLength(length) {
        return _Path.getPointAtLengthOfDataArray(length, this.dataArray);
      }
      static getLineLength(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      }
      static getPathLength(dataArray) {
        let pathLength = 0;
        for (let i = 0; i < dataArray.length; ++i) {
          pathLength += dataArray[i].pathLength;
        }
        return pathLength;
      }
      static getPointAtLengthOfDataArray(length, dataArray) {
        let points, i = 0, ii = dataArray.length;
        if (!ii) {
          return null;
        }
        while (i < ii && length > dataArray[i].pathLength) {
          length -= dataArray[i].pathLength;
          ++i;
        }
        if (i === ii) {
          points = dataArray[i - 1].points.slice(-2);
          return {
            x: points[0],
            y: points[1]
          };
        }
        if (length < 0.01) {
          points = dataArray[i].points.slice(0, 2);
          return {
            x: points[0],
            y: points[1]
          };
        }
        const cp = dataArray[i];
        const p = cp.points;
        switch (cp.command) {
          case "L":
            return _Path.getPointOnLine(length, cp.start.x, cp.start.y, p[0], p[1]);
          case "C":
            return _Path.getPointOnCubicBezier((0, BezierFunctions_1.t2length)(length, _Path.getPathLength(dataArray), (i2) => {
              return (0, BezierFunctions_1.getCubicArcLength)([cp.start.x, p[0], p[2], p[4]], [cp.start.y, p[1], p[3], p[5]], i2);
            }), cp.start.x, cp.start.y, p[0], p[1], p[2], p[3], p[4], p[5]);
          case "Q":
            return _Path.getPointOnQuadraticBezier((0, BezierFunctions_1.t2length)(length, _Path.getPathLength(dataArray), (i2) => {
              return (0, BezierFunctions_1.getQuadraticArcLength)([cp.start.x, p[0], p[2]], [cp.start.y, p[1], p[3]], i2);
            }), cp.start.x, cp.start.y, p[0], p[1], p[2], p[3]);
          case "A":
            var cx = p[0], cy = p[1], rx = p[2], ry = p[3], theta = p[4], dTheta = p[5], psi = p[6];
            theta += dTheta * length / cp.pathLength;
            return _Path.getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi);
        }
        return null;
      }
      static getPointOnLine(dist, P1x, P1y, P2x, P2y, fromX, fromY) {
        fromX = fromX !== null && fromX !== void 0 ? fromX : P1x;
        fromY = fromY !== null && fromY !== void 0 ? fromY : P1y;
        const len = this.getLineLength(P1x, P1y, P2x, P2y);
        if (len < 1e-10) {
          return {
            x: P1x,
            y: P1y
          };
        }
        if (P2x === P1x) {
          return {
            x: fromX,
            y: fromY + (P2y > P1y ? dist : -dist)
          };
        }
        const m = (P2y - P1y) / (P2x - P1x);
        const run = Math.sqrt(dist * dist / (1 + m * m)) * (P2x < P1x ? -1 : 1);
        const rise = m * run;
        if (Math.abs(fromY - P1y - m * (fromX - P1x)) < 1e-10) {
          return {
            x: fromX + run,
            y: fromY + rise
          };
        }
        const u = ((fromX - P1x) * (P2x - P1x) + (fromY - P1y) * (P2y - P1y)) / (len * len);
        const ix = P1x + u * (P2x - P1x);
        const iy = P1y + u * (P2y - P1y);
        const pRise = this.getLineLength(fromX, fromY, ix, iy);
        const pRun = Math.sqrt(dist * dist - pRise * pRise);
        const adjustedRun = Math.sqrt(pRun * pRun / (1 + m * m)) * (P2x < P1x ? -1 : 1);
        const adjustedRise = m * adjustedRun;
        return {
          x: ix + adjustedRun,
          y: iy + adjustedRise
        };
      }
      static getPointOnCubicBezier(pct, P1x, P1y, P2x, P2y, P3x, P3y, P4x, P4y) {
        function CB1(t) {
          return t * t * t;
        }
        function CB2(t) {
          return 3 * t * t * (1 - t);
        }
        function CB3(t) {
          return 3 * t * (1 - t) * (1 - t);
        }
        function CB4(t) {
          return (1 - t) * (1 - t) * (1 - t);
        }
        const x = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
        const y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);
        return {
          x,
          y
        };
      }
      static getPointOnQuadraticBezier(pct, P1x, P1y, P2x, P2y, P3x, P3y) {
        function QB1(t) {
          return t * t;
        }
        function QB2(t) {
          return 2 * t * (1 - t);
        }
        function QB3(t) {
          return (1 - t) * (1 - t);
        }
        const x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
        const y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);
        return {
          x,
          y
        };
      }
      static getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi) {
        const cosPsi = Math.cos(psi), sinPsi = Math.sin(psi);
        const pt = {
          x: rx * Math.cos(theta),
          y: ry * Math.sin(theta)
        };
        return {
          x: cx + (pt.x * cosPsi - pt.y * sinPsi),
          y: cy + (pt.x * sinPsi + pt.y * cosPsi)
        };
      }
      static parsePathData(data) {
        if (!data) {
          return [];
        }
        let cs = data;
        const cc = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"];
        cs = cs.replace(new RegExp(" ", "g"), ",");
        for (var n = 0; n < cc.length; n++) {
          cs = cs.replace(new RegExp(cc[n], "g"), "|" + cc[n]);
        }
        const arr = cs.split("|");
        const ca = [];
        const coords = [];
        let cpx = 0;
        let cpy = 0;
        const re = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
        let match;
        for (n = 1; n < arr.length; n++) {
          let str = arr[n];
          let c = str.charAt(0);
          str = str.slice(1);
          coords.length = 0;
          while (match = re.exec(str)) {
            coords.push(match[0]);
          }
          const p = [];
          for (let j = 0, jlen = coords.length; j < jlen; j++) {
            if (coords[j] === "00") {
              p.push(0, 0);
              continue;
            }
            const parsed = parseFloat(coords[j]);
            if (!isNaN(parsed)) {
              p.push(parsed);
            } else {
              p.push(0);
            }
          }
          while (p.length > 0) {
            if (isNaN(p[0])) {
              break;
            }
            let cmd = "";
            let points = [];
            const startX = cpx, startY = cpy;
            var prevCmd, ctlPtx, ctlPty;
            var rx, ry, psi, fa, fs, x1, y1;
            switch (c) {
              case "l":
                cpx += p.shift();
                cpy += p.shift();
                cmd = "L";
                points.push(cpx, cpy);
                break;
              case "L":
                cpx = p.shift();
                cpy = p.shift();
                points.push(cpx, cpy);
                break;
              case "m":
                var dx = p.shift();
                var dy = p.shift();
                cpx += dx;
                cpy += dy;
                cmd = "M";
                if (ca.length > 2 && ca[ca.length - 1].command === "z") {
                  for (let idx = ca.length - 2; idx >= 0; idx--) {
                    if (ca[idx].command === "M") {
                      cpx = ca[idx].points[0] + dx;
                      cpy = ca[idx].points[1] + dy;
                      break;
                    }
                  }
                }
                points.push(cpx, cpy);
                c = "l";
                break;
              case "M":
                cpx = p.shift();
                cpy = p.shift();
                cmd = "M";
                points.push(cpx, cpy);
                c = "L";
                break;
              case "h":
                cpx += p.shift();
                cmd = "L";
                points.push(cpx, cpy);
                break;
              case "H":
                cpx = p.shift();
                cmd = "L";
                points.push(cpx, cpy);
                break;
              case "v":
                cpy += p.shift();
                cmd = "L";
                points.push(cpx, cpy);
                break;
              case "V":
                cpy = p.shift();
                cmd = "L";
                points.push(cpx, cpy);
                break;
              case "C":
                points.push(p.shift(), p.shift(), p.shift(), p.shift());
                cpx = p.shift();
                cpy = p.shift();
                points.push(cpx, cpy);
                break;
              case "c":
                points.push(cpx + p.shift(), cpy + p.shift(), cpx + p.shift(), cpy + p.shift());
                cpx += p.shift();
                cpy += p.shift();
                cmd = "C";
                points.push(cpx, cpy);
                break;
              case "S":
                ctlPtx = cpx;
                ctlPty = cpy;
                prevCmd = ca[ca.length - 1];
                if (prevCmd.command === "C") {
                  ctlPtx = cpx + (cpx - prevCmd.points[2]);
                  ctlPty = cpy + (cpy - prevCmd.points[3]);
                }
                points.push(ctlPtx, ctlPty, p.shift(), p.shift());
                cpx = p.shift();
                cpy = p.shift();
                cmd = "C";
                points.push(cpx, cpy);
                break;
              case "s":
                ctlPtx = cpx;
                ctlPty = cpy;
                prevCmd = ca[ca.length - 1];
                if (prevCmd.command === "C") {
                  ctlPtx = cpx + (cpx - prevCmd.points[2]);
                  ctlPty = cpy + (cpy - prevCmd.points[3]);
                }
                points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
                cpx += p.shift();
                cpy += p.shift();
                cmd = "C";
                points.push(cpx, cpy);
                break;
              case "Q":
                points.push(p.shift(), p.shift());
                cpx = p.shift();
                cpy = p.shift();
                points.push(cpx, cpy);
                break;
              case "q":
                points.push(cpx + p.shift(), cpy + p.shift());
                cpx += p.shift();
                cpy += p.shift();
                cmd = "Q";
                points.push(cpx, cpy);
                break;
              case "T":
                ctlPtx = cpx;
                ctlPty = cpy;
                prevCmd = ca[ca.length - 1];
                if (prevCmd.command === "Q") {
                  ctlPtx = cpx + (cpx - prevCmd.points[0]);
                  ctlPty = cpy + (cpy - prevCmd.points[1]);
                }
                cpx = p.shift();
                cpy = p.shift();
                cmd = "Q";
                points.push(ctlPtx, ctlPty, cpx, cpy);
                break;
              case "t":
                ctlPtx = cpx;
                ctlPty = cpy;
                prevCmd = ca[ca.length - 1];
                if (prevCmd.command === "Q") {
                  ctlPtx = cpx + (cpx - prevCmd.points[0]);
                  ctlPty = cpy + (cpy - prevCmd.points[1]);
                }
                cpx += p.shift();
                cpy += p.shift();
                cmd = "Q";
                points.push(ctlPtx, ctlPty, cpx, cpy);
                break;
              case "A":
                rx = p.shift();
                ry = p.shift();
                psi = p.shift();
                fa = p.shift();
                fs = p.shift();
                x1 = cpx;
                y1 = cpy;
                cpx = p.shift();
                cpy = p.shift();
                cmd = "A";
                points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
                break;
              case "a":
                rx = p.shift();
                ry = p.shift();
                psi = p.shift();
                fa = p.shift();
                fs = p.shift();
                x1 = cpx;
                y1 = cpy;
                cpx += p.shift();
                cpy += p.shift();
                cmd = "A";
                points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
                break;
            }
            ca.push({
              command: cmd || c,
              points,
              start: {
                x: startX,
                y: startY
              },
              pathLength: this.calcLength(startX, startY, cmd || c, points)
            });
          }
          if (c === "z" || c === "Z") {
            ca.push({
              command: "z",
              points: [],
              start: void 0,
              pathLength: 0
            });
          }
        }
        return ca;
      }
      static calcLength(x, y, cmd, points) {
        let len, p1, p2, t;
        const path = _Path;
        switch (cmd) {
          case "L":
            return path.getLineLength(x, y, points[0], points[1]);
          case "C":
            return (0, BezierFunctions_1.getCubicArcLength)([x, points[0], points[2], points[4]], [y, points[1], points[3], points[5]], 1);
          case "Q":
            return (0, BezierFunctions_1.getQuadraticArcLength)([x, points[0], points[2]], [y, points[1], points[3]], 1);
          case "A":
            len = 0;
            var start = points[4];
            var dTheta = points[5];
            var end = points[4] + dTheta;
            var inc = Math.PI / 180;
            if (Math.abs(start - end) < inc) {
              inc = Math.abs(start - end);
            }
            p1 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
            if (dTheta < 0) {
              for (t = start - inc; t > end; t -= inc) {
                p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
                len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                p1 = p2;
              }
            } else {
              for (t = start + inc; t < end; t += inc) {
                p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
                len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                p1 = p2;
              }
            }
            p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
            len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
            return len;
        }
        return 0;
      }
      static convertEndpointToCenterParameterization(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg) {
        const psi = psiDeg * (Math.PI / 180);
        const xp = Math.cos(psi) * (x1 - x2) / 2 + Math.sin(psi) * (y1 - y2) / 2;
        const yp = -1 * Math.sin(psi) * (x1 - x2) / 2 + Math.cos(psi) * (y1 - y2) / 2;
        const lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);
        if (lambda > 1) {
          rx *= Math.sqrt(lambda);
          ry *= Math.sqrt(lambda);
        }
        let f = Math.sqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) / (rx * rx * (yp * yp) + ry * ry * (xp * xp)));
        if (fa === fs) {
          f *= -1;
        }
        if (isNaN(f)) {
          f = 0;
        }
        const cxp = f * rx * yp / ry;
        const cyp = f * -ry * xp / rx;
        const cx = (x1 + x2) / 2 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
        const cy = (y1 + y2) / 2 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;
        const vMag = function(v2) {
          return Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
        };
        const vRatio = function(u2, v2) {
          return (u2[0] * v2[0] + u2[1] * v2[1]) / (vMag(u2) * vMag(v2));
        };
        const vAngle = function(u2, v2) {
          return (u2[0] * v2[1] < u2[1] * v2[0] ? -1 : 1) * Math.acos(vRatio(u2, v2));
        };
        const theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
        const u = [(xp - cxp) / rx, (yp - cyp) / ry];
        const v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
        let dTheta = vAngle(u, v);
        if (vRatio(u, v) <= -1) {
          dTheta = Math.PI;
        }
        if (vRatio(u, v) >= 1) {
          dTheta = 0;
        }
        if (fs === 0 && dTheta > 0) {
          dTheta = dTheta - 2 * Math.PI;
        }
        if (fs === 1 && dTheta < 0) {
          dTheta = dTheta + 2 * Math.PI;
        }
        return [cx, cy, rx, ry, theta, dTheta, psi, fs];
      }
    };
    exports.Path = Path;
    Path.prototype.className = "Path";
    Path.prototype._attrsAffectingSize = ["data"];
    (0, Global_1._registerNode)(Path);
    Factory_1.Factory.addGetterSetter(Path, "data");
  }
});

// node_modules/konva/lib/shapes/Arrow.js
var require_Arrow = __commonJS({
  "node_modules/konva/lib/shapes/Arrow.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Arrow = void 0;
    var Factory_1 = require_Factory();
    var Line_1 = require_Line();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var Path_1 = require_Path();
    var Arrow = class extends Line_1.Line {
      _sceneFunc(ctx) {
        super._sceneFunc(ctx);
        const PI2 = Math.PI * 2;
        const points = this.points();
        let tp = points;
        const fromTension = this.tension() !== 0 && points.length > 4;
        if (fromTension) {
          tp = this.getTensionPoints();
        }
        const length = this.pointerLength();
        const n = points.length;
        let dx, dy;
        if (fromTension) {
          const lp = [tp[tp.length - 4], tp[tp.length - 3], tp[tp.length - 2], tp[tp.length - 1], points[n - 2], points[n - 1]];
          const lastLength = Path_1.Path.calcLength(tp[tp.length - 4], tp[tp.length - 3], "C", lp);
          const previous = Path_1.Path.getPointOnQuadraticBezier(Math.min(1, 1 - length / lastLength), lp[0], lp[1], lp[2], lp[3], lp[4], lp[5]);
          dx = points[n - 2] - previous.x;
          dy = points[n - 1] - previous.y;
        } else {
          dx = points[n - 2] - points[n - 4];
          dy = points[n - 1] - points[n - 3];
        }
        const radians = (Math.atan2(dy, dx) + PI2) % PI2;
        const width = this.pointerWidth();
        if (this.pointerAtEnding()) {
          ctx.save();
          ctx.beginPath();
          ctx.translate(points[n - 2], points[n - 1]);
          ctx.rotate(radians);
          ctx.moveTo(0, 0);
          ctx.lineTo(-length, width / 2);
          ctx.lineTo(-length, -width / 2);
          ctx.closePath();
          ctx.restore();
          this.__fillStroke(ctx);
        }
        if (this.pointerAtBeginning()) {
          ctx.save();
          ctx.beginPath();
          ctx.translate(points[0], points[1]);
          if (fromTension) {
            dx = (tp[0] + tp[2]) / 2 - points[0];
            dy = (tp[1] + tp[3]) / 2 - points[1];
          } else {
            dx = points[2] - points[0];
            dy = points[3] - points[1];
          }
          ctx.rotate((Math.atan2(-dy, -dx) + PI2) % PI2);
          ctx.moveTo(0, 0);
          ctx.lineTo(-length, width / 2);
          ctx.lineTo(-length, -width / 2);
          ctx.closePath();
          ctx.restore();
          this.__fillStroke(ctx);
        }
      }
      __fillStroke(ctx) {
        const isDashEnabled = this.dashEnabled();
        if (isDashEnabled) {
          this.attrs.dashEnabled = false;
          ctx.setLineDash([]);
        }
        ctx.fillStrokeShape(this);
        if (isDashEnabled) {
          this.attrs.dashEnabled = true;
        }
      }
      getSelfRect() {
        const lineRect = super.getSelfRect();
        const offset = this.pointerWidth() / 2;
        return {
          x: lineRect.x,
          y: lineRect.y - offset,
          width: lineRect.width,
          height: lineRect.height + offset * 2
        };
      }
    };
    exports.Arrow = Arrow;
    Arrow.prototype.className = "Arrow";
    (0, Global_1._registerNode)(Arrow);
    Factory_1.Factory.addGetterSetter(Arrow, "pointerLength", 10, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Arrow, "pointerWidth", 10, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Arrow, "pointerAtBeginning", false);
    Factory_1.Factory.addGetterSetter(Arrow, "pointerAtEnding", true);
  }
});

// node_modules/konva/lib/shapes/Circle.js
var require_Circle = __commonJS({
  "node_modules/konva/lib/shapes/Circle.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Circle = void 0;
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var Circle = class extends Shape_1.Shape {
      _sceneFunc(context) {
        context.beginPath();
        context.arc(0, 0, this.attrs.radius || 0, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStrokeShape(this);
      }
      getWidth() {
        return this.radius() * 2;
      }
      getHeight() {
        return this.radius() * 2;
      }
      setWidth(width) {
        if (this.radius() !== width / 2) {
          this.radius(width / 2);
        }
      }
      setHeight(height) {
        if (this.radius() !== height / 2) {
          this.radius(height / 2);
        }
      }
    };
    exports.Circle = Circle;
    Circle.prototype._centroid = true;
    Circle.prototype.className = "Circle";
    Circle.prototype._attrsAffectingSize = ["radius"];
    (0, Global_1._registerNode)(Circle);
    Factory_1.Factory.addGetterSetter(Circle, "radius", 0, (0, Validators_1.getNumberValidator)());
  }
});

// node_modules/konva/lib/shapes/Ellipse.js
var require_Ellipse = __commonJS({
  "node_modules/konva/lib/shapes/Ellipse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Ellipse = void 0;
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var Ellipse = class extends Shape_1.Shape {
      _sceneFunc(context) {
        const rx = this.radiusX(), ry = this.radiusY();
        context.beginPath();
        context.save();
        if (rx !== ry) {
          context.scale(1, ry / rx);
        }
        context.arc(0, 0, rx, 0, Math.PI * 2, false);
        context.restore();
        context.closePath();
        context.fillStrokeShape(this);
      }
      getWidth() {
        return this.radiusX() * 2;
      }
      getHeight() {
        return this.radiusY() * 2;
      }
      setWidth(width) {
        this.radiusX(width / 2);
      }
      setHeight(height) {
        this.radiusY(height / 2);
      }
    };
    exports.Ellipse = Ellipse;
    Ellipse.prototype.className = "Ellipse";
    Ellipse.prototype._centroid = true;
    Ellipse.prototype._attrsAffectingSize = ["radiusX", "radiusY"];
    (0, Global_1._registerNode)(Ellipse);
    Factory_1.Factory.addComponentsGetterSetter(Ellipse, "radius", ["x", "y"]);
    Factory_1.Factory.addGetterSetter(Ellipse, "radiusX", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Ellipse, "radiusY", 0, (0, Validators_1.getNumberValidator)());
  }
});

// node_modules/konva/lib/shapes/Image.js
var require_Image = __commonJS({
  "node_modules/konva/lib/shapes/Image.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Image = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Global_1 = require_Global();
    var Validators_1 = require_Validators();
    var Image = class _Image extends Shape_1.Shape {
      constructor(attrs) {
        super(attrs);
        this._loadListener = () => {
          this._requestDraw();
        };
        this.on("imageChange.konva", (props) => {
          this._removeImageLoad(props.oldVal);
          this._setImageLoad();
        });
        this._setImageLoad();
      }
      _setImageLoad() {
        const image = this.image();
        if (image && image.complete) {
          return;
        }
        if (image && image.readyState === 4) {
          return;
        }
        if (image && image["addEventListener"]) {
          image["addEventListener"]("load", this._loadListener);
        }
      }
      _removeImageLoad(image) {
        if (image && image["removeEventListener"]) {
          image["removeEventListener"]("load", this._loadListener);
        }
      }
      destroy() {
        this._removeImageLoad(this.image());
        super.destroy();
        return this;
      }
      _useBufferCanvas() {
        const hasCornerRadius = !!this.cornerRadius();
        const hasShadow = this.hasShadow();
        if (hasCornerRadius && hasShadow) {
          return true;
        }
        return super._useBufferCanvas(true);
      }
      _sceneFunc(context) {
        const width = this.getWidth();
        const height = this.getHeight();
        const cornerRadius = this.cornerRadius();
        const image = this.attrs.image;
        let params;
        if (image) {
          const cropWidth = this.attrs.cropWidth;
          const cropHeight = this.attrs.cropHeight;
          if (cropWidth && cropHeight) {
            params = [image, this.cropX(), this.cropY(), cropWidth, cropHeight, 0, 0, width, height];
          } else {
            params = [image, 0, 0, width, height];
          }
        }
        if (this.hasFill() || this.hasStroke() || cornerRadius) {
          context.beginPath();
          cornerRadius ? Util_1.Util.drawRoundedRectPath(context, width, height, cornerRadius) : context.rect(0, 0, width, height);
          context.closePath();
          context.fillStrokeShape(this);
        }
        if (image) {
          if (cornerRadius) {
            context.clip();
          }
          context.drawImage.apply(context, params);
        }
      }
      _hitFunc(context) {
        const width = this.width(), height = this.height(), cornerRadius = this.cornerRadius();
        context.beginPath();
        if (!cornerRadius) {
          context.rect(0, 0, width, height);
        } else {
          Util_1.Util.drawRoundedRectPath(context, width, height, cornerRadius);
        }
        context.closePath();
        context.fillStrokeShape(this);
      }
      getWidth() {
        var _a, _b;
        return (_a = this.attrs.width) !== null && _a !== void 0 ? _a : (_b = this.image()) === null || _b === void 0 ? void 0 : _b.width;
      }
      getHeight() {
        var _a, _b;
        return (_a = this.attrs.height) !== null && _a !== void 0 ? _a : (_b = this.image()) === null || _b === void 0 ? void 0 : _b.height;
      }
      static fromURL(url, callback, onError = null) {
        const img = Util_1.Util.createImageElement();
        img.onload = function() {
          const image = new _Image({
            image: img
          });
          callback(image);
        };
        img.onerror = onError;
        img.crossOrigin = "Anonymous";
        img.src = url;
      }
    };
    exports.Image = Image;
    Image.prototype.className = "Image";
    (0, Global_1._registerNode)(Image);
    Factory_1.Factory.addGetterSetter(Image, "cornerRadius", 0, (0, Validators_1.getNumberOrArrayOfNumbersValidator)(4));
    Factory_1.Factory.addGetterSetter(Image, "image");
    Factory_1.Factory.addComponentsGetterSetter(Image, "crop", ["x", "y", "width", "height"]);
    Factory_1.Factory.addGetterSetter(Image, "cropX", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Image, "cropY", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Image, "cropWidth", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Image, "cropHeight", 0, (0, Validators_1.getNumberValidator)());
  }
});

// node_modules/konva/lib/shapes/Label.js
var require_Label = __commonJS({
  "node_modules/konva/lib/shapes/Label.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Tag = exports.Label = void 0;
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Group_1 = require_Group();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var ATTR_CHANGE_LIST = ["fontFamily", "fontSize", "fontStyle", "padding", "lineHeight", "text", "width", "height", "pointerDirection", "pointerWidth", "pointerHeight"];
    var CHANGE_KONVA = "Change.konva";
    var NONE = "none";
    var UP = "up";
    var RIGHT = "right";
    var DOWN = "down";
    var LEFT = "left";
    var attrChangeListLen = ATTR_CHANGE_LIST.length;
    var Label = class extends Group_1.Group {
      constructor(config) {
        super(config);
        this.on("add.konva", function(evt) {
          this._addListeners(evt.child);
          this._sync();
        });
      }
      getText() {
        return this.find("Text")[0];
      }
      getTag() {
        return this.find("Tag")[0];
      }
      _addListeners(text) {
        let that = this, n;
        const func = function() {
          that._sync();
        };
        for (n = 0; n < attrChangeListLen; n++) {
          text.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, func);
        }
      }
      getWidth() {
        return this.getText().width();
      }
      getHeight() {
        return this.getText().height();
      }
      _sync() {
        let text = this.getText(), tag = this.getTag(), width, height, pointerDirection, pointerWidth, x, y, pointerHeight;
        if (text && tag) {
          width = text.width();
          height = text.height();
          pointerDirection = tag.pointerDirection();
          pointerWidth = tag.pointerWidth();
          pointerHeight = tag.pointerHeight();
          x = 0;
          y = 0;
          switch (pointerDirection) {
            case UP:
              x = width / 2;
              y = -1 * pointerHeight;
              break;
            case RIGHT:
              x = width + pointerWidth;
              y = height / 2;
              break;
            case DOWN:
              x = width / 2;
              y = height + pointerHeight;
              break;
            case LEFT:
              x = -1 * pointerWidth;
              y = height / 2;
              break;
          }
          tag.setAttrs({
            x: -1 * x,
            y: -1 * y,
            width,
            height
          });
          text.setAttrs({
            x: -1 * x,
            y: -1 * y
          });
        }
      }
    };
    exports.Label = Label;
    Label.prototype.className = "Label";
    (0, Global_1._registerNode)(Label);
    var Tag = class extends Shape_1.Shape {
      _sceneFunc(context) {
        const width = this.width(), height = this.height(), pointerDirection = this.pointerDirection(), pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), cornerRadius = this.cornerRadius();
        let topLeft = 0;
        let topRight = 0;
        let bottomLeft = 0;
        let bottomRight = 0;
        if (typeof cornerRadius === "number") {
          topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius, width / 2, height / 2);
        } else {
          topLeft = Math.min(cornerRadius[0] || 0, width / 2, height / 2);
          topRight = Math.min(cornerRadius[1] || 0, width / 2, height / 2);
          bottomRight = Math.min(cornerRadius[2] || 0, width / 2, height / 2);
          bottomLeft = Math.min(cornerRadius[3] || 0, width / 2, height / 2);
        }
        context.beginPath();
        context.moveTo(topLeft, 0);
        if (pointerDirection === UP) {
          context.lineTo((width - pointerWidth) / 2, 0);
          context.lineTo(width / 2, -1 * pointerHeight);
          context.lineTo((width + pointerWidth) / 2, 0);
        }
        context.lineTo(width - topRight, 0);
        context.arc(width - topRight, topRight, topRight, Math.PI * 3 / 2, 0, false);
        if (pointerDirection === RIGHT) {
          context.lineTo(width, (height - pointerHeight) / 2);
          context.lineTo(width + pointerWidth, height / 2);
          context.lineTo(width, (height + pointerHeight) / 2);
        }
        context.lineTo(width, height - bottomRight);
        context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
        if (pointerDirection === DOWN) {
          context.lineTo((width + pointerWidth) / 2, height);
          context.lineTo(width / 2, height + pointerHeight);
          context.lineTo((width - pointerWidth) / 2, height);
        }
        context.lineTo(bottomLeft, height);
        context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
        if (pointerDirection === LEFT) {
          context.lineTo(0, (height + pointerHeight) / 2);
          context.lineTo(-1 * pointerWidth, height / 2);
          context.lineTo(0, (height - pointerHeight) / 2);
        }
        context.lineTo(0, topLeft);
        context.arc(topLeft, topLeft, topLeft, Math.PI, Math.PI * 3 / 2, false);
        context.closePath();
        context.fillStrokeShape(this);
      }
      getSelfRect() {
        let x = 0, y = 0, pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), direction = this.pointerDirection(), width = this.width(), height = this.height();
        if (direction === UP) {
          y -= pointerHeight;
          height += pointerHeight;
        } else if (direction === DOWN) {
          height += pointerHeight;
        } else if (direction === LEFT) {
          x -= pointerWidth * 1.5;
          width += pointerWidth;
        } else if (direction === RIGHT) {
          width += pointerWidth * 1.5;
        }
        return {
          x,
          y,
          width,
          height
        };
      }
    };
    exports.Tag = Tag;
    Tag.prototype.className = "Tag";
    (0, Global_1._registerNode)(Tag);
    Factory_1.Factory.addGetterSetter(Tag, "pointerDirection", NONE);
    Factory_1.Factory.addGetterSetter(Tag, "pointerWidth", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Tag, "pointerHeight", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Tag, "cornerRadius", 0, (0, Validators_1.getNumberOrArrayOfNumbersValidator)(4));
  }
});

// node_modules/konva/lib/shapes/Rect.js
var require_Rect = __commonJS({
  "node_modules/konva/lib/shapes/Rect.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Rect = void 0;
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Global_1 = require_Global();
    var Util_1 = require_Util();
    var Validators_1 = require_Validators();
    var Rect = class extends Shape_1.Shape {
      _sceneFunc(context) {
        const cornerRadius = this.cornerRadius(), width = this.width(), height = this.height();
        context.beginPath();
        if (!cornerRadius) {
          context.rect(0, 0, width, height);
        } else {
          Util_1.Util.drawRoundedRectPath(context, width, height, cornerRadius);
        }
        context.closePath();
        context.fillStrokeShape(this);
      }
    };
    exports.Rect = Rect;
    Rect.prototype.className = "Rect";
    (0, Global_1._registerNode)(Rect);
    Factory_1.Factory.addGetterSetter(Rect, "cornerRadius", 0, (0, Validators_1.getNumberOrArrayOfNumbersValidator)(4));
  }
});

// node_modules/konva/lib/shapes/RegularPolygon.js
var require_RegularPolygon = __commonJS({
  "node_modules/konva/lib/shapes/RegularPolygon.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RegularPolygon = void 0;
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var RegularPolygon = class extends Shape_1.Shape {
      _sceneFunc(context) {
        const points = this._getPoints();
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (let n = 1; n < points.length; n++) {
          context.lineTo(points[n].x, points[n].y);
        }
        context.closePath();
        context.fillStrokeShape(this);
      }
      _getPoints() {
        const sides = this.attrs.sides;
        const radius = this.attrs.radius || 0;
        const points = [];
        for (let n = 0; n < sides; n++) {
          points.push({
            x: radius * Math.sin(n * 2 * Math.PI / sides),
            y: -1 * radius * Math.cos(n * 2 * Math.PI / sides)
          });
        }
        return points;
      }
      getSelfRect() {
        const points = this._getPoints();
        let minX = points[0].x;
        let maxX = points[0].y;
        let minY = points[0].x;
        let maxY = points[0].y;
        points.forEach((point) => {
          minX = Math.min(minX, point.x);
          maxX = Math.max(maxX, point.x);
          minY = Math.min(minY, point.y);
          maxY = Math.max(maxY, point.y);
        });
        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      }
      getWidth() {
        return this.radius() * 2;
      }
      getHeight() {
        return this.radius() * 2;
      }
      setWidth(width) {
        this.radius(width / 2);
      }
      setHeight(height) {
        this.radius(height / 2);
      }
    };
    exports.RegularPolygon = RegularPolygon;
    RegularPolygon.prototype.className = "RegularPolygon";
    RegularPolygon.prototype._centroid = true;
    RegularPolygon.prototype._attrsAffectingSize = ["radius"];
    (0, Global_1._registerNode)(RegularPolygon);
    Factory_1.Factory.addGetterSetter(RegularPolygon, "radius", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(RegularPolygon, "sides", 0, (0, Validators_1.getNumberValidator)());
  }
});

// node_modules/konva/lib/shapes/Ring.js
var require_Ring = __commonJS({
  "node_modules/konva/lib/shapes/Ring.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Ring = void 0;
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var PIx2 = Math.PI * 2;
    var Ring = class extends Shape_1.Shape {
      _sceneFunc(context) {
        context.beginPath();
        context.arc(0, 0, this.innerRadius(), 0, PIx2, false);
        context.moveTo(this.outerRadius(), 0);
        context.arc(0, 0, this.outerRadius(), PIx2, 0, true);
        context.closePath();
        context.fillStrokeShape(this);
      }
      getWidth() {
        return this.outerRadius() * 2;
      }
      getHeight() {
        return this.outerRadius() * 2;
      }
      setWidth(width) {
        this.outerRadius(width / 2);
      }
      setHeight(height) {
        this.outerRadius(height / 2);
      }
    };
    exports.Ring = Ring;
    Ring.prototype.className = "Ring";
    Ring.prototype._centroid = true;
    Ring.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
    (0, Global_1._registerNode)(Ring);
    Factory_1.Factory.addGetterSetter(Ring, "innerRadius", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Ring, "outerRadius", 0, (0, Validators_1.getNumberValidator)());
  }
});

// node_modules/konva/lib/shapes/Sprite.js
var require_Sprite = __commonJS({
  "node_modules/konva/lib/shapes/Sprite.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Sprite = void 0;
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Animation_1 = require_Animation();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var Sprite = class extends Shape_1.Shape {
      constructor(config) {
        super(config);
        this._updated = true;
        this.anim = new Animation_1.Animation(() => {
          const updated = this._updated;
          this._updated = false;
          return updated;
        });
        this.on("animationChange.konva", function() {
          this.frameIndex(0);
        });
        this.on("frameIndexChange.konva", function() {
          this._updated = true;
        });
        this.on("frameRateChange.konva", function() {
          if (!this.anim.isRunning()) {
            return;
          }
          clearInterval(this.interval);
          this._setInterval();
        });
      }
      _sceneFunc(context) {
        const anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), x = set[ix4 + 0], y = set[ix4 + 1], width = set[ix4 + 2], height = set[ix4 + 3], image = this.image();
        if (this.hasFill() || this.hasStroke()) {
          context.beginPath();
          context.rect(0, 0, width, height);
          context.closePath();
          context.fillStrokeShape(this);
        }
        if (image) {
          if (offsets) {
            const offset = offsets[anim], ix2 = index * 2;
            context.drawImage(image, x, y, width, height, offset[ix2 + 0], offset[ix2 + 1], width, height);
          } else {
            context.drawImage(image, x, y, width, height, 0, 0, width, height);
          }
        }
      }
      _hitFunc(context) {
        const anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), width = set[ix4 + 2], height = set[ix4 + 3];
        context.beginPath();
        if (offsets) {
          const offset = offsets[anim];
          const ix2 = index * 2;
          context.rect(offset[ix2 + 0], offset[ix2 + 1], width, height);
        } else {
          context.rect(0, 0, width, height);
        }
        context.closePath();
        context.fillShape(this);
      }
      _useBufferCanvas() {
        return super._useBufferCanvas(true);
      }
      _setInterval() {
        const that = this;
        this.interval = setInterval(function() {
          that._updateIndex();
        }, 1e3 / this.frameRate());
      }
      start() {
        if (this.isRunning()) {
          return;
        }
        const layer = this.getLayer();
        this.anim.setLayers(layer);
        this._setInterval();
        this.anim.start();
      }
      stop() {
        this.anim.stop();
        clearInterval(this.interval);
      }
      isRunning() {
        return this.anim.isRunning();
      }
      _updateIndex() {
        const index = this.frameIndex(), animation = this.animation(), animations = this.animations(), anim = animations[animation], len = anim.length / 4;
        if (index < len - 1) {
          this.frameIndex(index + 1);
        } else {
          this.frameIndex(0);
        }
      }
    };
    exports.Sprite = Sprite;
    Sprite.prototype.className = "Sprite";
    (0, Global_1._registerNode)(Sprite);
    Factory_1.Factory.addGetterSetter(Sprite, "animation");
    Factory_1.Factory.addGetterSetter(Sprite, "animations");
    Factory_1.Factory.addGetterSetter(Sprite, "frameOffsets");
    Factory_1.Factory.addGetterSetter(Sprite, "image");
    Factory_1.Factory.addGetterSetter(Sprite, "frameIndex", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Sprite, "frameRate", 17, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.backCompat(Sprite, {
      index: "frameIndex",
      getIndex: "getFrameIndex",
      setIndex: "setFrameIndex"
    });
  }
});

// node_modules/konva/lib/shapes/Star.js
var require_Star = __commonJS({
  "node_modules/konva/lib/shapes/Star.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Star = void 0;
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var Star = class extends Shape_1.Shape {
      _sceneFunc(context) {
        const innerRadius = this.innerRadius(), outerRadius = this.outerRadius(), numPoints = this.numPoints();
        context.beginPath();
        context.moveTo(0, 0 - outerRadius);
        for (let n = 1; n < numPoints * 2; n++) {
          const radius = n % 2 === 0 ? outerRadius : innerRadius;
          const x = radius * Math.sin(n * Math.PI / numPoints);
          const y = -1 * radius * Math.cos(n * Math.PI / numPoints);
          context.lineTo(x, y);
        }
        context.closePath();
        context.fillStrokeShape(this);
      }
      getWidth() {
        return this.outerRadius() * 2;
      }
      getHeight() {
        return this.outerRadius() * 2;
      }
      setWidth(width) {
        this.outerRadius(width / 2);
      }
      setHeight(height) {
        this.outerRadius(height / 2);
      }
    };
    exports.Star = Star;
    Star.prototype.className = "Star";
    Star.prototype._centroid = true;
    Star.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
    (0, Global_1._registerNode)(Star);
    Factory_1.Factory.addGetterSetter(Star, "numPoints", 5, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Star, "innerRadius", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Star, "outerRadius", 0, (0, Validators_1.getNumberValidator)());
  }
});

// node_modules/konva/lib/shapes/Text.js
var require_Text = __commonJS({
  "node_modules/konva/lib/shapes/Text.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Text = void 0;
    exports.stringToArray = stringToArray;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Global_1 = require_Global();
    var Validators_1 = require_Validators();
    var Global_2 = require_Global();
    function stringToArray(string) {
      return [...string].reduce((acc, char, index, array) => {
        if (new RegExp("\\p{Emoji}", "u").test(char)) {
          const nextChar = array[index + 1];
          if (nextChar && new RegExp("\\p{Emoji_Modifier}|\\u200D", "u").test(nextChar)) {
            acc.push(char + nextChar);
            array[index + 1] = "";
          } else {
            acc.push(char);
          }
        } else if (new RegExp("\\p{Regional_Indicator}{2}", "u").test(char + (array[index + 1] || ""))) {
          acc.push(char + array[index + 1]);
        } else if (index > 0 && new RegExp("\\p{Mn}|\\p{Me}|\\p{Mc}", "u").test(char)) {
          acc[acc.length - 1] += char;
        } else if (char) {
          acc.push(char);
        }
        return acc;
      }, []);
    }
    var AUTO = "auto";
    var CENTER = "center";
    var INHERIT = "inherit";
    var JUSTIFY = "justify";
    var CHANGE_KONVA = "Change.konva";
    var CONTEXT_2D = "2d";
    var DASH = "-";
    var LEFT = "left";
    var TEXT = "text";
    var TEXT_UPPER = "Text";
    var TOP = "top";
    var BOTTOM = "bottom";
    var MIDDLE = "middle";
    var NORMAL = "normal";
    var PX_SPACE = "px ";
    var SPACE = " ";
    var RIGHT = "right";
    var RTL = "rtl";
    var WORD = "word";
    var CHAR = "char";
    var NONE = "none";
    var ELLIPSIS = "…";
    var ATTR_CHANGE_LIST = ["direction", "fontFamily", "fontSize", "fontStyle", "fontVariant", "padding", "align", "verticalAlign", "lineHeight", "text", "width", "height", "wrap", "ellipsis", "letterSpacing"];
    var attrChangeListLen = ATTR_CHANGE_LIST.length;
    function normalizeFontFamily(fontFamily) {
      return fontFamily.split(",").map((family) => {
        family = family.trim();
        const hasSpace = family.indexOf(" ") >= 0;
        const hasQuotes = family.indexOf('"') >= 0 || family.indexOf("'") >= 0;
        if (hasSpace && !hasQuotes) {
          family = `"${family}"`;
        }
        return family;
      }).join(", ");
    }
    var dummyContext;
    function getDummyContext() {
      if (dummyContext) {
        return dummyContext;
      }
      dummyContext = Util_1.Util.createCanvasElement().getContext(CONTEXT_2D);
      return dummyContext;
    }
    function _fillFunc(context) {
      context.fillText(this._partialText, this._partialTextX, this._partialTextY);
    }
    function _strokeFunc(context) {
      context.setAttr("miterLimit", 2);
      context.strokeText(this._partialText, this._partialTextX, this._partialTextY);
    }
    function checkDefaultFill(config) {
      config = config || {};
      if (!config.fillLinearGradientColorStops && !config.fillRadialGradientColorStops && !config.fillPatternImage) {
        config.fill = config.fill || "black";
      }
      return config;
    }
    var Text = class extends Shape_1.Shape {
      constructor(config) {
        super(checkDefaultFill(config));
        this._partialTextX = 0;
        this._partialTextY = 0;
        for (let n = 0; n < attrChangeListLen; n++) {
          this.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, this._setTextData);
        }
        this._setTextData();
      }
      _sceneFunc(context) {
        const textArr = this.textArr, textArrLen = textArr.length;
        if (!this.text()) {
          return;
        }
        let padding = this.padding(), fontSize = this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, verticalAlign = this.verticalAlign(), direction = this.direction(), alignY = 0, align = this.align(), totalWidth = this.getWidth(), letterSpacing = this.letterSpacing(), fill = this.fill(), textDecoration = this.textDecoration(), shouldUnderline = textDecoration.indexOf("underline") !== -1, shouldLineThrough = textDecoration.indexOf("line-through") !== -1, n;
        direction = direction === INHERIT ? context.direction : direction;
        let translateY = lineHeightPx / 2;
        let baseline = MIDDLE;
        if (Global_1.Konva._fixTextRendering) {
          const metrics = this.measureSize("M");
          baseline = "alphabetic";
          translateY = (metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent) / 2 + lineHeightPx / 2;
        }
        var lineTranslateX = 0;
        var lineTranslateY = 0;
        if (direction === RTL) {
          context.setAttr("direction", direction);
        }
        context.setAttr("font", this._getContextFont());
        context.setAttr("textBaseline", baseline);
        context.setAttr("textAlign", LEFT);
        if (verticalAlign === MIDDLE) {
          alignY = (this.getHeight() - textArrLen * lineHeightPx - padding * 2) / 2;
        } else if (verticalAlign === BOTTOM) {
          alignY = this.getHeight() - textArrLen * lineHeightPx - padding * 2;
        }
        context.translate(padding, alignY + padding);
        for (n = 0; n < textArrLen; n++) {
          var lineTranslateX = 0;
          var lineTranslateY = 0;
          var obj = textArr[n], text = obj.text, width = obj.width, lastLine = obj.lastInParagraph, spacesNumber, oneWord, lineWidth;
          context.save();
          if (align === RIGHT) {
            lineTranslateX += totalWidth - width - padding * 2;
          } else if (align === CENTER) {
            lineTranslateX += (totalWidth - width - padding * 2) / 2;
          }
          if (shouldUnderline) {
            context.save();
            context.beginPath();
            const yOffset = Global_1.Konva._fixTextRendering ? Math.round(fontSize / 4) : Math.round(fontSize / 2);
            const x = lineTranslateX;
            const y = translateY + lineTranslateY + yOffset;
            context.moveTo(x, y);
            spacesNumber = text.split(" ").length - 1;
            oneWord = spacesNumber === 0;
            lineWidth = align === JUSTIFY && !lastLine ? totalWidth - padding * 2 : width;
            context.lineTo(x + Math.round(lineWidth), y);
            context.lineWidth = fontSize / 15;
            const gradient = this._getLinearGradient();
            context.strokeStyle = gradient || fill;
            context.stroke();
            context.restore();
          }
          if (shouldLineThrough) {
            context.save();
            context.beginPath();
            const yOffset = Global_1.Konva._fixTextRendering ? -Math.round(fontSize / 4) : 0;
            context.moveTo(lineTranslateX, translateY + lineTranslateY + yOffset);
            spacesNumber = text.split(" ").length - 1;
            oneWord = spacesNumber === 0;
            lineWidth = align === JUSTIFY && !lastLine ? totalWidth - padding * 2 : width;
            context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY + yOffset);
            context.lineWidth = fontSize / 15;
            const gradient = this._getLinearGradient();
            context.strokeStyle = gradient || fill;
            context.stroke();
            context.restore();
          }
          if (direction !== RTL && (letterSpacing !== 0 || align === JUSTIFY)) {
            spacesNumber = text.split(" ").length - 1;
            const array = stringToArray(text);
            for (let li = 0; li < array.length; li++) {
              const letter = array[li];
              if (letter === " " && !lastLine && align === JUSTIFY) {
                lineTranslateX += (totalWidth - padding * 2 - width) / spacesNumber;
              }
              this._partialTextX = lineTranslateX;
              this._partialTextY = translateY + lineTranslateY;
              this._partialText = letter;
              context.fillStrokeShape(this);
              lineTranslateX += this.measureSize(letter).width + letterSpacing;
            }
          } else {
            if (letterSpacing !== 0) {
              context.setAttr("letterSpacing", `${letterSpacing}px`);
            }
            this._partialTextX = lineTranslateX;
            this._partialTextY = translateY + lineTranslateY;
            this._partialText = text;
            context.fillStrokeShape(this);
          }
          context.restore();
          if (textArrLen > 1) {
            translateY += lineHeightPx;
          }
        }
      }
      _hitFunc(context) {
        const width = this.getWidth(), height = this.getHeight();
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
      }
      setText(text) {
        const str = Util_1.Util._isString(text) ? text : text === null || text === void 0 ? "" : text + "";
        this._setAttr(TEXT, str);
        return this;
      }
      getWidth() {
        const isAuto = this.attrs.width === AUTO || this.attrs.width === void 0;
        return isAuto ? this.getTextWidth() + this.padding() * 2 : this.attrs.width;
      }
      getHeight() {
        const isAuto = this.attrs.height === AUTO || this.attrs.height === void 0;
        return isAuto ? this.fontSize() * this.textArr.length * this.lineHeight() + this.padding() * 2 : this.attrs.height;
      }
      getTextWidth() {
        return this.textWidth;
      }
      getTextHeight() {
        Util_1.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.");
        return this.textHeight;
      }
      measureSize(text) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let _context = getDummyContext(), fontSize = this.fontSize(), metrics;
        _context.save();
        _context.font = this._getContextFont();
        metrics = _context.measureText(text);
        _context.restore();
        const scaleFactor = fontSize / 100;
        return {
          actualBoundingBoxAscent: (_a = metrics.actualBoundingBoxAscent) !== null && _a !== void 0 ? _a : 71.58203125 * scaleFactor,
          actualBoundingBoxDescent: (_b = metrics.actualBoundingBoxDescent) !== null && _b !== void 0 ? _b : 0,
          actualBoundingBoxLeft: (_c = metrics.actualBoundingBoxLeft) !== null && _c !== void 0 ? _c : -7.421875 * scaleFactor,
          actualBoundingBoxRight: (_d = metrics.actualBoundingBoxRight) !== null && _d !== void 0 ? _d : 75.732421875 * scaleFactor,
          alphabeticBaseline: (_e = metrics.alphabeticBaseline) !== null && _e !== void 0 ? _e : 0,
          emHeightAscent: (_f = metrics.emHeightAscent) !== null && _f !== void 0 ? _f : 100 * scaleFactor,
          emHeightDescent: (_g = metrics.emHeightDescent) !== null && _g !== void 0 ? _g : -20 * scaleFactor,
          fontBoundingBoxAscent: (_h = metrics.fontBoundingBoxAscent) !== null && _h !== void 0 ? _h : 91 * scaleFactor,
          fontBoundingBoxDescent: (_j = metrics.fontBoundingBoxDescent) !== null && _j !== void 0 ? _j : 21 * scaleFactor,
          hangingBaseline: (_k = metrics.hangingBaseline) !== null && _k !== void 0 ? _k : 72.80000305175781 * scaleFactor,
          ideographicBaseline: (_l = metrics.ideographicBaseline) !== null && _l !== void 0 ? _l : -21 * scaleFactor,
          width: metrics.width,
          height: fontSize
        };
      }
      _getContextFont() {
        return this.fontStyle() + SPACE + this.fontVariant() + SPACE + (this.fontSize() + PX_SPACE) + normalizeFontFamily(this.fontFamily());
      }
      _addTextLine(line) {
        const align = this.align();
        if (align === JUSTIFY) {
          line = line.trim();
        }
        const width = this._getTextWidth(line);
        return this.textArr.push({
          text: line,
          width,
          lastInParagraph: false
        });
      }
      _getTextWidth(text) {
        const letterSpacing = this.letterSpacing();
        const length = text.length;
        return getDummyContext().measureText(text).width + letterSpacing * length;
      }
      _setTextData() {
        let lines = this.text().split("\n"), fontSize = +this.fontSize(), textWidth = 0, lineHeightPx = this.lineHeight() * fontSize, width = this.attrs.width, height = this.attrs.height, fixedWidth = width !== AUTO && width !== void 0, fixedHeight = height !== AUTO && height !== void 0, padding = this.padding(), maxWidth = width - padding * 2, maxHeightPx = height - padding * 2, currentHeightPx = 0, wrap = this.wrap(), shouldWrap = wrap !== NONE, wrapAtWord = wrap !== CHAR && shouldWrap, shouldAddEllipsis = this.ellipsis();
        this.textArr = [];
        getDummyContext().font = this._getContextFont();
        const additionalWidth = shouldAddEllipsis ? this._getTextWidth(ELLIPSIS) : 0;
        for (let i = 0, max = lines.length; i < max; ++i) {
          let line = lines[i];
          let lineWidth = this._getTextWidth(line);
          if (fixedWidth && lineWidth > maxWidth) {
            while (line.length > 0) {
              let low = 0, high = stringToArray(line).length, match = "", matchWidth = 0;
              while (low < high) {
                const mid = low + high >>> 1, lineArray = stringToArray(line), substr = lineArray.slice(0, mid + 1).join(""), substrWidth = this._getTextWidth(substr);
                const shouldConsiderEllipsis = shouldAddEllipsis && fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx;
                const effectiveWidth = shouldConsiderEllipsis ? substrWidth + additionalWidth : substrWidth;
                if (effectiveWidth <= maxWidth) {
                  low = mid + 1;
                  match = substr;
                  matchWidth = substrWidth;
                } else {
                  high = mid;
                }
              }
              if (match) {
                if (wrapAtWord) {
                  const lineArray2 = stringToArray(line);
                  const matchArray = stringToArray(match);
                  const nextChar = lineArray2[matchArray.length];
                  const nextIsSpaceOrDash = nextChar === SPACE || nextChar === DASH;
                  let wrapIndex;
                  if (nextIsSpaceOrDash && matchWidth <= maxWidth) {
                    wrapIndex = matchArray.length;
                  } else {
                    const lastSpaceIndex = matchArray.lastIndexOf(SPACE);
                    const lastDashIndex = matchArray.lastIndexOf(DASH);
                    wrapIndex = Math.max(lastSpaceIndex, lastDashIndex) + 1;
                  }
                  if (wrapIndex > 0) {
                    low = wrapIndex;
                    match = lineArray2.slice(0, low).join("");
                    matchWidth = this._getTextWidth(match);
                  }
                }
                match = match.trimRight();
                this._addTextLine(match);
                textWidth = Math.max(textWidth, matchWidth);
                currentHeightPx += lineHeightPx;
                const shouldHandleEllipsis = this._shouldHandleEllipsis(currentHeightPx);
                if (shouldHandleEllipsis) {
                  this._tryToAddEllipsisToLastLine();
                  break;
                }
                const lineArray = stringToArray(line);
                line = lineArray.slice(low).join("").trimLeft();
                if (line.length > 0) {
                  lineWidth = this._getTextWidth(line);
                  if (lineWidth <= maxWidth) {
                    this._addTextLine(line);
                    currentHeightPx += lineHeightPx;
                    textWidth = Math.max(textWidth, lineWidth);
                    break;
                  }
                }
              } else {
                break;
              }
            }
          } else {
            this._addTextLine(line);
            currentHeightPx += lineHeightPx;
            textWidth = Math.max(textWidth, lineWidth);
            if (this._shouldHandleEllipsis(currentHeightPx) && i < max - 1) {
              this._tryToAddEllipsisToLastLine();
            }
          }
          if (this.textArr[this.textArr.length - 1]) {
            this.textArr[this.textArr.length - 1].lastInParagraph = true;
          }
          if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
            break;
          }
        }
        this.textHeight = fontSize;
        this.textWidth = textWidth;
      }
      _shouldHandleEllipsis(currentHeightPx) {
        const fontSize = +this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, height = this.attrs.height, fixedHeight = height !== AUTO && height !== void 0, padding = this.padding(), maxHeightPx = height - padding * 2, wrap = this.wrap(), shouldWrap = wrap !== NONE;
        return !shouldWrap || fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx;
      }
      _tryToAddEllipsisToLastLine() {
        const width = this.attrs.width, fixedWidth = width !== AUTO && width !== void 0, padding = this.padding(), maxWidth = width - padding * 2, shouldAddEllipsis = this.ellipsis();
        const lastLine = this.textArr[this.textArr.length - 1];
        if (!lastLine || !shouldAddEllipsis) {
          return;
        }
        if (fixedWidth) {
          const haveSpace = this._getTextWidth(lastLine.text + ELLIPSIS) < maxWidth;
          if (!haveSpace) {
            lastLine.text = lastLine.text.slice(0, lastLine.text.length - 3);
          }
        }
        this.textArr.splice(this.textArr.length - 1, 1);
        this._addTextLine(lastLine.text + ELLIPSIS);
      }
      getStrokeScaleEnabled() {
        return true;
      }
      _useBufferCanvas() {
        const hasLine = this.textDecoration().indexOf("underline") !== -1 || this.textDecoration().indexOf("line-through") !== -1;
        const hasShadow = this.hasShadow();
        if (hasLine && hasShadow) {
          return true;
        }
        return super._useBufferCanvas();
      }
    };
    exports.Text = Text;
    Text.prototype._fillFunc = _fillFunc;
    Text.prototype._strokeFunc = _strokeFunc;
    Text.prototype.className = TEXT_UPPER;
    Text.prototype._attrsAffectingSize = ["text", "fontSize", "padding", "wrap", "lineHeight", "letterSpacing"];
    (0, Global_2._registerNode)(Text);
    Factory_1.Factory.overWriteSetter(Text, "width", (0, Validators_1.getNumberOrAutoValidator)());
    Factory_1.Factory.overWriteSetter(Text, "height", (0, Validators_1.getNumberOrAutoValidator)());
    Factory_1.Factory.addGetterSetter(Text, "direction", INHERIT);
    Factory_1.Factory.addGetterSetter(Text, "fontFamily", "Arial");
    Factory_1.Factory.addGetterSetter(Text, "fontSize", 12, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Text, "fontStyle", NORMAL);
    Factory_1.Factory.addGetterSetter(Text, "fontVariant", NORMAL);
    Factory_1.Factory.addGetterSetter(Text, "padding", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Text, "align", LEFT);
    Factory_1.Factory.addGetterSetter(Text, "verticalAlign", TOP);
    Factory_1.Factory.addGetterSetter(Text, "lineHeight", 1, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Text, "wrap", WORD);
    Factory_1.Factory.addGetterSetter(Text, "ellipsis", false, (0, Validators_1.getBooleanValidator)());
    Factory_1.Factory.addGetterSetter(Text, "letterSpacing", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Text, "text", "", (0, Validators_1.getStringValidator)());
    Factory_1.Factory.addGetterSetter(Text, "textDecoration", "");
  }
});

// node_modules/konva/lib/shapes/TextPath.js
var require_TextPath = __commonJS({
  "node_modules/konva/lib/shapes/TextPath.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TextPath = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Path_1 = require_Path();
    var Text_1 = require_Text();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var EMPTY_STRING = "";
    var NORMAL = "normal";
    function _fillFunc(context) {
      context.fillText(this.partialText, 0, 0);
    }
    function _strokeFunc(context) {
      context.strokeText(this.partialText, 0, 0);
    }
    var TextPath = class extends Shape_1.Shape {
      constructor(config) {
        super(config);
        this.dummyCanvas = Util_1.Util.createCanvasElement();
        this.dataArray = [];
        this._readDataAttribute();
        this.on("dataChange.konva", function() {
          this._readDataAttribute();
          this._setTextData();
        });
        this.on("textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva fontSizeChange.konva fontFamilyChange.konva", this._setTextData);
        this._setTextData();
      }
      _getTextPathLength() {
        return Path_1.Path.getPathLength(this.dataArray);
      }
      _getPointAtLength(length) {
        if (!this.attrs.data) {
          return null;
        }
        const totalLength = this.pathLength;
        if (length - 1 > totalLength) {
          return null;
        }
        return Path_1.Path.getPointAtLengthOfDataArray(length, this.dataArray);
      }
      _readDataAttribute() {
        this.dataArray = Path_1.Path.parsePathData(this.attrs.data);
        this.pathLength = this._getTextPathLength();
      }
      _sceneFunc(context) {
        context.setAttr("font", this._getContextFont());
        context.setAttr("textBaseline", this.textBaseline());
        context.setAttr("textAlign", "left");
        context.save();
        const textDecoration = this.textDecoration();
        const fill = this.fill();
        const fontSize = this.fontSize();
        const glyphInfo = this.glyphInfo;
        if (textDecoration === "underline") {
          context.beginPath();
        }
        for (let i = 0; i < glyphInfo.length; i++) {
          context.save();
          const p0 = glyphInfo[i].p0;
          context.translate(p0.x, p0.y);
          context.rotate(glyphInfo[i].rotation);
          this.partialText = glyphInfo[i].text;
          context.fillStrokeShape(this);
          if (textDecoration === "underline") {
            if (i === 0) {
              context.moveTo(0, fontSize / 2 + 1);
            }
            context.lineTo(fontSize, fontSize / 2 + 1);
          }
          context.restore();
        }
        if (textDecoration === "underline") {
          context.strokeStyle = fill;
          context.lineWidth = fontSize / 20;
          context.stroke();
        }
        context.restore();
      }
      _hitFunc(context) {
        context.beginPath();
        const glyphInfo = this.glyphInfo;
        if (glyphInfo.length >= 1) {
          const p0 = glyphInfo[0].p0;
          context.moveTo(p0.x, p0.y);
        }
        for (let i = 0; i < glyphInfo.length; i++) {
          const p1 = glyphInfo[i].p1;
          context.lineTo(p1.x, p1.y);
        }
        context.setAttr("lineWidth", this.fontSize());
        context.setAttr("strokeStyle", this.colorKey);
        context.stroke();
      }
      getTextWidth() {
        return this.textWidth;
      }
      getTextHeight() {
        Util_1.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.");
        return this.textHeight;
      }
      setText(text) {
        return Text_1.Text.prototype.setText.call(this, text);
      }
      _getContextFont() {
        return Text_1.Text.prototype._getContextFont.call(this);
      }
      _getTextSize(text) {
        const dummyCanvas = this.dummyCanvas;
        const _context = dummyCanvas.getContext("2d");
        _context.save();
        _context.font = this._getContextFont();
        const metrics = _context.measureText(text);
        _context.restore();
        return {
          width: metrics.width,
          height: parseInt(`${this.fontSize()}`, 10)
        };
      }
      _setTextData() {
        const {
          width,
          height
        } = this._getTextSize(this.attrs.text);
        this.textWidth = width;
        this.textHeight = height;
        this.glyphInfo = [];
        if (!this.attrs.data) {
          return null;
        }
        const letterSpacing = this.letterSpacing();
        const align = this.align();
        const kerningFunc = this.kerningFunc();
        const textWidth = Math.max(this.textWidth + ((this.attrs.text || "").length - 1) * letterSpacing, 0);
        let offset = 0;
        if (align === "center") {
          offset = Math.max(0, this.pathLength / 2 - textWidth / 2);
        }
        if (align === "right") {
          offset = Math.max(0, this.pathLength - textWidth);
        }
        const charArr = (0, Text_1.stringToArray)(this.text());
        let offsetToGlyph = offset;
        for (let i = 0; i < charArr.length; i++) {
          const charStartPoint = this._getPointAtLength(offsetToGlyph);
          if (!charStartPoint) return;
          let glyphWidth = this._getTextSize(charArr[i]).width + letterSpacing;
          if (charArr[i] === " " && align === "justify") {
            const numberOfSpaces = this.text().split(" ").length - 1;
            glyphWidth += (this.pathLength - textWidth) / numberOfSpaces;
          }
          const charEndPoint = this._getPointAtLength(offsetToGlyph + glyphWidth);
          if (!charEndPoint) return;
          const width2 = Path_1.Path.getLineLength(charStartPoint.x, charStartPoint.y, charEndPoint.x, charEndPoint.y);
          let kern = 0;
          if (kerningFunc) {
            try {
              kern = kerningFunc(charArr[i - 1], charArr[i]) * this.fontSize();
            } catch (e) {
              kern = 0;
            }
          }
          charStartPoint.x += kern;
          charEndPoint.x += kern;
          this.textWidth += kern;
          const midpoint = Path_1.Path.getPointOnLine(kern + width2 / 2, charStartPoint.x, charStartPoint.y, charEndPoint.x, charEndPoint.y);
          const rotation = Math.atan2(charEndPoint.y - charStartPoint.y, charEndPoint.x - charStartPoint.x);
          this.glyphInfo.push({
            transposeX: midpoint.x,
            transposeY: midpoint.y,
            text: charArr[i],
            rotation,
            p0: charStartPoint,
            p1: charEndPoint
          });
          offsetToGlyph += glyphWidth;
        }
      }
      getSelfRect() {
        if (!this.glyphInfo.length) {
          return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
        const points = [];
        this.glyphInfo.forEach(function(info) {
          points.push(info.p0.x);
          points.push(info.p0.y);
          points.push(info.p1.x);
          points.push(info.p1.y);
        });
        let minX = points[0] || 0;
        let maxX = points[0] || 0;
        let minY = points[1] || 0;
        let maxY = points[1] || 0;
        let x, y;
        for (let i = 0; i < points.length / 2; i++) {
          x = points[i * 2];
          y = points[i * 2 + 1];
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
        const fontSize = this.fontSize();
        return {
          x: minX - fontSize / 2,
          y: minY - fontSize / 2,
          width: maxX - minX + fontSize,
          height: maxY - minY + fontSize
        };
      }
      destroy() {
        Util_1.Util.releaseCanvas(this.dummyCanvas);
        return super.destroy();
      }
    };
    exports.TextPath = TextPath;
    TextPath.prototype._fillFunc = _fillFunc;
    TextPath.prototype._strokeFunc = _strokeFunc;
    TextPath.prototype._fillFuncHit = _fillFunc;
    TextPath.prototype._strokeFuncHit = _strokeFunc;
    TextPath.prototype.className = "TextPath";
    TextPath.prototype._attrsAffectingSize = ["text", "fontSize", "data"];
    (0, Global_1._registerNode)(TextPath);
    Factory_1.Factory.addGetterSetter(TextPath, "data");
    Factory_1.Factory.addGetterSetter(TextPath, "fontFamily", "Arial");
    Factory_1.Factory.addGetterSetter(TextPath, "fontSize", 12, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(TextPath, "fontStyle", NORMAL);
    Factory_1.Factory.addGetterSetter(TextPath, "align", "left");
    Factory_1.Factory.addGetterSetter(TextPath, "letterSpacing", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(TextPath, "textBaseline", "middle");
    Factory_1.Factory.addGetterSetter(TextPath, "fontVariant", NORMAL);
    Factory_1.Factory.addGetterSetter(TextPath, "text", EMPTY_STRING);
    Factory_1.Factory.addGetterSetter(TextPath, "textDecoration", "");
    Factory_1.Factory.addGetterSetter(TextPath, "kerningFunc", void 0);
  }
});

// node_modules/konva/lib/shapes/Transformer.js
var require_Transformer = __commonJS({
  "node_modules/konva/lib/shapes/Transformer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Transformer = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Shape_1 = require_Shape();
    var Rect_1 = require_Rect();
    var Group_1 = require_Group();
    var Global_1 = require_Global();
    var Validators_1 = require_Validators();
    var Global_2 = require_Global();
    var EVENTS_NAME = "tr-konva";
    var ATTR_CHANGE_LIST = ["resizeEnabledChange", "rotateAnchorOffsetChange", "rotateEnabledChange", "enabledAnchorsChange", "anchorSizeChange", "borderEnabledChange", "borderStrokeChange", "borderStrokeWidthChange", "borderDashChange", "anchorStrokeChange", "anchorStrokeWidthChange", "anchorFillChange", "anchorCornerRadiusChange", "ignoreStrokeChange", "anchorStyleFuncChange"].map((e) => e + `.${EVENTS_NAME}`).join(" ");
    var NODES_RECT = "nodesRect";
    var TRANSFORM_CHANGE_STR = ["widthChange", "heightChange", "scaleXChange", "scaleYChange", "skewXChange", "skewYChange", "rotationChange", "offsetXChange", "offsetYChange", "transformsEnabledChange", "strokeWidthChange"];
    var ANGLES = {
      "top-left": -45,
      "top-center": 0,
      "top-right": 45,
      "middle-right": -90,
      "middle-left": 90,
      "bottom-left": -135,
      "bottom-center": 180,
      "bottom-right": 135
    };
    var TOUCH_DEVICE = "ontouchstart" in Global_1.Konva._global;
    function getCursor(anchorName, rad, rotateCursor) {
      if (anchorName === "rotater") {
        return rotateCursor;
      }
      rad += Util_1.Util.degToRad(ANGLES[anchorName] || 0);
      const angle = (Util_1.Util.radToDeg(rad) % 360 + 360) % 360;
      if (Util_1.Util._inRange(angle, 315 + 22.5, 360) || Util_1.Util._inRange(angle, 0, 22.5)) {
        return "ns-resize";
      } else if (Util_1.Util._inRange(angle, 45 - 22.5, 45 + 22.5)) {
        return "nesw-resize";
      } else if (Util_1.Util._inRange(angle, 90 - 22.5, 90 + 22.5)) {
        return "ew-resize";
      } else if (Util_1.Util._inRange(angle, 135 - 22.5, 135 + 22.5)) {
        return "nwse-resize";
      } else if (Util_1.Util._inRange(angle, 180 - 22.5, 180 + 22.5)) {
        return "ns-resize";
      } else if (Util_1.Util._inRange(angle, 225 - 22.5, 225 + 22.5)) {
        return "nesw-resize";
      } else if (Util_1.Util._inRange(angle, 270 - 22.5, 270 + 22.5)) {
        return "ew-resize";
      } else if (Util_1.Util._inRange(angle, 315 - 22.5, 315 + 22.5)) {
        return "nwse-resize";
      } else {
        Util_1.Util.error("Transformer has unknown angle for cursor detection: " + angle);
        return "pointer";
      }
    }
    var ANCHORS_NAMES = ["top-left", "top-center", "top-right", "middle-right", "middle-left", "bottom-left", "bottom-center", "bottom-right"];
    var MAX_SAFE_INTEGER = 1e8;
    function getCenter(shape) {
      return {
        x: shape.x + shape.width / 2 * Math.cos(shape.rotation) + shape.height / 2 * Math.sin(-shape.rotation),
        y: shape.y + shape.height / 2 * Math.cos(shape.rotation) + shape.width / 2 * Math.sin(shape.rotation)
      };
    }
    function rotateAroundPoint(shape, angleRad, point) {
      const x = point.x + (shape.x - point.x) * Math.cos(angleRad) - (shape.y - point.y) * Math.sin(angleRad);
      const y = point.y + (shape.x - point.x) * Math.sin(angleRad) + (shape.y - point.y) * Math.cos(angleRad);
      return __spreadProps(__spreadValues({}, shape), {
        rotation: shape.rotation + angleRad,
        x,
        y
      });
    }
    function rotateAroundCenter(shape, deltaRad) {
      const center = getCenter(shape);
      return rotateAroundPoint(shape, deltaRad, center);
    }
    function getSnap(snaps, newRotationRad, tol) {
      let snapped = newRotationRad;
      for (let i = 0; i < snaps.length; i++) {
        const angle = Global_1.Konva.getAngle(snaps[i]);
        const absDiff = Math.abs(angle - newRotationRad) % (Math.PI * 2);
        const dif = Math.min(absDiff, Math.PI * 2 - absDiff);
        if (dif < tol) {
          snapped = angle;
        }
      }
      return snapped;
    }
    var activeTransformersCount = 0;
    var Transformer = class extends Group_1.Group {
      constructor(config) {
        super(config);
        this._movingAnchorName = null;
        this._transforming = false;
        this._createElements();
        this._handleMouseMove = this._handleMouseMove.bind(this);
        this._handleMouseUp = this._handleMouseUp.bind(this);
        this.update = this.update.bind(this);
        this.on(ATTR_CHANGE_LIST, this.update);
        if (this.getNode()) {
          this.update();
        }
      }
      attachTo(node) {
        this.setNode(node);
        return this;
      }
      setNode(node) {
        Util_1.Util.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead.");
        return this.setNodes([node]);
      }
      getNode() {
        return this._nodes && this._nodes[0];
      }
      _getEventNamespace() {
        return EVENTS_NAME + this._id;
      }
      setNodes(nodes = []) {
        if (this._nodes && this._nodes.length) {
          this.detach();
        }
        const filteredNodes = nodes.filter((node) => {
          if (node.isAncestorOf(this)) {
            Util_1.Util.error("Konva.Transformer cannot be an a child of the node you are trying to attach");
            return false;
          }
          return true;
        });
        this._nodes = nodes = filteredNodes;
        if (nodes.length === 1 && this.useSingleNodeRotation()) {
          this.rotation(nodes[0].getAbsoluteRotation());
        } else {
          this.rotation(0);
        }
        this._nodes.forEach((node) => {
          const onChange = () => {
            if (this.nodes().length === 1 && this.useSingleNodeRotation()) {
              this.rotation(this.nodes()[0].getAbsoluteRotation());
            }
            this._resetTransformCache();
            if (!this._transforming && !this.isDragging()) {
              this.update();
            }
          };
          if (node._attrsAffectingSize.length) {
            const additionalEvents = node._attrsAffectingSize.map((prop) => prop + "Change." + this._getEventNamespace()).join(" ");
            node.on(additionalEvents, onChange);
          }
          node.on(TRANSFORM_CHANGE_STR.map((e) => e + `.${this._getEventNamespace()}`).join(" "), onChange);
          node.on(`absoluteTransformChange.${this._getEventNamespace()}`, onChange);
          this._proxyDrag(node);
        });
        this._resetTransformCache();
        const elementsCreated = !!this.findOne(".top-left");
        if (elementsCreated) {
          this.update();
        }
        return this;
      }
      _proxyDrag(node) {
        let lastPos;
        node.on(`dragstart.${this._getEventNamespace()}`, (e) => {
          lastPos = node.getAbsolutePosition();
          if (!this.isDragging() && node !== this.findOne(".back")) {
            this.startDrag(e, false);
          }
        });
        node.on(`dragmove.${this._getEventNamespace()}`, (e) => {
          if (!lastPos) {
            return;
          }
          const abs = node.getAbsolutePosition();
          const dx = abs.x - lastPos.x;
          const dy = abs.y - lastPos.y;
          this.nodes().forEach((otherNode) => {
            if (otherNode === node) {
              return;
            }
            if (otherNode.isDragging()) {
              return;
            }
            const otherAbs = otherNode.getAbsolutePosition();
            otherNode.setAbsolutePosition({
              x: otherAbs.x + dx,
              y: otherAbs.y + dy
            });
            otherNode.startDrag(e);
          });
          lastPos = null;
        });
      }
      getNodes() {
        return this._nodes || [];
      }
      getActiveAnchor() {
        return this._movingAnchorName;
      }
      detach() {
        if (this._nodes) {
          this._nodes.forEach((node) => {
            node.off("." + this._getEventNamespace());
          });
        }
        this._nodes = [];
        this._resetTransformCache();
      }
      _resetTransformCache() {
        this._clearCache(NODES_RECT);
        this._clearCache("transform");
        this._clearSelfAndDescendantCache("absoluteTransform");
      }
      _getNodeRect() {
        return this._getCache(NODES_RECT, this.__getNodeRect);
      }
      __getNodeShape(node, rot = this.rotation(), relative) {
        const rect = node.getClientRect({
          skipTransform: true,
          skipShadow: true,
          skipStroke: this.ignoreStroke()
        });
        const absScale = node.getAbsoluteScale(relative);
        const absPos = node.getAbsolutePosition(relative);
        const dx = rect.x * absScale.x - node.offsetX() * absScale.x;
        const dy = rect.y * absScale.y - node.offsetY() * absScale.y;
        const rotation = (Global_1.Konva.getAngle(node.getAbsoluteRotation()) + Math.PI * 2) % (Math.PI * 2);
        const box = {
          x: absPos.x + dx * Math.cos(rotation) + dy * Math.sin(-rotation),
          y: absPos.y + dy * Math.cos(rotation) + dx * Math.sin(rotation),
          width: rect.width * absScale.x,
          height: rect.height * absScale.y,
          rotation
        };
        return rotateAroundPoint(box, -Global_1.Konva.getAngle(rot), {
          x: 0,
          y: 0
        });
      }
      __getNodeRect() {
        const node = this.getNode();
        if (!node) {
          return {
            x: -MAX_SAFE_INTEGER,
            y: -MAX_SAFE_INTEGER,
            width: 0,
            height: 0,
            rotation: 0
          };
        }
        const totalPoints = [];
        this.nodes().map((node2) => {
          const box = node2.getClientRect({
            skipTransform: true,
            skipShadow: true,
            skipStroke: this.ignoreStroke()
          });
          const points = [{
            x: box.x,
            y: box.y
          }, {
            x: box.x + box.width,
            y: box.y
          }, {
            x: box.x + box.width,
            y: box.y + box.height
          }, {
            x: box.x,
            y: box.y + box.height
          }];
          const trans = node2.getAbsoluteTransform();
          points.forEach(function(point) {
            const transformed = trans.point(point);
            totalPoints.push(transformed);
          });
        });
        const tr = new Util_1.Transform();
        tr.rotate(-Global_1.Konva.getAngle(this.rotation()));
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        totalPoints.forEach(function(point) {
          const transformed = tr.point(point);
          if (minX === void 0) {
            minX = maxX = transformed.x;
            minY = maxY = transformed.y;
          }
          minX = Math.min(minX, transformed.x);
          minY = Math.min(minY, transformed.y);
          maxX = Math.max(maxX, transformed.x);
          maxY = Math.max(maxY, transformed.y);
        });
        tr.invert();
        const p = tr.point({
          x: minX,
          y: minY
        });
        return {
          x: p.x,
          y: p.y,
          width: maxX - minX,
          height: maxY - minY,
          rotation: Global_1.Konva.getAngle(this.rotation())
        };
      }
      getX() {
        return this._getNodeRect().x;
      }
      getY() {
        return this._getNodeRect().y;
      }
      getWidth() {
        return this._getNodeRect().width;
      }
      getHeight() {
        return this._getNodeRect().height;
      }
      _createElements() {
        this._createBack();
        ANCHORS_NAMES.forEach((name) => {
          this._createAnchor(name);
        });
        this._createAnchor("rotater");
      }
      _createAnchor(name) {
        const anchor = new Rect_1.Rect({
          stroke: "rgb(0, 161, 255)",
          fill: "white",
          strokeWidth: 1,
          name: name + " _anchor",
          dragDistance: 0,
          draggable: true,
          hitStrokeWidth: TOUCH_DEVICE ? 10 : "auto"
        });
        const self2 = this;
        anchor.on("mousedown touchstart", function(e) {
          self2._handleMouseDown(e);
        });
        anchor.on("dragstart", (e) => {
          anchor.stopDrag();
          e.cancelBubble = true;
        });
        anchor.on("dragend", (e) => {
          e.cancelBubble = true;
        });
        anchor.on("mouseenter", () => {
          const rad = Global_1.Konva.getAngle(this.rotation());
          const rotateCursor = this.rotateAnchorCursor();
          const cursor = getCursor(name, rad, rotateCursor);
          anchor.getStage().content && (anchor.getStage().content.style.cursor = cursor);
          this._cursorChange = true;
        });
        anchor.on("mouseout", () => {
          anchor.getStage().content && (anchor.getStage().content.style.cursor = "");
          this._cursorChange = false;
        });
        this.add(anchor);
      }
      _createBack() {
        const back = new Shape_1.Shape({
          name: "back",
          width: 0,
          height: 0,
          draggable: true,
          sceneFunc(ctx, shape) {
            const tr = shape.getParent();
            const padding = tr.padding();
            ctx.beginPath();
            ctx.rect(-padding, -padding, shape.width() + padding * 2, shape.height() + padding * 2);
            ctx.moveTo(shape.width() / 2, -padding);
            if (tr.rotateEnabled() && tr.rotateLineVisible()) {
              ctx.lineTo(shape.width() / 2, -tr.rotateAnchorOffset() * Util_1.Util._sign(shape.height()) - padding);
            }
            ctx.fillStrokeShape(shape);
          },
          hitFunc: (ctx, shape) => {
            if (!this.shouldOverdrawWholeArea()) {
              return;
            }
            const padding = this.padding();
            ctx.beginPath();
            ctx.rect(-padding, -padding, shape.width() + padding * 2, shape.height() + padding * 2);
            ctx.fillStrokeShape(shape);
          }
        });
        this.add(back);
        this._proxyDrag(back);
        back.on("dragstart", (e) => {
          e.cancelBubble = true;
        });
        back.on("dragmove", (e) => {
          e.cancelBubble = true;
        });
        back.on("dragend", (e) => {
          e.cancelBubble = true;
        });
        this.on("dragmove", (e) => {
          this.update();
        });
      }
      _handleMouseDown(e) {
        if (this._transforming) {
          return;
        }
        this._movingAnchorName = e.target.name().split(" ")[0];
        const attrs = this._getNodeRect();
        const width = attrs.width;
        const height = attrs.height;
        const hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        this.sin = Math.abs(height / hypotenuse);
        this.cos = Math.abs(width / hypotenuse);
        if (typeof window !== "undefined") {
          window.addEventListener("mousemove", this._handleMouseMove);
          window.addEventListener("touchmove", this._handleMouseMove);
          window.addEventListener("mouseup", this._handleMouseUp, true);
          window.addEventListener("touchend", this._handleMouseUp, true);
        }
        this._transforming = true;
        const ap = e.target.getAbsolutePosition();
        const pos = e.target.getStage().getPointerPosition();
        this._anchorDragOffset = {
          x: pos.x - ap.x,
          y: pos.y - ap.y
        };
        activeTransformersCount++;
        this._fire("transformstart", {
          evt: e.evt,
          target: this.getNode()
        });
        this._nodes.forEach((target) => {
          target._fire("transformstart", {
            evt: e.evt,
            target
          });
        });
      }
      _handleMouseMove(e) {
        let x, y, newHypotenuse;
        const anchorNode = this.findOne("." + this._movingAnchorName);
        const stage = anchorNode.getStage();
        stage.setPointersPositions(e);
        const pp = stage.getPointerPosition();
        let newNodePos = {
          x: pp.x - this._anchorDragOffset.x,
          y: pp.y - this._anchorDragOffset.y
        };
        const oldAbs = anchorNode.getAbsolutePosition();
        if (this.anchorDragBoundFunc()) {
          newNodePos = this.anchorDragBoundFunc()(oldAbs, newNodePos, e);
        }
        anchorNode.setAbsolutePosition(newNodePos);
        const newAbs = anchorNode.getAbsolutePosition();
        if (oldAbs.x === newAbs.x && oldAbs.y === newAbs.y) {
          return;
        }
        if (this._movingAnchorName === "rotater") {
          const attrs = this._getNodeRect();
          x = anchorNode.x() - attrs.width / 2;
          y = -anchorNode.y() + attrs.height / 2;
          let delta = Math.atan2(-y, x) + Math.PI / 2;
          if (attrs.height < 0) {
            delta -= Math.PI;
          }
          const oldRotation = Global_1.Konva.getAngle(this.rotation());
          const newRotation = oldRotation + delta;
          const tol = Global_1.Konva.getAngle(this.rotationSnapTolerance());
          const snappedRot = getSnap(this.rotationSnaps(), newRotation, tol);
          const diff = snappedRot - attrs.rotation;
          const shape = rotateAroundCenter(attrs, diff);
          this._fitNodesInto(shape, e);
          return;
        }
        const shiftBehavior = this.shiftBehavior();
        let keepProportion;
        if (shiftBehavior === "inverted") {
          keepProportion = this.keepRatio() && !e.shiftKey;
        } else if (shiftBehavior === "none") {
          keepProportion = this.keepRatio();
        } else {
          keepProportion = this.keepRatio() || e.shiftKey;
        }
        var centeredScaling = this.centeredScaling() || e.altKey;
        if (this._movingAnchorName === "top-left") {
          if (keepProportion) {
            var comparePoint = centeredScaling ? {
              x: this.width() / 2,
              y: this.height() / 2
            } : {
              x: this.findOne(".bottom-right").x(),
              y: this.findOne(".bottom-right").y()
            };
            newHypotenuse = Math.sqrt(Math.pow(comparePoint.x - anchorNode.x(), 2) + Math.pow(comparePoint.y - anchorNode.y(), 2));
            var reverseX = this.findOne(".top-left").x() > comparePoint.x ? -1 : 1;
            var reverseY = this.findOne(".top-left").y() > comparePoint.y ? -1 : 1;
            x = newHypotenuse * this.cos * reverseX;
            y = newHypotenuse * this.sin * reverseY;
            this.findOne(".top-left").x(comparePoint.x - x);
            this.findOne(".top-left").y(comparePoint.y - y);
          }
        } else if (this._movingAnchorName === "top-center") {
          this.findOne(".top-left").y(anchorNode.y());
        } else if (this._movingAnchorName === "top-right") {
          if (keepProportion) {
            var comparePoint = centeredScaling ? {
              x: this.width() / 2,
              y: this.height() / 2
            } : {
              x: this.findOne(".bottom-left").x(),
              y: this.findOne(".bottom-left").y()
            };
            newHypotenuse = Math.sqrt(Math.pow(anchorNode.x() - comparePoint.x, 2) + Math.pow(comparePoint.y - anchorNode.y(), 2));
            var reverseX = this.findOne(".top-right").x() < comparePoint.x ? -1 : 1;
            var reverseY = this.findOne(".top-right").y() > comparePoint.y ? -1 : 1;
            x = newHypotenuse * this.cos * reverseX;
            y = newHypotenuse * this.sin * reverseY;
            this.findOne(".top-right").x(comparePoint.x + x);
            this.findOne(".top-right").y(comparePoint.y - y);
          }
          var pos = anchorNode.position();
          this.findOne(".top-left").y(pos.y);
          this.findOne(".bottom-right").x(pos.x);
        } else if (this._movingAnchorName === "middle-left") {
          this.findOne(".top-left").x(anchorNode.x());
        } else if (this._movingAnchorName === "middle-right") {
          this.findOne(".bottom-right").x(anchorNode.x());
        } else if (this._movingAnchorName === "bottom-left") {
          if (keepProportion) {
            var comparePoint = centeredScaling ? {
              x: this.width() / 2,
              y: this.height() / 2
            } : {
              x: this.findOne(".top-right").x(),
              y: this.findOne(".top-right").y()
            };
            newHypotenuse = Math.sqrt(Math.pow(comparePoint.x - anchorNode.x(), 2) + Math.pow(anchorNode.y() - comparePoint.y, 2));
            var reverseX = comparePoint.x < anchorNode.x() ? -1 : 1;
            var reverseY = anchorNode.y() < comparePoint.y ? -1 : 1;
            x = newHypotenuse * this.cos * reverseX;
            y = newHypotenuse * this.sin * reverseY;
            anchorNode.x(comparePoint.x - x);
            anchorNode.y(comparePoint.y + y);
          }
          pos = anchorNode.position();
          this.findOne(".top-left").x(pos.x);
          this.findOne(".bottom-right").y(pos.y);
        } else if (this._movingAnchorName === "bottom-center") {
          this.findOne(".bottom-right").y(anchorNode.y());
        } else if (this._movingAnchorName === "bottom-right") {
          if (keepProportion) {
            var comparePoint = centeredScaling ? {
              x: this.width() / 2,
              y: this.height() / 2
            } : {
              x: this.findOne(".top-left").x(),
              y: this.findOne(".top-left").y()
            };
            newHypotenuse = Math.sqrt(Math.pow(anchorNode.x() - comparePoint.x, 2) + Math.pow(anchorNode.y() - comparePoint.y, 2));
            var reverseX = this.findOne(".bottom-right").x() < comparePoint.x ? -1 : 1;
            var reverseY = this.findOne(".bottom-right").y() < comparePoint.y ? -1 : 1;
            x = newHypotenuse * this.cos * reverseX;
            y = newHypotenuse * this.sin * reverseY;
            this.findOne(".bottom-right").x(comparePoint.x + x);
            this.findOne(".bottom-right").y(comparePoint.y + y);
          }
        } else {
          console.error(new Error("Wrong position argument of selection resizer: " + this._movingAnchorName));
        }
        var centeredScaling = this.centeredScaling() || e.altKey;
        if (centeredScaling) {
          const topLeft = this.findOne(".top-left");
          const bottomRight = this.findOne(".bottom-right");
          const topOffsetX = topLeft.x();
          const topOffsetY = topLeft.y();
          const bottomOffsetX = this.getWidth() - bottomRight.x();
          const bottomOffsetY = this.getHeight() - bottomRight.y();
          bottomRight.move({
            x: -topOffsetX,
            y: -topOffsetY
          });
          topLeft.move({
            x: bottomOffsetX,
            y: bottomOffsetY
          });
        }
        const absPos = this.findOne(".top-left").getAbsolutePosition();
        x = absPos.x;
        y = absPos.y;
        const width = this.findOne(".bottom-right").x() - this.findOne(".top-left").x();
        const height = this.findOne(".bottom-right").y() - this.findOne(".top-left").y();
        this._fitNodesInto({
          x,
          y,
          width,
          height,
          rotation: Global_1.Konva.getAngle(this.rotation())
        }, e);
      }
      _handleMouseUp(e) {
        this._removeEvents(e);
      }
      getAbsoluteTransform() {
        return this.getTransform();
      }
      _removeEvents(e) {
        var _a;
        if (this._transforming) {
          this._transforming = false;
          if (typeof window !== "undefined") {
            window.removeEventListener("mousemove", this._handleMouseMove);
            window.removeEventListener("touchmove", this._handleMouseMove);
            window.removeEventListener("mouseup", this._handleMouseUp, true);
            window.removeEventListener("touchend", this._handleMouseUp, true);
          }
          const node = this.getNode();
          activeTransformersCount--;
          this._fire("transformend", {
            evt: e,
            target: node
          });
          (_a = this.getLayer()) === null || _a === void 0 ? void 0 : _a.batchDraw();
          if (node) {
            this._nodes.forEach((target) => {
              var _a2;
              target._fire("transformend", {
                evt: e,
                target
              });
              (_a2 = target.getLayer()) === null || _a2 === void 0 ? void 0 : _a2.batchDraw();
            });
          }
          this._movingAnchorName = null;
        }
      }
      _fitNodesInto(newAttrs, evt) {
        const oldAttrs = this._getNodeRect();
        const minSize = 1;
        if (Util_1.Util._inRange(newAttrs.width, -this.padding() * 2 - minSize, minSize)) {
          this.update();
          return;
        }
        if (Util_1.Util._inRange(newAttrs.height, -this.padding() * 2 - minSize, minSize)) {
          this.update();
          return;
        }
        const t = new Util_1.Transform();
        t.rotate(Global_1.Konva.getAngle(this.rotation()));
        if (this._movingAnchorName && newAttrs.width < 0 && this._movingAnchorName.indexOf("left") >= 0) {
          const offset = t.point({
            x: -this.padding() * 2,
            y: 0
          });
          newAttrs.x += offset.x;
          newAttrs.y += offset.y;
          newAttrs.width += this.padding() * 2;
          this._movingAnchorName = this._movingAnchorName.replace("left", "right");
          this._anchorDragOffset.x -= offset.x;
          this._anchorDragOffset.y -= offset.y;
        } else if (this._movingAnchorName && newAttrs.width < 0 && this._movingAnchorName.indexOf("right") >= 0) {
          const offset = t.point({
            x: this.padding() * 2,
            y: 0
          });
          this._movingAnchorName = this._movingAnchorName.replace("right", "left");
          this._anchorDragOffset.x -= offset.x;
          this._anchorDragOffset.y -= offset.y;
          newAttrs.width += this.padding() * 2;
        }
        if (this._movingAnchorName && newAttrs.height < 0 && this._movingAnchorName.indexOf("top") >= 0) {
          const offset = t.point({
            x: 0,
            y: -this.padding() * 2
          });
          newAttrs.x += offset.x;
          newAttrs.y += offset.y;
          this._movingAnchorName = this._movingAnchorName.replace("top", "bottom");
          this._anchorDragOffset.x -= offset.x;
          this._anchorDragOffset.y -= offset.y;
          newAttrs.height += this.padding() * 2;
        } else if (this._movingAnchorName && newAttrs.height < 0 && this._movingAnchorName.indexOf("bottom") >= 0) {
          const offset = t.point({
            x: 0,
            y: this.padding() * 2
          });
          this._movingAnchorName = this._movingAnchorName.replace("bottom", "top");
          this._anchorDragOffset.x -= offset.x;
          this._anchorDragOffset.y -= offset.y;
          newAttrs.height += this.padding() * 2;
        }
        if (this.boundBoxFunc()) {
          const bounded = this.boundBoxFunc()(oldAttrs, newAttrs);
          if (bounded) {
            newAttrs = bounded;
          } else {
            Util_1.Util.warn("boundBoxFunc returned falsy. You should return new bound rect from it!");
          }
        }
        const baseSize = 1e7;
        const oldTr = new Util_1.Transform();
        oldTr.translate(oldAttrs.x, oldAttrs.y);
        oldTr.rotate(oldAttrs.rotation);
        oldTr.scale(oldAttrs.width / baseSize, oldAttrs.height / baseSize);
        const newTr = new Util_1.Transform();
        const newScaleX = newAttrs.width / baseSize;
        const newScaleY = newAttrs.height / baseSize;
        if (this.flipEnabled() === false) {
          newTr.translate(newAttrs.x, newAttrs.y);
          newTr.rotate(newAttrs.rotation);
          newTr.translate(newAttrs.width < 0 ? newAttrs.width : 0, newAttrs.height < 0 ? newAttrs.height : 0);
          newTr.scale(Math.abs(newScaleX), Math.abs(newScaleY));
        } else {
          newTr.translate(newAttrs.x, newAttrs.y);
          newTr.rotate(newAttrs.rotation);
          newTr.scale(newScaleX, newScaleY);
        }
        const delta = newTr.multiply(oldTr.invert());
        this._nodes.forEach((node) => {
          var _a;
          const parentTransform = node.getParent().getAbsoluteTransform();
          const localTransform = node.getTransform().copy();
          localTransform.translate(node.offsetX(), node.offsetY());
          const newLocalTransform = new Util_1.Transform();
          newLocalTransform.multiply(parentTransform.copy().invert()).multiply(delta).multiply(parentTransform).multiply(localTransform);
          const attrs = newLocalTransform.decompose();
          node.setAttrs(attrs);
          (_a = node.getLayer()) === null || _a === void 0 ? void 0 : _a.batchDraw();
        });
        this.rotation(Util_1.Util._getRotation(newAttrs.rotation));
        this._nodes.forEach((node) => {
          this._fire("transform", {
            evt,
            target: node
          });
          node._fire("transform", {
            evt,
            target: node
          });
        });
        this._resetTransformCache();
        this.update();
        this.getLayer().batchDraw();
      }
      forceUpdate() {
        this._resetTransformCache();
        this.update();
      }
      _batchChangeChild(selector, attrs) {
        const anchor = this.findOne(selector);
        anchor.setAttrs(attrs);
      }
      update() {
        var _a;
        const attrs = this._getNodeRect();
        this.rotation(Util_1.Util._getRotation(attrs.rotation));
        const width = attrs.width;
        const height = attrs.height;
        const enabledAnchors = this.enabledAnchors();
        const resizeEnabled = this.resizeEnabled();
        const padding = this.padding();
        const anchorSize = this.anchorSize();
        const anchors = this.find("._anchor");
        anchors.forEach((node) => {
          node.setAttrs({
            width: anchorSize,
            height: anchorSize,
            offsetX: anchorSize / 2,
            offsetY: anchorSize / 2,
            stroke: this.anchorStroke(),
            strokeWidth: this.anchorStrokeWidth(),
            fill: this.anchorFill(),
            cornerRadius: this.anchorCornerRadius()
          });
        });
        this._batchChangeChild(".top-left", {
          x: 0,
          y: 0,
          offsetX: anchorSize / 2 + padding,
          offsetY: anchorSize / 2 + padding,
          visible: resizeEnabled && enabledAnchors.indexOf("top-left") >= 0
        });
        this._batchChangeChild(".top-center", {
          x: width / 2,
          y: 0,
          offsetY: anchorSize / 2 + padding,
          visible: resizeEnabled && enabledAnchors.indexOf("top-center") >= 0
        });
        this._batchChangeChild(".top-right", {
          x: width,
          y: 0,
          offsetX: anchorSize / 2 - padding,
          offsetY: anchorSize / 2 + padding,
          visible: resizeEnabled && enabledAnchors.indexOf("top-right") >= 0
        });
        this._batchChangeChild(".middle-left", {
          x: 0,
          y: height / 2,
          offsetX: anchorSize / 2 + padding,
          visible: resizeEnabled && enabledAnchors.indexOf("middle-left") >= 0
        });
        this._batchChangeChild(".middle-right", {
          x: width,
          y: height / 2,
          offsetX: anchorSize / 2 - padding,
          visible: resizeEnabled && enabledAnchors.indexOf("middle-right") >= 0
        });
        this._batchChangeChild(".bottom-left", {
          x: 0,
          y: height,
          offsetX: anchorSize / 2 + padding,
          offsetY: anchorSize / 2 - padding,
          visible: resizeEnabled && enabledAnchors.indexOf("bottom-left") >= 0
        });
        this._batchChangeChild(".bottom-center", {
          x: width / 2,
          y: height,
          offsetY: anchorSize / 2 - padding,
          visible: resizeEnabled && enabledAnchors.indexOf("bottom-center") >= 0
        });
        this._batchChangeChild(".bottom-right", {
          x: width,
          y: height,
          offsetX: anchorSize / 2 - padding,
          offsetY: anchorSize / 2 - padding,
          visible: resizeEnabled && enabledAnchors.indexOf("bottom-right") >= 0
        });
        this._batchChangeChild(".rotater", {
          x: width / 2,
          y: -this.rotateAnchorOffset() * Util_1.Util._sign(height) - padding,
          visible: this.rotateEnabled()
        });
        this._batchChangeChild(".back", {
          width,
          height,
          visible: this.borderEnabled(),
          stroke: this.borderStroke(),
          strokeWidth: this.borderStrokeWidth(),
          dash: this.borderDash(),
          x: 0,
          y: 0
        });
        const styleFunc = this.anchorStyleFunc();
        if (styleFunc) {
          anchors.forEach((node) => {
            styleFunc(node);
          });
        }
        (_a = this.getLayer()) === null || _a === void 0 ? void 0 : _a.batchDraw();
      }
      isTransforming() {
        return this._transforming;
      }
      stopTransform() {
        if (this._transforming) {
          this._removeEvents();
          const anchorNode = this.findOne("." + this._movingAnchorName);
          if (anchorNode) {
            anchorNode.stopDrag();
          }
        }
      }
      destroy() {
        if (this.getStage() && this._cursorChange) {
          this.getStage().content && (this.getStage().content.style.cursor = "");
        }
        Group_1.Group.prototype.destroy.call(this);
        this.detach();
        this._removeEvents();
        return this;
      }
      toObject() {
        return Node_1.Node.prototype.toObject.call(this);
      }
      clone(obj) {
        const node = Node_1.Node.prototype.clone.call(this, obj);
        return node;
      }
      getClientRect() {
        if (this.nodes().length > 0) {
          return super.getClientRect();
        } else {
          return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
      }
    };
    exports.Transformer = Transformer;
    Transformer.isTransforming = () => {
      return activeTransformersCount > 0;
    };
    function validateAnchors(val) {
      if (!(val instanceof Array)) {
        Util_1.Util.warn("enabledAnchors value should be an array");
      }
      if (val instanceof Array) {
        val.forEach(function(name) {
          if (ANCHORS_NAMES.indexOf(name) === -1) {
            Util_1.Util.warn("Unknown anchor name: " + name + ". Available names are: " + ANCHORS_NAMES.join(", "));
          }
        });
      }
      return val || [];
    }
    Transformer.prototype.className = "Transformer";
    (0, Global_2._registerNode)(Transformer);
    Factory_1.Factory.addGetterSetter(Transformer, "enabledAnchors", ANCHORS_NAMES, validateAnchors);
    Factory_1.Factory.addGetterSetter(Transformer, "flipEnabled", true, (0, Validators_1.getBooleanValidator)());
    Factory_1.Factory.addGetterSetter(Transformer, "resizeEnabled", true);
    Factory_1.Factory.addGetterSetter(Transformer, "anchorSize", 10, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Transformer, "rotateEnabled", true);
    Factory_1.Factory.addGetterSetter(Transformer, "rotateLineVisible", true);
    Factory_1.Factory.addGetterSetter(Transformer, "rotationSnaps", []);
    Factory_1.Factory.addGetterSetter(Transformer, "rotateAnchorOffset", 50, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Transformer, "rotateAnchorCursor", "crosshair");
    Factory_1.Factory.addGetterSetter(Transformer, "rotationSnapTolerance", 5, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Transformer, "borderEnabled", true);
    Factory_1.Factory.addGetterSetter(Transformer, "anchorStroke", "rgb(0, 161, 255)");
    Factory_1.Factory.addGetterSetter(Transformer, "anchorStrokeWidth", 1, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Transformer, "anchorFill", "white");
    Factory_1.Factory.addGetterSetter(Transformer, "anchorCornerRadius", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Transformer, "borderStroke", "rgb(0, 161, 255)");
    Factory_1.Factory.addGetterSetter(Transformer, "borderStrokeWidth", 1, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Transformer, "borderDash");
    Factory_1.Factory.addGetterSetter(Transformer, "keepRatio", true);
    Factory_1.Factory.addGetterSetter(Transformer, "shiftBehavior", "default");
    Factory_1.Factory.addGetterSetter(Transformer, "centeredScaling", false);
    Factory_1.Factory.addGetterSetter(Transformer, "ignoreStroke", false);
    Factory_1.Factory.addGetterSetter(Transformer, "padding", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Transformer, "nodes");
    Factory_1.Factory.addGetterSetter(Transformer, "node");
    Factory_1.Factory.addGetterSetter(Transformer, "boundBoxFunc");
    Factory_1.Factory.addGetterSetter(Transformer, "anchorDragBoundFunc");
    Factory_1.Factory.addGetterSetter(Transformer, "anchorStyleFunc");
    Factory_1.Factory.addGetterSetter(Transformer, "shouldOverdrawWholeArea", false);
    Factory_1.Factory.addGetterSetter(Transformer, "useSingleNodeRotation", true);
    Factory_1.Factory.backCompat(Transformer, {
      lineEnabled: "borderEnabled",
      rotateHandlerOffset: "rotateAnchorOffset",
      enabledHandlers: "enabledAnchors"
    });
  }
});

// node_modules/konva/lib/shapes/Wedge.js
var require_Wedge = __commonJS({
  "node_modules/konva/lib/shapes/Wedge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Wedge = void 0;
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Global_1 = require_Global();
    var Validators_1 = require_Validators();
    var Global_2 = require_Global();
    var Wedge = class extends Shape_1.Shape {
      _sceneFunc(context) {
        context.beginPath();
        context.arc(0, 0, this.radius(), 0, Global_1.Konva.getAngle(this.angle()), this.clockwise());
        context.lineTo(0, 0);
        context.closePath();
        context.fillStrokeShape(this);
      }
      getWidth() {
        return this.radius() * 2;
      }
      getHeight() {
        return this.radius() * 2;
      }
      setWidth(width) {
        this.radius(width / 2);
      }
      setHeight(height) {
        this.radius(height / 2);
      }
    };
    exports.Wedge = Wedge;
    Wedge.prototype.className = "Wedge";
    Wedge.prototype._centroid = true;
    Wedge.prototype._attrsAffectingSize = ["radius"];
    (0, Global_2._registerNode)(Wedge);
    Factory_1.Factory.addGetterSetter(Wedge, "radius", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Wedge, "angle", 0, (0, Validators_1.getNumberValidator)());
    Factory_1.Factory.addGetterSetter(Wedge, "clockwise", false);
    Factory_1.Factory.backCompat(Wedge, {
      angleDeg: "angle",
      getAngleDeg: "getAngle",
      setAngleDeg: "setAngle"
    });
  }
});

// node_modules/konva/lib/filters/Blur.js
var require_Blur = __commonJS({
  "node_modules/konva/lib/filters/Blur.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Blur = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    function BlurStack() {
      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.a = 0;
      this.next = null;
    }
    var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
    var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
    function filterGaussBlurRGBA(imageData, radius) {
      const pixels = imageData.data, width = imageData.width, height = imageData.height;
      let x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
      const div = radius + radius + 1, widthMinus1 = width - 1, heightMinus1 = height - 1, radiusPlus1 = radius + 1, sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2, stackStart = new BlurStack(), mul_sum = mul_table[radius], shg_sum = shg_table[radius];
      let stackEnd = null, stack = stackStart, stackIn = null, stackOut = null;
      for (i = 1; i < div; i++) {
        stack = stack.next = new BlurStack();
        if (i === radiusPlus1) {
          stackEnd = stack;
        }
      }
      stack.next = stackStart;
      yw = yi = 0;
      for (y = 0; y < height; y++) {
        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;
        stack = stackStart;
        for (i = 0; i < radiusPlus1; i++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack.a = pa;
          stack = stack.next;
        }
        for (i = 1; i < radiusPlus1; i++) {
          p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
          r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
          g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
          b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
          a_sum += (stack.a = pa = pixels[p + 3]) * rbs;
          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;
          a_in_sum += pa;
          stack = stack.next;
        }
        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++) {
          pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
          if (pa !== 0) {
            pa = 255 / pa;
            pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
            pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
            pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
          } else {
            pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
          }
          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;
          a_sum -= a_out_sum;
          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;
          a_out_sum -= stackIn.a;
          p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
          r_in_sum += stackIn.r = pixels[p];
          g_in_sum += stackIn.g = pixels[p + 1];
          b_in_sum += stackIn.b = pixels[p + 2];
          a_in_sum += stackIn.a = pixels[p + 3];
          r_sum += r_in_sum;
          g_sum += g_in_sum;
          b_sum += b_in_sum;
          a_sum += a_in_sum;
          stackIn = stackIn.next;
          r_out_sum += pr = stackOut.r;
          g_out_sum += pg = stackOut.g;
          b_out_sum += pb = stackOut.b;
          a_out_sum += pa = stackOut.a;
          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;
          a_in_sum -= pa;
          stackOut = stackOut.next;
          yi += 4;
        }
        yw += width;
      }
      for (x = 0; x < width; x++) {
        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;
        stack = stackStart;
        for (i = 0; i < radiusPlus1; i++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack.a = pa;
          stack = stack.next;
        }
        yp = width;
        for (i = 1; i <= radius; i++) {
          yi = yp + x << 2;
          r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
          g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
          b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
          a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;
          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;
          a_in_sum += pa;
          stack = stack.next;
          if (i < heightMinus1) {
            yp += width;
          }
        }
        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++) {
          p = yi << 2;
          pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
          if (pa > 0) {
            pa = 255 / pa;
            pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
            pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
            pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
          } else {
            pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
          }
          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;
          a_sum -= a_out_sum;
          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;
          a_out_sum -= stackIn.a;
          p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
          r_sum += r_in_sum += stackIn.r = pixels[p];
          g_sum += g_in_sum += stackIn.g = pixels[p + 1];
          b_sum += b_in_sum += stackIn.b = pixels[p + 2];
          a_sum += a_in_sum += stackIn.a = pixels[p + 3];
          stackIn = stackIn.next;
          r_out_sum += pr = stackOut.r;
          g_out_sum += pg = stackOut.g;
          b_out_sum += pb = stackOut.b;
          a_out_sum += pa = stackOut.a;
          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;
          a_in_sum -= pa;
          stackOut = stackOut.next;
          yi += width;
        }
      }
    }
    var Blur = function Blur2(imageData) {
      const radius = Math.round(this.blurRadius());
      if (radius > 0) {
        filterGaussBlurRGBA(imageData, radius);
      }
    };
    exports.Blur = Blur;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "blurRadius", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
  }
});

// node_modules/konva/lib/filters/Brighten.js
var require_Brighten = __commonJS({
  "node_modules/konva/lib/filters/Brighten.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Brighten = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Brighten = function(imageData) {
      const brightness = this.brightness() * 255, data = imageData.data, len = data.length;
      for (let i = 0; i < len; i += 4) {
        data[i] += brightness;
        data[i + 1] += brightness;
        data[i + 2] += brightness;
      }
    };
    exports.Brighten = Brighten;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "brightness", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
  }
});

// node_modules/konva/lib/filters/Contrast.js
var require_Contrast = __commonJS({
  "node_modules/konva/lib/filters/Contrast.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Contrast = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Contrast = function(imageData) {
      const adjust = Math.pow((this.contrast() + 100) / 100, 2);
      const data = imageData.data, nPixels = data.length;
      let red = 150, green = 150, blue = 150;
      for (let i = 0; i < nPixels; i += 4) {
        red = data[i];
        green = data[i + 1];
        blue = data[i + 2];
        red /= 255;
        red -= 0.5;
        red *= adjust;
        red += 0.5;
        red *= 255;
        green /= 255;
        green -= 0.5;
        green *= adjust;
        green += 0.5;
        green *= 255;
        blue /= 255;
        blue -= 0.5;
        blue *= adjust;
        blue += 0.5;
        blue *= 255;
        red = red < 0 ? 0 : red > 255 ? 255 : red;
        green = green < 0 ? 0 : green > 255 ? 255 : green;
        blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;
        data[i] = red;
        data[i + 1] = green;
        data[i + 2] = blue;
      }
    };
    exports.Contrast = Contrast;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "contrast", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
  }
});

// node_modules/konva/lib/filters/Emboss.js
var require_Emboss = __commonJS({
  "node_modules/konva/lib/filters/Emboss.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Emboss = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Util_1 = require_Util();
    var Validators_1 = require_Validators();
    var Emboss = function(imageData) {
      const strength = this.embossStrength() * 10, greyLevel = this.embossWhiteLevel() * 255, direction = this.embossDirection(), blend = this.embossBlend(), data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4;
      let dirY = 0, dirX = 0, y = h;
      switch (direction) {
        case "top-left":
          dirY = -1;
          dirX = -1;
          break;
        case "top":
          dirY = -1;
          dirX = 0;
          break;
        case "top-right":
          dirY = -1;
          dirX = 1;
          break;
        case "right":
          dirY = 0;
          dirX = 1;
          break;
        case "bottom-right":
          dirY = 1;
          dirX = 1;
          break;
        case "bottom":
          dirY = 1;
          dirX = 0;
          break;
        case "bottom-left":
          dirY = 1;
          dirX = -1;
          break;
        case "left":
          dirY = 0;
          dirX = -1;
          break;
        default:
          Util_1.Util.error("Unknown emboss direction: " + direction);
      }
      do {
        const offsetY = (y - 1) * w4;
        let otherY = dirY;
        if (y + otherY < 1) {
          otherY = 0;
        }
        if (y + otherY > h) {
          otherY = 0;
        }
        const offsetYOther = (y - 1 + otherY) * w * 4;
        let x = w;
        do {
          const offset = offsetY + (x - 1) * 4;
          let otherX = dirX;
          if (x + otherX < 1) {
            otherX = 0;
          }
          if (x + otherX > w) {
            otherX = 0;
          }
          const offsetOther = offsetYOther + (x - 1 + otherX) * 4;
          const dR = data[offset] - data[offsetOther];
          const dG = data[offset + 1] - data[offsetOther + 1];
          const dB = data[offset + 2] - data[offsetOther + 2];
          let dif = dR;
          const absDif = dif > 0 ? dif : -dif;
          const absG = dG > 0 ? dG : -dG;
          const absB = dB > 0 ? dB : -dB;
          if (absG > absDif) {
            dif = dG;
          }
          if (absB > absDif) {
            dif = dB;
          }
          dif *= strength;
          if (blend) {
            const r = data[offset] + dif;
            const g = data[offset + 1] + dif;
            const b = data[offset + 2] + dif;
            data[offset] = r > 255 ? 255 : r < 0 ? 0 : r;
            data[offset + 1] = g > 255 ? 255 : g < 0 ? 0 : g;
            data[offset + 2] = b > 255 ? 255 : b < 0 ? 0 : b;
          } else {
            let grey = greyLevel - dif;
            if (grey < 0) {
              grey = 0;
            } else if (grey > 255) {
              grey = 255;
            }
            data[offset] = data[offset + 1] = data[offset + 2] = grey;
          }
        } while (--x);
      } while (--y);
    };
    exports.Emboss = Emboss;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "embossStrength", 0.5, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "embossWhiteLevel", 0.5, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "embossDirection", "top-left", void 0, Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "embossBlend", false, void 0, Factory_1.Factory.afterSetFilter);
  }
});

// node_modules/konva/lib/filters/Enhance.js
var require_Enhance = __commonJS({
  "node_modules/konva/lib/filters/Enhance.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Enhance = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    function remap(fromValue, fromMin, fromMax, toMin, toMax) {
      const fromRange = fromMax - fromMin, toRange = toMax - toMin;
      if (fromRange === 0) {
        return toMin + toRange / 2;
      }
      if (toRange === 0) {
        return toMin;
      }
      let toValue = (fromValue - fromMin) / fromRange;
      toValue = toRange * toValue + toMin;
      return toValue;
    }
    var Enhance = function(imageData) {
      const data = imageData.data, nSubPixels = data.length;
      let rMin = data[0], rMax = rMin, r, gMin = data[1], gMax = gMin, g, bMin = data[2], bMax = bMin, b;
      const enhanceAmount = this.enhance();
      if (enhanceAmount === 0) {
        return;
      }
      for (let i = 0; i < nSubPixels; i += 4) {
        r = data[i + 0];
        if (r < rMin) {
          rMin = r;
        } else if (r > rMax) {
          rMax = r;
        }
        g = data[i + 1];
        if (g < gMin) {
          gMin = g;
        } else if (g > gMax) {
          gMax = g;
        }
        b = data[i + 2];
        if (b < bMin) {
          bMin = b;
        } else if (b > bMax) {
          bMax = b;
        }
      }
      if (rMax === rMin) {
        rMax = 255;
        rMin = 0;
      }
      if (gMax === gMin) {
        gMax = 255;
        gMin = 0;
      }
      if (bMax === bMin) {
        bMax = 255;
        bMin = 0;
      }
      let rMid, rGoalMax, rGoalMin, gMid, gGoalMax, gGoalMin, bMid, bGoalMax, bGoalMin;
      if (enhanceAmount > 0) {
        rGoalMax = rMax + enhanceAmount * (255 - rMax);
        rGoalMin = rMin - enhanceAmount * (rMin - 0);
        gGoalMax = gMax + enhanceAmount * (255 - gMax);
        gGoalMin = gMin - enhanceAmount * (gMin - 0);
        bGoalMax = bMax + enhanceAmount * (255 - bMax);
        bGoalMin = bMin - enhanceAmount * (bMin - 0);
      } else {
        rMid = (rMax + rMin) * 0.5;
        rGoalMax = rMax + enhanceAmount * (rMax - rMid);
        rGoalMin = rMin + enhanceAmount * (rMin - rMid);
        gMid = (gMax + gMin) * 0.5;
        gGoalMax = gMax + enhanceAmount * (gMax - gMid);
        gGoalMin = gMin + enhanceAmount * (gMin - gMid);
        bMid = (bMax + bMin) * 0.5;
        bGoalMax = bMax + enhanceAmount * (bMax - bMid);
        bGoalMin = bMin + enhanceAmount * (bMin - bMid);
      }
      for (let i = 0; i < nSubPixels; i += 4) {
        data[i + 0] = remap(data[i + 0], rMin, rMax, rGoalMin, rGoalMax);
        data[i + 1] = remap(data[i + 1], gMin, gMax, gGoalMin, gGoalMax);
        data[i + 2] = remap(data[i + 2], bMin, bMax, bGoalMin, bGoalMax);
      }
    };
    exports.Enhance = Enhance;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "enhance", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
  }
});

// node_modules/konva/lib/filters/Grayscale.js
var require_Grayscale = __commonJS({
  "node_modules/konva/lib/filters/Grayscale.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Grayscale = void 0;
    var Grayscale = function(imageData) {
      const data = imageData.data, len = data.length;
      for (let i = 0; i < len; i += 4) {
        const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
        data[i] = brightness;
        data[i + 1] = brightness;
        data[i + 2] = brightness;
      }
    };
    exports.Grayscale = Grayscale;
  }
});

// node_modules/konva/lib/filters/HSL.js
var require_HSL = __commonJS({
  "node_modules/konva/lib/filters/HSL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.HSL = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    Factory_1.Factory.addGetterSetter(Node_1.Node, "hue", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "saturation", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "luminance", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
    var HSL = function(imageData) {
      const data = imageData.data, nPixels = data.length, v = 1, s = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360, l = this.luminance() * 127;
      const vsu = v * s * Math.cos(h * Math.PI / 180), vsw = v * s * Math.sin(h * Math.PI / 180);
      const rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw, rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
      const gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
      const br = 0.299 * v - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw, bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;
      let r, g, b, a;
      for (let i = 0; i < nPixels; i += 4) {
        r = data[i + 0];
        g = data[i + 1];
        b = data[i + 2];
        a = data[i + 3];
        data[i + 0] = rr * r + rg * g + rb * b + l;
        data[i + 1] = gr * r + gg * g + gb * b + l;
        data[i + 2] = br * r + bg * g + bb * b + l;
        data[i + 3] = a;
      }
    };
    exports.HSL = HSL;
  }
});

// node_modules/konva/lib/filters/HSV.js
var require_HSV = __commonJS({
  "node_modules/konva/lib/filters/HSV.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.HSV = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var HSV = function(imageData) {
      const data = imageData.data, nPixels = data.length, v = Math.pow(2, this.value()), s = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360;
      const vsu = v * s * Math.cos(h * Math.PI / 180), vsw = v * s * Math.sin(h * Math.PI / 180);
      const rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw, rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
      const gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
      const br = 0.299 * v - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw, bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;
      let r, g, b, a;
      for (let i = 0; i < nPixels; i += 4) {
        r = data[i + 0];
        g = data[i + 1];
        b = data[i + 2];
        a = data[i + 3];
        data[i + 0] = rr * r + rg * g + rb * b;
        data[i + 1] = gr * r + gg * g + gb * b;
        data[i + 2] = br * r + bg * g + bb * b;
        data[i + 3] = a;
      }
    };
    exports.HSV = HSV;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "hue", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "saturation", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "value", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
  }
});

// node_modules/konva/lib/filters/Invert.js
var require_Invert = __commonJS({
  "node_modules/konva/lib/filters/Invert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Invert = void 0;
    var Invert = function(imageData) {
      const data = imageData.data, len = data.length;
      for (let i = 0; i < len; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
    };
    exports.Invert = Invert;
  }
});

// node_modules/konva/lib/filters/Kaleidoscope.js
var require_Kaleidoscope = __commonJS({
  "node_modules/konva/lib/filters/Kaleidoscope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Kaleidoscope = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Util_1 = require_Util();
    var Validators_1 = require_Validators();
    var ToPolar = function(src, dst, opt) {
      const srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2;
      let rMax = Math.sqrt(xMid * xMid + yMid * yMid);
      let x = xSize - xMid;
      let y = ySize - yMid;
      const rad = Math.sqrt(x * x + y * y);
      rMax = rad > rMax ? rad : rMax;
      const rSize = ySize, tSize = xSize;
      const conversion = 360 / tSize * Math.PI / 180;
      for (let theta = 0; theta < tSize; theta += 1) {
        const sin = Math.sin(theta * conversion);
        const cos = Math.cos(theta * conversion);
        for (let radius = 0; radius < rSize; radius += 1) {
          x = Math.floor(xMid + rMax * radius / rSize * cos);
          y = Math.floor(yMid + rMax * radius / rSize * sin);
          let i = (y * xSize + x) * 4;
          const r = srcPixels[i + 0];
          const g = srcPixels[i + 1];
          const b = srcPixels[i + 2];
          const a = srcPixels[i + 3];
          i = (theta + radius * xSize) * 4;
          dstPixels[i + 0] = r;
          dstPixels[i + 1] = g;
          dstPixels[i + 2] = b;
          dstPixels[i + 3] = a;
        }
      }
    };
    var FromPolar = function(src, dst, opt) {
      const srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2;
      let rMax = Math.sqrt(xMid * xMid + yMid * yMid);
      let x = xSize - xMid;
      let y = ySize - yMid;
      const rad = Math.sqrt(x * x + y * y);
      rMax = rad > rMax ? rad : rMax;
      const rSize = ySize, tSize = xSize, phaseShift = opt.polarRotation || 0;
      let x1, y1;
      for (x = 0; x < xSize; x += 1) {
        for (y = 0; y < ySize; y += 1) {
          const dx = x - xMid;
          const dy = y - yMid;
          const radius = Math.sqrt(dx * dx + dy * dy) * rSize / rMax;
          let theta = (Math.atan2(dy, dx) * 180 / Math.PI + 360 + phaseShift) % 360;
          theta = theta * tSize / 360;
          x1 = Math.floor(theta);
          y1 = Math.floor(radius);
          let i = (y1 * xSize + x1) * 4;
          const r = srcPixels[i + 0];
          const g = srcPixels[i + 1];
          const b = srcPixels[i + 2];
          const a = srcPixels[i + 3];
          i = (y * xSize + x) * 4;
          dstPixels[i + 0] = r;
          dstPixels[i + 1] = g;
          dstPixels[i + 2] = b;
          dstPixels[i + 3] = a;
        }
      }
    };
    var Kaleidoscope = function(imageData) {
      const xSize = imageData.width, ySize = imageData.height;
      let x, y, xoff, i, r, g, b, a, srcPos, dstPos;
      let power = Math.round(this.kaleidoscopePower());
      const angle = Math.round(this.kaleidoscopeAngle());
      const offset = Math.floor(xSize * (angle % 360) / 360);
      if (power < 1) {
        return;
      }
      const tempCanvas = Util_1.Util.createCanvasElement();
      tempCanvas.width = xSize;
      tempCanvas.height = ySize;
      const scratchData = tempCanvas.getContext("2d").getImageData(0, 0, xSize, ySize);
      Util_1.Util.releaseCanvas(tempCanvas);
      ToPolar(imageData, scratchData, {
        polarCenterX: xSize / 2,
        polarCenterY: ySize / 2
      });
      let minSectionSize = xSize / Math.pow(2, power);
      while (minSectionSize <= 8) {
        minSectionSize = minSectionSize * 2;
        power -= 1;
      }
      minSectionSize = Math.ceil(minSectionSize);
      let sectionSize = minSectionSize;
      let xStart = 0, xEnd = sectionSize, xDelta = 1;
      if (offset + minSectionSize > xSize) {
        xStart = sectionSize;
        xEnd = 0;
        xDelta = -1;
      }
      for (y = 0; y < ySize; y += 1) {
        for (x = xStart; x !== xEnd; x += xDelta) {
          xoff = Math.round(x + offset) % xSize;
          srcPos = (xSize * y + xoff) * 4;
          r = scratchData.data[srcPos + 0];
          g = scratchData.data[srcPos + 1];
          b = scratchData.data[srcPos + 2];
          a = scratchData.data[srcPos + 3];
          dstPos = (xSize * y + x) * 4;
          scratchData.data[dstPos + 0] = r;
          scratchData.data[dstPos + 1] = g;
          scratchData.data[dstPos + 2] = b;
          scratchData.data[dstPos + 3] = a;
        }
      }
      for (y = 0; y < ySize; y += 1) {
        sectionSize = Math.floor(minSectionSize);
        for (i = 0; i < power; i += 1) {
          for (x = 0; x < sectionSize + 1; x += 1) {
            srcPos = (xSize * y + x) * 4;
            r = scratchData.data[srcPos + 0];
            g = scratchData.data[srcPos + 1];
            b = scratchData.data[srcPos + 2];
            a = scratchData.data[srcPos + 3];
            dstPos = (xSize * y + sectionSize * 2 - x - 1) * 4;
            scratchData.data[dstPos + 0] = r;
            scratchData.data[dstPos + 1] = g;
            scratchData.data[dstPos + 2] = b;
            scratchData.data[dstPos + 3] = a;
          }
          sectionSize *= 2;
        }
      }
      FromPolar(scratchData, imageData, {
        polarRotation: 0
      });
    };
    exports.Kaleidoscope = Kaleidoscope;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "kaleidoscopePower", 2, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "kaleidoscopeAngle", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
  }
});

// node_modules/konva/lib/filters/Mask.js
var require_Mask = __commonJS({
  "node_modules/konva/lib/filters/Mask.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Mask = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    function pixelAt(idata, x, y) {
      let idx = (y * idata.width + x) * 4;
      const d = [];
      d.push(idata.data[idx++], idata.data[idx++], idata.data[idx++], idata.data[idx++]);
      return d;
    }
    function rgbDistance(p1, p2) {
      return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2) + Math.pow(p1[2] - p2[2], 2));
    }
    function rgbMean(pTab) {
      const m = [0, 0, 0];
      for (let i = 0; i < pTab.length; i++) {
        m[0] += pTab[i][0];
        m[1] += pTab[i][1];
        m[2] += pTab[i][2];
      }
      m[0] /= pTab.length;
      m[1] /= pTab.length;
      m[2] /= pTab.length;
      return m;
    }
    function backgroundMask(idata, threshold) {
      const rgbv_no = pixelAt(idata, 0, 0);
      const rgbv_ne = pixelAt(idata, idata.width - 1, 0);
      const rgbv_so = pixelAt(idata, 0, idata.height - 1);
      const rgbv_se = pixelAt(idata, idata.width - 1, idata.height - 1);
      const thres = threshold || 10;
      if (rgbDistance(rgbv_no, rgbv_ne) < thres && rgbDistance(rgbv_ne, rgbv_se) < thres && rgbDistance(rgbv_se, rgbv_so) < thres && rgbDistance(rgbv_so, rgbv_no) < thres) {
        const mean = rgbMean([rgbv_ne, rgbv_no, rgbv_se, rgbv_so]);
        const mask = [];
        for (let i = 0; i < idata.width * idata.height; i++) {
          const d = rgbDistance(mean, [idata.data[i * 4], idata.data[i * 4 + 1], idata.data[i * 4 + 2]]);
          mask[i] = d < thres ? 0 : 255;
        }
        return mask;
      }
    }
    function applyMask(idata, mask) {
      for (let i = 0; i < idata.width * idata.height; i++) {
        idata.data[4 * i + 3] = mask[i];
      }
    }
    function erodeMask(mask, sw, sh) {
      const weights = [1, 1, 1, 1, 0, 1, 1, 1, 1];
      const side = Math.round(Math.sqrt(weights.length));
      const halfSide = Math.floor(side / 2);
      const maskResult = [];
      for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
          const so = y * sw + x;
          let a = 0;
          for (let cy = 0; cy < side; cy++) {
            for (let cx = 0; cx < side; cx++) {
              const scy = y + cy - halfSide;
              const scx = x + cx - halfSide;
              if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                const srcOff = scy * sw + scx;
                const wt = weights[cy * side + cx];
                a += mask[srcOff] * wt;
              }
            }
          }
          maskResult[so] = a === 255 * 8 ? 255 : 0;
        }
      }
      return maskResult;
    }
    function dilateMask(mask, sw, sh) {
      const weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];
      const side = Math.round(Math.sqrt(weights.length));
      const halfSide = Math.floor(side / 2);
      const maskResult = [];
      for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
          const so = y * sw + x;
          let a = 0;
          for (let cy = 0; cy < side; cy++) {
            for (let cx = 0; cx < side; cx++) {
              const scy = y + cy - halfSide;
              const scx = x + cx - halfSide;
              if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                const srcOff = scy * sw + scx;
                const wt = weights[cy * side + cx];
                a += mask[srcOff] * wt;
              }
            }
          }
          maskResult[so] = a >= 255 * 4 ? 255 : 0;
        }
      }
      return maskResult;
    }
    function smoothEdgeMask(mask, sw, sh) {
      const weights = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
      const side = Math.round(Math.sqrt(weights.length));
      const halfSide = Math.floor(side / 2);
      const maskResult = [];
      for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
          const so = y * sw + x;
          let a = 0;
          for (let cy = 0; cy < side; cy++) {
            for (let cx = 0; cx < side; cx++) {
              const scy = y + cy - halfSide;
              const scx = x + cx - halfSide;
              if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                const srcOff = scy * sw + scx;
                const wt = weights[cy * side + cx];
                a += mask[srcOff] * wt;
              }
            }
          }
          maskResult[so] = a;
        }
      }
      return maskResult;
    }
    var Mask = function(imageData) {
      const threshold = this.threshold();
      let mask = backgroundMask(imageData, threshold);
      if (mask) {
        mask = erodeMask(mask, imageData.width, imageData.height);
        mask = dilateMask(mask, imageData.width, imageData.height);
        mask = smoothEdgeMask(mask, imageData.width, imageData.height);
        applyMask(imageData, mask);
      }
      return imageData;
    };
    exports.Mask = Mask;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "threshold", 0, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
  }
});

// node_modules/konva/lib/filters/Noise.js
var require_Noise = __commonJS({
  "node_modules/konva/lib/filters/Noise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Noise = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Noise = function(imageData) {
      const amount = this.noise() * 255, data = imageData.data, nPixels = data.length, half = amount / 2;
      for (let i = 0; i < nPixels; i += 4) {
        data[i + 0] += half - 2 * half * Math.random();
        data[i + 1] += half - 2 * half * Math.random();
        data[i + 2] += half - 2 * half * Math.random();
      }
    };
    exports.Noise = Noise;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "noise", 0.2, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
  }
});

// node_modules/konva/lib/filters/Pixelate.js
var require_Pixelate = __commonJS({
  "node_modules/konva/lib/filters/Pixelate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Pixelate = void 0;
    var Factory_1 = require_Factory();
    var Util_1 = require_Util();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Pixelate = function(imageData) {
      let pixelSize = Math.ceil(this.pixelSize()), width = imageData.width, height = imageData.height, x, y, i, red, green, blue, alpha, nBinsX = Math.ceil(width / pixelSize), nBinsY = Math.ceil(height / pixelSize), xBinStart, xBinEnd, yBinStart, yBinEnd, xBin, yBin, pixelsInBin, data = imageData.data;
      if (pixelSize <= 0) {
        Util_1.Util.error("pixelSize value can not be <= 0");
        return;
      }
      for (xBin = 0; xBin < nBinsX; xBin += 1) {
        for (yBin = 0; yBin < nBinsY; yBin += 1) {
          red = 0;
          green = 0;
          blue = 0;
          alpha = 0;
          xBinStart = xBin * pixelSize;
          xBinEnd = xBinStart + pixelSize;
          yBinStart = yBin * pixelSize;
          yBinEnd = yBinStart + pixelSize;
          pixelsInBin = 0;
          for (x = xBinStart; x < xBinEnd; x += 1) {
            if (x >= width) {
              continue;
            }
            for (y = yBinStart; y < yBinEnd; y += 1) {
              if (y >= height) {
                continue;
              }
              i = (width * y + x) * 4;
              red += data[i + 0];
              green += data[i + 1];
              blue += data[i + 2];
              alpha += data[i + 3];
              pixelsInBin += 1;
            }
          }
          red = red / pixelsInBin;
          green = green / pixelsInBin;
          blue = blue / pixelsInBin;
          alpha = alpha / pixelsInBin;
          for (x = xBinStart; x < xBinEnd; x += 1) {
            if (x >= width) {
              continue;
            }
            for (y = yBinStart; y < yBinEnd; y += 1) {
              if (y >= height) {
                continue;
              }
              i = (width * y + x) * 4;
              data[i + 0] = red;
              data[i + 1] = green;
              data[i + 2] = blue;
              data[i + 3] = alpha;
            }
          }
        }
      }
    };
    exports.Pixelate = Pixelate;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "pixelSize", 8, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
  }
});

// node_modules/konva/lib/filters/Posterize.js
var require_Posterize = __commonJS({
  "node_modules/konva/lib/filters/Posterize.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Posterize = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Posterize = function(imageData) {
      const levels = Math.round(this.levels() * 254) + 1, data = imageData.data, len = data.length, scale = 255 / levels;
      for (let i = 0; i < len; i += 1) {
        data[i] = Math.floor(data[i] / scale) * scale;
      }
    };
    exports.Posterize = Posterize;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "levels", 0.5, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
  }
});

// node_modules/konva/lib/filters/RGB.js
var require_RGB = __commonJS({
  "node_modules/konva/lib/filters/RGB.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RGB = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var RGB = function(imageData) {
      const data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue();
      for (let i = 0; i < nPixels; i += 4) {
        const brightness = (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) / 255;
        data[i] = brightness * red;
        data[i + 1] = brightness * green;
        data[i + 2] = brightness * blue;
        data[i + 3] = data[i + 3];
      }
    };
    exports.RGB = RGB;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "red", 0, function(val) {
      this._filterUpToDate = false;
      if (val > 255) {
        return 255;
      } else if (val < 0) {
        return 0;
      } else {
        return Math.round(val);
      }
    });
    Factory_1.Factory.addGetterSetter(Node_1.Node, "green", 0, function(val) {
      this._filterUpToDate = false;
      if (val > 255) {
        return 255;
      } else if (val < 0) {
        return 0;
      } else {
        return Math.round(val);
      }
    });
    Factory_1.Factory.addGetterSetter(Node_1.Node, "blue", 0, Validators_1.RGBComponent, Factory_1.Factory.afterSetFilter);
  }
});

// node_modules/konva/lib/filters/RGBA.js
var require_RGBA = __commonJS({
  "node_modules/konva/lib/filters/RGBA.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RGBA = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var RGBA = function(imageData) {
      const data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue(), alpha = this.alpha();
      for (let i = 0; i < nPixels; i += 4) {
        const ia = 1 - alpha;
        data[i] = red * alpha + data[i] * ia;
        data[i + 1] = green * alpha + data[i + 1] * ia;
        data[i + 2] = blue * alpha + data[i + 2] * ia;
      }
    };
    exports.RGBA = RGBA;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "red", 0, function(val) {
      this._filterUpToDate = false;
      if (val > 255) {
        return 255;
      } else if (val < 0) {
        return 0;
      } else {
        return Math.round(val);
      }
    });
    Factory_1.Factory.addGetterSetter(Node_1.Node, "green", 0, function(val) {
      this._filterUpToDate = false;
      if (val > 255) {
        return 255;
      } else if (val < 0) {
        return 0;
      } else {
        return Math.round(val);
      }
    });
    Factory_1.Factory.addGetterSetter(Node_1.Node, "blue", 0, Validators_1.RGBComponent, Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "alpha", 1, function(val) {
      this._filterUpToDate = false;
      if (val > 1) {
        return 1;
      } else if (val < 0) {
        return 0;
      } else {
        return val;
      }
    });
  }
});

// node_modules/konva/lib/filters/Sepia.js
var require_Sepia = __commonJS({
  "node_modules/konva/lib/filters/Sepia.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Sepia = void 0;
    var Sepia = function(imageData) {
      const data = imageData.data, nPixels = data.length;
      for (let i = 0; i < nPixels; i += 4) {
        const r = data[i + 0];
        const g = data[i + 1];
        const b = data[i + 2];
        data[i + 0] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
      }
    };
    exports.Sepia = Sepia;
  }
});

// node_modules/konva/lib/filters/Solarize.js
var require_Solarize = __commonJS({
  "node_modules/konva/lib/filters/Solarize.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Solarize = void 0;
    var Solarize = function(imageData) {
      const data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4;
      let y = h;
      do {
        const offsetY = (y - 1) * w4;
        let x = w;
        do {
          const offset = offsetY + (x - 1) * 4;
          let r = data[offset];
          let g = data[offset + 1];
          let b = data[offset + 2];
          if (r > 127) {
            r = 255 - r;
          }
          if (g > 127) {
            g = 255 - g;
          }
          if (b > 127) {
            b = 255 - b;
          }
          data[offset] = r;
          data[offset + 1] = g;
          data[offset + 2] = b;
        } while (--x);
      } while (--y);
    };
    exports.Solarize = Solarize;
  }
});

// node_modules/konva/lib/filters/Threshold.js
var require_Threshold = __commonJS({
  "node_modules/konva/lib/filters/Threshold.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Threshold = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Threshold = function(imageData) {
      const level = this.threshold() * 255, data = imageData.data, len = data.length;
      for (let i = 0; i < len; i += 1) {
        data[i] = data[i] < level ? 0 : 255;
      }
    };
    exports.Threshold = Threshold;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "threshold", 0.5, (0, Validators_1.getNumberValidator)(), Factory_1.Factory.afterSetFilter);
  }
});

// node_modules/konva/lib/_FullInternals.js
var require_FullInternals = __commonJS({
  "node_modules/konva/lib/_FullInternals.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Konva = void 0;
    var _CoreInternals_1 = require_CoreInternals();
    var Arc_1 = require_Arc();
    var Arrow_1 = require_Arrow();
    var Circle_1 = require_Circle();
    var Ellipse_1 = require_Ellipse();
    var Image_1 = require_Image();
    var Label_1 = require_Label();
    var Line_1 = require_Line();
    var Path_1 = require_Path();
    var Rect_1 = require_Rect();
    var RegularPolygon_1 = require_RegularPolygon();
    var Ring_1 = require_Ring();
    var Sprite_1 = require_Sprite();
    var Star_1 = require_Star();
    var Text_1 = require_Text();
    var TextPath_1 = require_TextPath();
    var Transformer_1 = require_Transformer();
    var Wedge_1 = require_Wedge();
    var Blur_1 = require_Blur();
    var Brighten_1 = require_Brighten();
    var Contrast_1 = require_Contrast();
    var Emboss_1 = require_Emboss();
    var Enhance_1 = require_Enhance();
    var Grayscale_1 = require_Grayscale();
    var HSL_1 = require_HSL();
    var HSV_1 = require_HSV();
    var Invert_1 = require_Invert();
    var Kaleidoscope_1 = require_Kaleidoscope();
    var Mask_1 = require_Mask();
    var Noise_1 = require_Noise();
    var Pixelate_1 = require_Pixelate();
    var Posterize_1 = require_Posterize();
    var RGB_1 = require_RGB();
    var RGBA_1 = require_RGBA();
    var Sepia_1 = require_Sepia();
    var Solarize_1 = require_Solarize();
    var Threshold_1 = require_Threshold();
    exports.Konva = _CoreInternals_1.Konva.Util._assign(_CoreInternals_1.Konva, {
      Arc: Arc_1.Arc,
      Arrow: Arrow_1.Arrow,
      Circle: Circle_1.Circle,
      Ellipse: Ellipse_1.Ellipse,
      Image: Image_1.Image,
      Label: Label_1.Label,
      Tag: Label_1.Tag,
      Line: Line_1.Line,
      Path: Path_1.Path,
      Rect: Rect_1.Rect,
      RegularPolygon: RegularPolygon_1.RegularPolygon,
      Ring: Ring_1.Ring,
      Sprite: Sprite_1.Sprite,
      Star: Star_1.Star,
      Text: Text_1.Text,
      TextPath: TextPath_1.TextPath,
      Transformer: Transformer_1.Transformer,
      Wedge: Wedge_1.Wedge,
      Filters: {
        Blur: Blur_1.Blur,
        Brighten: Brighten_1.Brighten,
        Contrast: Contrast_1.Contrast,
        Emboss: Emboss_1.Emboss,
        Enhance: Enhance_1.Enhance,
        Grayscale: Grayscale_1.Grayscale,
        HSL: HSL_1.HSL,
        HSV: HSV_1.HSV,
        Invert: Invert_1.Invert,
        Kaleidoscope: Kaleidoscope_1.Kaleidoscope,
        Mask: Mask_1.Mask,
        Noise: Noise_1.Noise,
        Pixelate: Pixelate_1.Pixelate,
        Posterize: Posterize_1.Posterize,
        RGB: RGB_1.RGB,
        RGBA: RGBA_1.RGBA,
        Sepia: Sepia_1.Sepia,
        Solarize: Solarize_1.Solarize,
        Threshold: Threshold_1.Threshold
      }
    });
  }
});

// node_modules/konva/lib/index.js
var require_lib = __commonJS({
  "node_modules/konva/lib/index.js"(exports, module) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _FullInternals_1 = require_FullInternals();
    module.exports = _FullInternals_1.Konva;
  }
});
export default require_lib();
//# sourceMappingURL=konva.js.map
