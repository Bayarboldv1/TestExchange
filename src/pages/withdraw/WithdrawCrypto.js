import React, { useContext, useEffect, useState } from 'react';
import { BalanceContext } from '../../context/BalanceContext/BalanceContext';
import WalletService from '../../service/wallet/index';
import { Button, Input, InputNumber, Menu, Radio, Select } from 'antd';

const { Option } = Select;

const WithdrawCrypto = ({ ...props }) => {

    const { balance } = useContext(BalanceContext);
    const [coin, setCoin] = useState(0);
    const [networkList, setNetworkList] = useState([]);
    const [network, setNetwork] = useState(0);
    const [addressType, setAddressType] = useState(0);

    const onChangeCoin = (value) => {
        setCoin(value);
        if (value != 0) {
            getNetworkList(value);
        }
    }

    const getNetworkList = (value) => {
        WalletService.getTokenDetail(value).then(res => {
            setNetworkList(res.data);
        }).catch(err => {
            setNetworkList([]);
        })
    }

    const onChangeNetwork = (value) => {

    }

    const changeAddressType = (value) => {
        setAddressType(value.target.value);
    }

    return (
        <div className='withdraw-crypto row no-gutters'>
            <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8'>
                <div className='wc-item'>
                    <span className='wc-title'>Койн</span>
                    <Select size='large' defaultValue={coin} style={{ flex: 1, marginRight: 20 }} onChange={onChangeCoin}>
                        <Option value={0}>Сонгох</Option>
                        {
                            balance.nonFiatBalanceList.map((b, i) => {
                                return (
                                    <Option key={i} value={b.tokenId}>
                                        <div style={{ justifyContent: 'left', display: 'flex', alignItems: 'center' }}>
                                            <div style={{ marginRight: '15px', width: '20px' }}>
                                                <img src={b.tokenTicker === 'BTC' ? 'img/icon/18.png' : 'img/icon/1.png'} style={{ width: '100%' }}></img>
                                            </div>
                                            <div>
                                                <strong>{b.tokenTicker}</strong>&nbsp;&nbsp;&nbsp;{b.tokenName}
                                            </div>
                                        </div>
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className='wc-item'>
                    <span className='wc-title'>Хаяг</span>
                    <div style={{ flex: 1, justifyContent: 'space-between', display: 'flex', marginRight: 20 }}>
                        <Radio.Group defaultValue={addressType} buttonStyle="solid" onChange={changeAddressType}>
                            <Radio.Button value={0}>Шинэ хаяг</Radio.Button>
                            <Radio.Button value={1}>Хадгалсан хаяг</Radio.Button>
                        </Radio.Group>
                        {
                            addressType === 1 &&
                            <Button>Хаяг нэмэх</Button>
                        }
                    </div>
                </div>
                {
                    addressType === 0 &&
                    <>
                        <div className='wc-item'>
                            <span className='wc-title'></span>
                            <div style={{ flex: 1, marginRight: 20 }}>
                                <div style={{ marginBottom: '5px' }}>Хаяг</div>
                                <Input placeholder='Шилжүүлэх хаягаа энд оруулна уу' size='large' style={{ width: '100%' }} />
                            </div>
                        </div>
                        <div className='wc-item'>
                            <span className='wc-title'></span>
                            <div style={{ flex: 1, marginRight: 20 }}>
                                <div style={{ marginBottom: '5px' }}>Сүлжээ</div>
                                <Select placeholder={"Шилжүүлэх сүлжээгээ сонгоно уу"} size='large' style={{ width: '100%' }} onChange={onChangeNetwork}>
                                    {
                                        networkList.map((n, i) => {
                                            return (
                                                <Option key={i}>
                                                    <div style={{ justifyContent: 'left', display: 'flex', alignItems: 'center' }}>
                                                        <div>
                                                            <strong>{n.network}</strong>&nbsp;&nbsp;&nbsp;{n.desc}
                                                        </div>
                                                    </div>
                                                </Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                        </div>
                    </>
                }
                {
                    addressType === 1 &&
                    <>
                        <div className='wc-item'>
                            <span className='wc-title'></span>
                            <div style={{ flex: 1, marginRight: 20 }}>
                                <div style={{ marginBottom: '5px' }}>Хадгалсан хаягууд</div>
                                <Select placeholder={"Хадгалсан хаягуудаас сонгоно уу"} size='large' style={{ width: '100%' }} onChange={onChangeNetwork}>
                                    {
                                        networkList.map((n, i) => {
                                            return (
                                                <Option key={i}>
                                                    <div style={{ justifyContent: 'left', display: 'flex', alignItems: 'center' }}>
                                                        <div>
                                                            <strong>{n.network}</strong>&nbsp;&nbsp;&nbsp;{n.desc}
                                                        </div>
                                                    </div>
                                                </Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                        </div>
                    </>
                }
                <div className='wc-item'>
                    <span className='wc-title'></span>
                    <div style={{ flex: 1, marginRight: 20 }}>
                        <div style={{ marginBottom: '5px', justifyContent: 'space-between', display: 'flex' }}>
                            <span>Дүн</span>
                            <span>Өдрийн лимит: 90000/80000</span>
                        </div>
                        <InputNumber placeholder='Шилжүүлэх хаягаа энд оруулна уу' size='large' style={{ width: '100%' }} />
                    </div>
                </div>
            </div>
            <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>

            </div>
        </div>
    )
}

export default WithdrawCrypto;
