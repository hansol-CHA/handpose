import { useNavigate } from "react-router-dom"

function Main () {
    const navigation = useNavigate();

    const moveToHandpose = () => {
        navigation("/handpose");
    }

    const moveToMobilenet = () => {
        navigation("/mobilenet");
    }

    const moveToClassifier = () => {
        navigation("/classifier");
    }

    return (
        <div>
            <button onClick={moveToHandpose}>handpose</button>
            <button onClick={moveToMobilenet}>mobilenet</button>
            <button onClick={moveToClassifier}>classfier</button>
        </div>
    )
}
export default Main;