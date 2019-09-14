import { shallowMount } from '@vue/test-utils';
import { default as _localVue } from '../../views/lib/testHelper';

const localVue = _localVue();

import { MultipleOptions } from "@/components/form";

describe('MultipleOptions.vue', () => {
  describe('Initialize', () => {
    let value;

    it('mount', () => {
      const wrapper = shallowMount(MultipleOptions, {
        propsData: {
          value,
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }]
        },
        localVue
      });

      expect(wrapper.isVueInstance()).toBe(true);
    });

    it('複数選択オプションがtrueとなること', () => {
      const wrapper = shallowMount(MultipleOptions, {
        propsData: {
          value,
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }]
        },
        localVue
      });

      const select = wrapper.find('el-select-stub');
      expect(select.attributes('multiple')).toBe("true");
    });

    it('required を指定しない場合、「選択してください」が表示されないこと', () => {
      const wrapper = shallowMount(MultipleOptions, {
        propsData: {
          value,
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }]
        },
        localVue
      });

      const firstOption = wrapper.findAll('el-option-stub').at(0);
      expect(firstOption.attributes('value')).toBe('key');
      expect(firstOption.attributes('label')).toBe('value');
    });

    it('required = false を指定した場合、「選択してください」が表示されること', () => {
      const wrapper = shallowMount(MultipleOptions, {
        propsData: {
          value,
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }],
          required: false
        },
        localVue
      });

      const firstOption = wrapper.findAll('el-option-stub').at(0);
      expect(firstOption.attributes('label')).toBe('選択してください');
    });

    it('required を指定しない場合、指定した option が選択肢として表示されること', () => {
      const wrapper = shallowMount(MultipleOptions, {
        propsData: {
          value,
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }, { key: 'key3', value: 'value3' }]
        },
        localVue
      });

      const options = wrapper.findAll('el-option-stub');
      expect(options.at(0).attributes('value')).toBe('key');
      expect(options.at(0).attributes('label')).toBe('value');
      expect(options.at(1).attributes('value')).toBe('key2');
      expect(options.at(1).attributes('label')).toBe('value2');
      expect(options.at(2).attributes('value')).toBe('key3');
      expect(options.at(2).attributes('label')).toBe('value3');
      expect(options.length).toBe(3);
    });
  });
});