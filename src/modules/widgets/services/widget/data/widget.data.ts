import { INode } from '@/modules/widgets/widget.entity';

export type TInitialDataNode = {
  bar: INode;
  bubble: INode;
  doughtnut: INode;
  gauge: INode;
  line: INode;
  pie: INode;
  polar: INode;
  radar: INode;
  scatter: INode;
  map: INode;
};

export const initialDataNode: TInitialDataNode = {
  bar: {
    x: 12,
    y: 5,
    w: 6,
    h: 4,
  },
  bubble: {
    x: 12,
    y: 5,
    w: 6,
    h: 4,
  },
  doughtnut: {
    x: 12,
    y: 5,
    w: 3,
    h: 6,
  },
  gauge: {
    x: 12,
    y: 5,
    w: 5,
    h: 4,
  },
  line: {
    x: 12,
    y: 5,
    w: 6,
    h: 4,
  },
  pie: {
    x: 12,
    y: 5,
    w: 3,
    h: 6,
  },
  polar: {
    x: 12,
    y: 5,
    w: 3,
    h: 6,
  },
  radar: {
    x: 12,
    y: 5,
    w: 3,
    h: 6,
  },
  scatter: {
    x: 12,
    y: 5,
    w: 6,
    h: 4,
  },
  map: {
    x: 12,
    y: 5,
    w: 12,
    h: 5,
  },
};
