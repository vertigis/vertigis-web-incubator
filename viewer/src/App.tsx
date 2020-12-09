import {
    createTheme,
    makeStyles,
    GcxThemeProvider,
} from "@vertigis/react-ui/styles";
import CssBaseline from "@vertigis/react-ui/CssBaseline";
import Drawer from "@vertigis/react-ui/Drawer";
import Hidden from "@vertigis/react-ui/Hidden";
import IconButton from "@vertigis/react-ui/IconButton";
import MenuIcon from "@vertigis/react-ui/icons/Menu";
import List from "@vertigis/react-ui/List";
import ListItem from "@vertigis/react-ui/ListItem";
import ListItemText from "@vertigis/react-ui/ListItemText";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import Sample from "./Sample";
import SampleViewer from "./SampleViewer";

const samples = [{ id: "mapillary", title: "Mapillary" }] as const;

async function getSampleData(sampleName: string): Promise<Sample> {
    const [app, layout, library, readme] = await Promise.all([
        import(
            /* webpackChunkName: "[request]" */
            `../../samples/${sampleName}/app/app.json`
        ),
        import(
            /* webpackChunkName: "[request]" */
            `!!file-loader!../../samples/${sampleName}/app/layout.xml`
        ),
        import(
            /* webpackChunkName: "[request]" */
            `!!file-loader!../../samples/${sampleName}/build/main.js`
        ),
        import(
            /* webpackChunkName: "[request]" */
            `!!file-loader!../../samples/${sampleName}/README.md`
        ),
    ]);

    let parentPage;

    try {
        parentPage = await import(
            /* webpackChunkName: "[request]" */
            `!!file-loader!../../samples/${sampleName}/app/parent.html`
        );
    } catch {
        // This sample doesn't have a custom page. Continue on.
    }

    return {
        app: app.default,
        layout: layout.default,
        library: library.default,
        parentPage: parentPage && parentPage.default,
        readme: readme.default,
        repositoryBasePath: `https://github.com/geocortex/vertigis-web-incubator/tree/main/samples/${sampleName}/`,
    };
}

function ListItemLink(props) {
    const { children, to, ...other } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<HTMLAnchorElement>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to]
    );

    return (
        <li>
            <ListItem button component={renderLink as any} {...other}>
                {children}
            </ListItem>
        </li>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        position: "relative",
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: 32,
        height: "100vh",
        overflowY: "auto",
        [theme.breakpoints.down("sm")]: {
            paddingBlockStart: "48px",
        },
    },
    drawer: {
        [theme.breakpoints.up("md")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    menuButton: {
        position: "absolute",
        top: 0,
        left: 0,
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
}));

const theme = createTheme();

function App() {
    const classes = useStyles();

    const location = useLocation();
    const history = useHistory();
    const selectedSampleId = location.pathname.replace(
        `${process.env.PUBLIC_URL}/`,
        ""
    );
    const [selectedSample, setCurrentSample] = useState<Sample>();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    useEffect(() => {
        // Set default path if we're at the base path
        if (location.pathname === `${process.env.PUBLIC_URL}/`) {
            history.replace(`${process.env.PUBLIC_URL}/${samples[0].id}`);
        }
    }, [location, history]);

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

    const handleOpenMobileDrawer = () => {
        setMobileOpen(true);
    };

    const handleCloseMobileDrawer = () => {
        setMobileOpen(false);
    };

    const drawer = (
        <List>
            {samples.map((sample) => (
                <ListItemLink
                    key={sample.id}
                    to={`/${sample.id}`}
                    selected={sample.id === selectedSampleId}
                    onClick={handleCloseMobileDrawer}
                >
                    <ListItemText primary={sample.title} />
                </ListItemLink>
            ))}
        </List>
    );

    return (
        <GcxThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.root}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleOpenMobileDrawer}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <nav className={classes.drawer} aria-label="samples">
                    <Hidden mdUp implementation="css">
                        <Drawer
                            classes={{ paper: classes.drawerPaper }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleCloseMobileDrawer}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            classes={{ paper: classes.drawerPaper }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    {selectedSample && (
                        <SampleViewer
                            key={selectedSampleId}
                            sample={selectedSample}
                        />
                    )}
                </main>
            </div>
        </GcxThemeProvider>
    );
}

export default App;
