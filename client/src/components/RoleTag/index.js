import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { upperFirst } from 'lodash';
import { COLORS } from 'utils/config';

const RoleTag = ({ role }) => (
  <Tag color={COLORS[role]}>{upperFirst(role)}</Tag>
);

RoleTag.propTypes = {
  role: PropTypes.string,
};

export default RoleTag;
