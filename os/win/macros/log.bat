@echo off

SET cli=../punch-cli.bat
SET command=log

rem Allows for piping input, but requires extra keypress if not piping
SET /p input=%input%

CALL %cli% %command% %input% %*