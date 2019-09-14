import { shallowMount, mount } from '@vue/test-utils';
import { default as _localVue } from '../../views/lib/testHelper';

const localVue = _localVue();

import { MultipleCheckbox } from "@/components/form";

describe('MultipleCheckbox.vue', () => {
  describe('Initialize', () => {
    let value;

    it('mount', () => {
      const wrapper = shallowMount(MultipleCheckbox, {
        propsData: {
          value,
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }]
        },
        localVue
      });

      expect(wrapper.isVueInstance()).toBe(true);
    });

    it('指定した option が選択肢として表示されること', () => {
      const wrapper = shallowMount(MultipleCheckbox, {
        propsData: {
          value,
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }, { key: 'key3', value: 'value3' }]
        },
        localVue
      });

      const options = wrapper.findAll('el-checkbox-stub');
      expect(options.at(0).attributes('label')).toBe('key');
      expect(options.at(0).text()).toBe('value');
      expect(options.at(1).attributes('label')).toBe('key2');
      expect(options.at(1).text()).toBe('value2');
      expect(options.at(2).attributes('label')).toBe('key3');
      expect(options.at(2).text()).toBe('value3');
      expect(options.length).toBe(3);
    });

    it('値を指定しない場合、未選択状態になること', async () => {
      const wrapper = mount(MultipleCheckbox, {
        propsData: {
          value: [],
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }, { key: 'key3', value: 'value3' }]
        },
        localVue
      });

      const labels = wrapper.findAll('label');
      expect(labels.length).toBe(3);

      for (let i = 0; i < labels.length; i++) {
        console.log(labels.at(i).attributes('class'));
        expect(labels.at(i).attributes('class')).not.toContain('is-checked');
      }
    });

    it('値を指定した場合、選択状態になること', async () => {
      const wrapper = mount(MultipleCheckbox, {
        propsData: {
          value: ['key', 'key2', 'key3'],
          options: [{ key: 'key', value: 'value' }, { key: 'key2', value: 'value2' }, { key: 'key3', value: 'value3' }]
        },
        localVue
      });

      const labels = wrapper.findAll('label');
      expect(labels.length).toBe(3);

      for (let i = 0; i < labels.length; i++) {
        console.log(labels.at(i).attributes('class'));
        expect(labels.at(i).attributes('class')).toContain('is-checked');
      }
    });
  });
});