// import React, { Component } from "react";
// import { Select } from "antd";
// import axios from "axios";

// export default function Banks() {

//  const [datas, setDatas] = useState('');

//     const res = await axios.get(
//       "http://192.168.1.103:8080/api/gam/v1/util/bank"
//     );
//     const data = res.data;

//     const options = data.map((d) => ({
//       id: d.id,
//       name: d.name,
//     }));

//     this.setState({ names: options });

//     this.setState({ id: e.id, name: e.name });
//     this.getOptions();
//     console.log("sonion", this.state.names);
//     return (
//       <div>
//         <select
//           className="w-100"
//           options={this.state.names}
//           onChange={this.handleChange.bind(this)}
//         />
//       </div>
//     );

// }
