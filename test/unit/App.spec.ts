import { shallow, mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallow(App)
    expect(wrapper.text()).toMatch('hello')
  })

  it('matches the snapshot', () => {
    const wrapper = mount(App)
    expect(wrapper.element).toMatchSnapshot()
  })
})
