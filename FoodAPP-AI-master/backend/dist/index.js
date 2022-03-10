"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var client_1 = require("@prisma/client");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var init = function () {
    var app = (0, express_1["default"])();
    app.use((0, cors_1["default"])({ origin: '*' }));
    app.use(body_parser_1["default"].json());
    app.use(body_parser_1["default"].raw());
    app.use(body_parser_1["default"].urlencoded({ extended: true }));
    var prisma = new client_1.PrismaClient();
    var PORT = 4000;
    app.use('/v1', (0, routes_1["default"])(prisma));
    app.listen(PORT, function () { return console.log("server running on port " + PORT); });
};
(function () { return init(); })();
//# sourceMappingURL=index.js.map