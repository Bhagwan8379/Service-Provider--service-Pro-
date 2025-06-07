import{u as i,e as o,j as e}from"./index-ewAQYAo0.js";const l=({compo:t})=>{const{agencyAdmin:a}=i(s=>s.adminAuth),n=o();return e.jsx(e.Fragment,{children:a?e.jsx(e.Fragment,{children:t}):e.jsxs("div",{className:"d-flex flex-column justify-content-center align-items-center vh-100 bg-light position-relative text-center",children:[e.jsx("div",{className:"position-absolute rounded-circle bg-primary opacity-50",style:{width:"200px",height:"200px",top:"10%",left:"20%",zIndex:1,animation:"float-circle 6s infinite ease-in-out"}}),e.jsx("div",{className:"position-absolute rounded-circle bg-primary opacity-50",style:{width:"300px",height:"300px",bottom:"15%",right:"10%",zIndex:1,animation:"float-circle 6s infinite ease-in-out"}}),e.jsx("h1",{className:"fw-bold text-dark mb-3 fs-1",style:{zIndex:2,animation:"fadeIn 1.5s ease-in-out"},children:"Agency Is Not Logged In"}),e.jsx("p",{className:"text-muted mb-4 fs-5",style:{zIndex:2,animation:"fadeIn 2s ease-in-out"},children:"Please Login to access 👇 Agency Dashboard"}),e.jsx("button",{className:"btn btn-primary px-4 py-2 fs-5",style:{zIndex:2,animation:"fadeIn 2.5s ease-in-out"},onClick:()=>n("/login"),children:"Login"}),e.jsx("style",{children:`
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
            `})]})})};export{l as default};
