import { Field, ErrorMessage } from 'formik';
import { FC } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface IDateRangePicker {
  label: string;
  name: string;
  onChange?: (dates: [Date, Date]) => {};
}

const DateRangePicker: FC<IDateRangePicker> = ({
  label,
  name,
  onChange,
  ...props
}: any) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field, form }: any) => (
          <div>
            <DatePicker
              placeholderText='enter date'              
              className="mt-[7px] focus:outline-[#2d90c6] border-[1px] border-[#a4a2a2] px-[10px] h-[40px] rounded text-[14px]"
              selected={field.value?.startDate}
              onChange={(dates: [Date | null, Date | null]) => {
                if(onChange) {
                  onChange(dates);
                } else {
                  const [startDate, endDate] = dates;
                  form.setFieldValue(name, { startDate, endDate });
                }
              }}
              startDate={field.value?.startDate}
              endDate={field.value?.endDate}
              selectsRange
              inline={false}
              {...props}
            />
            <ErrorMessage name={name} component="div" className="error" />
          </div>
        )}
      </Field>
    </div>
  );
};

export default DateRangePicker;
