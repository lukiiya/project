@echo off
::color 2f
echo.
echo                    前端自动化发布
echo.
echo       -------------------------------------------
echo.
echo       beta：发布测试环境
echo.
echo       dist：发布正式环境
echo.
echo       quit：退出
echo.
echo       -------------------------------------------
echo.
set /p publishEnv=请输入你的选择：

:select

if "%publishEnv%" == "beta" (
	call :publish beta
) else (
	if "%publishEnv%" == "dist" (
		call :publish dist		
	) else (
		if "%publishEnv%" == "quit" (
			exit	
		) else (
			echo.
			set /p publishEnv=%publishEnv% 选项不存在，请重新输入：
			goto select	
		)
	)	
)
::结束批处理
goto :eof



::以下是模拟函数 %0表示函数名，%1表示第一个参数，%2表示第二个参数，如此类推

::发布函数
:publish
echo.
set /p publishDesc=请输入发布备注：
:desc
if "%publishDesc%"=="" (
	echo.
	set /p publishDesc=发布备注不能为空，请重新输入：
	goto desc
) else (
	call :confirm %1 %publishDesc%
)
goto :eof


::确认函数
:confirm
echo. & echo 最终确定的是，发布环境："%1"，发布备注："%2" & echo.
set /p publishSure=是否确认发布[yes,no]？
:confirmSure
if "%publishSure%" == "yes" (
	call :history %1 %2	
) else (
	if "%publishSure%" == "no" (
		exit	
	) else (
		echo.
		set /p publishSure=只能输入 yes 或 no，请重新输入：
		goto confirmSure
	)
)
goto :eof


::历史备份函数
:history
echo.
set /p publishHistory=是否历史备份[yes,no]？
:historySure
if "%publishHistory%" == "yes" (
	cd ..\..\tools
	start grunt taskMaster --myTask=publish --myTarget=admin --myEnv=%1 --myDesc=%2 --myHistory=true
) else (
	if "%publishHistory%" == "no" (
		cd ..\..\tools
		start grunt taskMaster --myTask=publish --myTarget=admin --myEnv=%1 --myDesc=%2 --myHistory=false
	) else (
		echo.
		set /p publishHistory=只能输入 yes 或 no，请重新输入：
		goto historySure
	)	
)
goto :eof