Code is written in JavaScript.
setInterval function is called to get the pegel online API data every 5 minutes.
5 minutes in milliseconds is given and the function getElbeData is called every 5 minutes.
while calling the fetch api, parameter Water filters the data to only include the data for the Elbe river.
Only 3 parameters km,longitude and latitude is mapped from the JSON response.
The JSON data is then converted to array format and then converted to CSV format.
It is then downloaded to CSV file by creating a hidden element.
