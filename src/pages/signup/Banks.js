// import React, { Component, useEffect, useState } from "react";
// import { Select } from "antd";
// import Service from "../../service/bank/index";
// import { render } from "node-sass";
// import axios from "axios";

// export default function Banks() {
//   const [bankLists, setBankLists] = useState();

//   useEffect(() => {
//     axios
//       .get("http://192.168.1.103:8080/api/gam/v1/util/bank")
//       .then(function (banks) {
//         setBankLists(banks.data);
//       });
//   }, []);

//   //   const onFinish = async () => {
//   //     try {
//   //       Service.banklists()
//   //         .then((res) => {
//   //           if (res.data.status) {
//   //             setBankLists(res.data);
//   //             console.log(res.data);
//   //           } else {
//   //           }
//   //         })
//   //         .catch((e) => {
//   //           console.log("catch error 1");
//   //           console.log(e.response.data.message);
//   //         });
//   //     } catch (e) {
//   //       console.log("catch error 2 !!");
//   //       console.log(e.response.data.message);
//   //     }
//   //   };
//   //   useEffect(() => {
//   //     onFinish();
//   //   }, []);
//   return (
//     <div>
//       <select
//         id="selectBank"
//         className="custom-select"
//         placeholder="Банкаа Сонгоно уу"
//         allowClear
//       >
//         {bankLists.map((item, index) => (
//           <option key={index}>
//             <li>{item.name}</li>
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }
