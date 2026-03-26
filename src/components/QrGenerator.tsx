// // components/QrGenerator.tsx
// import { useRef } from "react";
// import { QRCodeSVG } from "qrcode.react";
// import { Button } from "@/components/ui/button";

// type QrGeneratorProps = {
//   curp: string;
//   studentName: string;
// };

// function QrGenerator({ curp, studentName }: QrGeneratorProps) {
//   const qrRef = useRef<HTMLDivElement>(null);

//   const handleDownload = () => {
//     const svg = qrRef.current?.querySelector("svg");
//     if (!svg) return;

//     const svgData = new XMLSerializer().serializeToString(svg);
//     const blob = new Blob([svgData], { type: "image/svg+xml" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `qr-${studentName}.svg`;
//     a.click();

//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <p className="font-semibold">{studentName}</p>
//       <p className="text-sm text-muted-foreground">{curp}</p>
//       <div ref={qrRef}>
//         <QRCodeSVG value={curp} size={256} level="H" />
//       </div>
//       <div className="flex gap-2">
//         <Button onClick={handleDownload}>Descargar QR</Button>
//         <Button variant="outline" onClick={() => window.print()}>
//           Imprimir
//         </Button>
//       </div>
//     </div>
//   );
// }

// export { QrGenerator };
// components/QrGenerator.tsx
import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";

type Student = {
  id_student: number;
  curp: string;
  student_name: string;
  last_name_p: string;
  last_name_m: string;
  grade_name: string;
  group_name: string;
  school_id: number;
};

type QrGeneratorProps =
  | { mode: "single"; value: { curp: string } }
  | { mode: "multiple"; students: Student[] };

function QrGenerator(props: QrGeneratorProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const SinglehandlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
 <html>
      <head>
        <title>QR Codes</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: sans-serif; }
          .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            padding: 12px;
          }
          .card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            page-break-inside: avoid;
            border: 1px solid #eee;
            padding: 8px;
          }
          .name { font-weight: bold; font-size: 11px; text-align: center; }
          .curp { font-size: 10px; color: #666; text-align: center; }
          svg { width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <div class="grid">
          ${content.innerHTML}
        </div>
      </body>
    </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
const handlePrint = () => {
  if (props.mode !== "multiple") return; // ← este guard es clave

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const qrItems = props.students.map((student) => {
    const svgEl = document.querySelector(`[data-curp="${student.curp}"] svg`);
    const svgString = svgEl ? new XMLSerializer().serializeToString(svgEl) : "";

    return `
      <div class="card">
        <p class="name">${student.student_name} ${student.last_name_p} ${student.last_name_m}</p>
        <p class="curp">${student.curp}</p>
        ${svgString}
      </div>
    `;
  }).join("");

  printWindow.document.write(`
    <html>
      <head>
        <title>QR Codes</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: sans-serif; }
          .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            padding: 12px;
          }
          .card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            page-break-inside: avoid;
            border: 1px solid #eee;
            padding: 8px;
          }
          .name { font-weight: bold; font-size: 11px; text-align: center; }
          .curp { font-size: 10px; color: #666; text-align: center; }
          svg { width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <div class="grid">
          ${qrItems}
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};

  // Modo texto plano
  if (props.mode === "single") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div ref={printRef}>
          <QRCodeSVG value={props.value.curp} size={256} level="H" />
        </div>
        <Button onClick={SinglehandlePrint}>Imprimir QR</Button>
      </div>
    );
  }

  // Modo múltiples estudiantes
  return (
    <div className="flex flex-col items-center gap-4">
      <Button className="my-5" onClick={handlePrint}>
        Imprimir todos los QR
      </Button>
      <div ref={printRef} className="grid grid-cols-4 gap-3 p-4">
        {props.students.map((student) => (
          // <div
          //   key={student.curp}
          //   className="flex flex-col items-center gap-2 card"
          // >
          //   <p className="font-semibold text-sm">
          //     {`${student.student_name} ${student.last_name_p} ${student.last_name_m}`}
          //   </p>
          //   <p className="text-xs text-muted-foreground">{student.curp}</p>
          //   <QRCodeSVG value={student.curp} size={150} level="H" />
          // </div>
          <div
            key={student.curp}
            data-curp={student.curp}
            className="flex flex-col items-center gap-2"
          >
            <p className="font-semibold text-sm">
              {`${student.student_name} ${student.last_name_p} ${student.last_name_m}`}
            </p>
            <p className="text-xs text-muted-foreground">{student.curp}</p>
            <QRCodeSVG value={student.curp} size={150} level="H" />
          </div>
        ))}
      </div>
    </div>
  );
}

export { QrGenerator };
