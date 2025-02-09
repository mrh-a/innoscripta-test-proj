import { Field } from "formik";
import { FC } from "react";


interface ITextInput {
  name: string,
  placeholder: string,
  label: string
  inputClassName?: string,
  containerClassName?: string
}

const TextInput: FC<ITextInput> = ({name, label, placeholder,inputClassName,containerClassName}) => {

    return (
      <div className={`items-center ${containerClassName}`}>
        <label htmlFor={name}>{label}</label>
        <Field
          className={`block focus:outline-[#2d90c6] min-w-[360px] h-[40px] border-[1px] border-[#a4a2a2] rounded px-[10px] mt-[7px] ${inputClassName}`}
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
        />
      </div>
    );
}


export default TextInput;