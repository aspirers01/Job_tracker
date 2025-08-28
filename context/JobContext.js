import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';

export const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('accessToken');
      const baseURL =
        Platform.OS === 'android'
          ? 'https://job-trackerbackendapi.onrender.com/api/v1/jobs'
          : 'https://job-trackerbackendapi.onrender.com/api/v1/jobs';

      const res = await axios.get(`${baseURL}/getjobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addOrUpdateJob = async (job, jobId = null) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const baseURL =
        Platform.OS === 'android'
          ? 'https://job-trackerbackendapi.onrender.com/api/v1/jobs'
          : 'https://job-trackerbackendapi.onrender.com/api/v1/jobs';

      let res;
      if (jobId) {
        res = await axios.put(`${baseURL}/update/${jobId}`, job, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        res = await axios.post(`${baseURL}/create`, job, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Refresh jobs after saving
      await fetchJobs();
      return res.data;
    } catch (error) {
      console.error('Error saving job:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <JobsContext.Provider value={{ jobs, loading, fetchJobs, addOrUpdateJob }}>
      {children}
    </JobsContext.Provider>
  );
};
