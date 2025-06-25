import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CodeForces = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://codeforces.com/api/contest.list');
        if (res.data.status === 'OK') {
          const upcoming = res.data.result.filter((c) => c.phase === 'BEFORE');
          // Optionally sort by startTimeSeconds ascending
          upcoming.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);
          setContests(upcoming);
        } else {
          setError('Failed to fetch contests');
        }
      } catch (err) {
        console.error('Error fetching Codeforces contests:', err);
        setError('Error fetching contests');
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  // Helper to format UNIX timestamp to readable date/time
  const formatDateTime = (unixSec) => {
    try {
      const date = new Date(unixSec * 1000);
      // e.g., "May 10, 2025 14:30"
      return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {loading ? (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-300">Loading upcoming contests...</p>
        </div>
      ) : error ? (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-red-400">{error}</p>
        </div>
      ) : contests.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-300">No upcoming contests found.</p>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto">
          <ul className="space-y-3">
            {contests.map((contest) => (
              <li
                key={contest.id}
                className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              >
                <h4 className="font-medium text-white">{contest.name}</h4>
                <p className="text-sm text-gray-300">
                  Starts: {formatDateTime(contest.startTimeSeconds)}
                </p>
                {/* Optionally display duration:
                <p className="text-sm text-gray-300">
                  Duration: {Math.floor(contest.durationSeconds / 3600)}h {Math.floor((contest.durationSeconds % 3600)/60)}m
                </p> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CodeForces;
