/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/filestore.js":
/*!*********************************!*\
  !*** ./src/server/filestore.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const fs = __webpack_require__(/*! fs */ \"fs\");\nlet chirps = { nextid: 0 };\n\nif (fs.existsSync(\"chirps.json\")) {\n  chirps = JSON.parse(fs.readFileSync(\"chirps.json\"));\n}\n\nlet getChirps = () => {\n  return Object.assign({}, chirps); //create a copy and return it\n};\n\nlet getChirp = id => {\n  return Object.assign({}, chirps[id]); //create a copy and return it\n};\n\nlet createChirp = chirp => {\n  chirps[chirps.nextid++] = chirp;\n  writeChirps();\n};\n\nlet updateChirp = (id, chirp) => {\n  chirps[id] = chirp;\n  writeChirps();\n};\n\nlet deleteChirp = id => {\n  delete chirps[id];\n  writeChirps();\n};\n\nlet writeChirps = () => {\n  fs.writeFileSync(\"chirps.json\", JSON.stringify(chirps, null, 2));\n};\n\nmodule.exports = {\n  CreateChirp: createChirp,\n  DeleteChirp: deleteChirp,\n  GetChirps: getChirps,\n  GetChirp: getChirp,\n  UpdateChirp: updateChirp\n};\n\n\n//# sourceURL=webpack:///./src/server/filestore.js?");

/***/ }),

/***/ "./src/server/routes/api/chirps.ts":
/*!*****************************************!*\
  !*** ./src/server/routes/api/chirps.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\nvar Chirps = __webpack_require__(/*! ../../filestore */ \"./src/server/filestore.js\");\r\nvar router = express.Router();\r\nrouter.get(\"/:id?\", function (req, res, next) {\r\n    var id = req.params.id;\r\n    if (id) {\r\n        res.send(Chirps.GetChirp(id));\r\n    }\r\n    else {\r\n        res.send(Chirps.GetChirps());\r\n    }\r\n});\r\nrouter.post(\"/\", function (req, res, next) {\r\n    var chirp = req.body;\r\n    Chirps.CreateChirp(chirp);\r\n    res.sendStatus(200);\r\n});\r\nrouter.put(\"/:id\", function (req, res, next) {\r\n    var id = req.params.id;\r\n    var chirp = req.body;\r\n    Chirps.UpdateChirp(id, chirp);\r\n    res.sendStatus(200);\r\n});\r\nrouter.delete(\"/:id\", function (req, res, next) {\r\n    var id = req.params.id;\r\n    Chirps.DeleteChirp(id);\r\n    res.sendStatus(200);\r\n});\r\nexports.default = router;\r\n\n\n//# sourceURL=webpack:///./src/server/routes/api/chirps.ts?");

/***/ }),

/***/ "./src/server/routes/api/index.ts":
/*!****************************************!*\
  !*** ./src/server/routes/api/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\nvar chirps_1 = __webpack_require__(/*! ./chirps */ \"./src/server/routes/api/chirps.ts\");\r\nvar router = express.Router();\r\nrouter.use(\"/chirps\", chirps_1.default);\r\nexports.default = router;\r\n\n\n//# sourceURL=webpack:///./src/server/routes/api/index.ts?");

/***/ }),

/***/ "./src/server/routes/index.ts":
/*!************************************!*\
  !*** ./src/server/routes/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\nvar api_1 = __webpack_require__(/*! ./api */ \"./src/server/routes/api/index.ts\");\r\nvar router = express.Router();\r\nrouter.use(\"/api\", api_1.default);\r\nexports.default = router;\r\n\n\n//# sourceURL=webpack:///./src/server/routes/index.ts?");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar path = __webpack_require__(/*! path */ \"path\");\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\nvar routes_1 = __webpack_require__(/*! ./routes */ \"./src/server/routes/index.ts\");\r\nvar app = express();\r\nvar p = path.join(__dirname, \"../public\");\r\nconsole.log(p);\r\napp.use(express.static(p));\r\napp.use(express.json());\r\napp.use(routes_1.default);\r\nvar port = process.env.PORT || 3000;\r\napp.listen(port, function () {\r\n    console.log(\"Server listening on port: \" + port);\r\n});\r\n\n\n//# sourceURL=webpack:///./src/server/server.ts?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });