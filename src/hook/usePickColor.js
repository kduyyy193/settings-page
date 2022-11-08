import { useEffect, useState } from "react";
import {hsbToHex} from '@shopify/polaris'

const usePickColor = ({defaultColor, name}) => {

  const [isPickColor, setIsPickColor] = useState(false);
  const [color, setColor] = useState({
    hue: '',
    brightness: '',
    saturation: '',
  });
  const [colorHEX, setColorHEX] = useState(defaultColor);

  useEffect(() => {
    if (color.hue || color.brightness && color.saturation) {
        setColorHEX(
            hsbToHex(color)
      );
    }
  }, [color]);

  return name = { isPickColor,setIsPickColor, colorHEX, setColorHEX, color, setColor }
};

export default usePickColor