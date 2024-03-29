import React, { useEffect } from 'react'
import data from '../Wine-Data.json'
import * as echarts from 'echarts';

const BarChart = () => {
  const groupedData = data.reduce((acc, obj) => {
    const key = obj.Alcohol;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
  //  minimum magnesium value for each group
  const result = Object.values(groupedData).map(group => {
    const minMagnesium = Math.min(...group.map(obj => obj.Magnesium));
    const filteredObj = group.find(obj => obj.Magnesium === minMagnesium);
    return {Alcohol: filteredObj.Alcohol, Magnesium: filteredObj.Magnesium};
  });

  //useEffect is used so as to add the data to the chart directly as the component render
  useEffect(() => {
    //id is given so as to render the chart using div tag
    const barChart = echarts.init(document.getElementById('barChart'));
    barChart.setOption({
      xAxis: {
        type: 'category',
        data: result.map((item) => item.Alcohol),
        name: 'Alcohol'
      },
      yAxis: {
        type: 'value',
        name: 'Magnesium'
      },
      // type of the series is bar as bar chart is to be made and map render the data of magnesium present is array of object
      series: [{
        data: result.map((item) => item.Magnesium),
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
