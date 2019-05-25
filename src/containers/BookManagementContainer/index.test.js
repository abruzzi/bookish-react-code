import React from 'react';
import BookManagementContainer from "./index";
import {shallow} from "enzyme";

describe('Book Management', () => {
  it('renders fields needed', () => {
    const wrapper = shallow(<BookManagementContainer/>);

    expect(wrapper.find('h3').at(0).text()).toBe('Basic information');
    expect(wrapper.find('input[type="text"].name').exists()).toBe(true);
    expect(wrapper.find('input[type="text"].description').exists()).toBe(true);
  })

  it('renders authors', () => {
    const wrapper = shallow(<BookManagementContainer/>);

    expect(wrapper.find('h3').at(1).text()).toBe('Authors');
    expect(wrapper.find('input[type="text"].author-name').exists()).toBe(true);
    expect(wrapper.find('input[type="text"].author-profile').exists()).toBe(true);
  })
})