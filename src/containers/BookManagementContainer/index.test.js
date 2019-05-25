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

  it('add more authors', () => {
    const wrapper = shallow(<BookManagementContainer/>);
    const button = wrapper.find('button.add')

    expect(button.exists()).toBe(true);
    button.simulate('click');

    expect(wrapper.find('input[type="text"].author-name').length).toBe(2);
  })

  describe('edting detials', () => {

    it('editing name', () => {
      const wrapper = shallow(<BookManagementContainer/>);
      const nameInput = wrapper.find('input[type="text"].name');

      nameInput.simulate('change', {target: {value: 'Domain Driven Design'}})
      expect(wrapper.state().name).toEqual('Domain Driven Design');
    })

    it('editing description', () => {
      const wrapper = shallow(<BookManagementContainer/>);
      const descriptionInput = wrapper.find('input[type="text"].description');

      descriptionInput.simulate('change', {target: {value: 'A classic foundation of Domain Driven Design'}});
      expect(wrapper.state().description).toEqual('A classic foundation of Domain Driven Design');
    })
  })

  describe('editing authors', () => {
    it('editing name', () => {
      const wrapper = shallow(<BookManagementContainer/>);
      const authorName = wrapper.find('input[type="text"].author-name')
      authorName.simulate('change', {target: {value: 'Juntao Qiu'}})

      const {authors} = wrapper.state();
      expect(authors[0].name).toEqual('Juntao Qiu');
    })

    it('editing profile', () => {
      const wrapper = shallow(<BookManagementContainer/>);
      const authorProfile = wrapper.find('input[type="text"].author-profile')
      authorProfile.simulate('change', {target: {value: 'Technical author'}})

      const {authors} = wrapper.state();
      expect(authors[0].profile).toEqual('Technical author');
    })
  })

  describe('delete button for authors', () => {
    it('disable when only one author left', () => {
      const wrapper = shallow(<BookManagementContainer/>);

      expect(wrapper.find('button.delete-author').exists()).toBe(true);
      expect(wrapper.find('button.delete-author').prop('disabled')).toBe(true);
    })

    it('enable when more than one authors', () => {
      const wrapper = shallow(<BookManagementContainer/>);
      wrapper.setState({authors: [
          {id: 1, name: '', profile: ''},
          {id: 2, name: '', profile: ''}
        ]});

      expect(wrapper.find('button.delete-author').length).toBe(2);

      expect(wrapper.find('button.delete-author').at(0).prop('disabled')).toBe(false);
      expect(wrapper.find('button.delete-author').at(1).prop('disabled')).toBe(false);
    })
  })
})