import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export interface PDFProps {
  url: string;
}

export default function PDF(props: PDFProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="max-h-screen overflow-y-auto">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={props.url} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
}
