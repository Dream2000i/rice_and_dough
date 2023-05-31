import './Goods.scss';


export default function GoodsList({ children }) {


    return (
        <main className="main">
            <div className="container">
                <div className="goods_list">
                    {children}
                </div>
            </div>
        </main>

    );
}


