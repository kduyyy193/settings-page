import  { useMemo } from "react";
import { useCallback, useState } from "react";
import {
  Form,
  FormLayout,
  Select,
  ColorPicker,
  hsbToRgb,
  Icon,
  Autocomplete,
  TextField,
  Button,
} from "@shopify/polaris";

import "./appsetting.scss"

import InputAppSettings from "./InputAppSettings";
import Icons from "../Icons";
import usePickColor from "../../hook/usePickColor";

const AppSettingsForm = () => {


  // Font
  const deselectedOptions = useMemo(
    () => [
      { value: "Poppins", label: "Poppins" },
      { value: "Tangerine", label: "Tangerine" },
      { value: "Roboto", label: "Roboto" },
      { value: "Open Sans", label: "Open Sans" },
      { value: "Montserrat", label: "Montserrat" },
      { value: "Lato", label: "Lato" },
    ],
    []
  );
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [fontValue, setFontValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value) => {
      setFontValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );
  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setFontValue(selectedValue[0]);
    },
    [options]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      value={fontValue}
      placeholder="Search"
    />
  );

  // Text Color
  const textColor = usePickColor({ defaultColor: "#c24141", name: "text" });

  // Background Color
  const backgroundColor = usePickColor({defaultColor: "#070606",name: "background"});

  //Industry
  const industriesOptions = [
    { label: "Arts and crafts", value: "arts-and-crafts" },
    { label: "Baby and kids", value: "baby-and-kids" },
    { label: "Books, music, and video", value: "books-music-and-video" },
    {
      label: "Business equipment and supplies",
      value: "business-equipment-and-supplies",
    },
    { label: "Clothing", value: "clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Food and drink", value: "food-and-drink" },
    { label: "Hardware and automotive", value: "hardware-and-automotive" },
    { label: "Health and beauty", value: "health-and-beauty" },
    { label: "Home and decor", value: "home-and-decor" },
    { label: "Jewelry and accessories", value: "jewelry-and-accessories" },
    { label: "Outdoor and garden", value: "outdoor-and-garden" },
    { label: "Pet supplies", value: "pet-supplies" },
    { label: "Restaurants", value: "restaurants" },
    { label: "Services", value: "services" },
    { label: "Sports and recreation", value: "sports-and-recreation" },
    { label: "Toys and games", value: "toys-and-games" },
    { label: "Other", value: "other" },
  ];
  const [industryValue, setIndustryValue] = useState("");
  const handleSelectIndustryChange = useCallback(
    (value) => setIndustryValue(value),
    []
  );


  // Button Click -- Fake data
  const [statusBtn, setStatusBtn] = useState("Done")
  const [saved, setSaved] = useState(false)
    const handleClick = () => {
      setStatusBtn("Saving...")
      setTimeout(() => {
        setStatusBtn("Done")
      }, 1400);
      setTimeout(() => {
        setSaved(true)
      }, 1500);
      setTimeout(() => {
        setSaved(false)
      }, 3000);
    }
  
  const handleSubmit = () => {
  };

  return (
    <div className="form-settings">
     { saved && <div className="modal-settings">
          Settings saved successfully!
      </div>}
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <div className="form-settings-child">
            <InputAppSettings
              name="Font"
              children={
                <div className="settings-filed-font">
                  <Autocomplete
                    options={options}
                    selected={selectedOptions}
                    onSelect={updateSelection}
                    textField={textField}
                  />
                  <div
                    style={{
                      height: "37px",
                      width: "37px",
                      background: "#f0f3f5",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 8px",
                      borderTopRightRadius: "4px",
                      borderBottomRightRadius: "4px",
                    }}
                  >
                    <Icon color="base" source={Icons.TypeMinor} />
                  </div>
                </div>
              }
            />
          </div>
          <div className="form-settings-child">
            <InputAppSettings
              name="Text Color"
              children={
                <div className="form-settings-color">
                  <TextField
                    onChange={useCallback((newValue) => {
                      textColor.setColorHEX(newValue);
                      console.log(1);
                    }, [])}
                    value={textColor.colorHEX}
                    placeholder="Choose some colors"
                  />
                  <button
                    style={{
                      height: "37px",
                      width: "37px",
                      backgroundColor: textColor.colorHEX,
                      display: "flex",
                      alignItems: "center",
                      padding: "0 8px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                    }}
                    onClick={() => {
                      textColor.setIsPickColor(!textColor.isPickColor);
                    }}
                  >
                    {textColor.isPickColor && (
                      <ColorPicker
                        id="textColor"
                        onChange={textColor.setColor}
                        color={textColor.color}
                      />
                    )}
                  </button>
                </div>
              }
            />
          </div>
          <div className="form-settings-child">
            <InputAppSettings
              name="Background Color"
              children={
                <div className="form-settings-color">
                  <TextField
                    autoComplete="off"
                    placeholder="Choose some colors"
                    onChange={useCallback((newBgValue) => {
                      backgroundColor.setColorHEX(newBgValue);
                    }, [])}
                    value={backgroundColor.colorHEX}
                  />
                  <button
                    style={{
                      height: "37px",
                      width: "37px",
                      backgroundColor: backgroundColor.colorHEX,
                      display: "flex",
                      alignItems: "center",
                      padding: "0 8px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                    }}
                    onClick={() => {
                      backgroundColor.setIsPickColor(
                        !backgroundColor.isPickColor
                      );
                    }}
                  >
                    {backgroundColor.isPickColor && (
                      <ColorPicker
                        id="bgColor"
                        onChange={backgroundColor.setColor}
                        color={backgroundColor.color}
                      />
                    )}
                  </button>
                </div>
              }
            />
          </div>
          <div className="form-settings-child">
            <InputAppSettings
              name="Your industry? "
              special="*"
              children={
                <div className="form-settings-color">
                  <Select
                    options={industriesOptions}
                    onChange={handleSelectIndustryChange}
                    value={industryValue}
                  />
                  <div
                    style={{
                      height: "37px",
                      width: "37px",
                      background: "#f0f3f5",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 8px",
                      borderTopRightRadius: "4px",
                      borderBottomRightRadius: "4px",
                    }}
                  >
                    <Icon color="base" source={Icons.StoreMajor}></Icon>
                  </div>
                </div>
              }
            />
          </div>
          <Button primary onClick={handleClick}>{statusBtn}</Button>
        </FormLayout>
      </Form>
    </div>
  );
};

export default AppSettingsForm;
