import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './TimetablePage.css';

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const { data, error } = await supabase
          .from('timetable')
          .select('*')
          .order('day', { ascending: true });

        if (error) {
          console.error('Error fetching timetable:', error);
        } else {
          setTimetable(data); // Set the fetched data
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchTimetable(); // Call the function to fetch data
  }, []); // Empty dependency array ensures this only runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Display loading state until data is fetched
  }

  return (
    <div className="timetable-container">
      <h1>Timetable</h1>
      <table className="timetable-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time Slot</th>
            <th>Subject</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {timetable.length === 0 ? (
            <tr>
              <td colSpan="4">No timetable available</td>
            </tr>
          ) : (
            timetable.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.day}</td>
                <td>{entry.time_slot}</td>
                <td>{entry.subject}</td>
                <td>{entry.teacher}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
