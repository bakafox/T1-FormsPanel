#!/bin/bash
# ЗАПУСКАТЬ ИЗ ДИРЕКТОРИИ forms-server !!!

FILEPATH="src/modules/users/dto/userPatch.dto.ts"

sed -i 's/\bIsDate\b/IsDateString/g' "$FILEPATH"

echo "Бэкенд пофиксили, ураура!"
