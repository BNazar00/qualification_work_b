import React from 'react';
import './css/GoogleFormResultTable.less'

const GoogleFormResultTable = ({quizInfo, passingScore}) => {


    const googleFormResultsTable = () => {
        let data = [];
        for (let result of quizInfo.results) {
            data.push(
                <tr>
                    <th scope="row">{result.fullName}</th>
                    <td>{result.userEmail}</td>
                    <td style=
                            {result.totalScore >= passingScore ?
                                {background: 'rgba(0, 255, 0, .2)'}
                                :
                                {background: 'rgba(255, 0, 0, .2)'}}>
                        {result.totalScore}
                    </td>
                </tr>
            )
        }
        return data;
    };

    return (
        <div className={"google-results-table-wrapper custom-scroll"}>
            <table className="responsive-table">
                <thead>
                <tr>
                    <th scope="col">ПІБ</th>
                    <th scope="col">Електронна пошта</th>
                    <th scope="col">Результат</th>
                </tr>
                </thead>
                <tbody>
                {googleFormResultsTable()}
                </tbody>
            </table>
        </div>
    )
}
export default GoogleFormResultTable;