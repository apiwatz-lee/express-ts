"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', user_route_1.default);
app.get('/', (req, res) => {
    res.json({
        message: 'Aphiwat leelasawatsuk',
    });
});
exports.default = app;
if (require.main === module) {
    app.listen(port, () => console.log(`Application is running on port ${port}`));
}
