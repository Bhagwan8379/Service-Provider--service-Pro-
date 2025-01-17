import{u as i,e as o,j as e}from"./index-BUAcf1D8.js";const l=({compo:a})=>{const{professsional:s}=i(t=>t.adminAuth),n=o();return e.jsx(e.Fragment,{children:s?e.jsx(e.Fragment,{children:a}):e.jsx(e.Fragment,{children:e.jsxs("div",{className:"d-flex flex-column justify-content-center align-items-center vh-100 bg-light position-relative text-center",children:[e.jsx("div",{className:"position-absolute rounded-circle bg-primary",style:{width:"200px",height:"200px",top:"10%",left:"20%",opacity:.3,animation:"float-circle 6s infinite ease-in-out"}}),e.jsx("div",{className:"position-absolute rounded-circle bg-primary",style:{width:"300px",height:"300px",bottom:"15%",right:"10%",opacity:.3,animation:"float-circle 6s infinite ease-in-out"}}),e.jsx("h1",{className:"fw-bold text-dark",style:{fontSize:"2.5rem",marginBottom:"1rem",animation:"fadeIn 1.5s ease-in-out"},children:"Professional Is Not Login"}),e.jsx("p",{className:"text-muted",style:{fontSize:"1.2rem",marginBottom:"2rem",animation:"fadeIn 2s ease-in-out"},children:"Please Login to  access 👇 Professional Dashboard"}),e.jsx("button",{className:"btn btn-primary",style:{padding:"10px 20px",fontSize:"1rem",animation:"fadeIn 2.5s ease-in-out"},onClick:t=>n("/login"),children:"Login"}),e.jsx("style",{children:`
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
