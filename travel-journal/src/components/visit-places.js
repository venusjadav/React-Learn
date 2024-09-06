export default function Visited(props) {
    return (
        <div className="place-container">
            <div className="img-box">
                <img src={`../images/${props.imageUrl}`} alt="" />
            </div>
            <div className="detail">
                <div className="place-location">
                    <h6>
                        <i class="fas fa-map-marker-alt"></i>
                        {props.location}
                    </h6>
                    <a href={props.googleMapsUrl}>View on Google Maps</a>
                </div>
                <h2>{props.title}</h2>
                <h6>
                    {props.startDate} - {props.endDate}
                </h6>
                <p>{props.description}</p>
            </div>
        </div>
    );
}
