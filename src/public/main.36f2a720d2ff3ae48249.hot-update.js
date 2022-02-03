"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateproyectosistemainv"]("main",{

/***/ 9961:
/*!***********************************************!*\
  !*** ./src/app/Inventory/TableDataButtons.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 5861);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 3324);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ 7757);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ 7294);\n/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Notification */ 8754);\n/* harmony import */ var _InventoryProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InventoryProvider */ 9450);\n/* harmony import */ var _InventoryReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./InventoryReducer */ 8071);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ 5697);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _AppProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../AppProvider */ 98);\n/* harmony import */ var _helpers_flattenData__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../helpers/flattenData */ 5533);\n/* harmony import */ var _ItemVisualizerModal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ItemVisualizerModal */ 6354);\n/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ 5108);\n\n\n\n\n\n\n\n\n\n\n\n\nvar TableDataButtons = function TableDataButtons(_ref) {\n  var row = _ref.row,\n      reloadData = _ref.reloadData,\n      editRow = _ref.editRow;\n  var dispatch = (0,_InventoryProvider__WEBPACK_IMPORTED_MODULE_5__.useDispatch)();\n  var appState = (0,_AppProvider__WEBPACK_IMPORTED_MODULE_8__.useAppState)();\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false),\n      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_useState, 2),\n      isLooking = _useState2[0],\n      setIsLooking = _useState2[1];\n\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null),\n      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_useState3, 2),\n      modalData = _useState4[0],\n      setModalData = _useState4[1];\n\n  var accessInventarios = appState.userData.accessInventarios;\n\n  var handleRemove = /*#__PURE__*/function () {\n    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(sn) {\n      var result;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.next = 2;\n              return fetch(\"/inventario/\".concat(sn), {\n                method: \"DELETE\"\n              }).then(function (data) {\n                return data.json();\n              })[\"catch\"](function (e) {\n                return console.log(e);\n              });\n\n            case 2:\n              result = _context.sent;\n              dispatch({\n                type: _InventoryReducer__WEBPACK_IMPORTED_MODULE_6__.type.addNotification,\n                payload: {\n                  content: \"⛔ \" + result.message,\n                  notificationType: _Notification__WEBPACK_IMPORTED_MODULE_4__.notificationTypes.info\n                }\n              });\n              reloadData();\n\n            case 5:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function handleRemove(_x) {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n\n  var _ref3 = row.original || false,\n      numeroSerie = _ref3.numeroSerie;\n\n  var lookupData = function lookupData(data) {\n    var flatData = (0,_helpers_flattenData__WEBPACK_IMPORTED_MODULE_9__.flattenData)(data);\n    var resultData = Object.entries(flatData).filter(function (_ref4) {\n      var _ref5 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_ref4, 2),\n          key = _ref5[0],\n          value = _ref5[1];\n\n      return !(key.includes(\"id\") || key.includes(\"rutProveedor\") || key.includes(\"rutPoseedor\") || key.includes(\"productPN\") || key.includes(\"_v\"));\n    });\n    resultData.map(function (_ref6) {\n      var _ref7 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_ref6, 2),\n          key = _ref7[0],\n          value = _ref7[1];\n\n      return key.toUpperCase();\n    });\n  };\n\n  var toggleItemModal = function toggleItemModal(data) {\n    setIsLooking(true);\n    setModalData(data);\n  };\n\n  var closeModal = function closeModal() {\n    setIsLooking(false);\n    setModalData(null);\n  }; // if (!appState.userData.isAdmin || !accessInventarios[3] || !accessInventarios[1]) {\n  //   return null\n  // }\n\n\n  if (!numeroSerie) {\n    return null;\n  } else return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"td\", {\n    align: \"center\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"div\", {\n    className: \"buttons are-small\"\n  }, accessInventarios[3] && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"a\", {\n    title: \"Editar\",\n    className: \"button m-1 is-outlined is-small is-info\",\n    onClick: function onClick() {\n      editRow(row.index);\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"span\", {\n    className: \"icon\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"i\", {\n    className: \"fas fa-pen\"\n  }))), accessInventarios[1] && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"a\", {\n    title: \"Eliminar\",\n    className: \"button m-1 is-outlined is-small is-danger\",\n    onClick: function onClick() {\n      var validarRemove = confirm(\"\\xBFEst\\xE1 seguro que desea borrar el registro: \".concat(numeroSerie, \"?\"));\n\n      if (validarRemove) {\n        handleRemove(numeroSerie);\n      } else {\n        dispatch({\n          type: _InventoryReducer__WEBPACK_IMPORTED_MODULE_6__.type.addNotification,\n          payload: {\n            content: \"Se cancelo la operaci\\xF3n\",\n            notificationType: _Notification__WEBPACK_IMPORTED_MODULE_4__.notificationTypes.warning\n          }\n        });\n      }\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"span\", {\n    className: \"icon\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"i\", {\n    className: \"fas fa-minus-circle\"\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"a\", {\n    title: \"Ver Item\",\n    className: \"button m-1 is-outlined is-small is-primary is-light\",\n    onClick: function onClick(e) {\n      toggleItemModal(lookupData(row.original));\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"span\", {\n    className: \"icon\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(\"i\", {\n    className: \"far fa-eye\"\n  }))), isLooking && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ItemVisualizerModal__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    data: modalData,\n    closeModal: closeModal\n  }))));\n};\n\nTableDataButtons.propTypes = {\n  row: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object),\n  reloadData: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),\n  editRow: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func)\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableDataButtons);\n\n//# sourceURL=webpack://proyectosistemainv/./src/app/Inventory/TableDataButtons.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("dce403cfe0e3617c4062")
/******/ })();
/******/ 
/******/ }
);