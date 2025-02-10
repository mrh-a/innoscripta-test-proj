import { FC } from "react";
import { Link } from "react-router";

interface IHeader {}

const Header: FC<IHeader> = ({}) => {
  return (
    <header className="flex justify-start items-center shadow">
      <img src="/favicon.ico" alt="Innoscripta logo"></img>
      <h1>INNOSCRIPTA</h1>
      <ul className="flex justify-start gap-[10px] ml-[30px]">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
