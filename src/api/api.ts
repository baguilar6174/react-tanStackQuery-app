import axios from 'axios';

export const api = axios.create({
  baseURL: `https://api.github.com/repos/facebook/react`,
  headers: {
    Authorization: `Bearer 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`
  },
});