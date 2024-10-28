import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { renderFile } from 'ejs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Configuração do EJS
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // Verifique se o caminho está correto
  app.setViewEngine('ejs');

  // Configuração do middleware de sessão
  app.use(session({
    secret: 'seu_segredo', // Troque pelo seu próprio segredo
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Defina como true se estiver usando HTTPS
  }));

  await app.listen(3000);
}

bootstrap();
