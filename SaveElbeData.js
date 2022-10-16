import fetch from "node-fetch";
import FileSaver from 'file-saver';

import Blob from 'node-blob';

getElbeData();
setInterval( getElbeData, 300000);
var count=1;
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
  var blob = new Blob([csvElbeData], { type: 'text/csv;charset=utf-8;' });
  var fileName="Elbe"+count+".csv";;
  FileSaver.saveAs(blob, fileName);
  count++;
  console.log(count)
}

