import{X as c,r,j as e}from"./index-Co1qtYU1.js";const n=()=>{const[o,{data:l}]=c();return r.useEffect(()=>{o()},[]),e.jsxs("div",{className:"container",children:[e.jsx("h3",{className:"p-3",children:"-All Bookings"}),e.jsxs("table",{class:"table table-light table-striped table-hover border-black border overflow-hidden p-4",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"Professional Name"}),e.jsx("th",{scope:"col",children:"Professional Email"}),e.jsx("th",{scope:"col",children:"Role"}),e.jsx("th",{scope:"col",children:"Agency Name"}),e.jsx("th",{scope:"col",children:"Customer Name"}),e.jsx("th",{scope:"col",children:"Customer Email"}),e.jsx("th",{scope:"col",children:"locatione"}),e.jsx("th",{scope:"col",children:"date"})]})}),e.jsx("tbody",{children:l&&l.map(s=>e.jsxs("tr",{children:[e.jsx("td",{children:s.professionalId.name}),e.jsx("td",{children:s.professionalId.email}),e.jsx("td",{children:s.professionalId.role}),e.jsx("td",{children:s.professionalId.agencyName}),e.jsx("td",{children:s.customerId.name}),e.jsx("td",{children:s.customerId.email}),e.jsx("td",{children:s.location}),e.jsx("td",{children:s.date})]}))})]})]})};export{n as default};