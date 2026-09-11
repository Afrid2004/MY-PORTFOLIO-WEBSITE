import * as Fa6Icons from "react-icons/fa6";
import * as FiIcons from "react-icons/fi";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as HiIcons from "react-icons/hi";
import * as LuIcons from "react-icons/lu";

const icons = {
  ...Fa6Icons,
  ...FiIcons,
  ...SiIcons,
  ...MdIcons,
  ...AiIcons,
  ...BsIcons,
  ...BiIcons,
  ...HiIcons,
  ...LuIcons,
};

export const getIcon = (iconName) => {
  return icons[iconName] || null;
};
