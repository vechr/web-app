import { TopicEvent } from '../topic-events/topic-event.entity';
import { Widget } from '../widgets/widget.entity';
import {
  TFieldDatePicker,
  TFieldInput,
  TFieldSelect,
  TFieldTextArea,
} from '@/core/base/domain/entities/protocol';
import { BaseEntity } from '@/core/base/domain/entities';

export class Topic extends BaseEntity {
  deviceId: string;
  widgetType: string;
  topicEvents: TopicEvent[];
  widgets: Widget[];
}

export type TTopicForm = {
  id?: TFieldInput;
  name: TFieldInput;
  deviceId: TFieldSelect;
  widgetType: TFieldSelect;
  description: TFieldTextArea;
  createdAt?: TFieldDatePicker;
  updatedAt?: TFieldDatePicker;
};
