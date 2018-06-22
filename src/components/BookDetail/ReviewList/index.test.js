import React from 'react'
import {shallow} from 'enzyme'
import ReviewList from './index'

describe('ReviewList', () => {

  it('Empty list', () => {
    const props = {
      reviews: []
    }
    const wrapper = shallow(<ReviewList {...props}/>)
    expect(wrapper.find('.reviews-container').length).toBe(1);
  })

})