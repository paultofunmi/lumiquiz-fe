import { shallowMount } from '@vue/test-utils'
import HomeComponent from '@/components/HomeComponent.vue'

describe('Home Component', () => {
  it('renders and show text', () => {
    const wrapper = shallowMount(HomeComponent)
      
    const header = wrapper.find('h1')
    const text = wrapper.find('p')
  
    expect(text.text()).toContain('Rate Movies & Rank on Leaderboard')  
    expect(header.text()).toContain('LumiQuiz')
  })
})
