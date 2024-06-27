#test data bulk - REST
$rest_url="http://localhost:3001/data"
$deviceToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZGV2aWNlSWQiOiJlMzQyNDkyZi01ODM1LTQwOGQtYTE3NC1mZTJiMzM4MGU0NzMiLCJpYXQiOjE3MTkyNjIxNDZ9.Hv7MGQsWh7DHjE-lptW9R-h5hvmyxEd5wi-3IMmupzk"

for ($i=20000; $i -le 29999; $i++)
{
  curl -X POST $rest_url -H "Content-Type: text/plain" -H "Authorization: Bearer ${deviceToken}" -d "${i}"
  Start-Sleep -Milliseconds 150
}
