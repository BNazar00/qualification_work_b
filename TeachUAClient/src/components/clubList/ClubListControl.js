import React, {useEffect, useState} from "react";
import "./css/ClubListControl.css";
import ArrowDownOutlined from "@ant-design/icons/lib/icons/ArrowDownOutlined";
import ArrowUpOutlined from "@ant-design/icons/lib/icons/ArrowUpOutlined";
import {Form, Radio, Select} from "antd";

const ClubListControl = ({view, setSortBy, setSortDirection, sortBy, sortDirection, setView, centerIsChecked}) => {
    const [isMobile, setIsMobile] = useState(false);

    const onSortChange = (value) => {
        console.log(value);
        setSortBy(value);
    };

    useEffect(() => {
        if (window.outerWidth <= 850) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [])

    if (!isMobile) {
        return (
            <div className="club-list-control">
                <div className="club-control-sort">
                    <span className="control-sort-label">Сортувати:</span>
                    <span className="control-sort-option"
                          onClick={() => setSortBy('name')}
                          style={{color: sortBy === 'name' && '#FA8C16'}}>за алфавітом</span>
                    <span className="control-sort-option"
                          onClick={() => setSortBy('rating')}
                          style={{color: sortBy === 'rating' && '#FA8C16'}}>за рейтингом</span>
                    <div className="control-sort-arrows">
                        <ArrowUpOutlined className="control-sort-arrow"
                                         style={{color: sortDirection === 'desc' && '#FFC069'}}
                                         onClick={() => setSortDirection('desc')}/>
                        <ArrowDownOutlined className="control-sort-arrow"
                                           style={{color: sortDirection === 'asc' && '#FFC069'}}
                                           onClick={() => setSortDirection('asc')}/>
                    </div>
                </div>
                <Radio.Group className="club-control-view"
                             optionType="button"
                             defaultValue={view}
                             onChange={(value) => {
                                 setView(value.target.value);
                                 console.log(value.target.value);
                             }}
                             buttonStyle="solid">
                    <Radio.Button value="LIST"
                                  className="club-view-button">
                        <div className="club-view-button-icon">
                            <svg className={"club-button-icon"} width="17" height="14"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <title>Layer 1</title>
                                    <path id="svg_1" fill="currentColor"
                                          d="m5,0l0,4l12,0l0,-4l-12,0zm0,14l12,0l0,-4l-12,0l0,4zm0,-5l12,0l0,-4l-12,0l0,4zm-5,-5l4,0l0,-4l-4,0l0,4zm0,10l4,0l0,-4l-4,0l0,4zm0,-5l4,0l0,-4l-4,0l0,4z"/>
                                </g>
                            </svg>
                        </div>
                    </Radio.Button>
                    <Radio.Button value="BLOCK"
                                  className="club-view-button">
                        <div className="club-view-button-icon">
                            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <title>Layer 1</title>
                                    <path id="svg_1" fill="currentColor"
                                          d="m0,8l8,0l0,-8l-8,0l0,8zm0,10l8,0l0,-8l-8,0l0,8zm10,0l8,0l0,-8l-8,0l0,8zm0,-18l0,8l8,0l0,-8"/>
                                </g>
                            </svg>
                        </div>
                    </Radio.Button>
                </Radio.Group>
            </div>
        );
    } else {
        return (
            <Form.Item
                name="sortOption">
                <Select onChange={onSortChange}
                        className="club-list-select"
                        defaultValue="name">
                    <option selected="selected" value="name">
                        <span>за алфавітом</span>
                    </option>
                    <option value="rating">
                        <span>за рейтингом</span>
                    </option>
                </Select>
            </Form.Item>
        );
    }
};

export default ClubListControl;