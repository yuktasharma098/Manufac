import React from 'react'
import data from '../Wine-Data.json'
import { useEffect } from 'react';
import * as echarts from 'echarts';

const LineChart = () => {
  //useEffect is used so as to add the data to the chart directly as the component render
  useEffect(() => {
    //id is given so as to render the chart using div tag
    const lineChart = echarts.init(document.getElementById('lineChart'));
    lineChart.setOption({
      xAxis: {
        type: 'category',
        data: data.map((item) => item.Flavanoids),
        name: 'Flavanoids'
      },
      yAxis: {
        type: 'value',
        name: 'Ash'
      },
      // type of the series is line as line chart is to be made and map render the data of magnesium present is array of object
      series: [{
        data: data.map((item) => item.Ash),
        type: 'line'
      }]
    });

    const handleResize = () => {
      lineChart.resize();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      lineChart.dispose();
    }
  }, []);

  return (
    <div id="lineChart" style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '500px' }}></div>
  );
}


export default LineChart