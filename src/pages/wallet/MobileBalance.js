import {
  numberToFixed,
  numberWithCommas,
  pairFormat,
} from "../../components/helper/utils";
function MobileBalance({ item, quantityData, onDepositHandler }) {
  return (
    <div className="retex--mobile--balance">
      <div className="w-100 d-flex justify-content-between">
        <p className="title">Хослол</p>
        <p className="title">Үлдэгдэл</p>
      </div>
      <div className="w-100 d-flex justify-content-between">
        <p className="balance">{item.name}</p>
        <p className="balance">
          {numberWithCommas(
            numberToFixed(item.balance, pairFormat(item.code || 0))
          )}
        </p>
      </div>
      <div className="w-100 d-flex justify-content-between">
        <p className="title">Захиалгад байгаа</p>
        <p className="title">Боломжит үлдэгдэл</p>
      </div>
      <div className="w-100 d-flex justify-content-between">
        <p className="balance">
          {numberWithCommas(
            numberToFixed(quantityData[item.code], pairFormat(item.code || 0))
          )}
        </p>
        <p className="balance">
          {numberWithCommas(
            numberToFixed(
              item.balance - quantityData[item.code],
              pairFormat(item.code || 0)
            )
          )}
        </p>
      </div>
      <div className="w-100 d-flex justify-content-between">
        {item.isDepositable === 1 && (
          <button
            type="button"
            className="btn btn-outline-light btn-sm"
            onClick={() => onDepositHandler(item)}
          >
            Данс цэнэглэх
          </button>
        )}

        {item.isWithdrawable === 1 && (
          <button type="button" className="btn btn-outline-light btn-sm">
            Зарлага
          </button>
        )}
      </div>
    </div>
  );
}

export default MobileBalance;
