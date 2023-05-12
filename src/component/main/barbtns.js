import { useNavigate } from "react-router-dom";
import "../main_back.css";

function Barbtns() {
    const history = useNavigate();
    return (
        <div id="topbar">
            <div id="barbtns">
                <div id="ibtn" onClick={(e) => { history("/i") }} style={{ position: "absolute", marginLeft: "690px", marginTop: "33px", fontSize: "20px" }}>
                    <p style={{ position: "absolute", marginLeft: "48px", marginTop: "60px", fontSize: "20px" }}>
                        I
                    </p>
                </div>
                <div id="mybtn" onClick={(e) => { history("/Filelist") }} style={{ position: "absolute", marginLeft: "795px", marginTop: "33px", fontSize: "20px" }}>
                    <p style={{ position: "absolute", marginLeft: "35px", marginTop: "60px", fontSize: "20px" }}>
                        MY
                    </p>
                </div>
                <div id="mebtn" onClick={(e) => { history("/me") }} style={{ position: "absolute", marginLeft: "900px", marginTop: "33px", fontSize: "20px" }}>
                    <p style={{ position: "absolute", marginLeft: "35px", marginTop: "60px", fontSize: "20px" }}>
                        ME
                    </p>
                </div>
                <div id="minebtn" onClick={(e) => { window.location.href = "/mine" }}  style={{ position: "absolute", marginLeft: "1005px", marginTop: "33px", fontSize: "20px" }}>
                    <p style={{ position: "absolute", marginLeft: "25px", marginTop: "60px", fontSize: "20px" }}>
                        MINE
                    </p>
                </div>

                <div id="cardbtn" onClick={(e) => { history("/card") }}   style={{ position: "absolute", marginLeft: "1190px", marginTop: "33px", fontSize: "20px" }}>
                    <p style={{ position: "absolute", marginLeft: "25px", marginTop: "60px", fontSize: "20px" }}>
                        CARD
                    </p>
                </div>
                <div id="bookbtn" onClick={(e) => { history("/gbmain") }}   style={{ position: "absolute", marginLeft: "1295px", marginTop: "33px", fontSize: "20px" }}>
                    <p style={{ position: "absolute", marginLeft: "20px", marginTop: "60px", fontSize: "20px" }}>
                        GUEST
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Barbtns;