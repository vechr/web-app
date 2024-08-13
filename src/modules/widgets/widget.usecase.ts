import Container, { Service } from 'typedi';
import { GridStack } from 'gridstack';
import { INode, TCreateWidgetRequestBody, Widget } from './widget.entity';
import { WidgetService } from './services';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';

@Service()
export class WidgetUsecase extends BaseUsecase<Widget> {
  constructor() {
    super(
      Widget,
      '/api/things/v1/widget',
      Container.get(AxiosHttpClient<Widget>),
    );
  }

  createMap(
    grid: GridStack,
    nodeId: string,
    body: TCreateWidgetRequestBody,
    node: INode,
  ) {
    node.id = node.content = nodeId;

    WidgetService.generateMap(grid, node, nodeId, body.name);

    this.create<TCreateWidgetRequestBody>(body);
  }

  createChart(
    grid: GridStack,
    nodeId: string,
    node: INode,
    body: TCreateWidgetRequestBody,
  ) {
    node.id = node.content = nodeId;

    this.create<TCreateWidgetRequestBody>(body);
    WidgetService.generateChart(grid, nodeId, body.widgetData, node, body.name);
  }
}
