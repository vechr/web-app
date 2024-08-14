import { defineStore } from 'pinia';
import Container from 'typedi';
import { ref } from 'vue';
import { GridStack, GridStackNode } from 'gridstack';
import { WidgetUsecase } from './widget.usecase';
import {
  TCreateWidgetRequestBody,
  TUpdateWidgetRequestBody,
  Widget,
} from './widget.entity';
import { WidgetService } from './services';

export const useWidgetStore = defineStore('widget-store', () => {
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

  const widgets = ref<Widget[]>([]);
  const nodes = ref<GridStackNode[]>([]);

  const updateById = async (id: string, body: TUpdateWidgetRequestBody) => {
    const result = (await usecase.value.updateById<TUpdateWidgetRequestBody>(
      id,
      body,
      false,
    )) as Widget;

    if (result === null) return;

    const index = widgets.value.findIndex((x) => x.id === result.id);
    widgets.value[index] = result;
  };

  const deleteById = async (id: string) => {
    const result = (await usecase.value.delete(id)) as Widget;
    if (result === null) return;
    widgets.value = widgets.value.filter((val) => val.id !== result.id);
  };

  const createMap = async (grid: GridStack, body: TCreateWidgetRequestBody) => {
    const result = (await usecase.value.create<TCreateWidgetRequestBody>(
      body,
      false,
    )) as Widget;

    widgets.value.push(result);
    WidgetService.generateMap(grid, body.node, body.nodeId, body.name);
  };

  const createChart = async (
    grid: GridStack,
    body: TCreateWidgetRequestBody,
  ) => {
    const result = (await usecase.value.create<TCreateWidgetRequestBody>(
      body,
      false,
    )) as Widget;

    widgets.value.push(result);
    WidgetService.generateChart(
      grid,
      body.nodeId,
      body.widgetData,
      body.node,
      body.name,
    );
  };

  return {
    widgetOptions,
    usecase,
    widgets,
    nodes,
    createMap,
    createChart,
    updateById,
    deleteById,
  };
});
