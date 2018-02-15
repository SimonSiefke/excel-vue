import { expect } from 'chai'
import { shallow } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders a hello world heading', () => {
    const wrapper = shallow(App)
    expect(wrapper.text()).to.include('hello world')
  })
})
