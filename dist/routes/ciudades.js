"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _ciudades = require("../controllers/ciudades");

var _utils = require("./utils");

var _validador = require("../middlewares/validador");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // Aca no usaria validateToken, las ciudades estaria bueno sacarlas de una api....


router.get('/', (0, _utils.withErrorHandling)(_ciudades.getConFiltros));
var _default = router;
exports.default = _default;
//# sourceMappingURL=ciudades.js.map