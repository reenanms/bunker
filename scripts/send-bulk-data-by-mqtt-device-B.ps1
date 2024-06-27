#test data bulk - MQTT - device B
$mqtt_url="mqtt://localhost/mqtt.device.data"
$deviceId="e342492f-5835-408d-a174-fe2b3380e473"

for ($i=30000; $i -le 39999; $i++)
{
  curl $mqtt_url -d "${deviceId}:${i}"
  Start-Sleep -Milliseconds 150
}
