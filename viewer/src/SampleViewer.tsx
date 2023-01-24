import Box from "@vertigis/react-ui/Box";
import Sample from "./Sample";
import WebViewer from "./WebViewer";
import ReadmeViewer from "./ReadmeViewer";

interface SampleViewerProps {
    sample: Sample;
}

export default function SampleViewer({ sample }: SampleViewerProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <WebViewer sample={sample} />
            <a
                href={sample.repositoryBasePath}
                target="_blank"
                rel="noopener noreferrer"
            >
                View the source code on GitHub
            </a>
            <a href={sample.library} download={`${sample.id}.js`}>
                Download this library
            </a>
            <ReadmeViewer sample={sample} />
        </Box>
    );
}
