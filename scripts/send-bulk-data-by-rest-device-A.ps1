#test data bulk - REST - device A
$rest_url="http://localhost:3001/data"
$deviceToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZGV2aWNlSWQiOiI4YTczN2M2Mi01ZDRkLTRkZGYtODMyMS0zZjNiOGZhYWZhNzgiLCJpYXQiOjE3MTkyNjE5NzZ9.0pd2I9VmtAPUqANrlugfvwq-qGuig0HeQYhYOZg5oAI"

for ($i=0; $i -le 9999; $i++)
{
  curl -X POST $rest_url -H "Content-Type: text/plain" -H "Authorization: Bearer ${deviceToken}" -d "${i}"
  Start-Sleep -Milliseconds 150
}
