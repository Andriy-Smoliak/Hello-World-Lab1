@echo off
setlocal

pushd "%~dp0"
if errorlevel 1 exit /b 1

if not exist "package.json" (
  echo CI error: package.json was not found in the project root.
  popd
  exit /b 1
)

if not exist "package-lock.json" if not exist "npm-shrinkwrap.json" (
  echo CI error: package-lock.json or npm-shrinkwrap.json is required for npm ci.
  popd
  exit /b 1
)

call npm ci
if errorlevel 1 goto :failed

call npm run build
if errorlevel 1 goto :failed

call npm test
if errorlevel 1 goto :failed

echo CI checks completed successfully.
popd
endlocal
exit /b 0

:failed
set "exit_code=%errorlevel%"
if "%exit_code%"=="0" set "exit_code=1"
echo CI error: a command failed. Stopping further checks.
popd
endlocal & exit /b %exit_code%
