@echo off
::color 2f
echo.
echo                    ǰ���Զ������
echo.
echo       -------------------------------------------
echo.
echo       beta��������Ի���
echo.
echo       dist�������ʽ����
echo.
echo       quit���˳�
echo.
echo       -------------------------------------------
echo.
set /p publishEnv=���������ѡ��
echo.

:select

if "%publishEnv%" == "quit" (
	exit
)

if not "%publishEnv%" == "beta" if not "%publishEnv%" == "dist" (
        echo.
	set /p publishEnv=%publishEnv% ѡ����ڣ����������룺
	goto select
)

cd ..\..\tools
cmd /k "grunt taskMaster --myTask=packet --myTarget=admin --myEnv=%publishEnv% --myDesc="

::����������
goto :eof