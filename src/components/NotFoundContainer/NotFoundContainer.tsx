import { FC } from "react";

interface INotFoundContainerProps {}

const NotFoundContainer: FC<INotFoundContainerProps> = ({}) => {
  return (
    <p className="text-[24px] text-center font-bold mt-[300px]">
      404 - PAGE NOT FOUND!
    </p>
  );
};

export default NotFoundContainer;
