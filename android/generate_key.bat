@echo off
cd /d C:\Estato\android
"C:\Program Files\Android\Android Studio2\jbr\bin\keytool.exe" -genkey -v -keystore C:\Estato\android\estato-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias estato -storepass estato2024 -keypass estato2024 -dname "CN=Estato, OU=Mobile, O=Estato, L=Lucknow, ST=UP, C=IN"
echo Done!
dir C:\Estato\android\*.jks
pause
