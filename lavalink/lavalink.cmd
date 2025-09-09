@echo off
title Lavalink Server
".\jdk\bin\java.exe" -jar -Xmx512M Lavalink.jar --spring.profiles.active=dev
