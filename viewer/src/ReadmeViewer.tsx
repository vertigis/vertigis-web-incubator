import { makeStyles } from "@vertigis/react-ui/styles";
import marked from "marked";
import React from "react";
import Sample from "./Sample";

interface ReadmeViewerProps {
    sample: Sample;
}

const useStyles = makeStyles({
    root: {
        paddingBlockStart: 16,
    },
});

export default function ReadmeViewer({ sample }: ReadmeViewerProps) {
    const classes = useStyles();

    const [readmeHtml, setReadmeHtml] = React.useState<string>();

    React.useEffect(() => {
        let didCancel = false;

        (async () => {
            const response = await fetch(sample.readme);
            const text = await response.text();

            if (didCancel) {
                return;
            }

            setReadmeHtml(
                marked(text, {
                    baseUrl: sample.repositoryBasePath,
                })
            );
        })();

        return () => {
            didCancel = true;
        };
    }, [sample.readme, sample.repositoryBasePath]);

    return (
        <>
            {readmeHtml && (
                <div
                    className={classes.root}
                    dangerouslySetInnerHTML={{ __html: readmeHtml }}
                />
            )}
        </>
    );
}
