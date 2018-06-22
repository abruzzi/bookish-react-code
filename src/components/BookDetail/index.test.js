import React from 'react'
import {shallow} from 'enzyme'
import BookDetail from './index'
import ReviewList from './ReviewList'

describe('BookDetail', () => {

  it('Shows description', () => {
    const props = {
      book: {
        name: "Refactoring",
        description: "The book about how to do refactoring"
      }
    }
    const wrapper = shallow(<BookDetail {...props}/>)
    expect(wrapper.find('.description').text()).toEqual("The book about how to do refactoring")
  })
  
  it('Shows the book name when no description was given', () => {
    const props = {
      book: {
        name: "Refactoring"
      }
    }
    const wrapper = shallow(<BookDetail {...props}/>)
    expect(wrapper.find('.description').text()).toEqual("Refactoring")
  })

  it('Shows book name', () => {
    const props = {
      book: {
        name: "Refactoring",
        description: "The book about how to do refactoring"
      }
    }
    const wrapper = shallow(<BookDetail {...props}/>)
    expect(wrapper.find('.name').text()).toEqual("Refactoring")
  })

  it('Shows ReviewList', () => {
    const props = {
      book: {
        name: "Refactoring",
        description: "The book about how to do refactoring",
        reviews: []
      }
    }
    const wrapper = shallow(<BookDetail {...props}/>)
    expect(wrapper.find(ReviewList).length).toEqual(1)
  })

  it('Shows Review Form', () => {
    const props = {
      book: {
        name: "Refactoring"
      }
    }
    const wrapper = shallow(<BookDetail {...props}/>)
    expect(wrapper.find('form').length).toEqual(1)
    expect(wrapper.find('form input[name="name"]').length).toEqual(1)
    expect(wrapper.find('form textarea[name="content"]').length).toEqual(1)
    expect(wrapper.find('form button[name="submit"]').length).toEqual(1)
  })

  it('Shows a delimiter between book detail and reviews', () => {
    const props = {
      book: {
        name: "Refactoring"
      }
    }
    const wrapper = shallow(<BookDetail {...props}/>)
    expect(wrapper.find('h3.title').length).toEqual(1);
    expect(wrapper.find('h3.title').text()).toEqual('Reader reviews');
  })
})