// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash.isequal';

export default function useDeepSelector(type) {
  return useSelector((state) => state[type], isEqual);
}
