"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const session = require("express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('ejs');
    app.use(session({
        secret: 'seu_segredo',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map