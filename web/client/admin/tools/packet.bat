@echo off
::color 2f
echo.
echo                    前端自动化打包
echo.
echo       -------------------------------------------
echo.
echo       beta：打包测试环境
echo.
echo       dist：打包正式环境
echo.
echo       quit：退出
echo.
echo       -------------------------------------------
echo.
set /p publishEnv=请输入你的选择：
echo.

:select

if "%publishEnv%" == "quit" (
	exit
)

if not "%publishEnv%" == "beta" if not "%publishEnv%" == "dist" (
        echo.
	set /p publishEnv=%publishEnv% 选项不存在，请重新输入：
	goto select
)

cd ..\..\tools
cmd /k "grunt taskMaster --myTask=packet --myTarget=admin --myEnv=%publishEnv% --myDesc="

::结束批处理
goto :eof