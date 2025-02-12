import {degrees, PDFDocument, rgb, StandardFonts} from "pdf-lib";

async function printHtmlToPdf(htmlElement) {
    const localOptions = {
        name: "_blank",
        specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
        styles: [
            "https://maxcdn.bootstrapcdn.com/bootstrap/5.0.0/css/bootstrap.min.css",
            "https://unpkg.com/kidlat-css/css/kidlat.css",
            "../../css/watermark/watermark.css",
        ],
        timeout: 1000, // default timeout before the print window appears
        autoClose: true, // if false, the window will not close after printing
        windowTitle: window.document.title, // override the window title
    };
    await this.$htmlToPaper(htmlElement, localOptions);
}

async function downloadPdfWithWatermark(sourcePdf, watermark, downloadFileName) {
    const existingPdfBytes = await fetch(sourcePdf).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();

    pages.forEach(page => {
       const dimensions = page.getSize();
        page.drawText(watermark, {
            x: dimensions.width / 8,
            y: dimensions.height / 2 + 100,
            size: dimensions.height / 8,
            font: helveticaFont,
            color: rgb(0.66, 0.49, 0.28),
            rotate: degrees(-45),
            opacity: 0.5
        });
    });

    const pdfBytes = await pdfDoc.save();
    downloadByteArrayAsFile(downloadFileName, "application/pdf", pdfBytes);
}

function downloadByteArrayAsFile(fileName, fileType, byte) {
    const blob = new Blob([byte], {type: fileType});
    const link = document.createElement('a');

    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}

export {
    printHtmlToPdf,
    downloadPdfWithWatermark,
    downloadByteArrayAsFile
};
