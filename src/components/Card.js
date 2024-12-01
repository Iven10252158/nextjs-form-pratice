import '@/app/style/dashboard.css'
const Card = ({ title, date, value, color }) => {
    return (
        <>
            <div className="card">
            <div className="card-header">
            <h3>{title}</h3>
            <span className="icon" style={{ backgroundColor: color }}></span>
            </div>
            <p className="card-date">{date}</p>
            <p className="card-value">{value}</p>
            </div>
        </>
    )
}

export default Card;