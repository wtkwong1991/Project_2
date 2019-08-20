/////////////////////////////////////////////////////////////
///////Graph I - top 10 producing oil and gas wells /////////
///////////////////////////////////////////////////////////

// url to well data in loving county - json data type 
// var url = "https://quake-wells.herokuapp.com/data";

// proxy url 
// var proxyurl = "https://cors-anywhere.herokuapp.com/";

  var url = "../static/data/data.json";
  // pulling the data 
  function buildPlot() {
  d3.json(url).then(function(loving_data) {
    // console.log(loving_data);

    // get rid of duplicated rows 
    var uniqueLoving = loving_data.filter((loving_data, index, self) =>
    index === self.findIndex((t) => (t.save === loving_data.save && t.API === loving_data.API)))

    console.log(uniqueLoving); 




  /////////////// 1 - top 10 producing OIL wells///////////////////


    // emty arrays to hold api and dailyOil values 
    api= [];
    dailyOil = [];

    
    // sorting the data based on the dail_oil production rate 
    uniqueLoving.sort((a, b) => (b.Daily_Oil > a.Daily_Oil) ? 1 : -1)
    
    
    for (var i = 0; i < 10; i++) {

    // var  api_nbr = 
    // var  d_oil = 
    
    // pushing the top 10 daily_oil and API inth the arrays 
    api.push(uniqueLoving[i].API);
    dailyOil.push(uniqueLoving[i].Daily_Oil); 
      }
    //  console.log(api);
    // console.log(dailyOil)

/////////////////////////////////////////////////////////////////////////
// sorting the data based on the dail_oil production rate 

uniqueLoving.sort((a, b) => (b.Daily_Gas > a.Daily_Gas) ? 1 : -1)

dailyGas = []
apiGas = []

for (var j = 0; j < 10; j++) {

  var  apiGas_nbr = uniqueLoving[j].API;
  var  d_Gas = uniqueLoving[j].Daily_Gas;
  
  apiGas.push(apiGas_nbr);
  dailyGas.push(d_Gas); 
    }


// console.log(apiGas)
// console.log(dailyGas)



/////////////////2 - top 10 producing wells Gas chart////////////////////////


var options = {
  // select chart type 
  chart: {
    height: 350,
    width:467,
    background :'#f4f4f4',
    type: 'bar',
  },

  // chart options 
  plotOptions: {
    bar: {
      // columnWidth: '50%',
      endingShape: 'flat',
      horizontal : false, 
    }
  },


  dataLabels: {
    enabled: false
  },
  // stroke: {
  //   width: 2
  // },
  series: [{
    name: 'OIL(BBL/Day)',
    data:dailyOil,
    
  }],
  
  xaxis: {
    labels: {
      rotate: -45
    },
    categories: api
  },
  yaxis: {
    title: {
      text: 'Production Rate',
    },

    style: {
     
      fontSize: '12px',
    }

  },
  fill: {
    colors: ['#239A3B'],
   
  },

title :{
  text: 'Top 10 Producing Oil Wells ',
  align : 'center',
  margin : 20,
  offsetY: 20,
  style : {
    fontSize : '21px',
  },
}
}

var chart = new ApexCharts(
  document.querySelector("#barGraph"),
  options
);




chart.render();
      


///////////3 - button / oil and gas click event /////////



///////////gas button/////////////
  document.querySelector('#btn_gas').addEventListener('click', 

  () => chart.updateSeries([{
    data: dailyGas,
    name: 'GAS(MCF/Day)',
  }]),
 

  )

 document.querySelector('#btn_gas').addEventListener('click',
  ()=> chart.updateOptions({
    xaxis: {
      labels: {
        show: true
      },
    categories: apiGas,

    },


    fill: {
      colors: ['#f44336'],

    },

    title :{
      text: 'Top 10 Producing Gas Wells ',
      align : 'center',
      margin : 20,
      offsetY: 20,
      style : {
        fontSize : '21px',
      },
    }


  })
 )

 ///////oil button//////////////

 document.querySelector('#btn_oil').addEventListener('click', 

  () => chart.updateSeries([{
    data: dailyOil,
    name: 'Oil(BBL/Day)',
  }]),
  )

 document.querySelector('#btn_oil').addEventListener('click',
  ()=> chart.updateOptions({
    xaxis: {
      labels: {
        show: true
      },
    categories: api,

    },


    fill: {
      colors: ['#239A3B'],

    },

  title :{
      text: 'Top 10 Producing Oil Wells ',
      align : 'center',
      margin : 20,
      offsetY: 20,
      style : {
        fontSize : '21px',
      },
    }

  })
 )
});
  
}
buildPlot();

 




////////////////////////////////////////////////////////////////////
////Graph II -Oil & Gas Production By Year In Loving County, TX//// 
//////////////////////////////////////////////////////////////////

//url to oil&gas prod json data 
var prod_url = "https://gist.githubusercontent.com/hmakhlouf/1ff8fec36385fbd6c4c9a162b655de46/raw/2196c76e95e6b92a1f47aa35c04fbff3a92cdc0f/Prod_LovingCounty"


// pulling the data 
function buildProductionPlot() {
  d3.json(prod_url).then(function(prod_data) {
    // console.log(prod_data);

       
    years = [];
    oil_production = [];
    gas_production = [];
  
for (var i = 0; i < (prod_data.length)-1; i++) {
  
  var  yrs = prod_data[i].Years;
  var  prod_oil = prod_data[i]["Oil(BBLs)"]; 
  var  prod_gas = prod_data[i]["Gas(MCF)"]
  
  years.push(yrs);
  oil_production.push(prod_oil);
  gas_production.push(prod_gas);

  }
//   console.log(years);
//   console.log(oil_production);
//   console.log(gas_production);


 //  create a line and scatter plot to visualize the yearly O&G production in loving county 
  var trace1 = {
  type: "scatter",
  mode: "lines+markers",
  name: "Oil(BBL)",        
  marker: { 
    size: 8,
    opacity: 0.9,
  },    
  x: years,
  y: oil_production,
  line: {
    color: "green"
  }

  };
  var plot_data = [trace1];  


  var layout = {
    title:'Oil & Gas Production By Year (1993-2018)', //In Loving County, TX
    
    "titlefont": {
      // family: 'Courier New, monospace',
    "size": 20,
  },
  autosize : false, 
  width: 650,
  height: 350,
  paper_bgcolor: "#f4f4f4",
  plot_bgcolor: "#f4f4f4",   
  xaxis: {
    title: {
      // text: 'Years',
      font: {
        // family: 'Courier New, monospace',
        size: 13,
        color: 'black'
      }
    },
  type: "date", 
  },
  yaxis: {
    title: {
      text: 'Production',
      font: {
        // family: 'Courier New, monospace',
        size: 13,
        color: 'black'
      }
    }
  }
};
    

  Plotly.newPlot("graph_prod", plot_data, layout); 

  });

}


// dropdown ("oil production", "gas production") for O&G production plot 

var LINE = document.getElementById("graph_prod");
function updatePlotly(newx, newy, newline) {
  var LINE = document.getElementById("graph_prod");

  
  Plotly.restyle(LINE, "x", [newx]);
  Plotly.restyle(LINE, "y", [newy]);
  Plotly.restyle(LINE, "line", [newline]);
  // Plotly.restyle(LINE, "name", [newname]);
}

function getData(dataset) {
  var x = [];
  var y = [];
  var line = [];
  // var name = [];

  switch (dataset) {
  case "dataset1":
    name = "Oil(BBLs)";
    x = years;
    y = oil_production;
    line = {
          color: "green"
        };

      
    
    
    
    break;

  case "dataset2":
    name = "Gas(MCF)";
    x = years;
    y = gas_production;
    line =  {
          color: "red"
        };
    
    
  }

  updatePlotly(x, y, line);
}

buildProductionPlot();
