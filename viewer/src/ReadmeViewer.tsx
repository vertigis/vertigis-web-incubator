import Box from "@vertigis/react-ui/Box";
import { marked } from "marked";
import { baseUrl } from "marked-base-url";
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

            marked.use(baseUrl(sample.repositoryBasePath));
            setReadmeHtml(await marked(text));
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
