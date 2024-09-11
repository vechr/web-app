import { StringCodec } from 'nats.ws';
import L from 'leaflet';
import { EWidget, Widget } from '../../widget.entity';
import { WidgetValidationService } from './widget-validation.service';
import { WidgetService } from './widget.service';
import { dataBuilder } from './data-builder.service';

/**
 * This function is to write messages from nats into the widget!
 * @param element Widget
 * @param msg any
 */
export const widgetSubscription = (element: Widget, msg: any) => {
  const validationTopic = new WidgetValidationService();
  const sc = StringCodec();

  // Logic how widget subscribe
  if (element.widgetType !== undefined) {
    if (validationTopic.validation(element.widgetType, sc.decode(msg.data))) {
      if (element.widgetType === EWidget.MAPS) {
        if (
          WidgetService.componentWidget['map_' + element.nodeId] !== undefined
        ) {
          const marker = WidgetService.componentWidget['map_' + element.nodeId];
          const newLatLng = new L.LatLng(
            JSON.parse(sc.decode(msg.data)).latitude,
            JSON.parse(sc.decode(msg.data)).longitude,
          );
          marker.setLatLng(newLatLng);
        }
      } else if (element.widgetType === EWidget.GAUGE) {
        if (
          WidgetService.componentWidget['myChart_' + element.nodeId] !==
          undefined
        ) {
          WidgetService.componentWidget[
            'myChart_' + element.nodeId
          ].data.datasets.forEach((dataset: any) => {
            dataset.needleValue = JSON.parse(sc.decode(msg.data));
          });
          WidgetService.componentWidget['myChart_' + element.nodeId].update();
        }
      } else {
        if (
          WidgetService.componentWidget['myChart_' + element.nodeId] !==
          undefined
        ) {
          WidgetService.componentWidget[
            'myChart_' + element.nodeId
          ].data.datasets.forEach((dataset: any) => {
            dataset.data = dataBuilder(
              dataset.data,
              JSON.parse(sc.decode(msg.data)),
              element.shiftData != undefined ? element.shiftData : true,
            );
          });
          WidgetService.componentWidget['myChart_' + element.nodeId].update();
        }
      }
    }
  }
};
