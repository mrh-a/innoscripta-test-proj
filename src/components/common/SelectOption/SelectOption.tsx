import { Field, ErrorMessage } from 'formik';
import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { IOption } from '../../../core/model/option.model';

const DefaultOptionComponent = ({...props}) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div ref={innerRef} {...innerProps} className="p-2 cursor-pointer hover:bg-gray-200">
      {data.label}
    </div>
  );
};

interface ISelectOption {
  label: string;
  name: string;
  options: IOption[];
  onChange?: (option: IOption) => void;
  placeholder?: string;
  isLoading?: boolean;
  isClearable?: boolean;
  CustomOptionComponent?: any;
  className?: string;
  containerClassName?: string;
  onItemDelete?: (option: IOption) => void;
}

const SelectOption: FC<ISelectOption> = ({
  label,
  name,
  options,
  onChange,
  placeholder,
  isLoading,
  isClearable,
  CustomOptionComponent,
  className,
  onItemDelete,
  containerClassName,
}: any) => {
  return (
    <div className={`sm:w-[200px] w-full ${containerClassName}`}>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field, form }: any) => {
          return (
            <div className={`w-full`}>
              <Select
                aria-label={label}
                placeholder={placeholder ? placeholder : "select ..."}
                className={`mt-[7px] h-[40px] ${className}`}
                {...field}
                options={options}
                onChange={(selected: IOption | null) => {
                  form.setFieldValue(name, selected);
                  onChange && onChange(selected);
                }}
                onBlur={field.onBlur}
                isLoading={isLoading}
                isClearable={isClearable}
                components={{
                  Option: (props) =>
                    CustomOptionComponent ? (
                      <CustomOptionComponent
                        onItemDelete={onItemDelete}
                        {...props}
                      />
                    ) : (
                      <DefaultOptionComponent {...props} />
                    ),
                }}
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
