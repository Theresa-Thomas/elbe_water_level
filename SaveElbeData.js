import fetch from "node-fetch";



getElbeData();
setInterval( getElbeData, 300000);

async function getElbeData()
{
  const response =  await fetch("https://pegelonline.wsv.de/webservices/rest-api/v2/stations.json?water=ELBE");
  const jsonElbeData =  await response.json(); 
  
  var filteredElbeData = jsonElbeData.map(function(x) { return {km:x.km, longitude:x.longitude,latitude:x.latitude}; })
  saveElbeData(filteredElbeData);
      
  }

function saveElbeData(filteredElbeData){
  const items = filteredElbeData;
  const replacer = (key, value) => value === null ? 0: value ;
  const header = Object.keys(filteredElbeData[0]);
  const csvElbeData = [
    header.join(','), 
    ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n');
  
  console.log(csvElbeData);
  var encodedUri = encodeURI(csvElbeData);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Elbe_Data.csv");
  document.body.appendChild(link);
  link.click(); 
  


    
}

