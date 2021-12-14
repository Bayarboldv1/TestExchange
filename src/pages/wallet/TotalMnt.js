import { numberToFixed, numberWithCommas } from "../../components/helper/utils";
function TotalMnt({ data }) {
  const total = () => {
    try {
      let result = 0;
      for (let i in data) {
        if (data[i][0].code === "MNT") {
          result = data[i][0].balance;
          break;
        }
      }
      return `${numberWithCommas(numberToFixed(result, 2))} MNT`;
    } catch (e) {
      return " ";
    }
  };
  return (
    <div className=" header col-md mt-3 ml-3">
      <div className="col mt-5">
        <h5>Нийт үлдэгдэл</h5>
        <h2>{total()}</h2>
      </div>
    </div>
  );
}
export default TotalMnt;
