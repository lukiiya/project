@echo off
::color 2f
echo.
echo                    ǰ���Զ�������
echo.
echo       -------------------------------------------
echo.
echo       beta���������Ի���
echo.
echo       dist��������ʽ����
echo.
echo       quit���˳�
echo.
echo       -------------------------------------------
echo.
set /p publishEnv=���������ѡ��

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
			set /p publishEnv=%publishEnv% ѡ����ڣ����������룺
			goto select	
		)
	)	
)
::����������
goto :eof



::������ģ�⺯�� %0��ʾ��������%1��ʾ��һ��������%2��ʾ�ڶ����������������

::��������
:publish
echo.
set /p publishDesc=�����뷢����ע��
:desc
if "%publishDesc%"=="" (
	echo.
	set /p publishDesc=������ע����Ϊ�գ����������룺
	goto desc
) else (
	call :confirm %1 %publishDesc%
)
goto :eof


::ȷ�Ϻ���
:confirm
echo. & echo ����ȷ�����ǣ�����������"%1"��������ע��"%2" & echo.
set /p publishSure=�Ƿ�ȷ�Ϸ���[yes,no]��
:confirmSure
if "%publishSure%" == "yes" (
	call :history %1 %2	
) else (
	if "%publishSure%" == "no" (
		exit	
	) else (
		echo.
		set /p publishSure=ֻ������ yes �� no�����������룺
		goto confirmSure
	)
)
goto :eof


::��ʷ���ݺ���
:history
echo.
set /p publishHistory=�Ƿ���ʷ����[yes,no]��
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
		set /p publishHistory=ֻ������ yes �� no�����������룺
		goto historySure
	)	
)
goto :eof