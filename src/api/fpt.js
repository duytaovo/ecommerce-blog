import axios from 'axios';

const baseURL = 'https://recom.fpt.vn/api/v0.1/recommendation/api/result/getResult/';
const fptApiIns = axios.create({ baseURL });

const relatedItemId =  '';
const relatedItemKey =  '';

const userBehaviorId = '';
const userBehaviorKey =  '';

export const getRelatedItems = (input) => {
  const params = { input, key: relatedItemKey };
  return fptApiIns.get(relatedItemId, { params });
};

export const getUserBasedRecommendation = (input) => {
  if (!input) {
    input = localStorage.getItem('uid');
  }
  const params = { input, key: userBehaviorKey };
  return fptApiIns.get(userBehaviorId, { params });
};
