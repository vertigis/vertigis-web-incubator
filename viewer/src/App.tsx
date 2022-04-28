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
import { forwardRef, useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import Sample from "./Sample";
import SampleViewer from "./SampleViewer";

const libraries = [
    { id: "mapillary", title: "Mapillary" },
    { id: "3d-tools", title: "3D Tools" },
];

async function getSampleData(libraryId: string): Promise<Sample> {
    const [app, layout, library, readme] = await Promise.all([
        import(`../../libraries/${libraryId}/app/app.json`),
        import(`!!file-loader!../../libraries/${libraryId}/app/layout.xml`),
        import(
            `!!file-loader?{"name":"static/js/[name].[contenthash:8].[ext]"}!../../libraries/${libraryId}/build/main.js`
        ),
        import(`!!file-loader!../../libraries/${libraryId}/README.md`),
    ]);

    let parentPage;

    try {
        parentPage = await import(
            `!!file-loader!../../libraries/${libraryId}/app/parent.html`
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
        repositoryBasePath: `https://github.com/geocortex/vertigis-web-incubator/tree/main/libraries/${libraryId}/`,
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
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        // Set default path if we're at the base path
        if (location.pathname === `${process.env.PUBLIC_URL}/`) {
            history.replace(`${process.env.PUBLIC_URL}/${libraries[0].id}`);
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
            {libraries.map((sample) => (
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
                <nav className={classes.drawer} aria-label="libraries">
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
