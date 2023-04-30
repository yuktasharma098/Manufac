import React from 'react'
import data from '../Wine-Data.json'
import { useEffect } from 'react';
import * as echarts from 'echarts';

const LineChart = () => {
  useEffect(() => {
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
    <div id="lineChart" style={{display:'flex', justifyContent:'center', width: '100%', height: '500px' }}></div>
  );
}


export default LineChart