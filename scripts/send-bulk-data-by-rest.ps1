
for ($i=1; $i -le 10000; $i++)
{
  curl -X POST http://localhost:3000/deviceTest/data -H "Content-Type: text/plain" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRFU1QiLCJkZXZpY2VJZCI6ImRldmljZVRlc3QiLCJpYXQiOjE3MTMzMTc3ODJ9.o0WEqlWYZaVjUSFkWKAHrJz5r6IkSeZFVXsxh5YgoiE" -d "100$i"
}

