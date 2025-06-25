import React, { useState } from 'react';
import axios from 'axios';
import.meta.env.VITE_API_URL;


const Resume = () => {
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReview = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError('');
    const formData = new FormData();
    formData.append('pdf', file);
    try {
      setLoading(true);
      setReview('');
      const res = await axios.post(
        '${import.meta.env.VITE_API_URL}/review/pdf',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      if (res.data?.review) {
        setReview(res.data.review);
      } else {
        setError('No review returned');
      }
    } catch (err) {
      console.error('Error uploading PDF for review:', err);
      setError('Failed to fetch review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 flex-1">
      {/* File input styled as button */}
      <label className="w-full flex justify-center">
        <span
          className="cursor-pointer inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          {loading ? 'Uploading...' : 'Choose Resume (PDF)'}
          <input
            type="file"
            accept="application/pdf"
            onChange={fetchReview}
            className="sr-only"
            disabled={loading}
          />
        </span>
      </label>

      {/* Loading / error / result */}
      <div className="flex-grow">
        {loading && (
          <div className="flex items-center justify-center py-6">
            <svg
              className="animate-spin h-6 w-6 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span className="text-gray-200">Reviewing...</span>
          </div>
        )}
        {!loading && error && (
          <p className="text-red-400 text-center">{error}</p>
        )}
        {!loading && review && (
          <div className="mt-2 p-4 bg-gray-700 rounded-lg overflow-y-auto max-h-64">
            <h4 className="text-lg font-semibold mb-2 text-white">Review:</h4>
            {/* If the review text may have line breaks, preserve them */}
            <p className="text-gray-200 whitespace-pre-line">{review}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;
