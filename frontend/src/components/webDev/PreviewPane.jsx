

// export default function PreviewPane({ code }) {

//      if (!code) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-400">
//         Preview locked until generation completes
//       </div>
//     );
//   }

//   return (
//     <div className="h-full min-h-0 flex">
//       <SandpackProvider
//         template="react"
//         files={{
//           "/index.css" `
// html, body, #root {
//   margin: 0;
//   padding: 0;
//   height: 100%;
//   background: #0f0f0f;
// }

// iframe {
//   border: 0;
// }
// `,
//           "/App.js": `import "./index.css" code;

// export default function App() {
//   return (
//     <div
//       style={{
//         padding: 40,
//         backgroundColor: "#0f0f0f",
//         minHeight: "100vh",
//         color: "#e5e7eb"
//       }}
//     >
//       <h2 style={{ fontSize: 24, fontWeight: 600 }}>
//         Hello World
//       </h2>

//       <p style={{ marginTop: 12, color: "#9ca3af" }}>
//         This is a static preview.
//       </p>
//     </div>
//   );
// }`
//         }}
//         style={{
//           height: "100%",
//           flex: 1,
//           minHeight: 0,
//           backgroundColor: "#000"
//         }}
//       >
//         <SandpackLayout
//           style={{
//             height: "100%",
//             flex: 1,
//             minHeight: 0,
//             display: "flex",
//             backgroundColor: "#000"
//           }}
//         >
//           <SandpackPreview
//             style={{
//               height: "100%",
//               flex: 1
//             }}
//             showOpenInCodeSandbox={false}
//             showRefreshButton={false}
//           />
//         </SandpackLayout>
//       </SandpackProvider>
//     </div>
//   );
// }













"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview
} from "@codesandbox/sandpack-react";

export default function PreviewPane({ code }) {
  if (!code) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Preview locked until generation completes
      </div>
    );
  }

  return (
    <div className="h-full w-full min-h-0 flex">
      <SandpackProvider
        template="react"
        theme="dark"
        files={{
          "/App.js": code
        }}
        customSetup={{
          dependencies: {
            "lucide-react": "latest",
            "framer-motion": "latest",
            recharts: "2.9.0",
            clsx: "latest",
            "tailwind-merge": "latest",
            "@radix-ui/react-slot": "latest",
            "@radix-ui/react-dialog": "latest",
            "@radix-ui/react-dropdown-menu": "latest"
          }
        }}
        options={{
          externalResources: [
            "https://cdn.tailwindcss.com"
          ],
          classes: {
            "sp-wrapper": "h-full",
            "sp-layout": "h-full",
            "sp-stack": "h-full"
          }
        }}
        style={{ height: "100%", width: "100%", flex: 1 }}
      >
        <SandpackLayout style={{ height: "100%", minHeight: 0 }}>
          <SandpackPreview
            style={{ height: "100%" }}
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
