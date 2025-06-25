import React, { useEffect, useState } from 'react';
import { useLeet } from '../components/Developer.jsx';
import.meta.env.VITE_API_URL

import ProgressBar from '@ramonak/react-progress-bar';

const LeetCode = () => {
  const { leetSubmissions, problem } = useLeet();
  const [percentage, setPercentage] = useState(0);
  const totalProblems = 3594; // adjust if needed

  useEffect(() => {
    const per = totalProblems > 0 ? (leetSubmissions / totalProblems) * 100 : 0;
    setPercentage(per);
  }, [leetSubmissions]);

  return (
    <div className="flex flex-col space-y-4">
      {/* Summary */}
      <div className="text-center">
        <p className="text-white">
          Total Problems Solved:{' '}
          <span className="font-semibold text-green-300">{leetSubmissions}</span>
        </p>
      </div>
      {/* Progress bar */}
      <div>
        <ProgressBar
          completed={Math.min(Math.ceil(percentage), 100)}
          className="h-4"
          labelAlignment="center"
          labelColor="#ffffff"
          bgColor="#38B2AC"
          baseBgColor="#2D3748"
        />
      </div>
      {/* Breakdown by difficulty */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-300">Easy</p>
          <p className="font-semibold text-green-200">{problem.Easy}</p>
        </div>
        <div>
          <p className="text-sm text-gray-300">Medium</p>
          <p className="font-semibold text-yellow-300">{problem.Medium}</p>
        </div>
        <div>
          <p className="text-sm text-gray-300">Hard</p>
          <p className="font-semibold text-red-400">{problem.Hard}</p>
        </div>
      </div>
    </div>
  );
};

export default LeetCode;
