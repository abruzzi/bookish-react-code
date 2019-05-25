import React from 'react';
import {shallow} from "enzyme";

import App from './App';

describe('App', () => {
  it('renders application title', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1').text()).toBe('Bookish');
  })

  it('renders routes', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Route').length).toBe(3);
    expect(wrapper.find('Route').at(2).prop('path')).toBe('/books-management');
  })
})