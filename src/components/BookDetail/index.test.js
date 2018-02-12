import React from 'react'
import {shallow} from 'enzyme'
import BookDetail from './index'

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

})