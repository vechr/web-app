import { GridStack } from 'gridstack';
import { Chart } from 'chart.js';
import L from 'leaflet';
import { message } from 'ant-design-vue';
import { INode } from '@/domain';

export class WidgetService {
  public static componentWidget: { [key: string]: any } = {};
  public static generateChart(
    grid: GridStack,
    nodeId: string,
    dataChart: any,
    node: INode,
    nameWidget: string,
  ): void {
    node.id = node.content = nodeId;
    grid.compact();
    grid.addWidget(
      `<div class="grid-stack-item"><div class="grid-stack-item-content"><h1>${nameWidget}</h1><div style="height: 90%;"><canvas id="myChart_` +
        node.id +
        '"></canvas></div></div></div>',
      node,
    );

    const canvas = document.getElementById(
      'myChart_' + node.id,
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    WidgetService.componentWidget['myChart_' + nodeId] = new Chart(
      ctx,
      dataChart,
    );
  }

  public static generateMap(
    grid: GridStack,
    node: INode,
    nodeId: string,
    nameWidget: string,
  ): void {
    node.id = node.content = nodeId;
    grid.compact();
    grid.addWidget(
      `<div class="grid-stack-item event-map"><div class="grid-stack-item-content map-gridstack"><h1>${nameWidget}</h1><div style="height: 90%;"><div class="container-map"><div class="my-map" id="map_` +
        node.id +
        '"></div></div></div></div></div>',
      node,
    );

    const map = new L.Map(`map_${node.id}`, {
      center: new L.LatLng(40.731253, -73.996139),
      zoom: 12,
      attributionControl: false,
      // dragging: false
    });

    map.locate({ setView: true, maxZoom: 16 });

    map.on('locationfound', function (e) {
      const radius: number = e.accuracy;

      WidgetService.componentWidget['map_' + nodeId] = L.marker(e.latlng)
        .addTo(map)
        .bindPopup('Your location in here')
        .openPopup();

      L.circle(e.latlng, radius).addTo(map);
    });

    map.on('locationerror', function onLocationError(e) {
      message.error(e.message);
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 18,
    }).addTo(map);
  }
}
