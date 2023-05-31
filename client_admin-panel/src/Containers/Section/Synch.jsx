import axios from "axios";
import { useSelector } from 'react-redux';
import { tokenHeader } from '../../backend.js';
import { Button, DatePicker,Menu, Switch } from 'antd';
import "antd/dist/antd.css";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export default function Synch() {

    const { token, userId } = useSelector(({ auth }) => auth);

    function asda() {
        if (!window.confirm("Данное действие полностью удалит и закачает заново товары из ris-iп-testo.myresto.online, убедитесь в актуальности меню. Продолжаем?")) return;
        axios.get('http://apirice/admin/synch/full', tokenHeader(token, userId));

    }

    return (
        <>

            <button onClick={asda} >Goods Reloaded</button>
            <br />
            <br />
            <button>Lite Update (in development)</button><br />
            <br />
            <button>Get new Goods of iiko(in development)</button>
            <div><h1>section in development</h1></div>
        </>
    );
}