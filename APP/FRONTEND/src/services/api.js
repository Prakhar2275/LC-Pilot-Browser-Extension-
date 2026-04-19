// /*
//  * LC Pilot — api.js
//  * axios client pointing at the local FastAPI backend.
//  * when it matches the base url it activate LC Pilot .
//  */

import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api'

const client = axios.create({ baseURL: BASE_URL })

/**
 * once problem is detected this gets called
 * Returns { session_id, roadmap }
 */
export const generateRoadmap = (title, description) =>
  client.post('/generate-roadmap', { title, description })

/**
 * current code analysis
 * Returns { message }
 */
export const analyzeCode = (code, session_id) =>
  client.post('/analyze-code', { code, session_id })

/**
 * return logical hint based onthe current code 
 * session_id is required.
 */
export const getNextStep = (code, session_id) =>
  client.post('/next-step', { code, session_id })

/**
 * checking for the extra edge cases and presubmission errors.
 */
export const testCode = (code, session_id) =>
  client.post('/test-code', { code, session_id })
