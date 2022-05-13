fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events?source=InciWeb')
  .then(response => response.json())
  .then(data => console.log(data));