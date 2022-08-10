import { INode } from '@/types';
import { GridStack } from 'gridstack';
import { Chart } from 'chart.js';
import L from 'leaflet';
import { message } from 'ant-design-vue';

export class WidgetHelper {
  public static generateChart(grid: GridStack, nodeId: string, dataChart: any, node: INode): void {
    node.id = node.content = nodeId;
    grid.compact();
    grid.addWidget(
      '<div class="grid-stack-item"><div class="grid-stack-item-content"><canvas id="myChart_' +
      node.id +
      '"></canvas></div></div>',
      node
    );

    const canvas = document.getElementById(
      'myChart_' + node.id
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    new Chart(ctx, dataChart);
  }

  public static generateMap(grid: GridStack, node: INode, nodeId: string): void {
    node.id = node.content = nodeId;
    grid.compact();
    grid.addWidget(
      '<div class="grid-stack-item event-map"><div class="grid-stack-item-content map-gridstack"><div class="container-map"><div class="my-map" id="map_' +
      node.id +
      '"></div></div></div></div>',
      node
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
      
      L.marker(e.latlng)
        .addTo(map)
        .bindPopup('You are within ' + radius + ' meters from this point')
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