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
})