import  CardComponent  from "@/components/Card";
import '@/app/style/dashboard.css'


const Card = () => {
    const cardsData = [
        {
            title: "买进",
            date: "03/15/2020 - 03/16/2020",
            value: "983.65 股",
            color: "#4fc3f7", // 藍色
        },
        {
            title: "卖出",
            date: "03/15/2020 - 03/16/2020",
            value: "823.98 股",
            color: "#f06292", // 紅色
        },
        {
            title: "总资产",
            date: "03/15/2020 - 03/16/2020",
            value: "932.78 万元",
            color: "#9575cd", // 紫色
        },
        {
            title: "总收益",
            date: "03/15/2020 - 03/16/2020",
            value: "682.51 万元",
            color: "#81c784", // 綠色
        },
        {
            title: "总收益",
            date: "03/15/2020 - 03/16/2020",
            value: "682.51 万元",
            color: "#81c784", // 綠色
        },
      ];
    return (
        <>
            <div className="card-container">
                {cardsData.map((card, index) => (
                    <CardComponent
                        key={index}
                        title={card.title}
                        date={card.date}
                        value={card.value}
                        color={card.color}
                    />
                ))}
            </div>
        </>
    )
}

export default Card;