import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';

import App from '../../src/components/app';

describe( '<App />', () => {

  it('contains 1 div', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div')).to.have.length(1);
  });
  
});
