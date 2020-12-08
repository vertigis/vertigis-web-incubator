import { makeStyles } from "@vertigis/react-ui/styles";
import React from "react";
import Sample from "./Sample";
import WebViewer from "./WebViewer";
import ReadmeViewer from "./ReadmeViewer";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
});

interface SampleViewerProps {
    sample: Sample;
}

export default function SampleViewer({ sample }: SampleViewerProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <WebViewer sample={sample} />
            <a
                href={sample.repositoryBasePath}
                target="_blank"
                rel="noopener noreferrer"
            >
                View the source code on GitHub
            </a>
            <a
                href={sample.codesandboxLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                Edit this sample in CodeSandbox
            </a>
            <ReadmeViewer sample={sample} />
        </div>
    );
}
