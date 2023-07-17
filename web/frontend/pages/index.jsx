import { TitleBar } from "@shopify/app-bridge-react";
import { Box, Button, Form, FormLayout, Icon, Layout, LegacyCard, LegacyTabs, Page, TextField } from "@shopify/polaris";
import { useTranslation } from "react-i18next";

import "./scss/index.scss";
import { IconsMajor, TextMajor, PaintBrushMajor } from "@shopify/polaris-icons";
import { Checkbox } from "@shopify/polaris";

import { useCallback, useEffect, useState } from "react";
import CardWithTitle from "./components/CardWithTitle/CardWithTitle";
import InputColor from "./components/InputColor/InputColor";
import DeliveryCard from "./components/DeliveryCard/DeliveryCard";
import StorePickup from "./components/StorePickup/StorePickup";
import { useSelector, useDispatch } from "react-redux";
import TextFieldPro from "./components/TextFieldPro/TextFieldPro";
import { resetMutated } from "../redux/slices/mainSlice";
import SelectPro from "./components/SelectPro/SelectPro";

const tabs = [
    {
        id: "all-customers-1",
        panelID: "all-customers-content-1",
        content: "Delivery Date",
        accessibilityLabel: "All customers",
    },
    {
        id: "accepts-marketing-1",
        panelID: "accepts-marketing-content-1",
        content: "Accepts marketing",
    },
];

export const options = [
    { label: "Option 1", value: "Option 1" },
    { label: "Option 2", value: "Option 2" },
    { label: "Option 3", value: "Option 3" },
    { label: "Option 4", value: "Option 4" },
    { label: "Option 5", value: "Option 5" },
    { label: "Option 6", value: "Option 6" },
];

export default function HomePage() {
    const { t } = useTranslation();
    const isMutated = useSelector((state) => state.mainSlice.isMutated);

    const dispatch = useDispatch();

    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

    const [changed, setChanged] = useState(false);

    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback((selectedTabIndex) => {
        setSelected(selectedTabIndex);
    }, []);

    const getColorVip = (colorStr) => {
        const reg = /^#([0-9a-f]{3}){1,2}$/i;
        let color = colorStr[0] === "#" ? colorStr : `#${colorStr}`;

        if (!reg.test(color)) {
            color = "#ff0000";
        }

        return color;
    };

    const handleChange1 = () => {
        setChecked1(!checked1);
    };

    const handleChange2 = () => {
        setChecked2(!checked2);
    };
    const handleChange3 = () => {
        setChecked3(!checked3);
    };

    return (
        <Page narrowWidth>
            <TitleBar title={t("HomePage.title")} primaryAction={null} />
            <Layout>
                <Form
                    onSubmit={(e) => {
                        dispatch(resetMutated());
                        console.log(Array.from(e.target)[4]);
                        for (let i of Array.from(e.target)) {
                            if (i.type === "text" || i.type === "select-one") {
                                console.log(`${i.name} : ${i.value}`);
                                continue;
                            }

                            if (i.type === "checkbox") {
                                console.log(`${i.name} : ${i.checked}`);
                            }
                        }
                    }}
                >
                    <CardWithTitle icon={<Icon source={IconsMajor} />} title={"Widget position"}>
                        <Checkbox
                            name="Show the calendar at the product page"
                            label="Show the calendar at the product page"
                            checked={checked1}
                            onChange={handleChange1}
                        />
                        <Checkbox
                            name="Require the delivery date before checkout"
                            label="Require the delivery date before checkout"
                            checked={checked2}
                            onChange={handleChange2}
                        />
                    </CardWithTitle>

                    <CardWithTitle icon={<Icon source={PaintBrushMajor} />} title={"Widget appearance"}>
                        <Box className="middle-card">
                            <FormLayout>
                                <FormLayout.Group condensed>
                                    <SelectPro label="Layout" name={"layout"} />
                                    <Box>
                                        <SelectPro label="Calendar layout" name={"Calendar layout"} />
                                        <Checkbox
                                            name="Always open the calendar"
                                            label="Always open the calendar"
                                            checked={checked3}
                                            onChange={handleChange3}
                                        />
                                    </Box>
                                </FormLayout.Group>
                                <FormLayout.Group condensed>
                                    <SelectPro label="Layout" name={'"Layout"'} />
                                    <SelectPro label="Calendar layout" name={"Calendar layout"} />
                                </FormLayout.Group>
                                <FormLayout.Group condensed>
                                    <SelectPro label="Date format" name={"Date format"} />
                                    <InputColor name="Theme-color" label={"Theme color"} />
                                </FormLayout.Group>

                                <FormLayout.Group condensed>
                                    <InputColor label={"Title color"} name="Title-color" />
                                    <InputColor
                                        name="Require message text color"
                                        label={"Require message text color"}
                                    />
                                </FormLayout.Group>
                            </FormLayout>
                        </Box>
                    </CardWithTitle>

                    <CardWithTitle icon={<Icon source={TextMajor} />} title={"Widget text"}>
                        <div className="last-card">
                            <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                                <LegacyCard.Section>
                                    <DeliveryCard isSelected={selected === 0} />
                                    <StorePickup isSelected={selected === 1} />
                                </LegacyCard.Section>
                            </LegacyTabs>
                        </div>
                    </CardWithTitle>

                    <div
                        style={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {isMutated && <Button submit>Save</Button>}
                    </div>
                </Form>
            </Layout>
        </Page>
    );
}
