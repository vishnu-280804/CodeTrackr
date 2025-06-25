import React, { useState, useEffect, createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays } from 'date-fns';
import axios from 'axios';
import LeetCode from '../pages/LeetCode.jsx';
import CodeForces from '../pages/CodeForces.jsx';
import.meta.env.VITE_API_URL

import Resume from '../pages/Resume.jsx';

const leetContext = createContext();

const Developer = () => {
  const { username } = useParams();
  const [githubUsername, setGithubUsername] = useState('');
  const [contributions, setContributions] = useState([]);
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [leetSubmissions, setLeetSubmissions] = useState(0);
  const [problem, setProblem] = useState({ Easy: 0, Medium: 0, Hard: 0 });

  // Fetch GitHub/LeetCode usernames from backend
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/platforms/${username}`, {
          withCredentials: true,
        });
        const { github, leetcode } = res.data;
        setGithubUsername(github || '');
        setLeetcodeUsername(leetcode || '');
      } catch (error) {
        console.error('Error fetching platform usernames:', error);
      }
    };
    fetchUsername();
  }, [username]);

  // Fetch GitHub contributions
  useEffect(() => {
    const fetchContributions = async () => {
      if (!githubUsername) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/github/${githubUsername}`);
        setContributions(res.data.contributions || []);
      } catch (error) {
        console.error('Error fetching GitHub contributions:', error);
      }
    };
    fetchContributions();
  }, [githubUsername]);
  //axios.get(`${import.meta.env.VITE_API_URL}/github/${githubUsername}`)


  // Fetch LeetCode submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!leetcodeUsername) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/lc/${leetcodeUsername}`);


        const problems = res.data.submitStats?.acSubmissionNum || [];
        const updated = { Easy: 0, Medium: 0, Hard: 0 };
        let total = 0;
        problems.forEach((item) => {
          if (item.difficulty in updated) {
            updated[item.difficulty] = item.count;
            total += item.count;
          }
        });
        setProblem(updated);
        setLeetSubmissions(total);
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
      }
    };
    fetchSubmissions();
  }, [leetcodeUsername]);

  return (
    <leetContext.Provider value={{ leetSubmissions, problem }}>
      <div className="min-h-screen bg-gray-900 text-white px-4 md:px-8 py-8 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            GitHub Username:{' '}
            <span className="text-blue-400">{githubUsername || 'Not Found'}</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto p-6 bg-gray-800 rounded-xl shadow-md">
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-center text-gray-100">
            GitHub Contributions (Past Year)
          </h3>
          <div className="overflow-x-auto">
            <CalendarHeatmap
              startDate={subDays(new Date(), 365)}
              endDate={new Date()}
              values={contributions}
              classForValue={(val) => {
                if (!val || val.count === 0) return 'color-empty';
                if (val.count < 5) return 'color-scale-1';
                if (val.count < 10) return 'color-scale-2';
                if (val.count < 20) return 'color-scale-3';
                return 'color-scale-4';
              }}
              tooltipDataAttrs={(value) => ({
                'data-tip': `${value.date} has ${value.count || 0} contributions`,
              })}
              showWeekdayLabels
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* LeetCode Card */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-center">LeetCode Stats</h3>
            <LeetCode />
          </div>

          {/* Codeforces Card */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-center">Codeforces Contests</h3>
            <CodeForces />
          </div>

          {/* Resume Card */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-center">Resume Review</h3>
            <Resume />
          </div>
        </div>
      </div>
    </leetContext.Provider>
  );
};

export default Developer;
export const useLeet = () => useContext(leetContext);
