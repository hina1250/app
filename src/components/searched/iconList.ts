import eatIcon from "../../assets/images/icon/eating.svg";
import drinkIcon from "../../assets/images/icon/drink.svg";
import toiletIcon from "../../assets/images/icon/toilet.svg";
import thermometerIcon from "../../assets/images/icon/thermometer.svg";
import bathIcon from "../../assets/images/icon/bath.svg";
import dentifriceIcon from "../../assets/images/icon/dentifrice.svg";
import scaleIcon from "../../assets/images/icon/scale.svg";
import contactIcon from "../../assets/images/icon/contact.svg";
import eatSelectedIcon from "../../assets/images/icon/eating-active.svg";
import drinkSelectedIcon from "../../assets/images/icon/drink-active.svg";
import toiletSelectedIcon from "../../assets/images/icon/toilet-active.svg";
import thermometerSelectedIcon from "../../assets/images/icon/thermometer-active.svg";
import bathSelectedIcon from "../../assets/images/icon/bath-active.svg";
import dentifriceSelectedIcon from "../../assets/images/icon/dentifrice-active.svg";
import scaleSelectedIcon from "../../assets/images/icon/scale-active.svg";
import contactSelectedIcon from "../../assets/images/icon/contact-active.svg";

export type IconItem = {
  label: string;
  value: string;
  color: string;
  icon: string;
  selectedIcon: string;
};

export const iconList: IconItem[] = [
  {
    label: "eating",
    value: "食事",
    color: "#6277FE",
    icon: eatIcon,
    selectedIcon: eatSelectedIcon,
  },
  {
    label: "drinking",
    value: "水分",
    color: "#D88E18",
    icon: drinkIcon,
    selectedIcon: drinkSelectedIcon,
  },
  {
    label: "excretion",
    value: "排泄",
    color: "#E65CCF",
    icon: toiletIcon,
    selectedIcon: toiletSelectedIcon,
  },
  {
    label: "vital",
    value: "バイタル",
    color: "#30AC51",
    icon: thermometerIcon,
    selectedIcon: thermometerSelectedIcon,
  },
  {
    label: "bathing",
    value: "入浴",
    color: "#C3292F",
    icon: bathIcon,
    selectedIcon: bathSelectedIcon,
  },
  {
    label: "oral",
    value: "口腔",
    color: "#993BAB",
    icon: dentifriceIcon,
    selectedIcon: dentifriceSelectedIcon,
  },
  {
    label: "weight",
    value: "体重",
    color: "#167E56",
    icon: scaleIcon,
    selectedIcon: scaleSelectedIcon,
  },
  {
    label: "contact",
    value: "連絡",
    color: "#DF6F33",
    icon: contactIcon,
    selectedIcon: contactSelectedIcon,
  },
];
