import { shallowMount, mount } from '@vue/test-utils';
import { default as _localVue } from '../../views/lib/testHelper';

const localVue = _localVue();

import { DatePicker } from "@/components/form";

describe('DatePicker.vue', () => {
  describe('Initialize', () => {
    let value;

    it('mount', () => {
      const wrapper = shallowMount(DatePicker, {
        propsData: {
          value,
        },
        localVue
      });

      expect(wrapper.isVueInstance()).toBe(true);
    });
  });
});