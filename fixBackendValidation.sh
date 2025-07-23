#!/bin/bash
# ЗАПУСКАТЬ ИЗ ДИРЕКТОРИИ forms-server !!!"

sed -i 's/\bIsDate\b/IsDateString/g' 'src/modules/users/dto/userPatch.dto.ts' && sed -i "/const app = await NestFactory.create(AppModule);/a\\app.enableCors({ origin: ['http://localhost:5173', 'https://t1-formswebpanel.onrender.com'], credentials: true });" 'src/main.ts' && sed -i "s|cookie: {|cookie: {\n        secure: true,\n        sameSite: 'none',|" 'src/main.ts' && sed -i "s|saveUninitialized: false,|saveUninitialized: true,|" 'src/main.ts' && npm i && npm run build

echo "Бэкенд пофиксили, ураура!"
