import { Field, ErrorMessage } from 'formik';
import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { IOption } from '../../../core/model/option.model';
import { Placeholder } from 'react-select/animated';

interface IDateRangePicker {
  label: string;
  name: string;
  options: IOption[];
  onChange?: (option: IOption) => void;
  placeholder?: string;
  isLoading?: boolean;
  isClearable?: boolean
}

const SelectOption: FC<IDateRangePicker> = ({
  label,
  name,
  options,
  onChange,
  placeholder,
  isLoading,
  isClearable,
}: any) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field, form }: any) => {
          return (
            <div>
              <Select
                placeholder={placeholder ? placeholder : "select ..."}
                className="mt-[7px] h-[40px] min-w-[200px]"
                {...field}
                options={options}
                onChange={(selected: IOption | null) => {
                  form.setFieldValue(name, selected);
                  onChange && onChange(selected);
                }}
                onBlur={field.onBlur}
                isLoading={isLoading}
                isClearable={isClearable}
              />
              <ErrorMessage name={name} component="div" className="error" />
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default SelectOption ;
