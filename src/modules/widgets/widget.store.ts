import { defineStore } from 'pinia';
import Container from 'typedi';
import { ref } from 'vue';
import { WidgetUsecase } from './widget.usecase';

export const useWidgetStore = defineStore('user-store', () => {
  const widgetOptions = [
    { value: 'BAR', label: 'BAR' },
    { value: 'BUBBLE', label: 'BUBBLE' },
    { value: 'DOUGHNUT', label: 'DOUGHNUT' },
    { value: 'PIE', label: 'PIE' },
    { value: 'GAUGE', label: 'GAUGE' },
    { value: 'LINE', label: 'LINE' },
    { value: 'POLAR', label: 'POLAR' },
    { value: 'RADAR', label: 'RADAR' },
    { value: 'SCATTER', label: 'SCATTER' },
    { value: 'MAPS', label: 'MAPS' },
  ];

  const usecase = ref(Container.get(WidgetUsecase));
  return {
    widgetOptions,
    usecase,
  };
});
