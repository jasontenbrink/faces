import backGround from '../images/NoraUU.jpg'

const socialButton = {
    borderRadius: "6px"
    // flex: "0 1 45%"
}

export default {
    baseTextStyle: {
        fontSize: "3vh",
        fontFamily: "Helvetica-Light", 
    },
    container: {
        display: "flex",
        // alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw"
    },
    formContainer: {
        // border: "2px solid black",
        padding: "30px 60px 30px 60px",
    },
    mainBox: {
        height: "50vh",
        width: "30vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",  
    },
    welcomeContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        // border: "2px solid black",
        marginBottom: "5vh"
    },
    welcome: {
        color: "rgb(38, 27, 91)",
        fontSize: "11vh",
        fontFamily: "roboto", 
        paddingLeft: "10px",
        // marginBottom: "5vh",
        // opacity: ".8",
        margin: "0px"
    },
    image: {
        width: "60px",
        height: "auto"
    },
    background:{
        height: "100vh",
        position: 'absolute',
        zIndex: "-1",
        // backgroundImage: `linear-gradient(
        //                     rgba(0, 0, 0, 0.5),
        //                     rgba(0, 0, 0, 0.5)
        //                  ),
        //                  url(${backGround}) `,
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
        // color: "#FFFFFF",
        zIndex: "1",
        paddingLeft: "6px"
    },
    submitButton: {
        // height: "6vh",
        // display: "flex",
        // justifyContent: "center",
        borderRadius: "6px",
        // opacity: "0.8",
        // backgroundColor:  "rgba(0, 0, 0, 0.2)",
        backgroundColor: "rgba(250, 250, 250, 1)"
    },
    submitLabel: {
        height: "6vh",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        color: "rgb(38, 27, 91)",
        fontSize: "3vh",
        display: "flex",
        justifyContent: "center",
        borderRadius: "6px",
    },
    loadingBackground: {
        height: "100vh",
        position: 'absolute',
        zIndex: "99",
        // backgroundImage: `linear-gradient(
        //                     rgba(0, 0, 0, 0.5),
        //                     rgba(0, 0, 0, 0.5)
        //                  ) `,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        overflow: 'hidden',
        filter: 'blur(12px)',
        width: '100vw'
    },
    loading: {
        // color: "white",
        fontSize: "10vh",
        zIndex: "100",
        opacity: '.6',
    },
    socialContainer: {
        display: "flex",
        
    },
    googleButton: {
        ...socialButton,
        backgroundColor: "rgb(76, 134, 255)",
    },
    socialLabel: {
        color: "white",
    },
    facebookButton: {
        ...socialButton,
        backgroundColor: "rgb(58, 80, 157)",
        
    },
    icon: {
        position: "absolute",
        left: "10%",
        top: "10px"
    }
};
