import Box from "@vertigis/react-ui/Box";
import { marked } from "marked";
import { useEffect, useState } from "react";
import Sample from "./Sample";

interface ReadmeViewerProps {
    sample: Sample;
}

export default function ReadmeViewer({ sample }: ReadmeViewerProps) {
    const [readmeHtml, setReadmeHtml] = useState<string>();

    useEffect(() => {
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
                <Box dangerouslySetInnerHTML={{ __html: readmeHtml }} />
            )}
        </>
    );
}
