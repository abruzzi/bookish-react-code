import React from 'react'
import {shallow} from 'enzyme'
import Review from './index'

describe('Review', () => {

  it('Render Review', () => {
    const props = {
      review: { name: 'Juntao', date: '2018/06/21', content: 'Excellent work, really impressive on the efforts you put'}
    }

    const wrapper = shallow(<Review {...props}/>)
    const firstReview = wrapper.find('.review p').at(0);
    expect(firstReview.text()).toEqual('Excellent work, really impressive on the efforts you put');

    const name = wrapper.find('.review .name').at(0);
    expect(name.text()).toEqual('Juntao')

    const date = wrapper.find('.review .date').at(0);
    expect(date.text()).toEqual('2018/06/21')
  })
})
