import React, { useEffect } from 'react'
import data from '../Wine-Data.json'
import * as echarts from 'echarts';

const BarChart = () => {
  let array = []
  let arr = []
  let arr1 = []
  let arr2 = []
  let minValuearr
  let minValuearr1
  let minValuearr2
  let finalArray = []


  for (var i = 0; i < data.length; i++) {
    array.push(data[i].Alcohol)
  }
  const uniqueAlcoholArray = array.filter((value, index) => {
    return array.indexOf(value) === index;
  });

  for (var i = 0; i < data.length; i++) {
    if (data[i].Alcohol === uniqueAlcoholArray[0]) {
      arr.push(data[i].Magnesium)
      minValuearr = Math.min(...arr);
      let obj = {
        "Alcohol": uniqueAlcoholArray[0],
        "Magnesium": minValuearr

      }
      finalArray.push(obj)

    }
    else if (data[i].Alcohol === uniqueAlcoholArray[1]) {
      arr1.push(data[i].Magnesium)
      minValuearr1 = Math.min(...arr1);
      let obj1 = {
        "Alcohol": uniqueAlcoholArray[1],
        "Magnesium": minValuearr1

      }
      finalArray.push(obj1)

    }
    else if (data[i].Alcohol === uniqueAlcoholArray[2]) {
      arr2.push(data[i].Magnesium)
      minValuearr2 = Math.min(...arr2);
      let obj2 = {
        "Alcohol": uniqueAlcoholArray[2],
        "Magnesium": minValuearr2

      }
      finalArray.push(obj2)

    }



  }
  const uniqueArray = finalArray.filter((obj, index, self) => {
    return index === self.findIndex(o => o.Alcohol === obj.Alcohol);
  });

  //useEffect is used so as to add the data to the chart directly as the component render
  useEffect(() => {
    //id is given so as to render the chart using div tag
    const barChart = echarts.init(document.getElementById('barChart'));
    barChart.setOption({
      xAxis: {
        type: 'category',
        data: uniqueArray.map((item) => item.Alcohol),
        name: 'Alcohol'
      },
      yAxis: {
        type: 'value',
        name: 'Magnesium'
      },
      // type of the series is bar as bar chart is to be made and map render the data of magnesium present is array of object
      series: [{
        data: uniqueArray.map((item) => item.Magnesium),
        type: 'bar'
      }]
    });

    const handleResize = () => {
      barChart.resize();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      barChart.dispose();
    }
  }, []);

  return (
    <div id="barChart" style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '500px' }}></div>
  );
}


export default BarChart
