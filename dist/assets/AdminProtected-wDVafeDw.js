import{e as s,u as o,j as t}from"./index-Co1qtYU1.js";const l=({compo:a})=>{const n=s(),{admin:i}=o(e=>e.adminAuth);return t.jsx(t.Fragment,{children:i?t.jsx(t.Fragment,{children:a}):t.jsx(t.Fragment,{children:t.jsxs("div",{className:"d-flex flex-column justify-content-center align-items-center vh-100 bg-light position-relative text-center",children:[t.jsx("div",{className:"position-absolute rounded-circle bg-primary",style:{width:"200px",height:"200px",top:"10%",left:"20%",opacity:.3,animation:"float-circle 6s infinite ease-in-out"}}),t.jsx("div",{className:"position-absolute rounded-circle bg-primary",style:{width:"300px",height:"300px",bottom:"15%",right:"10%",opacity:.3,animation:"float-circle 6s infinite ease-in-out"}}),t.jsx("h1",{className:"fw-bold text-dark",style:{fontSize:"2.5rem",marginBottom:"1rem",animation:"fadeIn 1.5s ease-in-out"},children:"Admin Not Login"}),t.jsx("p",{className:"text-muted",style:{fontSize:"1.2rem",marginBottom:"2rem",animation:"fadeIn 2s ease-in-out"},children:"Please Login to  access 👇 Admin Dashboard"}),t.jsx("button",{className:"btn btn-primary",style:{padding:"10px 20px",fontSize:"1rem",animation:"fadeIn 2.5s ease-in-out"},onClick:e=>n("/login"),children:"Login"}),t.jsx("style",{children:`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float-circle {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `})]})})})};export{l as default};
