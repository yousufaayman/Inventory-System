import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/Reports.css';

const Reports = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/reports`);
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleGenerateReport = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports`);
      fetchReports();
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <button onClick={handleGenerateReport}>Generate Report</button>
      <ul>
        {reports.map(report => (
          <li key={report.id}>
            <p>Generated At: {new Date(report.generatedAt.seconds * 1000).toLocaleString()}</p>
            <p>Inventory Items: {report.inventory?.length || 0}</p>
            <p>Orders: {report.orders?.length || 0}</p>
            <button onClick={() => console.log(report)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
