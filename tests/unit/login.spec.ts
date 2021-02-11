import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import Vuex from 'vuex'

describe('Tests Login View', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  
  const mock = jest.fn();
  mock.mockReturnValue('Email must be valid');
  const store = new Vuex.Store({
    getters: {
      authError: mock,
    },
  });
  
  it('renders and show form', () => {
    const wrapper = shallowMount(Login, {
      localVue,
      store,
    });
      
    const header = wrapper.find('h1')
    const text = wrapper.find('p')
  
    expect(text.text()).toContain('Welcome back')  
    expect(header.text()).toContain('Login')
  }) 


  // it('shows validation error for empty fields', async () => {
  //   const wrapper = shallowMount(Login, {
  //     localVue,
  //     store,
  //   });
    
  //   wrapper.setData({
  //     invalidInput: true,
      // errors: [
      //   'Email field cannot be empty',
      //   'Ensure that Password field is not empty and is at least 5 characters'
      // ]
    // })

    
      //  wrapper.setData({ loggedIn: false });
    
    // expect(wrapper.vm.invalidInput).toBe(true);

    // const alertWrapper = wrapper.find('div.alert')
    // expect(alertWrapper.text()).toContain('Email field cannot be empty')  
    
  // }) 

  //  test('submits a form', async () => {
  //   const wrapper = mount(Login)

  //    await wrapper.find('input[type=email]').setValue('name@mail.com');
  //    await wrapper.find('input[type=password]').setValue('Lo');
     
  //    const alertWrapper = wrapper.find('div.alert');
  //   expect(alertWrapper.text()).toContain('Email field cannot be empty') 
  // })
})
