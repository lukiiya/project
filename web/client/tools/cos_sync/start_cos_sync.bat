@echo off
set cur_dir=%CD%\cos_sync
cd %cur_dir%
set my_java_cp=.;%cur_dir%\target\cos_sync_java-0.0.1-SNAPSHOT-jar-with-dependencies.jar;%cur_dir%\src\main\resources\*
..\jre1.8.0_131\bin\java -cp "%my_java_cp%" com.qcloud.cos.cos_sync.main.CosSyncMain %1 %2