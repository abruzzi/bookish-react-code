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

  it('Render List', () => {
    const props = {
      reviews: [
        { name: 'Juntao', date: '2018/06/21', content: 'Excellent work, really impressive on the efforts you put'},
        { name: 'Abruzzi', date: '2018/06/22', content: 'What a great book'}
      ]
    }

    const wrapper = shallow(<ReviewList {...props}/>)
    expect(wrapper.find('.reviews-container').length).toBe(1);
    expect(wrapper.find('.review').length).toBe(2)
  })
})