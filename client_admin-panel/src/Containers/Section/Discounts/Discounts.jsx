import { Collapse } from 'antd';
import PromoCodeRoot from './PromoCodeRoot';
import HappyHours from './HappyHours';
const { Panel } = Collapse;

const text = `
section in development
`;

export default () => (
    <Collapse accordion>
        <Panel header="Promo Code" key="1" >
            <PromoCodeRoot />
        </Panel>
        <Panel header="Happy Hours" key="2">
            <HappyHours />
        </Panel>
        <Panel header="Promo Page" key="3">
            <p>{text}</p>
        </Panel>
    </Collapse>
);






// export default function Discounts() {
//     return (
//         <div>
//             <PromoCode />
//         </div>
//     )
// }