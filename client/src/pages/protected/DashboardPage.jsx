import { useEffect, useRef } from 'react';
import { AnimatedContainer } from '../../components/AnimatedContainer';
import Chart from 'chart.js/auto';
import '../protected.css'

const DashboardPage = () => {
   const lineChartRef = useRef(null);

   useEffect(() => {
      const data = [
         { month: 'January', count: 17 },
         { month: 'February', count: 8 },
         { month: 'March', count: 24 },
         { month: 'April', count: 32 },
         { month: 'May', count: 28 },
         { month: 'June', count: 38 },
         { month: 'July', count: 42 },
         { month: 'August', count: 30 },
         { month: 'September', count: 55 },
         { month: 'October', count: 59 },
         { month: 'November', count: 65 },
         { month: 'December', count: 80 },
      ];

      const ctx = lineChartRef.current.getContext('2d');

      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(75, 192, 192, 0.6)');
      gradient.addColorStop(1, 'rgba(75, 192, 192, 0.1)');

      const lineChart = new Chart(ctx, {
         type: 'line',
         data: {
            labels: data.map((row) => row.month),
            datasets: [
               {
                  label: 'Views per month',
                  data: data.map((row) => row.count),
                  borderColor: 'rgba(15, 192, 192, 1)',
                  borderWidth: 2,
                  backgroundColor: gradient,
                  fill: true,
                  pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                  pointBorderColor: '#fff',
                  pointRadius: 5,
                  pointHoverRadius: 7,
                  tension: 0.5,
               },
            ],
         },
         options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
               y: {
                  beginAtZero: true,
                  grid: {
                     color: 'rgba(200, 200, 200, 0.2)',
                  },
                  title: {
                     display: true,
                     text: 'Number of Views',
                     color: '#666',
                     font: {
                        family: 'Inter',
                        size: 14,
                     },
                  },
               },
               x: {
                  grid: {
                     display: true,
                  },
                  title: {
                     display: true,
                     text: 'Months of 2024',
                     color: '#666',
                     font: {
                        family: 'Inter',
                        size: 14,
                     },
                  },
               },
            },
            plugins: {
               legend: {
                  display: true,
                  position: 'top',
                  labels: {
                     color: '#666',
                     font: {
                        family: 'Inter',
                        size: 14,
                     },
                  },
               },
               tooltip: {
                  enabled: true,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  bodyColor: '#fff',
                  titleColor: '#fff',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                  padding: 10,
                  callbacks: {
                     title: (context) => `Month: ${context[0].label}`,
                     label: (context) => `Views: ${context.raw}`,
                  },
               },
            },
         },
      });

      return () => {
         lineChart.destroy();
      };
   }, []);

   return (
      <div className="dashboard-page">
         <div className="admin">
            <AnimatedContainer>
               <div className="admin-title">
                  <h2>Control panel</h2>
                  <h1>Dashboard</h1>
               </div>
               <div className="chart-container">
                  <canvas id="bar-chart" ref={lineChartRef}></canvas>
               </div>
            </AnimatedContainer>
         </div>
      </div>
   );
};

export default DashboardPage;
