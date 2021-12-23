import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import WithdrawCrypto from './WithdrawCrypto';
import WithdrawFiat from './WithdrawFiat';
import { Tabs } from 'antd';
import { BalanceContext } from '../../context/BalanceContext/BalanceContext';

const { TabPane } = Tabs;

const Withdraw = ({ ...props }) => {

    const { data } = useContext(ThemeContext);
    const { balance, setBalanceList } = useContext(BalanceContext);
    const [selectedToken, setSelectedToken] = useState(props.match.params.tokenId ? props.match.params.tokenId : null);

    useEffect(() => {
        if (!balance.status.loaded) {
            setBalanceList();
        }
    }, [])

    return (
        <div className={"withdraw-container " + (data.them === 'dark' ? "withdraw-container-dark" : "")}>

            <div className='row no-gutters withdraw-address'>
                <div className='col-12 col-sm-12 col-md-11 col-lg-10 col-xl-10 center-container'>
                    <Tabs defaultActiveKey="1" type="card" size={'small'}>
                        <TabPane tab="Фиат зарлага" key="1">
                            <WithdrawFiat />
                        </TabPane>
                        <TabPane tab="Крипто зарлага" key="2">
                            <WithdrawCrypto />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Withdraw;
