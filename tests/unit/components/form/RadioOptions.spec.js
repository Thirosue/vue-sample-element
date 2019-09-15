import { shallowMount, mount } from '@vue/test-utils';
import { default as _localVue } from '../../views/lib/testHelper';

const localVue = _localVue();

import { RadioOptions } from "@/components/form";

describe('RadioOptions.vue', () => {
  describe('Initialize', () => {
    let value;

    it('mount', () => {
      const wrapper = shallowMount(RadioOptions, {
        propsData: {
          value,
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }]
        },
        localVue
      });

      expect(wrapper.isVueInstance()).toBe(true);
    });

    it('required = false かつ value が空の場合、未選択になっていること', () => {
      const wrapper = mount(RadioOptions, {
        propsData: {
          value,
          required: false,
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }]
        },
        localVue
      });

      const labels = wrapper.findAll('label');
      expect(labels.length).toBe(2);

      for (let i = 0; i < labels.length; i++) {
        console.log(labels.at(i).attributes('class'));
        expect(labels.at(i).attributes('class')).not.toContain('is-checked');
      }
    });

    it('required = true かつ value が空の場合、1つ目のオプションが選択されていること', () => {
      const wrapper = mount(RadioOptions, {
        propsData: {
          value,
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }]
        },
        localVue
      });

      const labels = wrapper.findAll('label');
      expect(labels.at(0).attributes('class')).toContain('is-checked');
      expect(labels.at(1).attributes('class')).not.toContain('is-checked');
    });

    it('required = false かつ value を指定した場合、指定したオプションが選択状態になっていること', () => {
      const wrapper = mount(RadioOptions, {
        propsData: {
          value: 'key2',
          required: false,
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }]
        },
        localVue
      });

      const labels = wrapper.findAll('label');
      expect(labels.at(0).attributes('class')).not.toContain('is-checked');
      expect(labels.at(1).attributes('class')).toContain('is-checked');
    });

    it('required = true かつ value を指定した場合、指定したオプションが選択状態になっていること', () => {
      const wrapper = mount(RadioOptions, {
        propsData: {
          value: 'key2',
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }]
        },
        localVue
      });

      const labels = wrapper.findAll('label');
      expect(labels.at(0).attributes('class')).not.toContain('is-checked');
      expect(labels.at(1).attributes('class')).toContain('is-checked');
    });

    it('指定した option が選択肢として表示されること', () => {
      const wrapper = mount(RadioOptions, {
        propsData: {
          value,
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }, { key: 'key3', value: 'value3' }]
        },
        localVue
      });

      const options = wrapper.findAll('label');
      expect(options.at(0).find('input').attributes('value')).toBe('key');
      expect(options.at(0).text()).toBe('value');
      expect(options.at(1).find('input').attributes('value')).toBe('key2');
      expect(options.at(1).text()).toBe('value2');
      expect(options.at(2).find('input').attributes('value')).toBe('key3');
      expect(options.at(2).text()).toBe('value3');
      expect(options.length).toBe(3);
    });
  });
});