import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab, Table, Button, Pagination } from "react-bootstrap";
import { ExchangeContext } from "../context/ExchangeContext/ExchangeContext";
import ExchangeService from '../service/exchange/index';
import { message } from "antd";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { UserContext } from "../context/UserContext";

export default function HistoryOrder() {

  const { exchange } = useContext(ExchangeContext);
  const { data } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const [pageData, setPageData] = useState({ page: 0, size: 10, allPage: 0 });
  const [activeOrders, setActiveOrders] = useState([]);
  let pageItem = [];

  useEffect(() => {
    if (user.auth === true) {
      getActiveOrders(pageData.page, pageData.size);
    }
  }, [exchange.selectedPair])

  useEffect(() => {
    if (user.auth === true) {
      getActiveOrders(pageData.page, pageData.size);
    }
  }, [exchange.balance])

  for (let number = 1; number <= pageData.allPage; number++) {
    pageItem.push(
      <Pagination.Item onClick={() => onChangePage(number)} key={number} active={number === pageData.page + 1}>
        {number}
      </Pagination.Item>
    );
  }

  const getActiveOrders = (page, size) => {
    ExchangeService.getActiveExchange(page, size).then(res => {
      if (res.data.data[0]["content"]) {
        setActiveOrders(res.data.data[0]["content"]);
        setPageData({ ...pageData, page: page, allPage: res.data["totalPages"] ? res.data["totalPages"] : 0 });
      }
    }).catch(e => {
      setActiveOrders([]);
      if (e.response?.status === 400) {
        return message.error(e.response.data.message);
      } else {
        return message.error("Алдаа гарлаа.");
      }
    })
  }

  const onChangePage = (number) => {
    getActiveOrders(number - 1, pageData.size);
  }

  const onDelete = (id, index) => {
    ExchangeService.cancelExchange(id).then(res => {
      if (res.data.status === 200) {
        message.success(res.data.message);
        const orders = activeOrders;
        console.log("orders", orders)
        orders.splice(index, 1);
        console.log("orders active", orders)
        setActiveOrders(orders);
        console.log("orders set active", activeOrders)
      }
    }).catch(e => {
      if (e.response?.status === 400) {
        return message.error(e.response.data.message);
      } else {
        return message.error("Алдаа гарлаа.");
      }
    })
  }

  return (
    <>
      <div style={{ color: data.theme === 'dark' ? "#8fa3cc" : "black", backgroundColor: data.theme === 'dark' ? '#1a1c2a' : 'white' }}>
        <Tabs defaultActiveKey="open-orders" id="uncontrolled-tab-example" variant="tabs">
          <Tab eventKey="open-orders" title="Идэвхтэй захиалга">
            <div className={data.theme === 'dark' ? "history-order-dark" : "history-order"} style={{ height: '200px', overflow: 'scroll' }}>
              <Table style={{ color: data.theme === 'dark' ? "#8fa3cc" : "black" }} responsive>
                <thead>
                  <tr>
                    <th>Дугаар</th>
                    <th>Огноо</th>
                    <th>Хослол</th>
                    <th>Авах/зарах</th>
                    <th>Ханш</th>
                    <th>Хэмжээ</th>
                    <th>Биелсэн</th>
                    <th>Нийт дүн</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    activeOrders.length === 0
                      ?
                      <span className="no-data">
                        <i style={{ fontSize: '50px' }} className="icon ion-md-document"></i>
                        Захиалга Хоосон байна
                      </span>
                      :
                      activeOrders.map((a, i) => {
                        return (
                          <tr>
                            <td>{((pageData.size) * (pageData.page) + (i + 1)) + "."}</td>
                            <td>{a.createdDate.includes("T") ? a.createdDate.split("T")[0] : ""}</td>
                            <td>{a.tokenName1 + "/" + a.tokenName2}</td>
                            <td className={a.orderType === 0 ? "red" : "green"}>{a.orderType === 0 ? "зарах" : "авах"}</td>
                            <td>{a.price}</td>
                            <td>{a.amount}</td>
                            <td>{"0%"}</td>
                            <td>{a.total}</td>
                            <td>
                              <Button onClick={() => onDelete(a.id, i)} variant="outline-danger" size="sm">Устгах</Button>
                            </td>
                          </tr>
                        )
                      })
                  }
                </tbody>
              </Table>
              <div style={{ justifyContent: 'center', display: 'flex', paddingTop: '10px' }}>
                <Pagination size="sm">{pageItem}</Pagination>
              </div>
            </div>
            {/* <ul className="d-flex justify-content-between market-order-item">
              <li>Огноо</li>
              <li>Хослол</li>
              <li>Авах/зарах</li>
              <li>Ханш</li>
              <li>Хэмжээ</li>
              <li>Биелсэн</li>
              <li>Нийт дүн</li>
              <li></li>
            </ul>
            <div style={{ height: "160px", overflowY: 'scroll' }}>
              {
                activeOrders.length === 0
                  ?
                  <span className="no-data">
                    <i style={{ fontSize: '50px' }} className="icon ion-md-document"></i>
                    Захиалга Хоосон байна
                  </span>
                  :
                  activeOrders.map((a, i) => {
                    return (
                      <ul className="d-flex justify-content-between market-order-item">
                        <li>{(i + 1) + "."}</li>
                        <li>{a.createdDate.includes("T") ? a.createdDate.split("T")[0] : ""}</li>
                        <li>{a.tokenName1 + "/" + a.tokenName2}</li>
                        <li>{a.orderType === 0 ? "зарах" : "Авах"}</li>
                        <li>{a.price}</li>
                        <li>{a.amount}</li>
                        <li>{"0%"}</li>
                        <li>{a.total}</li>
                        <li>
                          <button>Устгах</button>
                        </li>
                      </ul>
                    )
                  })
              }
            </div> */}
          </Tab>
          <Tab eventKey="closed-orders" title="Нийт захиалга">
            <ul className="d-flex justify-content-between market-order-item">
              <li>Огноо</li>
              <li>Хослол</li>
              <li>Авах/зарах</li>
              <li>Ханш</li>
              <li>Хэмжээ</li>
              <li>Биелсэн</li>
              <li>Нийт дүн</li>
            </ul>
            <span className="no-data ">
              <i style={{ fontSize: '50px' }} className="icon ion-md-document"></i>
              Хоосон байна
            </span>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
