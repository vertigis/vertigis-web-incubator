import {
    createTheme,
    styled,
    GcxThemeProvider,
} from "@vertigis/react-ui/styles";
import CssBaseline from "@vertigis/react-ui/CssBaseline";
import Drawer from "@vertigis/react-ui/Drawer";
import Box from "@vertigis/react-ui/Box";
import List from "@vertigis/react-ui/List";
import ListItemButton from "@vertigis/react-ui/ListItemButton";
import ListItemText from "@vertigis/react-ui/ListItemText";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import Sample from "./Sample";
import SampleViewer from "./SampleViewer";

import web from "@vertigis/web";

const libraries = [
    { id: "mapillary", title: "Mapillary" },
    { id: "timeslider", title: "Esri Time Slider" },
    { id: "3d-tools", title: "3D Tools" },
];

async function getSampleData(libraryId: string): Promise<Sample> {
    const [app, layout, library, readme] = await Promise.all([
        import(`../../libraries/${libraryId}/app/app.json`),
        import(`../../libraries/${libraryId}/app/layout.xml`),
        import(`../../libraries/${libraryId}/build/main.js`),
        import(`../../libraries/${libraryId}/README.md`),
    ]);

    let parentPage;

    try {
        parentPage = await import(
            `../../libraries/${libraryId}/app/parent.html`
        );
    } catch {
        // This sample doesn't have a custom page. Continue on.
    }

    return {
        app: app.default,
        layout: layout.default,
        library: library.default,
        id: libraryId,
        parentPage: parentPage && parentPage.default,
        readme: readme.default,
        repositoryBasePath: `https://github.com/vertigis/vertigis-web-incubator/tree/main/libraries/${libraryId}/`,
    };
}

function ListItemLink(props) {
    const { children, to, ...other } = props;

    const renderLink = useMemo(
        () =>
            forwardRef<HTMLAnchorElement>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to]
    );

    return (
        <li>
            <ListItemButton component={renderLink as any} {...other}>
                {children}
            </ListItemButton>
        </li>
    );
}

const Main = styled("main")(({ theme }) => ({
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 32,
    height: "100vh",
    overflowY: "auto",
}));

const StyledDrawer = styled(Drawer)(() => ({
    width: 240,
    flexShrink: 0,
}));

const theme = createTheme();
const viewerBaseUrl = new URL(import.meta.url).pathname.replace(
    "/src/App.tsx",
    ""
);

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedSampleId = location.pathname.replace(`${viewerBaseUrl}/`, "");
    const [selectedSample, setCurrentSample] = useState<Sample>();

    useEffect(() => {
        // Set default path if we're at the base path
        if (location.pathname === `${viewerBaseUrl}/`) {
            navigate(`${viewerBaseUrl}/${libraries[0].id}`, {
                replace: true,
            });
        }
    }, [location, navigate]);

    useEffect(() => {
        if (!selectedSampleId) {
            setCurrentSample(undefined);
            return;
        }

        let didCancel = false;

        (async () => {
            const loadedSample = await getSampleData(selectedSampleId);

            if (didCancel) {
                return;
            }

            setCurrentSample(loadedSample);
        })();

        return () => {
            didCancel = true;
        };
    }, [selectedSampleId]);

    return (
        <GcxThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <StyledDrawer variant="permanent" open>
                    <List>
                        {libraries.map((sample) => (
                            <ListItemLink
                                key={sample.id}
                                to={`/${sample.id}`}
                                selected={sample.id === selectedSampleId}
                            >
                                <ListItemText primary={sample.title} />
                            </ListItemLink>
                        ))}
                    </List>
                </StyledDrawer>
                <Main>
                    {selectedSample && (
                        <SampleViewer
                            key={selectedSampleId}
                            sample={selectedSample}
                        />
                    )}
                </Main>
            </Box>
        </GcxThemeProvider>
    );
}

export default App;
