#test data bulk - MQTT - device A
$mqtt_url="mqtt://localhost/mqtt.device.data"
$deviceId="8a737c62-5d4d-4ddf-8321-3f3b8faafa78"

for ($i=10000; $i -le 19999; $i++)
{
  curl $mqtt_url -d "${deviceId}:${i}"
  Start-Sleep -Milliseconds 150
}
