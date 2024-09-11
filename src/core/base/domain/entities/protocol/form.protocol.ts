import { Rule } from 'ant-design-vue/es/form';
import { Dayjs } from 'dayjs';

export type TFieldForm =
  | TFieldInputUsername
  | TFieldInput
  | TFieldInputNumber
  | TFieldInputPassword
  | TFieldTextArea
  | TFieldSelect
  | TFieldDatePicker
  | TFieldCheckBox
  | TFieldSelectMultiple
  | TFormArrayDynamic
  | TFormDynamic;

export type TFormLayout = 'horizontal' | 'vertical' | 'inline';

export type TFormDynamic = {
  type: EFormItem.FormDynamic;
  value: Record<string, TFieldForm>;
  titleForm?: string;
};

export type TFormArrayDynamic = {
  type: EFormItem.FormDynamicArray;
  value: Record<string, TFieldForm>[];
  titleForm?: string;
};

/**
 * Form Common
 */
export type TFieldInputUsername = {
  type: EFormItem.InputUsername;
  value: string;
  placehorder: string;
  disabled?: boolean;
  bordered?: boolean;
  size?: InputSize;
  maxlength?: number;
  allowClear?: boolean;
  hideLabel?: boolean;
  class?: string;

  rules?: Rule[];
};

/**
 * Form Common
 */
export type TFieldInput = {
  type: EFormItem.Input;
  value: string;
  placehorder: string;
  disabled?: boolean;
  bordered?: boolean;
  size?: InputSize;
  maxlength?: number;
  allowClear?: boolean;
  hideLabel?: boolean;
  class?: string;

  rules?: Rule[];
};

/**
 * Form Common
 */
export type TFieldInputNumber = {
  type: EFormItem.InputNumber;
  value: number;
  placehorder: string;
  disabled?: boolean;
  bordered?: boolean;
  formatter?: (value: string) => string;
  parser?: (value: string) => string;
  min?: number;
  max?: number;
  hideLabel?: boolean;
  class?: string;

  rules?: Rule[];
};

/**
 * Form Common
 */
export type TFieldInputPassword = {
  type: EFormItem.InputPassword;
  value: string;
  placehorder: string;
  visibilityToggle?: boolean;
  bordered?: boolean;
  allowClear?: boolean;
  hideLabel?: boolean;
  class?: string;

  rules?: Rule[];
};

/**
 * Form Common
 */
export type TFieldTextArea = {
  type: EFormItem.TextArea;
  value: string;
  placehorder: string;
  showCount?: boolean;
  allowClear?: boolean;
  autosize?: boolean;
  rows?: number;
  hideLabel?: boolean;
  class?: string;

  rules?: Rule[];
};

/**
 * Form Common
 */
export type TFieldSelectMultiple = {
  type: EFormItem.SelectMultiple;
  value: string[];
  placehorder: string;
  mode: SelectMode;
  options: IDropdownList[];
  bordered?: boolean;
  change?: <T>(e: T) => void;
  hideLabel?: boolean;
  class?: string;

  rules?: Rule[];
};

/**
 * Form Common
 */
export type TFieldSelect = {
  type: EFormItem.Select;
  value: string;
  placehorder: string;
  options: IDropdownList[];
  bordered?: boolean;
  change?: <T>(e: T) => void;
  hideLabel?: boolean;
  class?: string;

  rules?: Rule[];
};

/**
 * Form Common
 */
export type TFieldDatePicker = {
  type: EFormItem.DatePicker;
  value?: Dayjs;
  placehorder: string;
  change?: <T>(e: T) => void;
  hideLabel?: boolean;
  class?: string;
  disabled?: boolean;

  rules?: Rule[];
};

/**
 * Form Common
 */
export type TFieldCheckBox = {
  type: EFormItem.Checkbox;
  value: boolean;
  text?: string;
  hideLabel?: boolean;
  class?: string;

  rules?: Rule[];
};

export enum EFormItem {
  'Input',
  'InputUsername',
  'InputPassword',
  'InputNumber',
  'TextArea',
  'Select',
  'SelectMultiple',
  'DatePicker',
  'Checkbox',
  'FormDynamicArray',
  'FormDynamic',
}
export type SelectMode = 'multiple' | 'tags';
export type InputSize = 'large' | 'middle' | 'small';

export interface IDropdownList {
  label: string; // the display name in the dropdown
  value: string; // it should be id
}
