import { AlphaCard, Box, Layout, Text } from "@shopify/polaris";

import "./CardWithTitle.scss";

const CardWithTitle = ({ icon, title, children }) => {
    return (
        <Layout.Section>
            <AlphaCard padding={"10"}>
                <Box className={"card-title"}>
                    {icon}
                    <Text variant="headingLg">{title}</Text>
                </Box>
                {children}
            </AlphaCard>
        </Layout.Section>
    );
};

export default CardWithTitle;
