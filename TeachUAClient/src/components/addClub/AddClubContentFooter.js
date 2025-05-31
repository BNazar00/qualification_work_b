import {Button} from "antd";
import React from "react";
import "./css/AddClubContentFooter.css"

const AddClubContentFooter = ({step, setStep}) => {
    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="add-club-content-footer">
            <span onClick={prevStep} className="add-club-content-prev">{step > 0 && "Назад"}</span>
            <Button htmlType="submit"
                    className="flooded-button add-club-content-next">{step === 2 ? "Завершити" : "Наступний крок"}</Button>
        </div>
    )
};

export default AddClubContentFooter;
