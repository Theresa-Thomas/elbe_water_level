import fetch from "node-fetch";

//import File from ""

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
    header.join(','), // header row first
    ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n');
  
  console.log(csvElbeData);
  
// var encodedUri = encodeURI(csvElbeData);
// var link = document.createElement("a");
// link.setAttribute("href", encodedUri);
// link.setAttribute("download", "Elbe_Data.csv");
// document.body.appendChild(link);
// link.click(); 

// var folderName = "~/Desktop/";
// var now = new Date();
// var logfile_name = now.getFullYear() + "-"+ now.getMonth() + "-" + now.getDate();
// var f = new Folder(folderName + logfile_name);
// if ( ! f.exists ) {
//     f.create();
// }
// //var docRef=app.activeDocument;
// var file = new File(folderName+"/"+'ElbeData.csv');
// file.open('w');
// file.writeln(",",csvElbeData);
// file.close();


    
}
// function download_csv_file()
// {
//     var hiddenElement = document.createElement('a');  
//     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvElbeData);  
//     hiddenElement.target = '_blank';    
//     hiddenElement.download = 'Elbe_Data.csv';  
//     hiddenElement.click(); 
     

// }

