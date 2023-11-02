import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Table } from 'react-bootstrap';

const SurveillanceDashboard = ({ systemStats, alerts }) => {
  // Transform systemStats data to match Bar chart data format
  const barChartData = {
    labels: Object.keys(systemStats),
    datasets: [
      {
        label: 'System Stats',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: Object.values(systemStats),
      },
    ],
  };

  // Transform alerts data to match Pie chart data format
  const alertsByDetection = alerts.reduce((acc, alert) => {
    if (acc[alert.detection]) {
      acc[alert.detection]++;
    } else {
      acc[alert.detection] = 1;
    }
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(alertsByDetection),
    datasets: [
      {
        data: Object.values(alertsByDetection),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <div>
      <h1>Surveillance Dashboard</h1>
      {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '50%' }}>
          <Bar data={barChartData} />
        </div>
        <div style={{ width: '50%' }}>
          <Pie data={pieChartData} />
        </div>
      </div>
      <h2>Alerts</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Alert ID</th>
            <th>Priority</th>
            <th>Detection</th>
            <th>Created Time</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map(alert => (
            <tr key={alert.id}>
              <td>{alert.id}</td>
              <td>{alert.priority}</td>
              <td>{alert.detection}</td>
              <td>{alert.createdTime}</td>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </div>
  );
};

export default SurveillanceDashboard;
