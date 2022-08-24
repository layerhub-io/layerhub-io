import React from "react";
import { styled, ThemeProvider, DarkTheme } from "baseui";
import { Theme } from "baseui/theme";
import { Button, KIND } from "baseui/button";
import Logo from "~/components/Icons/Logo";
import PreviewModal from "./PreviewModal";

const Container = styled<{}, "div", Theme>("div", ({ $theme }) => ({
    height: "70px",
    background: $theme.colors.black,
    display: "flex",
    padding: "0 1rem",
    justifyContent: "space-between",
    alignItems: "center",
}));

export default function () {
    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
    return (
        <ThemeProvider theme={DarkTheme}>
            <Container>
                <div style={{ color: "#ffffff" }}>
                    <Logo size={36} />
                </div>
                <Button onClick={() => setIsPreviewOpen(true)} kind={KIND.primary}>
                    Preview
                </Button>
                {isPreviewOpen && <PreviewModal isOpen={isPreviewOpen} setIsOpen={setIsPreviewOpen} />}
            </Container>
        </ThemeProvider>
    );
}
