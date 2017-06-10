import backGround from '../images/NoraUU.jpg'

const styles = {
   
    container: {
        display: "flex",
        // alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh"
    },
    mainBox: {
        height: "40vh",
        width: "30vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",      
    },
    welcome: {
        color: "white",
        fontSize: "10vh",
        fontFamily: "Helvetica-Light", 
        marginBottom: "5vh",
        opacity: ".8"
    },
    background:{
        height: "100vh",
        position: 'absolute',
        zIndex: "-1",
        backgroundImage: `linear-gradient(
                            rgba(0, 0, 0, 0.5),
                            rgba(0, 0, 0, 0.5)
                         ),
                         url(${backGround}) `,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        overflow: 'hidden',
        filter: 'blur(12px)',
        opacity: '1',
        width: '100vw'
    },
    input: {
        height: "6vh",
        fontSize: "3vh",
        borderRadius: "6px",
        border: "2px solid rgba(230, 230, 230, 0.5)",
        opacity: "0.8",
        background: "transparent",
        color: "#FFFFFF",
        zIndex: "1",
        paddingLeft: "6px"
    },
    submitButton: {
        height: "6vh",
        display: "flex",
        justifyContent: "center",
        borderRadius: "6px",
        backgroundColor:  "rgba(0, 0, 0, 0.2)",
    },
    submitLabel: {
        height: "6vh",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        color: "gainsboro",
        fontSize: "3vh",
    }
};

export default styles;